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
import { colors, typography, shadows, getBadgeStyle, getInteractiveCardStyle } from "../styles/theme";
import LinkifiedText from "./LinkifiedText";

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
        ...getInteractiveCardStyle({
          hovered: isOpen,
          accentColor: colors.primary,
          padding: 0,
          gap: 0,
          cursor: "default",
          shadow: shadows.sm,
          hoverShadow: shadows.sm,
          hoverTranslateY: "0",
        }),
        marginBottom: "10px",
        overflow: "hidden",
      }}
    >
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
          <span style={getBadgeStyle("primary", { whiteSpace: "nowrap" })}>
            {category}
          </span>

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
            whiteSpace: "pre-wrap",
          }}
        >
          <LinkifiedText
            text={answer}
            linkStyle={{
              color: colors.primary,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              fontWeight: typography.medium,
            }}
          />
        </div>
      )}
    </div>
  );
}
