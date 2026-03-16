"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Code2,
  Play,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  CheckCircle,
  X,
  Search,
  BookOpen,
  Loader2,
} from "lucide-react";
import { challenges, challengeCategories, difficultyLevels, type Challenge } from "../data/challenges";
import { preloadPyodide, runTests, type RunResult } from "../lib/pyodide-runner";

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  Básico: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
  Intermediário: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  Avançado: { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA" },
};

type OutputLine = { text: string; type: string };

function generateOutputLines(result: RunResult): OutputLine[] {
  const lines: OutputLine[] = [
    { text: ">>> Executando testes...", type: "info" },
  ];

  result.results.forEach((r, i) => {
    if (r.passed) {
      lines.push({ text: `✓ Teste ${i + 1}: ${r.description} — PASSOU`, type: "success" });
    } else {
      lines.push({ text: `✗ Teste ${i + 1}: ${r.description} — FALHOU`, type: "error" });
      if (r.error) {
        lines.push({ text: `  ${r.actual}`, type: "error" });
      } else {
        lines.push({ text: `  Esperado: ${r.expected}`, type: "error" });
        lines.push({ text: `  Obtido:   ${r.actual}`, type: "error" });
      }
    }
  });

  lines.push({ text: "", type: "info" });

  if (result.allPassed) {
    lines.push({ text: "✅ Todos os testes passaram!", type: "success" });
  } else {
    lines.push({
      text: `❌ ${result.passCount} de ${result.totalCount} testes passaram. Revise sua solução.`,
      type: "error",
    });
  }

  // Append captured stdout if present
  if (result.stdout.length > 0) {
    lines.push({ text: "", type: "info" });
    lines.push({ text: ">>> Saída do programa:", type: "info" });
    result.stdout.forEach((line) => {
      lines.push({ text: "  " + line, type: "info" });
    });
  }

  return lines;
}

