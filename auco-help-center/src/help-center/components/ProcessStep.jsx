// ─────────────────────────────────────────────────────────────
// ProcessStep.jsx — Paso individual dentro de un proceso
//
// Props:
//   number      (number)  — Número del paso (1, 2, 3...)
//   title       (string)  — Título corto del paso
//   description (string)  — Instrucción detallada
//   tip         (string|null) — Consejo opcional. Si es null, no se renderiza.
//   isLast      (boolean) — Si es true, no se dibuja la línea conectora
//
// Los pasos se conectan visualmente con una línea vertical entre números.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, radius, styles } from "../styles/theme";
import LinkifiedText from "./LinkifiedText";

export default function ProcessStep({ number, action, image, imageAlt, tip, isLast }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        // El último paso no necesita espacio extra hacia abajo
        paddingBottom: isLast ? "0" : "0",
      }}
    >
      {/* ── Columna izquierda: número + línea conectora ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {/* Círculo numerado */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})`,
            color: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: typography.bold,
            fontSize: typography.sm,
            flexShrink: 0,
            boxShadow: "0 4px 10px rgba(3,74,166,0.25)",
            fontFamily: typography.fontFamily,
          }}
        >
          {number}
        </div>

        {/* Línea vertical que conecta con el siguiente paso */}
        {!isLast && (
          <div
            style={{
              width: "2px",
              flex: 1,
              minHeight: "32px",
              background: `linear-gradient(to bottom, ${colors.primary}40, ${colors.border})`,
              margin: "8px 0",
            }}
          />
        )}
      </div>

      {/* ── Columna derecha: contenido del paso ── */}
      <div
        style={{
          paddingBottom: isLast ? "0" : "28px",
          flex: 1,
        }}
      >
        {/* Acción del paso */}
        <p
          style={{
            color: colors.textMuted,
            fontSize: typography.base,
            lineHeight: 1.75,
            margin: "6px 0 0",
            fontFamily: typography.fontFamily,
            whiteSpace: "pre-wrap",
          }}
        >
          <LinkifiedText
            text={action}
            linkStyle={{
              color: colors.dark,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              fontWeight: typography.medium,
            }}
          />
        </p>

        {image && (
          <div
            style={{
              marginTop: "14px",
              ...styles.mediaFrame,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={image}
              alt={imageAlt || `Paso ${number}`}
              style={{
                ...styles.mediaImageContain,
                maxHeight: "280px",
                height: "auto",
                cursor: "zoom-in",
              }}
              loading="lazy"
              onClick={() => setPreviewOpen(true)}
            />
          </div>
        )}

        {isLast && tip && (
          <div
            style={{
              marginTop: "14px",
              border: `1px solid ${colors.warnBorder}`,
              background: colors.warnBg,
              borderRadius: radius.md,
              padding: "10px 12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.warnText}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: "2px" }}
              aria-hidden="true"
            >
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M8 14c-1.5-1.2-2.5-3-2.5-5a6.5 6.5 0 1 1 13 0c0 2-1 3.8-2.5 5" />
            </svg>
            <span
              style={{
                color: colors.warnText,
                fontSize: typography.sm,
                lineHeight: 1.6,
                fontFamily: typography.fontFamily,
              }}
            >
              {tip}
            </span>
          </div>
        )}
      </div>

      {previewOpen && image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={imageAlt || `Vista previa del paso ${number}`}
          onClick={() => setPreviewOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 8, 20, 0.88)",
            zIndex: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "88vh",
            }}
          >
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Cerrar vista previa"
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(9, 20, 35, 0.9)",
                color: colors.white,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            <img
              src={image}
              alt={imageAlt || `Vista previa del paso ${number}`}
              style={{
                display: "block",
                maxWidth: "92vw",
                maxHeight: "88vh",
                width: "auto",
                height: "auto",
                borderRadius: radius.md,
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
