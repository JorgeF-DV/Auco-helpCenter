import { layoutStyles } from "../styles/theme";

export default function Layout({ children, onNavigate }) {
  function navigate(id) {
    onNavigate(id);
  }

  return (
    <div style={layoutStyles.shell}>
      <header style={layoutStyles.header}>
        <div style={layoutStyles.headerBrand}>
          <img
            src="/auco_logo.png"
            alt="Auco"
            onClick={() => navigate("home")}
            style={layoutStyles.headerLogo}
          />
        </div>

        <a
          href="https://app.auco.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={layoutStyles.headerLink}
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
        <main style={layoutStyles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
