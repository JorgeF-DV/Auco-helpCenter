// ─────────────────────────────────────────────────────────────
// pages/faqs/index.jsx — Listado completo de preguntas frecuentes
//
// Funcionalidades:
//   - Búsqueda en tiempo real por pregunta y respuesta
//   - Filtro por categoría (pills clickeables)
//   - Acordeones individuales con FAQItem
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import FAQItem from "../../components/FAQItem";
import SearchBar from "../../components/SearchBar";
import { colors, typography, styles, getBackButtonStyle, getPillButtonStyle, pageStyles } from "../../styles/theme";
import faqs from "../../content/faqs.json";
import { normalizeText } from "../../utils/search";
import { filterFaqs } from "../../content/selectors";

// ── Cabecera de sección reutilizable ─────────────────────────
function PageHeader({ title, subtitle }) {
  return (
    <div style={pageStyles.sectionHeader}>
      <h1 style={pageStyles.sectionTitle}>
        {title}
      </h1>
      <p style={pageStyles.sectionSubtitle}>
        {subtitle}
      </p>
    </div>
  );
}

export default function FAQsPage({ setPage, initialSearch, clearSelection }) {
  const [search, setSearch] = useState(initialSearch || "");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const normalizedSearch = useMemo(() => normalizeText(search), [search]);

  useEffect(() => {
    return () => {
      if (clearSelection) clearSelection();
    };
  }, [clearSelection]);

  // Obtiene categorías únicas del JSON + "Todos" al inicio
  const categories = ["Todos", ...new Set(faqs.map((f) => f.category))];

  // Aplica filtro de categoría y búsqueda simultáneamente
  const filtered = useMemo(() => {
    return filterFaqs(faqs, {
      search: normalizedSearch,
      activeCategory,
    });
  }, [activeCategory, normalizedSearch]);

  return (
    <Layout onNavigate={setPage}>
      <button
        onClick={() => setPage("home")}
        style={backButtonStyle}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver a inicio
      </button>

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
              style={getPillButtonStyle({
                active: isActive,
                padding: "8px 16px",
                fontWeight: isActive ? typography.semibold : typography.regular,
                inactiveBackground: colors.white,
                inactiveColor: colors.textMuted,
              })}
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

const backButtonStyle = {
  ...getBackButtonStyle(),
  color: colors.dark,
};
