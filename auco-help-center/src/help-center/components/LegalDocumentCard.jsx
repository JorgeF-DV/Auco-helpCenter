// ─────────────────────────────────────────────────────────────
// LegalDocumentCard.jsx — Tarjeta para documento legal
//
// Props:
//   document    (obj)   — Documento con id, title, category, etc
//   onClick     (func)  — Se ejecuta al hacer clic
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, radius, shadows } from "../styles/theme";

export default function LegalDocumentCard({ document, onClick }) {
  const [hovered, setHovered] = useState(false);

  const categoryColors = {
    "Términos y Condiciones": "#6366f1",
    "Política de Privacidad": "#8b5cf6",
    "Seguridad": "#ec4899",
  };

  const accentColor = categoryColors[document.category] || colors.primary;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "20px",
        border: `1.5px solid ${hovered ? accentColor : colors.border}`,
        borderRadius: radius.lg,
        background: colors.white,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? shadows.md : shadows.sm,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header con categoría y tamaño */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            background: `${accentColor}15`,
            color: accentColor,
            borderRadius: radius.sm,
            fontSize: typography.xs,
            fontWeight: typography.semibold,
            fontFamily: typography.fontFamily,
            whiteSpace: "nowrap",
            border: `1px solid ${accentColor}30`,
          }}
        >
          {document.category}
        </span>
        <span
          style={{
            fontSize: typography.xs,
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
          }}
        >
          {document.size}
        </span>
      </div>

      {/* Título */}
      <h3
        style={{
          margin: 0,
          fontSize: typography.base,
          fontWeight: typography.semibold,
          color: colors.text,
          fontFamily: typography.fontFamily,
          lineHeight: "1.4",
        }}
      >
        {document.title}
      </h3>

      {/* Descripción */}
      <p
        style={{
          margin: 0,
          fontSize: typography.sm,
          color: colors.textMuted,
          fontFamily: typography.fontFamily,
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {document.description}
      </p>

      {/* Footer con fecha */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4px",
          paddingTop: "12px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <span
          style={{
            fontSize: typography.xs,
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
          }}
        >
          Actualizado: {new Date(document.lastUpdated).toLocaleDateString("es-ES")}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          style={{
            transition: "transform 0.2s ease",
            transform: hovered ? "translateX(4px)" : "none",
          }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  );
}
