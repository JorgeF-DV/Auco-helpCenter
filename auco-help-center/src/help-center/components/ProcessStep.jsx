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

import { colors, typography, radius } from "../styles/theme";

export default function ProcessStep({ number, action, image, imageAlt, isLast }) {

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
            boxShadow: "0 4px 10px rgba(37,99,235,0.25)",
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
          }}
        >
          {action}
        </p>

        {image && (
          <div
            style={{
              marginTop: "14px",
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              overflow: "hidden",
              background: colors.surface,
            }}
          >
            <img
              src={image}
              alt={imageAlt || `Paso ${number}`}
              style={{ width: "100%", height: "auto", display: "block" }}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
