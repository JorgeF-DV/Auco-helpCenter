// ─────────────────────────────────────────────────────────────
// EventCard.jsx — Tarjeta de evento
//
// Props:
//   title       (string) — Título del evento
//   description (string) — Descripción del evento
//   category    (string) — Categoría (Webinar, Taller, Conferencia, etc.)
//   date        (string) — Fecha en formato YYYY-MM-DD
//   time        (string) — Hora en formato HH:MM
//   duration    (string) — Duración ("60 min")
//   instructor  (string) — Instructor/Facilitador
//   capacity    (number) — Capacidad de participantes
//   onRegister  (func)   — Callback al hacer clic en registrarse
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, radius, shadows } from "../styles/theme";

// Ícono de calendario
function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// Ícono de reloj
function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Ícono de usuario
function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// Ícono de personas
function PeopleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Badge de categoría
function CategoryBadge({ category }) {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: colors.primaryBg,
        color: colors.primary,
        fontSize: typography.xs,
        fontWeight: typography.semibold,
        padding: "4px 10px",
        borderRadius: radius.sm,
        marginBottom: "12px",
        fontFamily: typography.fontFamily,
        border: `1px solid ${colors.border}`,
      }}
    >
      {category}
    </span>
  );
}

export default function EventCard({
  title,
  description,
  category,
  date,
  time,
  duration,
  instructor,
  capacity,
  onRegister,
}) {
  const [hovered, setHovered] = useState(false);

  // Formatear fecha
  const formatDate = (dateStr) => {
    const months = [
      "ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov", "dic",
    ];
    const [year, month, day] = dateStr.split("-");
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  // Formatear hora (remover segundos si existe)
  const formatTime = (timeStr) => {
    return timeStr.split(":").slice(0, 2).join(":");
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: colors.white,
        border: `1.5px solid ${hovered ? colors.primary : colors.border}`,
        borderRadius: radius.lg,
        padding: "20px",
        boxShadow: hovered ? shadows.md : shadows.sm,
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
      }}
    >
      <div>
        <CategoryBadge category={category} />
        <h3
          style={{
            color: colors.text,
            fontSize: typography.lg,
            fontWeight: typography.bold,
            margin: "0 0 8px",
            fontFamily: typography.fontFamily,
            lineHeight: "1.3",
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          color: colors.textMuted,
          fontSize: typography.sm,
          margin: 0,
          fontFamily: typography.fontFamily,
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: typography.sm,
          color: colors.textMuted,
          fontFamily: typography.fontFamily,
          borderTop: `1px solid ${colors.border}`,
          paddingTop: "12px",
          marginTop: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarIcon />
          <span>{formatDate(date)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ClockIcon />
          <span>
            {formatTime(time)} · {duration}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserIcon />
          <span>{instructor}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PeopleIcon />
          <span>Capacidad: {capacity} participantes</span>
        </div>
      </div>

      <button
        onClick={onRegister}
        style={{
          marginTop: "12px",
          backgroundColor: colors.primary,
          color: "white",
          border: "none",
          borderRadius: radius.md,
          padding: "10px 16px",
          fontSize: typography.sm,
          fontWeight: typography.semibold,
          cursor: "pointer",
          fontFamily: typography.fontFamily,
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Registrarse
      </button>
    </article>
  );
}
