// ─────────────────────────────────────────────────────────────
// theme.js — Sistema de diseño Auco
// Todos los valores de color, tipografía y espaciado viven aquí.
// Si necesitas cambiar un color, cámbialo en un solo lugar.
// ─────────────────────────────────────────────────────────────

export const colors = {
  dark:       "#001A4D",
  primary:    "#001A4D",
  success:    "#22C55E",
  surface:    "#F8FAFC",
  white:      "#FFFFFF",
  border:     "#E2E8F0",
  text:       "#1E293B",
  textMuted:  "#64748B",
  textLight:  "#94A3B8",
  primaryBg:  "rgba(0, 26, 77, 0.1)",
  successBg:  "#F0FDF4",
  warnBg:     "#FFFBEB",
  warnText:   "#92400E",
  warnBorder: "#F59E0B",
};

export const semanticColors = {
  info: "#0F766E",
  infoBg: "#ECFDF5",
  infoBorder: "#A7F3D0",
  accent: "#2563EB",
  accentBg: "#EFF6FF",
  accentBorder: "#BFDBFE",
  interactiveHover: "rgba(0, 26, 77, 0.08)",
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
  blue: "0 4px 16px rgba(0,26,77,0.15)",
};

export const styles = {
  card: {
    background:   "#FFFFFF",
    border:       "1.5px solid #E2E8F0",
    borderRadius: "14px",
    boxShadow:    "0 1px 3px rgba(0,0,0,0.06)",
  },
  mediaFrame: {
    border:       `1.5px solid ${colors.border}`,
    borderRadius: radius.lg,
    background:   colors.white,
    boxShadow:    shadows.sm,
    padding:      "6px",
    overflow:     "hidden",
  },
  mediaImageContain: {
    width:        "100%",
    height:       "100%",
    display:      "block",
    objectFit:    "contain",
    borderRadius: radius.md,
    background:   colors.surface,
  },
  mediaImageCover: {
    width:        "100%",
    height:       "100%",
    display:      "block",
    objectFit:    "cover",
    borderRadius: radius.md,
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

export const badgeVariants = {
  primary: {
    background: colors.primaryBg,
    color: colors.primary,
    border: `1px solid ${colors.border}`,
  },
  success: {
    background: colors.successBg,
    color: "#15803D",
    border: `1px solid transparent`,
  },
  warning: {
    background: colors.warnBg,
    color: colors.warnText,
    border: `1px solid ${colors.warnBorder}`,
  },
  info: {
    background: semanticColors.infoBg,
    color: semanticColors.info,
    border: `1px solid ${semanticColors.infoBorder}`,
  },
  accent: {
    background: semanticColors.accentBg,
    color: semanticColors.accent,
    border: `1px solid ${semanticColors.accentBorder}`,
  },
  neutral: {
    background: colors.surface,
    color: colors.textMuted,
    border: `1px solid ${colors.border}`,
  },
};

export function getBadgeStyle(variant = "primary", overrides = {}) {
  return {
    ...styles.badge,
    ...badgeVariants[variant],
    ...overrides,
  };
}

export function getInteractiveCardStyle({
  hovered = false,
  accentColor = colors.primary,
  padding = "20px",
  borderRadius = radius.lg,
  background = colors.white,
  shadow = shadows.sm,
  hoverShadow = shadows.md,
  hoverTranslateY = "-2px",
  cursor = "pointer",
  textAlign = "left",
  gap = "12px",
  borderWidth = "1.5px",
  boxSizing = "border-box",
} = {}) {
  return {
    ...styles.card,
    background,
    border: `${borderWidth} solid ${hovered ? accentColor : colors.border}`,
    borderRadius,
    padding,
    boxShadow: hovered ? hoverShadow : shadow,
    transform: hovered ? `translateY(${hoverTranslateY})` : "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    cursor,
    textAlign,
    display: "flex",
    flexDirection: "column",
    gap,
    boxSizing,
  };
}

export function getPillButtonStyle({
  active = false,
  activeBackground = colors.primary,
  activeColor = colors.white,
  inactiveBackground = colors.surface,
  inactiveColor = colors.text,
  borderRadius = radius.full,
  padding = "8px 16px",
  fontWeight = typography.semibold,
} = {}) {
  return {
    backgroundColor: active ? activeBackground : inactiveBackground,
    color: active ? activeColor : inactiveColor,
    border: `1.5px solid ${active ? activeBackground : colors.border}`,
    borderRadius,
    padding,
    fontSize: typography.sm,
    fontWeight,
    cursor: "pointer",
    fontFamily: typography.fontFamily,
    transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
  };
}

export function getBackButtonStyle({ compact = false } = {}) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: compact ? "6px 10px" : "8px 12px",
    marginBottom: "20px",
    background: "transparent",
    border: "none",
    borderRadius: radius.sm,
    cursor: "pointer",
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.textMuted,
    fontFamily: typography.fontFamily,
    transition: "color 0.15s ease, background-color 0.15s ease",
  };
}

export const layoutStyles = {
  shell: {
    minHeight: "100vh",
    background: colors.surface,
    fontFamily: typography.fontFamily,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 60,
    background: `linear-gradient(90deg, ${colors.dark} 0%, ${colors.primary} 100%)`,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 200,
    borderBottom: "none",
    overflow: "hidden",
  },
  headerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  headerLogo: {
    height: 45,
    objectFit: "contain",
    cursor: "pointer",
    userSelect: "none",
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
  },
  headerLink: {
    color: colors.white,
    fontSize: typography.sm,
    textDecoration: "none",
    fontFamily: typography.fontFamily,
    fontWeight: typography.bold,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px",
    padding: "7px 12px",
    backdropFilter: "blur(2px)",
  },
  main: {
    flex: 1,
    padding: "36px clamp(16px, 2vw, 28px)",
    maxWidth: 1680,
    width: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
  },
};

export const pageStyles = {
  sectionHeader: {
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${colors.border}`,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.xl,
    fontWeight: typography.bold,
    margin: "0 0 6px",
    fontFamily: typography.fontFamily,
    letterSpacing: "-0.2px",
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: typography.base,
    margin: 0,
    fontFamily: typography.fontFamily,
  },
  emptyState: {
    ...styles.card,
    padding: "60px 40px",
    textAlign: "center",
    color: colors.textMuted,
    fontFamily: typography.fontFamily,
    fontSize: typography.base,
  },
};
