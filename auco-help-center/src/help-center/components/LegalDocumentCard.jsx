// ─────────────────────────────────────────────────────────────
// LegalDocumentCard.jsx — Tarjeta para documento legal
//
// Props:
//   document    (obj)   — Documento con id, title, category, etc
//   onClick     (func)  — Se ejecuta al hacer clic
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, radius, shadows, getBadgeStyle, getInteractiveCardStyle, getPillButtonStyle } from "../styles/theme";

export default function LegalDocumentCard({ document, onView, onDownload }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = colors.primary;

  return (
    <article
      onClick={onView}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onView();
        }
      }}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...getInteractiveCardStyle({
          hovered,
          accentColor,
          padding: "20px",
          borderRadius: radius.lg,
          shadow: shadows.sm,
          hoverShadow: shadows.md,
          hoverTranslateY: "-2px",
        }),
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
          style={getBadgeStyle("primary", {
            color: accentColor,
            fontSize: typography.xs,
            padding: "4px 10px",
            borderRadius: radius.sm,
            whiteSpace: "nowrap",
          })}
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

      {/* Footer con fecha y acciones */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDownload();
            }}
            style={getPillButtonStyle({
              active: false,
              activeBackground: colors.primary,
              activeColor: colors.white,
              inactiveBackground: colors.white,
              inactiveColor: colors.text,
              padding: "5px 10px",
              fontWeight: typography.medium,
            })}
          >
            Descargar
          </button>
          <span
            style={{
              color: accentColor,
              fontSize: typography.xs,
              fontWeight: typography.semibold,
              fontFamily: typography.fontFamily,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Ver
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transition: "transform 0.2s ease",
                transform: hovered ? "translateX(3px)" : "none",
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
