import { useState, useCallback } from "react";
import HomePage       from "./pages/index";
import FAQsPage       from "./pages/faqs/index";
import VideosPage     from "./pages/videos/index";
import ProcessesPage  from "./pages/processes/index";
import ProcessDetail  from "./pages/processes/[slug]";
import DocumentsPage  from "./pages/documents/index";
import EventsPage     from "./pages/events/index";
import { validateHelpCenterContent } from "./content/validateContent";

validateHelpCenterContent();

export default function AucoHelpCenter() {
  const [page, setPage] = useState("home");
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedFaqSearch, setSelectedFaqSearch] = useState("");
  const [selectedVideoSearch, setSelectedVideoSearch] = useState("");

  const navigate = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearVideoSelection = useCallback(() => {
    setSelectedVideoCategory(null);
    setSelectedVideoId(null);
    setSelectedVideoSearch("");
  }, []);

  const clearFaqSelection = useCallback(() => {
    setSelectedFaqSearch("");
  }, []);

  switch (page) {
    case "home":
      return (
        <HomePage
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
          setSelectedVideoCategory={setSelectedVideoCategory}
          setSelectedVideoId={setSelectedVideoId}
          setSelectedFaqSearch={setSelectedFaqSearch}
          setSelectedVideoSearch={setSelectedVideoSearch}
        />
      );

    case "faqs":
      return (
        <FAQsPage
          setPage={navigate}
          initialSearch={selectedFaqSearch}
          clearSelection={clearFaqSelection}
        />
      );

    case "videos":
      return (
        <VideosPage
          setPage={navigate}
          selectedVideoCategory={selectedVideoCategory}
          selectedVideoId={selectedVideoId}
          initialSearch={selectedVideoSearch}
          clearSelection={clearVideoSelection}
        />
      );

    case "processes":
      return (
        <ProcessesPage
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
        />
      );

    case "process-detail":
      return (
        <ProcessDetail
          key={selectedProcess || "process-detail"}
          slug={selectedProcess}
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
        />
      );

    case "documents":
      return (
        <DocumentsPage
          setPage={navigate}
        />
      );

    case "events":
      return (
        <EventsPage
          setPage={navigate}
        />
      );

    default:
      return (
        <HomePage
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
          setSelectedVideoCategory={setSelectedVideoCategory}
          setSelectedVideoId={setSelectedVideoId}
          setSelectedFaqSearch={setSelectedFaqSearch}
          setSelectedVideoSearch={setSelectedVideoSearch}
        />
      );
  }
}
