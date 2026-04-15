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
import { colors, typography, radius, getBackButtonStyle, getPillButtonStyle, pageStyles } from "../../styles/theme";
import events from "../../content/events.json";
import { filterAndSortEvents, getEventCategories } from "../../content/selectors";

const CATEGORY_ORDER = [
  "Webinar",
  "Taller",
  "Conferencia",
  "Evento comunitario",
];

// ── Cabecera de sección ─────────────────────────────────────
function PageHeader({ title, subtitle }) {
  return (
    <div style={pageStyles.sectionHeader}>
      <h1 style={pageStyles.sectionTitle}>
        {title}
      </h1>
      <p style={pageStyles.sectionSubtitle}>
        {subtitle}
      </p>
    </div>
  );
}

// ── Botón de volver ─────────────────────────────────────────
const backButtonStyle = {
  ...getBackButtonStyle(),
  color: colors.textMuted,
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
function CategoryFilter({ allCategories, selected, onChange, total, countByCategory }) {
  return (
    <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <button
        onClick={() => onChange(null)}
          style={getPillButtonStyle({ active: selected === null, activeBackground: colors.primary, activeColor: colors.white, inactiveBackground: colors.surface, inactiveColor: colors.text, borderRadius: radius.full, padding: "8px 16px", fontWeight: typography.semibold })}
        onMouseEnter={(e) => {
          if (selected !== null) {
            e.currentTarget.style.backgroundColor = colors.border;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = selected === null ? colors.primary : colors.surface;
        }}
      >
        Todos ({total})
      </button>

      {allCategories.map((category) => {
        const count = countByCategory.get(category) || 0;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            style={getPillButtonStyle({ active: selected === category, activeBackground: colors.primary, activeColor: colors.white, inactiveBackground: colors.surface, inactiveColor: colors.text, borderRadius: radius.full, padding: "8px 16px", fontWeight: typography.semibold })}
            onMouseEnter={(e) => {
              if (selected !== category) {
                e.currentTarget.style.backgroundColor = colors.border;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                selected === category ? colors.primary : colors.surface;
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
    return getEventCategories(events, CATEGORY_ORDER);
  }, []);

  const countByCategory = useMemo(() => {
    const counts = new Map();
    events.forEach((event) => {
      counts.set(event.category, (counts.get(event.category) || 0) + 1);
    });
    return counts;
  }, []);

  // Filtrar y ordenar eventos por fecha
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, { selectedCategory });
  }, [selectedCategory]);

  const handleRegister = () => {};

  return (
    <Layout onNavigate={setPage}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <button onClick={() => setPage("home")} style={backButtonStyle} aria-label="Volver al inicio">
          <BackArrow />
          Volver a inicio
        </button>

        <PageHeader
          title="Eventos"
          subtitle="Participa en webinars, talleres y conferencias sobre firma digital y transformación de procesos."
        />

        <CategoryFilter
          allCategories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          total={events.length}
          countByCategory={countByCategory}
        />

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
