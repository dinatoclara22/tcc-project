"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Code2, ArrowLeft, Home, BookOpen, Terminal } from "lucide-react";

export function NotFoundPage() {
  const navigate = useRouter();
  const [pathname, setPathname] = useState("/??");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8F7FF" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
          boxShadow: "0 1px 12px rgba(124,58,237,0.05)",
        }}
      >
        <button
          onClick={() => navigate.push("/")}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
          >
            <Code2 size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#0A0A0F",
              letterSpacing: "-0.02em",
            }}
          >
            Code<span style={{ color: "#7C3AED" }}>Up</span>
          </span>
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center text-center max-w-lg w-full gap-8">

          {/* 404 visual */}
          <div className="relative select-none">
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, #7C3AED, #4F46E5)" }}
            />

            {/* Big 404 */}
            <div className="relative flex items-end gap-2 leading-none">
              {["4", "0", "4"].map((digit, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-3xl"
                  style={{
                    width: digit === "0" ? "120px" : "88px",
                    height: digit === "0" ? "120px" : "88px",
                    background:
                      digit === "0"
                        ? "linear-gradient(135deg, #7C3AED, #4F46E5)"
                        : i === 0
                        ? "#fff"
                        : "#fff",
                    border:
                      digit === "0"
                        ? "none"
                        : "2px solid rgba(124,58,237,0.15)",
                    boxShadow:
                      digit === "0"
                        ? "0 8px 32px rgba(124,58,237,0.35)"
                        : "0 2px 12px rgba(124,58,237,0.07)",
                  }}
                >
                  {digit === "0" ? (
                    <Code2 size={40} color="#fff" strokeWidth={2} />
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "3rem",
                        fontWeight: 800,
                        color: "#7C3AED",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {digit}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3">
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#0A0A0F",
                letterSpacing: "-0.03em",
              }}
            >
              Página não encontrada
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6B7280",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              A rota que você tentou acessar não existe ou foi removida.
              Verifique o endereço ou volte para uma página conhecida.
            </p>
          </div>

          {/* Code block decoration */}
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden text-left"
            style={{
              background: "#0F0F1A",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                background: "#1A1A2E",
                borderBottom: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
              </div>
              <span
                style={{
                  color: "#52525B",
                  fontSize: "0.7rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginLeft: "6px",
                }}
              >
                erro.py
              </span>
            </div>
            <pre
              className="px-5 py-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                lineHeight: 1.8,
                margin: 0,
                overflowX: "auto",
              }}
            >
              <code>
                <span style={{ color: "#F87171" }}>raise</span>
                <span style={{ color: "#E2E8F0" }}> </span>
                <span style={{ color: "#C4B5FD" }}>PageNotFoundError</span>
                <span style={{ color: "#E2E8F0" }}>(</span>
                {"\n"}
                <span style={{ color: "#E2E8F0" }}>{"  "}</span>
                <span style={{ color: "#34D399" }}>"Rota não mapeada: </span>
                <span style={{ color: "#A78BFA" }}>{pathname}</span>
                <span style={{ color: "#34D399" }}>"</span>
                {"\n"}
                <span style={{ color: "#E2E8F0" }}>)</span>
              </code>
            </pre>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <button
              onClick={() => navigate.push("/")}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl transition-all hover:opacity-80 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
              }}
            >
              <Home size={16} />
              Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <NotFoundPage />;
}