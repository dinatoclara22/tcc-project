"use client";

import { useRouter } from "next/navigation";
import { Code2, BookOpen, Terminal, Zap, ArrowLeft } from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthLayoutProps {
  mode: AuthMode;
  children: React.ReactNode;
}

const highlights = [
  { icon: BookOpen, text: "Aulas estruturadas de Python" },
  { icon: Terminal, text: "Desafios com editor de código" },
  { icon: Zap, text: "Feedback instantâneo nos testes" },
];

const codeLines = [
  { tokens: [{ t: "def ", c: "#C4B5FD" }, { t: "boas_vindas", c: "#34D399" }, { t: "(nome):", c: "#E2E8F0" }] },
  { tokens: [{ t: "    msg = ", c: "#E2E8F0" }, { t: 'f"Olá, {nome}! ', c: "#FCD34D" }, { t: '🐍"', c: "#FCD34D" }] },
  { tokens: [{ t: "    return ", c: "#C4B5FD" }, { t: "msg", c: "#E2E8F0" }] },
  { tokens: [] },
  { tokens: [{ t: "print", c: "#34D399" }, { t: "(", c: "#E2E8F0" }, { t: 'boas_vindas("CodeUp")', c: "#F87171" }, { t: ")", c: "#E2E8F0" }] },
];

export function AuthLayout({ mode, children }: AuthLayoutProps) {
  const navigate = useRouter();
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ───── Left brand panel ───── */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] flex-col relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0F0F1A 0%, #1E1040 50%, #2D1B69 100%)" }}
      >
        <div className="absolute pointer-events-none" style={{ width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)", top: "-100px", right: "-80px" }} />
        <div className="absolute pointer-events-none" style={{ width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 65%)", bottom: "60px", left: "-60px" }} />
        <div className="absolute pointer-events-none" style={{ width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 65%)", bottom: "300px", right: "40px" }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col h-full px-10 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(167,139,250,0.3)" }}
            >
              <Code2 size={20} color="#C4B5FD" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Code<span style={{ color: "#A78BFA" }}>Up</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-10">
            {/* Headline */}
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.15,
                  marginBottom: "16px",
                  whiteSpace: "pre-line",
                }}
              >
                {isLogin ? "Bom te ver\nde volta 👋" : "Comece sua\njornada em Python"}
              </h2>
              <p style={{ color: "#A78BFA", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "320px" }}>
                {isLogin
                  ? "Continue de onde parou. Suas aulas e desafios estão esperando por você."
                  : "Crie sua conta gratuita e tenha acesso completo a aulas e desafios práticos."}
              </p>
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(167,139,250,0.2)" }}
                  >
                    <h.icon size={18} style={{ color: "#C4B5FD" }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#E2E8F0" }}>
                    {h.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Code snippet */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.2)", background: "rgba(15,15,26,0.6)" }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(124,58,237,0.15)", background: "rgba(26,26,46,0.8)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#4B5563", marginLeft: "8px" }}>
                  primeiro_programa.py
                </span>
              </div>
              <div className="px-5 py-4 space-y-1">
                {codeLines.map((line, i) => (
                  <div key={i} style={{ minHeight: "1.4rem" }}>
                    {line.tokens.map((tok, j) => (
                      <span key={j} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: tok.c, lineHeight: 1.8 }}>
                        {tok.t}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "#10B981" }}>
                    &gt; Olá, CodeUp! 🐍
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p style={{ color: "rgba(167,139,250,0.5)", fontSize: "0.72rem", fontFamily: "'Space Grotesk', sans-serif" }}>
            © 2026 CodeUp · Plataforma de aprendizagem de Python
          </p>
        </div>
      </div>

      {/* ───── Right form panel ───── */}
      <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: "#F8F7FF" }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-6 shrink-0">
          <button
            onClick={() => navigate.push("/")}
            className="flex items-center gap-2 transition-all hover:opacity-70"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#6B7280" }}
          >
            <ArrowLeft size={16} style={{ color: "#7C3AED" }} />
            Voltar
          </button>

          <div className="flex items-center gap-2">
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontFamily: "'Space Grotesk', sans-serif" }}>
              {isLogin ? "Não tem conta?" : "Já tem conta?"}
            </span>
            <button
              onClick={() => navigate.push(isLogin ? "/Cadastro" : "/Login")}
              className="px-4 py-2 rounded-xl transition-all hover:opacity-80"
              style={{
                background: "#F5F3FF",
                border: "1.5px solid rgba(124,58,237,0.2)",
                color: "#7C3AED",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
              }}
            >
              {isLogin ? "Cadastrar" : "Entrar"}
            </button>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-8 pb-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}>
                <Code2 size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0A0A0F", letterSpacing: "-0.02em" }}>
                Code<span style={{ color: "#7C3AED" }}>Up</span>
              </span>
            </div>

            {/* Card */}
            <div className="p-8 rounded-3xl" style={{ background: "#fff", border: "1px solid rgba(124,58,237,0.1)", boxShadow: "0 8px 40px rgba(124,58,237,0.08)" }}>
              {/* Card header */}
              <div className="mb-7">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
                  <Code2 size={22} color="#fff" strokeWidth={2.5} />
                </div>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#0A0A0F", letterSpacing: "-0.03em", marginBottom: "6px" }}>
                  {isLogin ? "Entrar na plataforma" : "Criar sua conta"}
                </h1>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.6 }}>
                  {isLogin
                    ? "Insira suas credenciais para acessar as aulas e desafios."
                    : "Preencha os dados abaixo para começar a aprender Python."}
                </p>
              </div>
              {children}
            </div>

            {/* Switch mode below card */}
            <p className="text-center mt-5" style={{ fontSize: "0.82rem", color: "#6B7280", fontFamily: "'Space Grotesk', sans-serif" }}>
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <button
                onClick={() => navigate.push(isLogin ? "/Cadastro" : "/Login")}
                style={{ color: "#7C3AED", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
              >
                {isLogin ? "Cadastre-se grátis" : "Fazer login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
