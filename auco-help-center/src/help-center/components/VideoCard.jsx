// ─────────────────────────────────────────────────────────────
// VideoCard.jsx — Tarjeta de video tutorial
//
// Props:
//   title       (string) — Título del video
//   description (string) — Descripción breve
//   youtubeId   (string) — ID del video en YouTube (no la URL completa)
//   category    (string) — Categoría del video
//   duration    (string) — Duración estimada ("4 min")
//   onClick     (func)   — Callback al hacer clic (abre el modal)
//
// La miniatura se construye automáticamente con el youtubeId.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, shadows, styles } from "../styles/theme";

// Ícono de play en SVG — no emoji
function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={colors.primary}
      style={{ marginLeft: "3px" }}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// Ícono de reloj para la duración
function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ marginRight: "4px", flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function VideoCard({ title, description, youtubeId, category, duration, onClick }) {
  const [hovered, setHovered] = useState(false);

  // hqdefault es más estable entre videos; si falla intentamos mqdefault.
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        borderColor: hovered ? colors.primary : colors.border,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? shadows.blue : shadows.sm,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Miniatura con overlay de play ── */}
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}>
        <img
          src={thumbnailUrl}
          alt={`Miniatura: ${title}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
          // Fallback de miniatura para videos con recursos incompletos.
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
          }}
        />

        {/* Gradiente oscuro sobre la miniatura */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "rgba(0, 40, 85, 0.55)"
              : "rgba(0, 40, 85, 0.38)",
            transition: "background 0.2s ease",
          }}
        />

        {/* Botón de play centrado */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: colors.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s ease",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <PlayIcon />
          </div>
        </div>
      </div>

      {/* ── Información del video ── */}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Fila superior: badge de categoría + duración */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              ...styles.badge,
              background: colors.successBg,
              color: "#15803D",
            }}
          >
            {category}
          </span>

          {duration && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: colors.textLight,
                fontSize: typography.xs,
                fontFamily: typography.fontFamily,
              }}
            >
              <ClockIcon />
              {duration}
            </span>
          )}
        </div>

        {/* Título */}
        <h3
          style={{
            color: colors.text,
            fontSize: typography.md,
            fontWeight: typography.semibold,
            margin: "0 0 8px",
            lineHeight: 1.35,
            fontFamily: typography.fontFamily,
          }}
        >
          {title}
        </h3>

        {/* Descripción */}
        <p
          style={{
            color: colors.textMuted,
            fontSize: typography.sm,
            lineHeight: 1.6,
            margin: 0,
            fontFamily: typography.fontFamily,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
