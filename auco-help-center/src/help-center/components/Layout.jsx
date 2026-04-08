import { colors, typography } from "../styles/theme";

export default function Layout({ children, onNavigate }) {
  function navigate(id) {
    onNavigate(id);
  }

  return (
    <div style={{ minHeight: "100vh", background: colors.surface, fontFamily: typography.fontFamily, display: "flex", flexDirection: "column" }}>
      <header style={{
        height: 60,
        background: "linear-gradient(90deg, #002855 0%, #00346f 55%, #0b3f7a 100%)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 200,
        boxShadow: "0 10px 28px rgba(0, 20, 45, 0.26), 0 1px 0 rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.16)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -34, right: "22%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -50, left: -18, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(71, 147, 255, 0.26) 0%, rgba(71, 147, 255, 0) 72%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/auco_logo.png"
            alt="Auco"
            onClick={() => navigate("home")}
            style={{ height: 45, objectFit: "contain", cursor: "pointer", userSelect: "none", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))" }}
          />
        </div>

        <a
          href="https://app.auco.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: colors.white, fontSize: typography.sm, textDecoration: "none", fontFamily: typography.fontFamily, fontWeight: typography.bold, display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "7px 12px", backdropFilter: "blur(2px)" }}
        >
          Ir a la plataforma
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </header>

      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        <main style={{ flex: 1, padding: "36px clamp(16px, 2vw, 28px)", maxWidth: 1680, width: "100%", boxSizing: "border-box", margin: "0 auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
