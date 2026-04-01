import { useState, useEffect } from "react";
import { colors, typography, radius } from "../styles/theme";
import SupportChatButton from "./SupportChatButton";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const MOBILE_BREAKPOINT = 768;

const NAV_ITEMS = [
  { id: "home",      label: "Inicio",               icon: HomeIcon },
  { id: "faqs",      label: "Preguntas frecuentes",  icon: FAQIcon },
  { id: "videos",    label: "Videos tutoriales",     icon: VideoIcon },
  { id: "processes", label: "Procesos",              icon: ProcessIcon },
];

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Layout({ children, currentPage, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  const activePage = currentPage === "process-detail" ? "processes" : currentPage;

  function navigate(id) {
    onNavigate(id);
    if (isMobile) setSidebarOpen(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: colors.surface, fontFamily: typography.fontFamily, display: "flex", flexDirection: "column" }}>
      <header style={{
        height: 60,
        background: colors.dark,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {isMobile && (
            <>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: "6px", borderRadius: radius.sm, display: "flex", alignItems: "center" }}
              >
                <MenuIcon />
              </button>
              <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)" }} />
            </>
          )}

          <img
            src="/auco_logo.png"
            alt="Auco"
            onClick={() => navigate("home")}
            style={{ height: 45, objectFit: "contain", cursor: "pointer", userSelect: "none" }}
          />
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "18px", fontWeight: 200, lineHeight: 1, marginLeft: "-30px" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: typography.sm, fontWeight: typography.medium, letterSpacing: "0.2px" }}>Help Center</span>
        </div>

        <a
          href="https://app.auco.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.55)", fontSize: typography.sm, textDecoration: "none", fontFamily: typography.fontFamily, display: "flex", alignItems: "center", gap: "6px" }}
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
        {isMobile && sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, top: 60, background: "rgba(0,0,0,0.4)", zIndex: 150 }} />
        )}

        <aside
          onMouseEnter={() => !isMobile && setSidebarOpen(true)}
          onMouseLeave={(e) => {
            if (!isMobile && !e.currentTarget.contains(e.relatedTarget)) {
              setSidebarOpen(false);
            }
          }}
          style={{
            background: colors.dark,
            borderRight: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            ...(isMobile ? {
              position: "fixed",
              top: 60,
              left: 0,
              width: 240,
              height: "calc(100vh - 60px)",
              zIndex: 160,
              overflowY: "auto",
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.25s ease",
              padding: "24px 12px",
            } : {
              position: "sticky",
              top: 60,
              height: "calc(100vh - 60px)",
              overflowY: "auto",
              overflowX: "hidden",
              width: sidebarOpen ? 240 : 52,
              padding: sidebarOpen ? "24px 12px" : "24px 8px",
              transition: "width 0.25s ease, padding 0.25s ease",
            }),
          }}
        >
          {sidebarOpen && (
            <p style={{ fontSize: typography.xs, fontWeight: typography.bold, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.9px", padding: "0 12px", marginBottom: "10px", marginTop: 0, fontFamily: typography.fontFamily }}>
              Navegación
            </p>
          )}

          <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activePage;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: radius.md,
                    border: "none",
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    color: isActive ? colors.white : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontSize: typography.base,
                    fontWeight: isActive ? typography.semibold : typography.regular,
                    textAlign: "left",
                    fontFamily: typography.fontFamily,
                    transition: "background 0.15s ease",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  <IconComponent active={isActive} />
                  {sidebarOpen && <span style={{ flex: 1 }}>{item.label}</span>}
                  {sidebarOpen && isActive && <div style={{ width: 3, height: 16, borderRadius: "2px", background: colors.white }} />}
                </button>
              );
            })}
          </nav>

        </aside>

        <main style={{ flex: 1, padding: "36px clamp(20px, 3vw, 40px)", maxWidth: 1280, width: "100%", boxSizing: "border-box", margin: "0 auto" }}>
          {children}
        </main>
      </div>

      <SupportChatButton />
    </div>
  );
}
