"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, BookOpen, Terminal, ArrowLeft } from "lucide-react";
import { LessonsTab } from "../../components/LessonsTab";
import { ChallengesTab } from "../../components/ChallengesTab";

type Tab = "aulas" | "desafios";

export default function PlatformPage() {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("aulas");

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8F7FF" }}
    >
      {/* ───── Header ───── */}
      <header
        className="shrink-0 flex items-center justify-between px-6 py-4"
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
          boxShadow: "0 1px 12px rgba(124,58,237,0.05)",
        }}
      >
        {/* Logo + back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate.push("/")}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-purple-50"
            style={{ border: "1px solid rgba(124,58,237,0.15)" }}
            title="Voltar para Home"
          >
            <ArrowLeft size={15} style={{ color: "#7C3AED" }} />
          </button>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
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
        </div>

        {/* Tab switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-2xl"
          style={{ background: "#F3F4F6", border: "1px solid rgba(124,58,237,0.08)" }}
        >
          <button
            onClick={() => setActiveTab("aulas")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: activeTab === "aulas" ? "#fff" : "transparent",
              boxShadow: activeTab === "aulas" ? "0 1px 8px rgba(124,58,237,0.12)" : "none",
              color: activeTab === "aulas" ? "#7C3AED" : "#6B7280",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            <BookOpen size={16} />
            Aulas
          </button>
          <button
            onClick={() => setActiveTab("desafios")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: activeTab === "desafios" ? "#fff" : "transparent",
              boxShadow: activeTab === "desafios" ? "0 1px 8px rgba(124,58,237,0.12)" : "none",
              color: activeTab === "desafios" ? "#7C3AED" : "#6B7280",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Terminal size={16} />
            Desafios
          </button>
        </div>

        {/* Right tag */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: "#F5F3FF", border: "1px solid rgba(124,58,237,0.15)" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }} />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#7C3AED",
            }}
          >
            Python · Trilha Completa
          </span>
        </div>
      </header>

      {/* ───── Sub-header ───── */}
      <div
        className="shrink-0 px-6 py-3 flex items-center gap-3"
        style={{ background: "#fff", borderBottom: "1px solid rgba(124,58,237,0.06)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: activeTab === "aulas" ? "#EDE9FE" : "#FEF3C7" }}
        >
          {activeTab === "aulas"
            ? <BookOpen size={14} style={{ color: "#7C3AED" }} />
            : <Terminal size={14} style={{ color: "#D97706" }} />
          }
        </div>
        <div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#0A0A0F" }}>
            {activeTab === "aulas" ? "Aulas de Python" : "Desafios de Programação"}
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "0.78rem", marginLeft: "8px" }}>
            {activeTab === "aulas"
              ? "Selecione uma aula para ver o conteúdo"
              : "Escolha um desafio e escreva sua solução"}
          </span>
        </div>
      </div>

      {/* ───── Content ───── */}
      <div className="flex-1 overflow-hidden" style={{ height: "calc(100vh - 113px)" }}>
        {activeTab === "aulas" ? <LessonsTab /> : <ChallengesTab />}
      </div>
    </div>
  );
}
