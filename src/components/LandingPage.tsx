"use client";

import { BookOpen, Terminal, ArrowRight, Code2, Zap, Target, ChevronRight } from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
}

const features = [
  {
    icon: BookOpen,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "rgba(124,58,237,0.15)",
    title: "Aulas Estruturadas",
    description:
      "Conteúdo didático dividido por tópicos — de variáveis até algoritmos avançados — com exemplos de código comentados e prontos para testar.",
  },
  {
    icon: Terminal,
    color: "#D97706",
    bg: "#FFFBEB",
    border: "rgba(217,119,6,0.15)",
    title: "Desafios Práticos",
    description:
      "Exercícios com editor de código integrado, casos de teste automáticos e dicas para quando você travar. Aprenda fazendo.",
  },
  {
    icon: Zap,
    color: "#0EA5E9",
    bg: "#F0F9FF",
    border: "rgba(14,165,233,0.15)",
    title: "Feedback Instantâneo",
    description:
      "Saiba imediatamente se sua solução está certa. Veja quais testes passaram, quais falharam e como melhorar.",
  },
  {
    icon: Target,
    color: "#10B981",
    bg: "#ECFDF5",
    border: "rgba(16,185,129,0.15)",
    title: "Trilha Completa",
    description:
      "Do zero ao avançado: Fundamentos, Estruturas de Dados, Orientação a Objetos e Algoritmos — tudo em um só lugar.",
  },
];

const topics = [
  "Variáveis & Tipos",
  "Operadores",
  "Condicionais",
  "Loops",
  "Funções",
  "Listas",
  "Dicionários",
  "Sets & Tuplas",
  "Classes & Objetos",
  "Herança",
  "Recursão",
  "Algoritmos",
];

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div
      className="min-h-screen overflow-y-auto"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8F7FF" }}
    >
      {/* ───── Nav ───── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(124,58,237,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
          >
            <Code2 size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#0A0A0F",
              letterSpacing: "-0.02em",
            }}
          >
            Code<span style={{ color: "#7C3AED" }}>Up</span>
          </span>
        </div>

        <button
          onClick={onEnter}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
          }}
        >
          Acessar plataforma
          <ArrowRight size={15} />
        </button>
      </nav>

      {/* ───── Hero ───── */}
      <section className="px-6 pt-20 pb-16 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "#F5F3FF",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#7C3AED",
              }}
            >
              Plataforma de aprendizagem de Python
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 800,
            color: "#0A0A0F",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Aprenda Python de forma{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            prática e direta
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#4B5563",
            lineHeight: 1.75,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          O <strong style={{ color: "#0A0A0F" }}>CodeUp</strong> é uma plataforma minimalista que
          combina aulas teóricas com desafios de código para estudantes de T.I. Aprenda, pratique
          e evolua em Python — sem distrações.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onEnter}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl transition-all hover:opacity-90 active:scale-95 w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
            }}
          >
            <BookOpen size={18} />
            Ver aulas de Python
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onEnter}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl transition-all hover:bg-white active:scale-95 w-full sm:w-auto"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(124,58,237,0.2)",
              color: "#374151",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            <Terminal size={18} style={{ color: "#7C3AED" }} />
            Resolver desafios
          </button>
        </div>
      </section>

      {/* ───── Preview mockup ───── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            border: "1px solid rgba(124,58,237,0.15)",
            boxShadow: "0 24px 80px rgba(124,58,237,0.15)",
          }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{
              background: "#1A1A2E",
              borderBottom: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
            </div>
            <div
              className="flex-1 mx-3 flex items-center justify-center"
            >
              <div
                className="px-4 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#6B7280",
                  }}
                >
                  codeup.edu.br
                </span>
              </div>
            </div>
          </div>

          {/* Fake content preview */}
          <div
            className="flex"
            style={{ background: "#0F0F1A", minHeight: "320px" }}
          >
            {/* Sidebar */}
            <div
              className="w-64 p-4 space-y-2 hidden sm:block"
              style={{ borderRight: "1px solid rgba(124,58,237,0.1)" }}
            >
              <div className="h-7 rounded-lg mb-4" style={{ background: "rgba(255,255,255,0.06)", width: "70%" }} />
              {[100, 85, 90, 75, 88].map((w, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl"
                  style={{
                    background: i === 0 ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                    border: i === 0 ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0"
                    style={{ background: i === 0 ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)" }}
                  />
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-2 rounded"
                      style={{ background: "rgba(255,255,255,0.1)", width: `${w}%` }}
                    />
                    <div
                      className="h-1.5 rounded"
                      style={{ background: "rgba(255,255,255,0.05)", width: `${w * 0.6}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Code area */}
            <div className="flex-1 p-5 space-y-3">
              <div className="h-5 rounded" style={{ background: "rgba(124,58,237,0.2)", width: "40%" }} />
              <div className="space-y-1.5 mt-4">
                {[
                  { indent: 0, color: "#C4B5FD", w: "55%" },
                  { indent: 1, color: "#34D399", w: "70%" },
                  { indent: 1, color: "#34D399", w: "50%" },
                  { indent: 0, color: "#C4B5FD", w: "40%" },
                  { indent: 1, color: "#FCD34D", w: "65%" },
                  { indent: 1, color: "#FCD34D", w: "45%" },
                  { indent: 0, color: "rgba(255,255,255,0.1)", w: "0%" },
                  { indent: 0, color: "#F87171", w: "60%" },
                  { indent: 1, color: "#E2E8F0", w: "80%" },
                ].map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{ paddingLeft: `${line.indent * 20}px` }}
                  >
                    <div
                      className="h-2 rounded"
                      style={{ background: line.color, width: line.w, opacity: 0.7 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Topics belt ───── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <p
          className="text-center mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          O que você vai aprender
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-4 py-2 rounded-xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(124,58,237,0.12)",
                color: "#374151",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.82rem",
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              color: "#0A0A0F",
              letterSpacing: "-0.03em",
              marginBottom: "12px",
            }}
          >
            Uma plataforma, dois modos de aprender
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.95rem", maxWidth: "460px", margin: "0 auto", lineHeight: 1.75 }}>
            Leia, entenda a teoria e já pratique com desafios reais de código.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl"
              style={{
                background: "#fff",
                border: `1px solid ${f.border}`,
              }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: f.bg }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#0A0A0F",
                  marginBottom: "8px",
                }}
              >
                {f.title}
              </h3>
              <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA bottom ───── */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div
          className="rounded-3xl px-8 py-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B69 100%)",
          }}
        >
          {/* decorative circles */}
          <div
            className="absolute"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
              top: "-100px",
              right: "-50px",
              pointerEvents: "none",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
              bottom: "-60px",
              left: "10%",
              pointerEvents: "none",
            }}
          />

          <div className="relative z-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)" }}
            >
              <Code2 size={28} color="#C4B5FD" strokeWidth={2} />
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Pronto para começar?
            </h2>
            <p style={{ color: "#A78BFA", fontSize: "1rem", marginBottom: "32px", lineHeight: 1.7 }}>
              Acesse as aulas, resolva os desafios e domine Python.
            </p>
            <button
              onClick={onEnter}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
              }}
            >
              Entrar na plataforma
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer
        className="px-6 py-6 text-center"
        style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
          >
            <Code2 size={12} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#0A0A0F",
            }}
          >
            Code<span style={{ color: "#7C3AED" }}>Up</span>
          </span>
        </div>
        <p style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
          Plataforma de aprendizagem de Python para estudantes universitários de T.I.
        </p>
      </footer>
    </div>
  );
}