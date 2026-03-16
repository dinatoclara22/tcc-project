/**
 * Pyodide Runner — Executes Python code in a Web Worker using Pyodide (WASM).
 *
 * - Loads Pyodide once in a dedicated worker (non-blocking).
 * - Has timeout to kill stuck executions (e.g., infinite loops).
 * - Preloadable so the first "Run" is faster.
 */

export interface TestResult {
  passed: boolean;
  description: string;
  input: string;
  expected: string;
  actual: string;
  error?: string;
}

export interface RunResult {
  results: TestResult[];
  stdout: string[];
  allPassed: boolean;
  passCount: number;
  totalCount: number;
}

// ---------------------------------------------------------------------------
// Worker management
// ---------------------------------------------------------------------------

let worker: Worker | null = null;
let messageId = 0;
const pendingCallbacks = new Map<
  number,
  { resolve: (value: unknown) => void; reject: (reason: unknown) => void; timer: ReturnType<typeof setTimeout> }
>();

function getWorker(): Worker {
  if (worker) return worker;

  worker = new Worker("/pyodide-worker.js");

  worker.onmessage = (event: MessageEvent) => {
    const { id, ...data } = event.data;
    const pending = pendingCallbacks.get(id);
    if (pending) {
      pendingCallbacks.delete(id);
      clearTimeout(pending.timer);
      if (data.success) {
        pending.resolve(data);
      } else {
        pending.reject(new Error(data.error || "Erro desconhecido no worker"));
      }
    }
  };

  worker.onerror = (error) => {
    for (const [, pending] of pendingCallbacks) {
      clearTimeout(pending.timer);
      pending.reject(new Error("Erro no worker: " + error.message));
    }
    pendingCallbacks.clear();
  };

  return worker;
}

function sendToWorker(message: Record<string, unknown>, timeout: number): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    const w = getWorker();

    const timer = setTimeout(() => {
      pendingCallbacks.delete(id);
      // Terminate and recreate the worker to kill stuck execution
      w.terminate();
      worker = null;
      reject(new Error("Tempo limite excedido (possível loop infinito)"));
    }, timeout);

    pendingCallbacks.set(id, {
      resolve: resolve as (v: unknown) => void,
      reject: reject as (r: unknown) => void,
      timer,
    });

    w.postMessage({ ...message, id });
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Start loading Pyodide in the background so it's ready when the user runs code.
 * Safe to call multiple times — only triggers one load.
 */
export async function preloadPyodide(): Promise<void> {
  await sendToWorker({ type: "preload" }, 120_000); // 2 min timeout for initial load
}

/**
 * Run user Python code against the challenge's test cases.
 */
export async function runTests(
  code: string,
  testCases: { input: string; expected: string; description: string }[]
): Promise<RunResult> {
  const data = (await sendToWorker({ type: "run", code, testCases }, 30_000)) as {
    results: TestResult[];
    stdout: string[];
  };

  const results = data.results;
  const passCount = results.filter((r) => r.passed).length;

  return {
    results,
    stdout: data.stdout ?? [],
    allPassed: passCount === results.length,
    passCount,
    totalCount: results.length,
  };
}
