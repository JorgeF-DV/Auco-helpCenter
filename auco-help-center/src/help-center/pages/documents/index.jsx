// ─────────────────────────────────────────────────────────────
// pages/documents/index.jsx — Listado de documentos legales
//
// Funcionalidades:
//   - Listado de documentos legales por categoría
//   - Filtro por categoría (pills clickeables)
//   - Vista de tarjetas de documentos
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import LegalDocumentCard from "../../components/LegalDocumentCard";
import { colors, typography, radius, getBackButtonStyle, getPillButtonStyle, pageStyles } from "../../styles/theme";
import documents from "../../content/documents.json";

const CATEGORY_ORDER = [
  "Marco Legal",
  "Cumplimiento",
  "Seguridad",
  "Certificaciones",
  "Comparativos",
  "Prensa",
];

// ── Cabecera de sección ─────────────────────────────────────
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

// ── Botón de volver ─────────────────────────────────────────
const backButtonStyle = {
  ...getBackButtonStyle(),
  color: colors.textMuted,
};

export default function DocumentsPage({ setPage }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Obtiene categorías únicas + "Todos" con orden curado
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(documents.map((d) => d.category))];
    const ordered = uniqueCategories.sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);

      if (indexA === -1 && indexB === -1) {
        return a.localeCompare(b, "es", { sensitivity: "base" });
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return ["Todos", ...ordered];
  }, []);

  // Filtra documentos por categoría y ordena por título
  const filtered = useMemo(() => {
    const items = activeCategory === "Todos"
      ? [...documents]
      : documents.filter((d) => d.category === activeCategory);

    return items.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
  }, [activeCategory]);

  return (
    <Layout onNavigate={setPage}>
      <button onClick={() => setPage("home")} style={backButtonStyle}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver a inicio
      </button>

      <PageHeader
        title="Documentos Legales"
        subtitle="Términos, políticas y documentos de cumplimiento normativo de Auco."
      />

      {/* ── Filtro por categoría ── */}
      <div style={{ marginBottom: "28px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={getPillButtonStyle({ active: isActive, activeBackground: colors.primary, activeColor: colors.white, inactiveBackground: colors.white, inactiveColor: colors.text, borderRadius: radius.full, padding: "8px 14px", fontWeight: typography.medium })}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* ── Contador de documentos ── */}
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: typography.sm,
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
            margin: 0,
          }}
        >
          {filtered.length} documento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Grid de documentos ── */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {filtered.map((doc) => (
            <LegalDocumentCard
              key={doc.id}
              document={doc}
              onView={() => {
                window.open(doc.url, "_blank", "noopener,noreferrer");
              }}
              onDownload={() => {
                const link = document.createElement("a");
                link.href = doc.url;
                link.download = "";
                link.rel = "noopener noreferrer";
                link.click();
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            borderRadius: radius.lg,
            background: colors.surface,
            border: `1.5px dashed ${colors.border}`,
          }}
        >
          <p
            style={{
              color: colors.textMuted,
              fontSize: typography.base,
              fontFamily: typography.fontFamily,
              margin: 0,
            }}
          >
            No hay documentos en esta categoría.
          </p>
        </div>
      )}
    </Layout>
  );
}
