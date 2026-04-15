import { describe, expect, it } from "vitest";
import {
  buildHomeSearchResults,
  filterAndSortEvents,
  filterFaqs,
  filterVideos,
  getEventCategories,
} from "./selectors";

describe("content selectors", () => {
  it("buildHomeSearchResults returns deduped typed hits", () => {
    const results = buildHomeSearchResults({
      query: "firma",
      faqs: [{ id: 1, question: "Firma", answer: "firma de documentos", category: "FAQ" }],
      videos: [{ id: 2, title: "Firma video", description: "tutorial", category: "Video" }],
      processes: [
        {
          number: 3,
          slug: "firma-proceso",
          title: "Firma proceso",
          description: "flujo",
          category: "Proceso",
          tip: "tip",
          steps: [{ action: "firmar" }],
        },
      ],
      documents: [{ id: 4, title: "Firma legal", description: "doc", category: "Doc", url: "/a.pdf" }],
      events: [
        {
          id: 5,
          title: "Evento firma",
          description: "evento",
          category: "Evento",
          registrationUrl: "https://example.com",
        },
      ],
    });

    expect(results).toHaveLength(5);
    expect(results.map((r) => r.type).sort()).toEqual([
      "Documento",
      "Evento",
      "FAQ",
      "Proceso",
      "Video",
    ]);
  });

  it("filterFaqs applies category and search", () => {
    const faqs = [
      { id: 1, category: "General", question: "Crear cuenta", answer: "Pasos" },
      { id: 2, category: "General", question: "Firmar", answer: "Como firmar" },
      { id: 3, category: "Seguridad", question: "2FA", answer: "Autenticacion" },
    ];

    const filtered = filterFaqs(faqs, { search: "firmar", activeCategory: "General" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(2);
  });

  it("filterVideos applies category and search", () => {
    const videos = [
      { id: 1, category: "Perfil", title: "Gestionar perfil", description: "perfil" },
      { id: 2, category: "Firma", title: "Firmar por correo", description: "firma" },
    ];

    const filtered = filterVideos(videos, { search: "perfil", selectedCategory: "Perfil" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(1);
  });

  it("events selectors return ordered categories and sorted events", () => {
    const events = [
      { id: 1, category: "Webinar", date: "2026-05-10" },
      { id: 2, category: "Taller", date: "2026-04-10" },
      { id: 3, category: "Webinar", date: "2026-04-01" },
    ];

    const categories = getEventCategories(events, ["Webinar", "Taller", "Conferencia"]);
    expect(categories).toEqual(["Webinar", "Taller"]);

    const filtered = filterAndSortEvents(events, { selectedCategory: "Webinar" });
    expect(filtered.map((event) => event.id)).toEqual([3, 1]);
  });
});
