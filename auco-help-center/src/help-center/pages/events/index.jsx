// ─────────────────────────────────────────────────────────────
// pages/events/index.jsx — Listado de eventos
//
// Funcionalidades:
//   - Listado de eventos por categoría
//   - Filtro por categoría (pills clickeables)
//   - Ordenamiento por fecha
// ─────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import Layout from "../../components/Layout";
import EventCard from "../../components/EventCard";
import { colors, typography, radius } from "../../styles/theme";
import events from "../../content/events.json";

const CATEGORY_ORDER = [
  "Webinar",
  "Taller",
  "Conferencia",
  "Evento comunitario",
];

// ── Cabecera de sección ─────────────────────────────────────
function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: `1px solid ${colors.border}` }}>
      <h1
        style={{
          color: colors.text,
          fontSize: typography.xl,
          fontWeight: typography.bold,
          margin: "0 0 6px",
          fontFamily: typography.fontFamily,
          letterSpacing: "-0.2px",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: colors.textMuted,
          fontSize: typography.base,
          margin: 0,
          fontFamily: typography.fontFamily,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

// ── Botón de volver ─────────────────────────────────────────
const backButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingRight: "12px",
  paddingLeft: "12px",
  paddingTop: "8px",
  paddingBottom: "8px",
  marginBottom: "20px",
  background: "transparent",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: typography.sm,
  fontWeight: typography.medium,
  color: colors.textMuted,
  fontFamily: typography.fontFamily,
  transition: "color 0.15s ease, background-color 0.15s ease",
};

function BackArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ── Filtros de categoría ────────────────────────────────────
function CategoryFilter({ allCategories, selected, onChange }) {
  return (
    <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <button
        onClick={() => onChange(null)}
        style={{
          backgroundColor: selected === null ? colors.primary : colors.backgroundSecondary,
          color: selected === null ? "white" : colors.text,
          border: "none",
          borderRadius: radius.full,
          padding: "8px 16px",
          fontSize: typography.sm,
          fontWeight: typography.semibold,
          cursor: "pointer",
          fontFamily: typography.fontFamily,
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          if (selected !== null) {
            e.currentTarget.style.backgroundColor = colors.borderLight;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = selected === null ? colors.primary : colors.backgroundSecondary;
        }}
      >
        Todos ({events.length})
      </button>

      {allCategories.map((category) => {
        const count = events.filter((e) => e.category === category).length;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            style={{
              backgroundColor: selected === category ? colors.primary : colors.backgroundSecondary,
              color: selected === category ? "white" : colors.text,
              border: "none",
              borderRadius: radius.full,
              padding: "8px 16px",
              fontSize: typography.sm,
              fontWeight: typography.semibold,
              cursor: "pointer",
              fontFamily: typography.fontFamily,
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (selected !== category) {
                e.currentTarget.style.backgroundColor = colors.borderLight;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                selected === category ? colors.primary : colors.backgroundSecondary;
            }}
          >
            {category} ({count})
          </button>
        );
      })}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────
export default function EventsPage({ setPage }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Obtener categorías en orden
  const categories = useMemo(() => {
    return CATEGORY_ORDER.filter((cat) => events.some((e) => e.category === cat));
  }, []);

  // Filtrar y ordenar eventos por fecha
  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (selectedCategory) {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    // Ordenar por fecha ascendente (próximos eventos primero)
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [selectedCategory]);

  const handleRegister = () => {};

  return (
    <Layout>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <button onClick={() => setPage("home")} style={backButtonStyle} aria-label="Volver al inicio">
          <BackArrow />
          Volver a inicio
        </button>

        <PageHeader
          title="Eventos"
          subtitle="Participa en webinars, talleres y conferencias sobre firma digital y transformación de procesos."
        />

        <CategoryFilter allCategories={categories} selected={selectedCategory} onChange={setSelectedCategory} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                category={event.category}
                date={event.date}
                time={event.time}
                duration={event.duration}
                instructor={event.instructor}
                capacity={event.capacity}
                onRegister={handleRegister}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px 20px",
                color: colors.textMuted,
              }}
            >
              <p style={{ fontSize: typography.base, fontFamily: typography.fontFamily }}>
                No hay eventos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
