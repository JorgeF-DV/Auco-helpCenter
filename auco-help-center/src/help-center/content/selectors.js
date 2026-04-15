import { normalizeText } from "../utils/search";

export function getTopItems(items, count = 2) {
  return items.slice(0, count);
}

export function buildHomeSearchResults({
  query,
  faqs,
  videos,
  processes,
  documents,
  events,
  minLength = 3,
}) {
  const normalizedQuery = normalizeText(query || "");
  if (normalizedQuery.length < minLength) {
    return [];
  }

  const faqHits = faqs
    .filter((faq) => {
      const haystack = `${faq.question} ${faq.answer}`;
      return normalizeText(haystack).includes(normalizedQuery);
    })
    .map((faq) => ({
      type: "FAQ",
      label: faq.question,
      description: faq.answer,
      id: faq.id,
    }));

  const videoHits = videos
    .filter((video) => {
      const haystack = `${video.title} ${video.description} ${video.category}`;
      return normalizeText(haystack).includes(normalizedQuery);
    })
    .map((video) => ({
      type: "Video",
      label: video.title,
      description: video.description,
      id: video.id,
      category: video.category,
    }));

  const processHits = processes
    .filter((process) => {
      const stepActions = process.steps.map((step) => step.action).join(" ");
      const haystack = `${process.title} ${process.description} ${process.category} ${process.tip} ${stepActions}`;
      return normalizeText(haystack).includes(normalizedQuery);
    })
    .map((process) => ({
      type: "Proceso",
      label: process.title,
      description: process.description,
      id: process.number,
      slug: process.slug,
    }));

  const documentHits = documents
    .filter((document) => {
      const haystack = `${document.title} ${document.description} ${document.category}`;
      return normalizeText(haystack).includes(normalizedQuery);
    })
    .map((document) => ({
      type: "Documento",
      label: document.title,
      description: document.description,
      id: document.id,
      url: document.url,
    }));

  const eventHits = events
    .filter((event) => {
      const haystack = `${event.title} ${event.description} ${event.category}`;
      return normalizeText(haystack).includes(normalizedQuery);
    })
    .map((event) => ({
      type: "Evento",
      label: event.title,
      description: event.description,
      id: event.id,
      registrationUrl: event.registrationUrl,
    }));

  const dedup = new Map();
  [...faqHits, ...videoHits, ...processHits, ...documentHits, ...eventHits].forEach((hit) => {
    const key = `${hit.type}-${hit.id}`;
    if (!dedup.has(key)) {
      dedup.set(key, hit);
    }
  });

  return Array.from(dedup.values());
}

export function filterFaqs(faqs, { search = "", activeCategory = "Todos" }) {
  const normalizedSearch = normalizeText(search);

  return faqs.filter((faq) => {
    const matchesCategory = activeCategory === "Todos" || faq.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      normalizeText(faq.question).includes(normalizedSearch) ||
      normalizeText(faq.answer).includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export function filterVideos(videos, { search = "", selectedCategory = "" }) {
  const normalizedSearch = normalizeText(search);
  const normalizedSelectedCategory = normalizeText(selectedCategory);

  return videos.filter((video) => {
    const matchesCategory =
      !normalizedSelectedCategory || normalizeText(video.category) === normalizedSelectedCategory;
    const matchesSearch =
      !normalizedSearch ||
      normalizeText(video.title).includes(normalizedSearch) ||
      normalizeText(video.description).includes(normalizedSearch) ||
      normalizeText(video.category).includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export function getEventCategories(events, categoryOrder = []) {
  return categoryOrder.filter((category) => events.some((event) => event.category === category));
}

export function filterAndSortEvents(events, { selectedCategory = null }) {
  const filtered = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
}
