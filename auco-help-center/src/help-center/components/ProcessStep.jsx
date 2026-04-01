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

export default function ProcessStep({ number, title, description, tip, isLast }) {
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
        {/* Título del paso */}
        <h4
          style={{
            color: colors.text,
            fontSize: typography.md,
            fontWeight: typography.semibold,
            margin: "6px 0 8px",
            fontFamily: typography.fontFamily,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h4>

        {/* Descripción del paso */}
        <p
          style={{
            color: colors.textMuted,
            fontSize: typography.base,
            lineHeight: 1.75,
            margin: 0,
            fontFamily: typography.fontFamily,
          }}
        >
          {description}
        </p>

        {/* Tip opcional — solo se renderiza si tip tiene contenido */}
        {tip && (
          <div
            style={{
              marginTop: "12px",
              padding: "11px 14px",
              background: colors.warnBg,
              borderLeft: `3px solid ${colors.warnBorder}`,
              borderRadius: `0 ${radius.md} ${radius.md} 0`,
              fontSize: typography.sm,
              color: colors.warnText,
              lineHeight: 1.6,
              fontFamily: typography.fontFamily,
            }}
          >
            <strong style={{ fontWeight: typography.semibold }}>Nota: </strong>
            {tip}
          </div>
        )}
      </div>
    </div>
  );
}
