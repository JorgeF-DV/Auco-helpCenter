import { useState, useCallback } from "react";
import HomePage       from "./pages/index";
import FAQsPage       from "./pages/faqs/index";
import VideosPage     from "./pages/videos/index";
import ProcessesPage  from "./pages/processes/index";
import ProcessDetail  from "./pages/processes/[slug]";

export default function AucoHelpCenter() {
  const [page, setPage] = useState("home");
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const navigate = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearVideoSelection = useCallback(() => {
    setSelectedVideoCategory(null);
    setSelectedVideoId(null);
  }, []);

  switch (page) {
    case "home":
      return (
        <HomePage
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
          setSelectedVideoCategory={setSelectedVideoCategory}
          setSelectedVideoId={setSelectedVideoId}
        />
      );

    case "faqs":
      return <FAQsPage setPage={navigate} />;

    case "videos":
      return (
        <VideosPage
          setPage={navigate}
          selectedVideoCategory={selectedVideoCategory}
          selectedVideoId={selectedVideoId}
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
          slug={selectedProcess}
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
        />
      );

    default:
      return (
        <HomePage
          setPage={navigate}
          setSelectedProcess={setSelectedProcess}
          setSelectedVideoCategory={setSelectedVideoCategory}
          setSelectedVideoId={setSelectedVideoId}
        />
      );
  }
}
