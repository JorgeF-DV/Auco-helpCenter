// ─────────────────────────────────────────────────────────────
// SearchBar.jsx — Barra de búsqueda reutilizable
//
// Props:
//   value        (string) — Valor actual del input (controlled)
//   onChange     (func)   — Callback al cambiar el texto
//   placeholder  (string) — Texto de placeholder
//   maxWidth     (string) — Ancho máximo (default: "540px")
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { colors, typography, radius, semanticColors } from "../styles/theme";

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.textLight}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function SearchBar({ value, onChange, placeholder, maxWidth = "540px" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: "relative", maxWidth, width: "100%" }}>
      <div
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchIcon />
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "12px 16px 12px 42px",
          border: `1.5px solid ${focused ? colors.primary : colors.border}`,
          borderRadius: radius.md,
          fontSize: typography.base,
          color: colors.text,
          background: colors.white,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: typography.fontFamily,
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            boxShadow: focused ? `0 0 0 3px ${semanticColors.interactiveHover}` : "none",
        }}
      />
    </div>
  );
}
