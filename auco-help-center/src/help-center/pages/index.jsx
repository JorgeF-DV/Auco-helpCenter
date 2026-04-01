import { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { colors, typography, radius, shadows, styles } from "../styles/theme";
import faqs from "../content/faqs.json";
import videos from "../content/videos.json";
import processes from "../content/processes.json";

function SectionCard({ title, subtitle, count, onClick, accentColor, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        border: `1.5px solid ${hovered ? accentColor : colors.border}`,
        padding: "24px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 6px 20px ${accentColor}22` : shadows.sm,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: radius.md,
          background: `${accentColor}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${accentColor}25`,
        }}
      >
        {icon(accentColor)}
      </div>

      <div>
        <h3 style={{ color: colors.text, fontSize: typography.md, fontWeight: typography.semibold, margin: "0 0 4px", fontFamily: typography.fontFamily }}>
          {title}
        </h3>
        <p style={{ color: colors.textMuted, fontSize: typography.sm, margin: 0, fontFamily: typography.fontFamily }}>
          {subtitle} · {count}
        </p>
      </div>

      <span style={{ color: accentColor, fontSize: typography.sm, fontWeight: typography.semibold, fontFamily: typography.fontFamily, display: "flex", gap: "4px", alignItems: "center" }}>
        Ver todo
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>
  );
}

