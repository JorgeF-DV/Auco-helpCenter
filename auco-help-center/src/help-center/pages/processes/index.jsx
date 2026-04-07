// ─────────────────────────────────────────────────────────────
// pages/processes/index.jsx — Listado de procesos disponibles
//
// Muestra cards con resumen de cada proceso.
// Al hacer clic navega a /processes/[slug] con el detalle completo.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Layout from "../../components/Layout";
import { colors, typography, shadows, styles } from "../../styles/theme";
import processes from "../../content/processes.json";

// ── Card de proceso ───────────────────────────────────────────
function ProcessCard({ process, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        padding: "26px 28px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        borderColor: hovered ? colors.primary : colors.border,
        boxShadow: hovered ? shadows.blue : shadows.sm,
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Badge de categoría */}
      <span
        style={{
          ...styles.badge,
          background: colors.primaryBg,
          color: colors.primary,
          alignSelf: "flex-start",
        }}
      >
        {process.category}
      </span>

      {/* Título */}
      <h3
        style={{
          color: colors.text,
          fontSize: typography.md,
          fontWeight: typography.semibold,
          margin: 0,
          fontFamily: typography.fontFamily,
          lineHeight: 1.35,
        }}
      >
        {process.title}
      </h3>

      {/* Descripción */}
      <p
        style={{
          color: colors.textMuted,
          fontSize: typography.sm,
          margin: 0,
          lineHeight: 1.65,
          fontFamily: typography.fontFamily,
        }}
      >
        {process.description}
      </p>

      {/* Footer: conteo de pasos + flecha */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: `1px solid ${colors.border}`,
          marginTop: "auto",
        }}
      >
        <span
          style={{
            color: colors.textLight,
            fontSize: typography.xs,
            fontFamily: typography.fontFamily,
            fontWeight: typography.medium,
            letterSpacing: "0.3px",
          }}
        >
          {process.steps.length} pasos
        </span>
        <span
          style={{
            color: colors.primary,
            fontSize: typography.sm,
            fontWeight: typography.semibold,
            fontFamily: typography.fontFamily,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Ver guía
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </button>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function ProcessesPage({ setPage, setSelectedProcess }) {
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

      {/* Cabecera */}
      <div
        style={{
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
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
          Procesos
        </h1>
        <p
          style={{
            color: colors.textMuted,
            fontSize: typography.base,
            margin: 0,
            fontFamily: typography.fontFamily,
          }}
        >
          Guías detalladas para cada flujo de trabajo dentro de la plataforma.
        </p>
      </div>

      {/* Grid de procesos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {processes.map((p) => (
          <ProcessCard
            key={p.slug}
            process={p}
            onClick={() => {
              setSelectedProcess(p.slug);
              setPage("process-detail");
            }}
          />
        ))}
      </div>
    </Layout>
  );
}

const backButtonStyle = {
  background: "none",
  border: "none",
  color: colors.primary,
  cursor: "pointer",
  fontSize: typography.sm,
  fontWeight: typography.semibold,
  fontFamily: typography.fontFamily,
  padding: "0 0 20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};