export function ChallengesTab() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeDifficulty, setActiveDifficulty] = useState("Todas");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<OutputLine[] | null>(null);
  const [running, setRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [showHint, setShowHint] = useState<number | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<"cases" | "output">("cases");
  const [solved, setSolved] = useState<Set<number>>(new Set());

  // Preload Pyodide in the background
  useEffect(() => {
    setPyodideStatus("loading");
    preloadPyodide()
      .then(() => setPyodideStatus("ready"))
      .catch(() => setPyodideStatus("error"));
  }, []);

  const filtered = challenges.filter((c) => {
    const matchCat = activeCategory === "Todas" || c.category === activeCategory;
    const matchDiff = activeDifficulty === "Todas" || c.difficulty === activeDifficulty;
    const matchSearch =
      search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const handleSelect = (c: Challenge) => {
    setSelected(c);
    setCode(c.starterCode);
    setOutput(null);
    setShowHint(null);
    setActiveOutputTab("cases");
  };

  const handleRun = useCallback(async () => {
    if (!selected) return;
    setRunning(true);
    setActiveOutputTab("output");
    setOutput([{ text: pyodideStatus !== "ready" ? ">>> Carregando Python (primeira vez pode demorar)..." : ">>> Executando testes...", type: "info" }]);

    try {
      const result = await runTests(code, selected.testCases);
      const lines = generateOutputLines(result);
      setOutput(lines);

      if (result.allPassed) {
        setSolved((prev) => new Set([...prev, selected.id]));
      }
    } catch (error) {
      setOutput([
        { text: ">>> Executando testes...", type: "info" },
        { text: "", type: "info" },
        { text: `❌ ${error instanceof Error ? error.message : "Erro desconhecido"}`, type: "error" },
      ]);
    } finally {
      setRunning(false);
    }
  }, [selected, code, pyodideStatus]);

  const handleReset = () => {
    if (selected) setCode(selected.starterCode);
    setOutput(null);
    setShowHint(null);
    setActiveOutputTab("cases");
  };

  const allPassed = output?.some((l) => l.text.includes("Todos os testes passaram"));

  return (
    <div className="flex h-full">
      {/* Challenge list sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ${selected ? "hidden lg:flex lg:w-80 xl:w-96 shrink-0" : "w-full"}`}
        style={{ borderRight: selected ? "1px solid rgba(124,58,237,0.1)" : "none" }}
      >
        {/* Filters */}
        <div className="p-5 space-y-3" style={{ borderBottom: "1px solid rgba(124,58,237,0.08)" }}>
          {/* Search */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ background: "#F5F3FF", border: "1px solid rgba(124,58,237,0.12)" }}
          >
            <Search size={15} style={{ color: "#A78BFA", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar desafios..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "0.875rem", color: "#374151" }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} style={{ color: "#9CA3AF" }} />
              </button>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-1.5">
            {challengeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-xl transition-all"
                style={{
                  background: activeCategory === cat ? "#7C3AED" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#6B7280",
                  border: `1px solid ${activeCategory === cat ? "#7C3AED" : "#E5E7EB"}`,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex flex-wrap gap-1.5">
            {difficultyLevels.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(d)}
                className="px-3 py-1.5 rounded-xl transition-all"
                style={{
                  background:
                    activeDifficulty === d
                      ? d === "Todas"
                        ? "#0A0A0F"
                        : difficultyColors[d]?.bg ?? "#F3F4F6"
                      : "#F9FAFB",
                  color:
                    activeDifficulty === d
                      ? d === "Todas"
                        ? "#fff"
                        : difficultyColors[d]?.text ?? "#374151"
                      : "#9CA3AF",
                  border: `1px solid ${activeDifficulty === d ? (d === "Todas" ? "#0A0A0F" : difficultyColors[d]?.border ?? "#E5E7EB") : "#F3F4F6"}`,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Code2 size={32} style={{ color: "#DDD6FE" }} />
              <p style={{ color: "#9CA3AF", fontFamily: "'Space Grotesk', sans-serif" }}>
                Nenhum desafio encontrado
              </p>
            </div>
          )}
          {filtered.map((c) => {
            const diff = difficultyColors[c.difficulty];
            const isSolved = solved.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className="w-full text-left p-4 rounded-2xl transition-all"
                style={{
                  background: selected?.id === c.id ? "#F5F3FF" : "#fff",
                  border: `1px solid ${selected?.id === c.id ? "rgba(124,58,237,0.25)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: isSolved ? "#ECFDF5" : `${c.categoryColor}15`,
                    }}
                  >
                    {isSolved ? (
                      <CheckCircle size={18} style={{ color: "#10B981" }} />
                    ) : (
                      <Code2 size={17} style={{ color: c.categoryColor }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        color: selected?.id === c.id ? "#7C3AED" : "#111827",
                      }}
                    >
                      {c.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-lg"
                        style={{
                          background: diff.bg,
                          color: diff.text,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk', sans-serif",
                          border: `1px solid ${diff.border}`,
                        }}
                      >
                        {c.difficulty}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-lg"
                        style={{
                          background: `${c.categoryColor}12`,
                          color: c.categoryColor,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {c.category}
                      </span>
                      {isSolved && (
                        <span style={{ color: "#10B981", fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                          ✓ Resolvido
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <BookOpen size={10} style={{ color: "#9CA3AF" }} />
                      <span style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>
                        Relacionado: {c.relatedLesson}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code editor panel */}
      {selected && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <div
            className="flex items-center justify-between gap-4 px-5 py-3 shrink-0 flex-wrap"
            style={{ background: "#fff", borderBottom: "1px solid rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center lg:flex"
                style={{ background: "#F5F3FF", border: "1px solid #DDD6FE" }}
              >
                <X size={15} style={{ color: "#7C3AED" }} />
              </button>
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#0A0A0F",
                  }}
                >
                  {selected.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{
                      background: difficultyColors[selected.difficulty].bg,
                      color: difficultyColors[selected.difficulty].text,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {selected.difficulty}
                  </span>
                  <span style={{ color: "#9CA3AF", fontSize: "0.7rem" }}>
                    {selected.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  color: "#6B7280",
                  fontSize: "0.78rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                }}
              >
                <RotateCcw size={13} />
                Resetar
              </button>
              {pyodideStatus === "loading" && (
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "#A78BFA", fontSize: "0.7rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  <Loader2 size={12} className="animate-spin" />
                  Carregando Python...
                </span>
              )}
              {pyodideStatus === "error" && (
                <span
                  style={{ color: "#F87171", fontSize: "0.7rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  Erro ao carregar Python
                </span>
              )}
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  background: running ? "rgba(124,58,237,0.6)" : "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                }}
              >
                {running ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Executando...
                  </>
                ) : (
                  <>
                    <Play size={13} fill="#fff" />
                    Executar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main editor area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: description + hints */}
            <div
              className="w-72 shrink-0 overflow-y-auto hidden lg:block"
              style={{ borderRight: "1px solid rgba(124,58,237,0.08)", background: "#FAFAFA" }}
            >
              <div className="p-5 space-y-4">
                {/* Description */}
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "#fff", border: "1px solid rgba(124,58,237,0.1)" }}
                >
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "#374151",
                      lineHeight: 1.75,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {selected.description}
                  </p>
                </div>

                {/* Related lesson */}
                <div
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: "#F5F3FF", border: "1px solid rgba(124,58,237,0.15)" }}
                >
                  <BookOpen size={13} style={{ color: "#7C3AED" }} />
                  <span style={{ fontSize: "0.72rem", color: "#7C3AED", fontWeight: 600 }}>
                    Revise: <strong>{selected.relatedLesson}</strong>
                  </span>
                </div>

                {/* Hints */}
                {selected.hints.length > 0 && (
                  <div>
                    <p
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "#9CA3AF",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "0.05em",
                        marginBottom: "8px",
                      }}
                    >
                      DICAS
                    </p>
                    {selected.hints.map((hint, i) => (
                      <div key={i} className="mb-2">
                        <button
                          onClick={() => setShowHint(showHint === i ? null : i)}
                          className="w-full flex items-center gap-2 p-3 rounded-xl text-left"
                          style={{
                            background: showHint === i ? "#FFFBEB" : "#fff",
                            border: `1px solid ${showHint === i ? "#FDE68A" : "#F3F4F6"}`,
                          }}
                        >
                          <Lightbulb size={12} style={{ color: "#F59E0B", flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              color: "#374151",
                              flex: 1,
                            }}
                          >
                            Dica {i + 1}
                          </span>
                          <ChevronDown
                            size={12}
                            style={{
                              color: "#9CA3AF",
                              transform: showHint === i ? "rotate(180deg)" : "none",
                              transition: "transform 0.2s",
                            }}
                          />
                        </button>
                        {showHint === i && (
                          <div
                            className="px-3 py-2.5 rounded-b-xl -mt-1"
                            style={{ background: "#FFFBEB", borderLeft: "1px solid #FDE68A", borderRight: "1px solid #FDE68A", borderBottom: "1px solid #FDE68A" }}
                          >
                            <p style={{ fontSize: "0.75rem", color: "#6B7280", lineHeight: 1.6 }}>
                              {hint}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Editor + output */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Code editor */}
              <div className="flex-1 flex flex-col" style={{ background: "#0F0F1A", minHeight: "200px" }}>
                {/* Editor header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 shrink-0"
                  style={{ background: "#1A1A2E", borderBottom: "1px solid rgba(124,58,237,0.15)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
                  </div>
                  <span
                    style={{
                      color: "#52525B",
                      fontSize: "0.72rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      marginLeft: "8px",
                    }}
                  >
                    solucao.py
                  </span>
                  {allPassed && (
                    <div className="ml-auto flex items-center gap-1.5">
                      <CheckCircle size={13} style={{ color: "#10B981" }} />
                      <span style={{ color: "#10B981", fontSize: "0.72rem", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Resolvido!
                      </span>
                    </div>
                  )}
                </div>

                {/* Textarea */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Line numbers */}
                  <div
                    className="w-10 shrink-0 pt-4 pb-4 text-right overflow-hidden"
                    style={{ background: "#1A1A2E", borderRight: "1px solid rgba(124,58,237,0.1)" }}
                  >
                    {code.split("\n").map((_, i) => (
                      <div
                        key={i}
                        style={{
                          color: "#4B5563",
                          fontSize: "0.72rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          lineHeight: "1.6rem",
                          paddingRight: "10px",
                          userSelect: "none",
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 resize-none outline-none px-4 pt-4 pb-4"
                    style={{
                      background: "transparent",
                      color: "#E2E8F0",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
                      lineHeight: "1.6rem",
                      caretColor: "#8B5CF6",
                    }}
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Output panel */}
              <div
                className="shrink-0"
                style={{ background: "#0A0A0F", borderTop: "1px solid rgba(124,58,237,0.2)", height: "200px", display: "flex", flexDirection: "column" }}
              >
                <div
                  className="flex items-center gap-1 px-4 pt-2 shrink-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {(["cases", "output"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveOutputTab(tab)}
                      className="px-3 py-1.5 text-xs"
                      style={{
                        color: activeOutputTab === tab ? "#A78BFA" : "#6B7280",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        borderBottom: activeOutputTab === tab ? "2px solid #7C3AED" : "2px solid transparent",
                      }}
                    >
                      {tab === "cases" ? "Casos de Teste" : "Saída"}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3">
                  {activeOutputTab === "cases" ? (
                    <div className="space-y-2">
                      {selected.testCases.map((tc, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2.5 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <span style={{ fontSize: "0.6rem", color: "#6B7280", fontWeight: 700 }}>{i + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <code style={{ color: "#C4B5FD", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>
                              {tc.input}
                            </code>
                            <span style={{ color: "#4B5563", fontSize: "0.72rem" }}> → </span>
                            <code style={{ color: "#34D399", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>
                              {tc.expected}
                            </code>
                          </div>
                          <span style={{ color: "#6B7280", fontSize: "0.68rem" }}>{tc.description}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      {output ? (
                        output.map((line, i) => (
                          <p
                            key={i}
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.78rem",
                              lineHeight: 1.7,
                              color:
                                line.type === "success"
                                  ? "#34D399"
                                  : line.type === "error"
                                  ? "#F87171"
                                  : "#52525B",
                            }}
                          >
                            {line.text || "\u00A0"}
                          </p>
                        ))
                      ) : (
                        <p style={{ color: "#4B5563", fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace" }}>
                          Clique em "Executar" para ver o resultado...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}