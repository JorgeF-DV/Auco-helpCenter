import { useState, useEffect, useMemo, useRef } from "react";
import Layout from "../../components/Layout";
import VideoCard from "../../components/VideoCard";
import SearchBar from "../../components/SearchBar";
import { colors, typography, radius, styles } from "../../styles/theme";
import videos from "../../content/videos.json";
import { normalizeText } from "../../utils/search";

function VideoModal({ video, onClose, triggerRef }) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    const previousFocused = document.activeElement;
    const triggerElement = triggerRef?.current;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerElement) {
        triggerElement.focus();
      } else if (previousFocused && previousFocused.focus) {
        previousFocused.focus();
      }
    };
  }, [video, onClose, triggerRef]);

  if (!video) return null;

  const titleId = `video-modal-title-${video.id}`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 10, 25, 0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        padding: "20px",
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.white,
          borderRadius: radius.lg,
          overflow: "hidden",
          maxWidth: 820,
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${colors.border}` }}>
          <div>
            <span style={{ ...styles.badge, background: colors.successBg, color: "#15803D", marginBottom: "6px" }}>{video.category}</span>
            <h3 id={titleId} style={{ margin: "6px 0 0", color: colors.text, fontSize: typography.md, fontWeight: typography.semibold, fontFamily: typography.fontFamily }}>{video.title}</h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "16px" }}>
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: typography.sm,
                color: colors.primary,
                textDecoration: "none",
                fontFamily: typography.fontFamily,
                fontWeight: typography.semibold,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                padding: "7px 10px",
                background: colors.surface,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Abrir en YouTube
            </a>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Cerrar video"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.sm, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ aspectRatio: "16 / 9" }}>
          <iframe
            key={embedUrl}
            width="100%"
            height="100%"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function VideosPage({ setPage, selectedVideoCategory, selectedVideoId, initialSearch, clearSelection }) {
  const [search, setSearch] = useState(initialSearch || "");
  const [activeVideo, setActiveVideo] = useState(() => videos.find((v) => v.id === selectedVideoId) || null);
  const [selectedCategory, setSelectedCategory] = useState(selectedVideoCategory || "");
  const modalTriggerRef = useRef(null);
  const normalizedSearch = useMemo(() => normalizeText(search), [search]);
  const normalizedSelectedCategory = useMemo(() => normalizeText(selectedCategory), [selectedCategory]);

  useEffect(() => {
    return () => {
      if (clearSelection) clearSelection();
    };
  }, [clearSelection]);

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchesCategory =
        !normalizedSelectedCategory || normalizeText(v.category) === normalizedSelectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(v.title).includes(normalizedSearch) ||
        normalizeText(v.description).includes(normalizedSearch) ||
        normalizeText(v.category).includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [normalizedSearch, normalizedSelectedCategory]);

  const categories = Array.from(new Set(videos.map((v) => v.category)));

  return (
    <Layout onNavigate={setPage}>
      <button
        onClick={() => setPage("home")}
        style={backButtonStyle}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver a inicio
      </button>

      <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: `1px solid ${colors.border}` }}>
        <h1 style={{ color: colors.text, fontSize: typography.xl, fontWeight: typography.bold, margin: "0 0 6px", fontFamily: typography.fontFamily, letterSpacing: "-0.2px" }}>
          Videos tutoriales
        </h1>
        <p style={{ color: colors.textMuted, fontSize: typography.base, margin: 0, fontFamily: typography.fontFamily }}>
          Aprende con demostraciones visuales de cada función de la plataforma.
        </p>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedCategory("")}
          style={{ background: selectedCategory === "" ? colors.primary : colors.surface, color: selectedCategory === "" ? colors.white : colors.text, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: "8px 12px", cursor: "pointer" }}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{ background: selectedCategory === cat ? colors.primary : colors.surface, color: selectedCategory === cat ? colors.white : colors.text, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: "8px 12px", cursor: "pointer" }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "24px" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar por título, tema o categoría..." />
      </div>

      <p style={{ color: colors.textLight, fontSize: typography.sm, fontFamily: typography.fontFamily, marginBottom: "20px" }}>
        {filtered.length} video{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div style={{ ...styles.card, padding: "60px 40px", textAlign: "center", color: colors.textMuted, fontFamily: typography.fontFamily, fontSize: typography.base }}>
          No se encontraron videos con ese criterio.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              onClick={(event) => {
                modalTriggerRef.current = event.currentTarget;
                setActiveVideo(video);
              }}
            />
          ))}
        </div>
      )}

      <VideoModal
        key={activeVideo?.id || "video-modal-closed"}
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        triggerRef={modalTriggerRef}
      />
    </Layout>
  );
}

const backButtonStyle = {
  background: "transparent",
  border: "none",
  color: colors.dark,
  cursor: "pointer",
  fontSize: typography.sm,
  fontWeight: typography.semibold,
  fontFamily: typography.fontFamily,
  padding: 0,
  marginBottom: "20px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};
