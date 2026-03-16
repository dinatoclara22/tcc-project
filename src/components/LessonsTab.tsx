"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { lessons, categories, type Lesson } from "../data/lessons";

const difficultyLabel: Record<string, string> = {
  Fundamentos: "Básico",
  "Estruturas de Dados": "Intermediário",
  POO: "Avançado",
  Algoritmos: "Avançado",
};

export function LessonsTab() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const filtered = lessons.filter((l) => {
    const matchCat =
      activeCategory === "Todas" || l.category === activeCategory;
    const matchSearch =
      search === "" ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = categories
    .slice(1)
    .reduce<Record<string, Lesson[]>>((acc, cat) => {
      const items = filtered.filter((l) => l.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});

  return (
    <div className="flex h-full">
      {/* Lesson list */}
      <div
        className={`flex flex-col transition-all duration-300 ${openLesson ? "hidden lg:flex lg:w-80 xl:w-96 shrink-0" : "w-full"}`}
        style={{
          borderRight: openLesson ? "1px solid rgba(124,58,237,0.1)" : "none",
        }}
      >
        {/* Filters */}
        <div
          className="p-5 space-y-4"
          style={{ borderBottom: "1px solid rgba(124,58,237,0.08)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{
              background: "#F5F3FF",
              border: "1px solid rgba(124,58,237,0.12)",
            }}
          >
            <Search size={15} style={{ color: "#A78BFA", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar aulas..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "0.875rem", color: "#374151" }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} style={{ color: "#9CA3AF" }} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-xl text-sm transition-all"
                style={{
                  background: activeCategory === cat ? "#7C3AED" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#6B7280",
                  border: `1px solid ${activeCategory === cat ? "#7C3AED" : "#E5E7EB"}`,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {Object.keys(grouped).length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <BookOpen size={32} style={{ color: "#DDD6FE" }} />
              <p
                style={{
                  color: "#9CA3AF",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Nenhuma aula encontrada
              </p>
            </div>
          )}
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-1 h-4 rounded-full"
                  style={{
                    background: items[0]?.categoryColor ?? "#7C3AED",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#374151",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded-md"
                  style={{
                    background: "#F3F4F6",
                    color: "#9CA3AF",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  {items.length}
                </span>
              </div>

              <div className="space-y-2">
                {items.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setOpenLesson(lesson);
                      setExpandedSection(0);
                    }}
                    className="w-full text-left p-4 rounded-2xl transition-all group"
                    style={{
                      background:
                        openLesson?.id === lesson.id ? "#F5F3FF" : "#fff",
                      border: `1px solid ${openLesson?.id === lesson.id ? "rgba(124,58,237,0.25)" : "rgba(0,0,0,0.06)"}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${lesson.categoryColor}15` }}
                      >
                        <BookOpen
                          size={17}
                          style={{ color: lesson.categoryColor }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color:
                              openLesson?.id === lesson.id
                                ? "#7C3AED"
                                : "#111827",
                          }}
                        >
                          {lesson.title}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#6B7280",
                            marginTop: "2px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock size={11} style={{ color: "#9CA3AF" }} />
                            <span
                              style={{ fontSize: "0.68rem", color: "#9CA3AF" }}
                            >
                              {lesson.duration}
                            </span>
                          </div>
                          <span
                            className="px-1.5 py-0.5 rounded"
                            style={{
                              background: `${lesson.categoryColor}15`,
                              color: lesson.categoryColor,
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {difficultyLabel[lesson.category]}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        style={{
                          color:
                            openLesson?.id === lesson.id
                              ? "#7C3AED"
                              : "#D1D5DB",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson content panel */}
      {openLesson && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Content header */}
          <div
            className="flex items-center gap-4 px-6 py-4 shrink-0"
            style={{
              borderBottom: "1px solid rgba(124,58,237,0.08)",
              background: "#fff",
            }}
          >
            <button
              onClick={() => setOpenLesson(null)}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 lg:flex"
              style={{ background: "#F5F3FF", border: "1px solid #DDD6FE" }}
            >
              <X size={15} style={{ color: "#7C3AED" }} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded-lg"
                  style={{
                    background: `${openLesson.categoryColor}15`,
                    color: openLesson.categoryColor,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {openLesson.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock size={11} style={{ color: "#9CA3AF" }} />
                  <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                    {openLesson.duration}
                  </span>
                </div>
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#0A0A0F",
                  letterSpacing: "-0.02em",
                  marginTop: "2px",
                }}
              >
                {openLesson.title}
              </h2>
            </div>
          </div>

          {/* Content body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
              {/* Intro */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "#F5F3FF",
                  border: "1px solid rgba(124,58,237,0.15)",
                }}
              >
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                  }}
                >
                  {openLesson.content.intro}
                </p>
              </div>

              {/* Sections */}
              {openLesson.content.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    background: "#fff",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() =>
                      setExpandedSection(expandedSection === idx ? null : idx)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${openLesson.categoryColor}15` }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            color: openLesson.categoryColor,
                          }}
                        >
                          {idx + 1}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "#0A0A0F",
                        }}
                      >
                        {section.subtitle}
                      </span>
                    </div>
                    {expandedSection === idx ? (
                      <ChevronUp size={16} style={{ color: "#9CA3AF" }} />
                    ) : (
                      <ChevronDown size={16} style={{ color: "#9CA3AF" }} />
                    )}
                  </button>

                  {expandedSection === idx && (
                    <div className="px-5 pb-5 space-y-4">
                      <p
                        style={{
                          color: "#4B5563",
                          fontSize: "0.875rem",
                          lineHeight: 1.75,
                          borderTop: "1px solid #F3F4F6",
                          paddingTop: "16px",
                        }}
                      >
                        {section.text}
                      </p>
                      {section.code && (
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{ background: "#0F0F1A" }}
                        >
                          {/* Code header */}
                          <div
                            className="flex items-center gap-2 px-4 py-2.5"
                            style={{
                              background: "#1A1A2E",
                              borderBottom: "1px solid rgba(124,58,237,0.15)",
                            }}
                          >
                            <div className="flex gap-1.5">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: "#EF4444" }}
                              />
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: "#F59E0B" }}
                              />
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: "#10B981" }}
                              />
                            </div>
                            <span
                              style={{
                                color: "#6B7280",
                                fontSize: "0.7rem",
                                fontFamily: "'JetBrains Mono', monospace",
                                marginLeft: "8px",
                              }}
                            >
                              exemplo.py
                            </span>
                          </div>
                          <pre
                            className="px-5 py-4 overflow-x-auto"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.8rem",
                              lineHeight: "1.7",
                              color: "#E2E8F0",
                              margin: 0,
                            }}
                          >
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state when no lesson selected */}
      {!openLesson && filtered.length > 0 && <></>}
    </div>
  );
}
