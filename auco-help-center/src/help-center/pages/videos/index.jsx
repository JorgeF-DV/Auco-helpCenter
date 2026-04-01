import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import VideoCard from "../../components/VideoCard";
import SearchBar from "../../components/SearchBar";
import { colors, typography, radius, shadows, styles } from "../../styles/theme";
import videos from "../../content/videos.json";

function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div
      onClick={onClose}
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
            <h3 style={{ margin: "6px 0 0", color: colors.text, fontSize: typography.md, fontWeight: typography.semibold, fontFamily: typography.fontFamily }}>{video.title}</h3>
          </div>

          <button
            onClick={onClose}
            style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.sm, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: "16px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ aspectRatio: "16 / 9" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
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

export default function VideosPage({ setPage, selectedVideoCategory, selectedVideoId, clearSelection }) {
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedVideoCategory) {
      setSelectedCategory(selectedVideoCategory);
    }
    if (selectedVideoId) {
      const video = videos.find((v) => v.id === selectedVideoId);
      if (video) {
        setActiveVideo(video);
      }
    }
    return () => {
      if (clearSelection) clearSelection();
    };
  }, [selectedVideoCategory, selectedVideoId, clearSelection]);

  const filtered = videos.filter(
    (v) =>
      (selectedCategory ? v.category.toLowerCase() === selectedCategory.toLowerCase() : true) &&
      (v.title.toLowerCase().includes(search.toLowerCase()) ||
       v.description.toLowerCase().includes(search.toLowerCase()) ||
       v.category.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = Array.from(new Set(videos.map((v) => v.category)));

  return (
    <Layout currentPage="videos" onNavigate={setPage}>
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
            <VideoCard key={video.id} {...video} onClick={() => setActiveVideo(video)} />
          ))}
        </div>
      )}

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </Layout>
  );
}
