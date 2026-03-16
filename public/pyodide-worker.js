/* eslint-disable no-undef */
// Web Worker for executing Python code via Pyodide (WebAssembly)

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/";

let pyodidePromise = null;

function loadPyodideInWorker() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      importScripts(PYODIDE_CDN + "pyodide.js");
      const py = await loadPyodide({ indexURL: PYODIDE_CDN });
      // Define the test runner function once
      py.runPython(TEST_RUNNER_CODE);
      return py;
    })();
  }
  return pyodidePromise;
}

const TEST_RUNNER_CODE = `
import json as _json
import sys as _sys
import io as _io

def __run_challenge_tests(user_code, test_cases_json):
    results = []
    test_cases = _json.loads(test_cases_json)
    stdout_lines = []

    for tc in test_cases:
        try:
            ns = {}
            # Capture stdout from user code execution
            old_stdout = _sys.stdout
            captured = _io.StringIO()
            _sys.stdout = captured

            # Execute user code (defines functions/classes)
            exec(user_code, ns)

            # Handle multi-statement test inputs (separated by ;)
            # e.g. "c = Foo(); c.bar(); c.value"
            parts = tc["input"].rsplit(";", 1)
            if len(parts) > 1:
                exec(parts[0].strip(), ns)
            actual = eval(parts[-1].strip(), ns)

            _sys.stdout = old_stdout
            user_stdout = captured.getvalue()
            if user_stdout and len(stdout_lines) == 0:
                stdout_lines = user_stdout.strip().split("\\n")

            # Evaluate the expected value as a Python expression
            expected = eval(tc["expected"])

            passed = actual == expected
            results.append({
                "passed": passed,
                "description": tc["description"],
                "input": tc["input"],
                "expected": tc["expected"],
                "actual": repr(actual),
            })
        except Exception as e:
            _sys.stdout = old_stdout
            results.append({
                "passed": False,
                "description": tc["description"],
                "input": tc["input"],
                "expected": tc["expected"],
                "actual": "Erro: " + type(e).__name__ + ": " + str(e),
                "error": str(e),
            })

    return _json.dumps({"results": results, "stdout": stdout_lines})
`;

self.onmessage = async function (event) {
  const { type, code, testCases, id } = event.data;

  if (type === "preload") {
    try {
      await loadPyodideInWorker();
      self.postMessage({ id, type: "preloaded", success: true });
    } catch (error) {
      self.postMessage({
        id,
        type: "preloaded",
        success: false,
        error: error.message,
      });
    }
    return;
  }

  if (type === "run") {
    try {
      const py = await loadPyodideInWorker();

      // Pass user code and test cases to Python
      py.globals.set("__user_code_param", code);
      py.globals.set("__test_cases_param", JSON.stringify(testCases));

      const resultJson = py.runPython(
        "__run_challenge_tests(__user_code_param, __test_cases_param)"
      );
      const parsed = JSON.parse(resultJson);

      self.postMessage({
        id,
        type: "result",
        success: true,
        results: parsed.results,
        stdout: parsed.stdout,
      });
    } catch (error) {
      self.postMessage({
        id,
        type: "result",
        success: false,
        error: error.message,
      });
    }
  }
};
