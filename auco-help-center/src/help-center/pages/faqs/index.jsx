// ─────────────────────────────────────────────────────────────
// pages/faqs/index.jsx — Listado completo de preguntas frecuentes
//
// Funcionalidades:
//   - Búsqueda en tiempo real por pregunta y respuesta
//   - Filtro por categoría (pills clickeables)
//   - Acordeones individuales con FAQItem
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Layout from "../../components/Layout";
import FAQItem from "../../components/FAQItem";
import SearchBar from "../../components/SearchBar";
import { colors, typography, radius, styles } from "../../styles/theme";
import faqs from "../../content/faqs.json";

// ── Cabecera de sección reutilizable ─────────────────────────
function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: `1px solid ${colors.border}` }}>
      <h1
        style={{
          color: colors.text,
          fontSize: typography.xl,
          fontWeight: typography.bold,
          margin: "0 0 6px",
          fontFamily: typography.fontFamily,
          letterSpacing: "-0.2px",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: colors.textMuted,
          fontSize: typography.base,
          margin: 0,
          fontFamily: typography.fontFamily,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default function FAQsPage({ setPage }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Obtiene categorías únicas del JSON + "Todos" al inicio
  const categories = ["Todos", ...new Set(faqs.map((f) => f.category))];

  // Aplica filtro de categoría y búsqueda simultáneamente
  const filtered = faqs.filter((f) => {
    const matchesCategory =
      activeCategory === "Todos" || f.category === activeCategory;
    const matchesSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout currentPage="faqs" onNavigate={setPage}>
      <PageHeader
        title="Preguntas frecuentes"
        subtitle="Respuestas a los problemas y dudas más comunes de la plataforma."
      />

      {/* ── Barra de búsqueda ── */}
      <div style={{ marginBottom: "20px" }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por pregunta o palabra clave..."
        />
      </div>

      {/* ── Pills de categoría ── */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: radius.full,
                border: `1.5px solid ${isActive ? colors.primary : colors.border}`,
                background: isActive ? colors.primary : colors.white,
                color: isActive ? colors.white : colors.textMuted,
                cursor: "pointer",
                fontSize: typography.sm,
                fontWeight: isActive ? typography.semibold : typography.regular,
                fontFamily: typography.fontFamily,
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Lista de FAQs ── */}
      {filtered.length === 0 ? (
        <div
          style={{
            ...styles.card,
            padding: "60px 40px",
            textAlign: "center",
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
            fontSize: typography.base,
          }}
        >
          No se encontraron preguntas con ese criterio. Intenta con otra búsqueda o categoría.
        </div>
      ) : (
        <div>
          {/* Conteo de resultados */}
          <p
            style={{
              color: colors.textLight,
              fontSize: typography.sm,
              fontFamily: typography.fontFamily,
              marginBottom: "14px",
            }}
          >
            {filtered.length} pregunta{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "Todos" ? ` en "${activeCategory}"` : ""}
          </p>

          {filtered.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
