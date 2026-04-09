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
import { colors, typography, radius, styles } from "../../styles/theme";
import documents from "../../content/documents.json";

// ── Cabecera de sección ─────────────────────────────────────
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

// ── Botón de volver ─────────────────────────────────────────
const backButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingRight: "12px",
  paddingLeft: "12px",
  paddingTop: "8px",
  paddingBottom: "8px",
  marginBottom: "20px",
  background: "transparent",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: typography.sm,
  fontWeight: typography.medium,
  color: colors.textMuted,
  fontFamily: typography.fontFamily,
  transition: "color 0.15s ease, background-color 0.15s ease",
};

export default function DocumentsPage({ setPage }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Obtiene categorías únicas + "Todos"
  const categories = ["Todos", ...new Set(documents.map((d) => d.category))];

  // Filtra documentos por categoría
  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return documents;
    return documents.filter((d) => d.category === activeCategory);
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
              style={{
                padding: "8px 14px",
                borderRadius: radius.full,
                border: `1.5px solid ${isActive ? colors.primary : colors.border}`,
                background: isActive ? colors.primary : colors.white,
                color: isActive ? colors.white : colors.text,
                fontSize: typography.sm,
                fontWeight: typography.medium,
                cursor: "pointer",
                fontFamily: typography.fontFamily,
                transition: "all 0.15s ease",
              }}
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
              onClick={() => {
                // TODO: Aquí irá la lógica para ver el documento completo
                console.log("Documento seleccionado:", doc.id);
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
            background: colors.bg,
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
