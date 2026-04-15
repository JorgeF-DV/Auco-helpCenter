import { describe, expect, it } from "vitest";
import { validateHelpCenterContentData } from "./validateContentData";

function basePayload() {
  return {
    faqs: [{ id: 1, category: "General", question: "Q", answer: "A" }],
    videos: [
      {
        id: 1,
        category: "Perfil",
        title: "Video",
        description: "Desc",
        youtubeId: "abc12345",
        duration: "3 min",
      },
    ],
    processes: [
      {
        slug: "proceso-a",
        category: "General",
        number: 1,
        title: "Proceso A",
        description: "Desc",
        tip: "Tip",
        steps: [{ step_number: 1, action: "Paso 1" }],
      },
    ],
    documents: [
      {
        id: 1,
        category: "Legal",
        title: "Documento",
        description: "Desc",
        lastUpdated: "2026-04-15",
        size: "10 KB",
        url: "/docs/a.pdf",
      },
    ],
    events: [
      {
        id: 1,
        category: "Webinar",
        title: "Evento",
        description: "Desc",
        date: "2026-04-15",
        time: "10:00",
        duration: "60 min",
        instructor: "Nombre",
        capacity: 10,
        registrationUrl: "https://example.com",
      },
    ],
  };
}

describe("validateHelpCenterContentData", () => {
  it("accepts valid content payload", () => {
    expect(() => validateHelpCenterContentData(basePayload())).not.toThrow();
  });

  it("throws for duplicate faq id", () => {
    const payload = basePayload();
    payload.faqs.push({ id: 1, category: "General", question: "Q2", answer: "A2" });

    expect(() => validateHelpCenterContentData(payload)).toThrow(/FAQ id duplicado/);
  });

  it("throws when process image lacks imageAlt", () => {
    const payload = basePayload();
    payload.processes[0].steps = [
      { step_number: 1, action: "Paso 1", image: "/img/a.png", imageAlt: "" },
    ];

    expect(() => validateHelpCenterContentData(payload)).toThrow(/imageAlt es obligatorio/);
  });
});
