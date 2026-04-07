// ─────────────────────────────────────────────────────────────
// FAQItem.jsx — Acordeón de pregunta frecuente
//
// Props:
//   question  (string) — Texto de la pregunta
//   answer    (string) — Texto de la respuesta
//   category  (string) — Categoría para el badge lateral
//
// Comportamiento:
//   - Al hacer clic en el header se alterna isOpen (true/false)
//   - La respuesta se anima con una transición de altura
// ─────────────────────────────────────────────────────────────

import { useId, useState } from "react";
import { colors, typography, styles } from "../styles/theme";

// Ícono SVG de chevron — reemplaza emojis por iconografía limpia
function ChevronIcon({ isOpen }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FAQItem({ question, answer, category }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      style={{
        ...styles.card,
        borderColor: isOpen ? colors.primary : colors.border,
        marginBottom: "10px",
        transition: "border-color 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* ── Header del acordeón ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: "16px",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
          {/* Badge de categoría */}
          <span
            style={{
              ...styles.badge,
              background: colors.primaryBg,
              color: colors.primary,
              whiteSpace: "nowrap",
            }}
          >
            {category}
          </span>

          {/* Texto de la pregunta */}
          <span
            style={{
              color: colors.text,
              fontSize: typography.base,
              fontWeight: typography.medium,
              lineHeight: 1.45,
              fontFamily: typography.fontFamily,
            }}
          >
            {question}
          </span>
        </div>

        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* ── Cuerpo desplegable ── */}
      {isOpen && (
        <div
          id={panelId}
          style={{
            padding: "0 22px 20px 22px",
            borderTop: `1px solid ${colors.border}`,
            paddingTop: "16px",
            color: colors.textMuted,
            fontSize: typography.base,
            lineHeight: 1.75,
            fontFamily: typography.fontFamily,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
