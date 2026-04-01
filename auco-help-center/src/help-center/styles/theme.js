// ─────────────────────────────────────────────────────────────
// theme.js — Sistema de diseño Auco
// Todos los valores de color, tipografía y espaciado viven aquí.
// Si necesitas cambiar un color, cámbialo en un solo lugar.
// ─────────────────────────────────────────────────────────────

export const colors = {
  dark:       "#002855",
  primary:    "#2563EB",
  success:    "#22C55E",
  surface:    "#F8FAFC",
  white:      "#FFFFFF",
  border:     "#E2E8F0",
  text:       "#1E293B",
  textMuted:  "#64748B",
  textLight:  "#94A3B8",
  primaryBg:  "#EFF6FF",
  successBg:  "#F0FDF4",
  warnBg:     "#FFFBEB",
  warnText:   "#92400E",
  warnBorder: "#F59E0B",
};

export const typography = {
  fontFamily: "'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  xs:   "11px",
  sm:   "13px",
  base: "14.5px",
  md:   "16px",
  lg:   "18px",
  xl:   "22px",
  xxl:  "28px",
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
};

export const radius = {
  sm:   "6px",
  md:   "10px",
  lg:   "14px",
  full: "9999px",
};

export const shadows = {
  sm:   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  md:   "0 4px 12px rgba(0,0,0,0.08)",
  lg:   "0 8px 24px rgba(0,0,0,0.1)",
  blue: "0 4px 16px rgba(37,99,235,0.15)",
};

export const styles = {
  card: {
    background:   "#FFFFFF",
    border:       "1.5px solid #E2E8F0",
    borderRadius: "14px",
    boxShadow:    "0 1px 3px rgba(0,0,0,0.06)",
  },
  badge: {
    fontSize:     "11px",
    fontWeight:   600,
    padding:      "3px 10px",
    borderRadius: "9999px",
    letterSpacing:"0.3px",
    display:      "inline-block",
  },
};