function SearchResult({ type, label, description }) {
  const isVideo = type === "Video";
  return (
    <div style={{ ...styles.card, padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
      <span style={{ ...styles.badge, background: isVideo ? colors.successBg : colors.primaryBg, color: isVideo ? "#15803D" : colors.primary, whiteSpace: "nowrap", marginTop: "2px" }}>
        {type}
      </span>
      <div>
        <p style={{ fontWeight: typography.semibold, color: colors.text, margin: 0, fontSize: typography.base, fontFamily: typography.fontFamily }}>
          {label}
        </p>
        <p style={{ color: colors.textMuted, fontSize: typography.sm, margin: "4px 0 0", fontFamily: typography.fontFamily }}>
          {description.substring(0, 110)}...
        </p>
      </div>
    </div>
  );
}

const faqIcon = (color) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const videoIcon = (color) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const processIcon = (color) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export default function HomePage({ setPage, setSelectedProcess, setSelectedVideoCategory, setSelectedVideoId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults =
    searchTerm.length > 2
      ? [
          ...faqs
            .filter((f) => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((f) => ({ type: "FAQ", label: f.question, description: f.answer })),
          ...videos
            .filter((v) => v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.description.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((v) => ({ type: "Video", label: v.title, description: v.description })),
        ]
      : [];

  const topFaqs = faqs.slice(0, 2);
  const topVideos = videos.slice(0, 2);
  const topProcesses = processes.slice(0, 2);

  return (
    <Layout currentPage="home" onNavigate={setPage}>
      <section style={{ background: `linear-gradient(140deg, ${colors.dark} 0%, #1a3a6b 100%)`, borderRadius: radius.lg, padding: "52px 48px", marginBottom: "36px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />

        <h1 style={{ color: colors.white, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: typography.bold, margin: "0 0 10px", fontFamily: typography.fontFamily, letterSpacing: "-0.3px", position: "relative" }}>
          Centro de Ayuda
        </h1>
        <p style={{ color: "rgba(255,255,255,0.83)", margin: "0 0 20px", fontSize: typography.base, fontFamily: typography.fontFamily, maxWidth: 580, lineHeight: 1.5 }}>
          Encuentra respuestas rápidas, tutoriales y guías prácticas para resolver tus dudas con Auco.
        </p>

        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Busca por pregunta, tema o palabra clave..." />
      </section>

      {searchTerm.length > 2 ? (
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ color: colors.text, fontSize: typography.lg, fontWeight: typography.semibold, margin: "0 0 14px", fontFamily: typography.fontFamily }}>Resultados de búsqueda</h2>
          {searchResults.length === 0 ? (
            <div style={{ ...styles.card, padding: "44px 26px", textAlign: "center", color: colors.textMuted, fontFamily: typography.fontFamily }}>
              No se encontraron resultados para <strong>{searchTerm}</strong>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {searchResults.map((hit, index) => (
                <SearchResult key={`${hit.type}-${index}`} {...hit} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <h2 style={{ color: colors.text, fontSize: typography.lg, fontWeight: typography.semibold, margin: "0 0 16px", fontFamily: typography.fontFamily }}>
            ¿En qué podemos ayudarte?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "40px" }}>
            <SectionCard title="Preguntas frecuentes" subtitle="Respuestas rápidas" count={`${faqs.length} artículos`} onClick={() => setPage("faqs")} accentColor={colors.primary} icon={faqIcon} />
            <SectionCard title="Videos tutoriales" subtitle="Aprende paso a paso" count={`${videos.length} videos`} onClick={() => setPage("videos")} accentColor={colors.primary} icon={videoIcon} />
            <SectionCard title="Procesos" subtitle="Guías detalladas" count={`${processes.length} guías`} onClick={() => setPage("processes")} accentColor={colors.primary} icon={processIcon} />
          </div>

          <h2 style={{ color: colors.text, fontSize: typography.lg, fontWeight: typography.semibold, margin: "0 0 16px", fontFamily: typography.fontFamily }}>
            Lo más consultado
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {topFaqs.map((faq) => (
              <div key={`faq-${faq.id}`} style={{ ...styles.card, padding: "18px", cursor: "default" }}>
                <span style={{ ...styles.badge, background: colors.primaryBg, color: colors.primary, marginBottom: "8px" }}>FAQ</span>
                <h3 style={{ color: colors.text, fontSize: typography.base, fontWeight: typography.semibold, margin: "0 0 8px", fontFamily: typography.fontFamily }}>{faq.question}</h3>
                <p style={{ color: colors.textMuted, fontSize: typography.sm, margin: 0, fontFamily: typography.fontFamily, lineHeight: 1.5 }}>{faq.answer.substring(0, 110)}...</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "28px" }}>
            {topVideos.map((video) => (
              <div
                key={`video-${video.id}`}
                onClick={() => {
                  setSelectedVideoCategory(video.category);
                  setSelectedVideoId(video.id);
                  setPage("videos");
                }}
                style={{ ...styles.card, padding: "18px", cursor: "pointer", border: `1.5px solid ${colors.border}` }}
              >
                <span style={{ ...styles.badge, background: colors.successBg, color: "#15803D", marginBottom: "8px" }}>{video.category}</span>
                <h3 style={{ color: colors.text, fontSize: typography.base, fontWeight: typography.semibold, margin: "0 0 8px", fontFamily: typography.fontFamily }}>{video.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: typography.sm, margin: 0, fontFamily: typography.fontFamily, lineHeight: 1.5 }}>{video.description.substring(0, 100)}...</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
            {topProcesses.map((p) => (
              <button
                key={p.slug}
                onClick={() => {
                  setSelectedProcess(p.slug);
                  setPage("process-detail");
                }}
                style={{ ...styles.card, padding: "18px", textAlign: "left", border: `1.5px solid ${colors.border}`, cursor: "pointer" }}
              >
                <span style={{ ...styles.badge, background: colors.primaryBg, color: colors.primary, marginBottom: "8px" }}>{p.category}</span>
                <h3 style={{ color: colors.text, fontSize: typography.base, fontWeight: typography.semibold, margin: "0 0 8px", fontFamily: typography.fontFamily }}>{p.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: typography.sm, margin: 0, fontFamily: typography.fontFamily, lineHeight: 1.5 }}>{p.description.substring(0, 102)}...</p>
                <span style={{ color: colors.primary, fontSize: typography.sm, fontWeight: typography.semibold, marginTop: "8px", display: "inline-block" }}>{p.steps.length} pasos →</span>
              </button>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
