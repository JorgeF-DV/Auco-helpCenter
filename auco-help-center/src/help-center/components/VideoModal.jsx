// ─────────────────────────────────────────────────────────────
// VideoModal.jsx
//
// Modal que reproduce el video de YouTube seleccionado.
// Se monta encima de toda la UI usando position: fixed.
//
// Props:
//   video   (object | null) → el video activo (null = modal cerrado)
//   onClose (function)      → callback para cerrar el modal
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { colors, radius, shadow } from "../styles/theme";

export default function VideoModal({ video, onClose }) {

  // Cierra el modal si el usuario presiona la tecla Escape
  useEffect(() => {
    if (!video) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [video, onClose]);

  // Si no hay video seleccionado, no renderiza nada
  if (!video) return null;

  return (
    // Overlay de fondo — clic fuera del modal lo cierra
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 10, 30, 0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "24px",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Contenedor del modal — stopPropagation evita cierre al hacer clic dentro */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.white,
          borderRadius: radius.xl,
          overflow: "hidden",
          width: "100%",
          maxWidth: "820px",
          boxShadow: shadow.lg,
        }}
      >
        {/* ── Cabecera ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          >
            {video.title}
          </h2>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar video"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.textMuted,
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── iframe de YouTube ── */}
        {/* autoplay=1 inicia el video automáticamente al abrir el modal */}
        <div style={{ aspectRatio: "16 / 9" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
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
