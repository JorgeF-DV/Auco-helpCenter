import { useCallback, useRef, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import HomePage       from "./pages/index";
import FAQsPage       from "./pages/faqs/index";
import VideosPage     from "./pages/videos/index";
import ProcessesPage  from "./pages/processes/index";
import ProcessDetail  from "./pages/processes/[slug]";
import DocumentsPage  from "./pages/documents/index";
import EventsPage     from "./pages/events/index";
import { validateHelpCenterContent } from "./content/validateContent";

validateHelpCenterContent();

function ProcessDetailRoute({ setPage, setSelectedProcess }) {
  const { slug } = useParams();

  return (
    <ProcessDetail
      key={slug || "process-detail"}
      slug={slug}
      setPage={setPage}
      setSelectedProcess={setSelectedProcess}
    />
  );
}

function AucoHelpCenterRouter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedFaqSearch, setSelectedFaqSearch] = useState("");
  const [selectedVideoSearch, setSelectedVideoSearch] = useState("");

  const selectedProcessRef = useRef(selectedProcess);
  const selectedVideoCategoryRef = useRef(selectedVideoCategory);
  const selectedVideoIdRef = useRef(selectedVideoId);
  const selectedFaqSearchRef = useRef(selectedFaqSearch);
  const selectedVideoSearchRef = useRef(selectedVideoSearch);

  const updateSelectedProcess = useCallback((value) => {
    selectedProcessRef.current = value;
    setSelectedProcess(value);
  }, []);

  const updateSelectedVideoCategory = useCallback((value) => {
    selectedVideoCategoryRef.current = value;
    setSelectedVideoCategory(value);
  }, []);

  const updateSelectedVideoId = useCallback((value) => {
    selectedVideoIdRef.current = value;
    setSelectedVideoId(value);
  }, []);

  const updateSelectedFaqSearch = useCallback((value) => {
    selectedFaqSearchRef.current = value;
    setSelectedFaqSearch(value);
  }, []);

  const updateSelectedVideoSearch = useCallback((value) => {
    selectedVideoSearchRef.current = value;
    setSelectedVideoSearch(value);
  }, []);

  const pageToPath = useCallback((targetPage) => {
    switch (targetPage) {
      case "home":
        return "/";
      case "faqs": {
        const q = selectedFaqSearchRef.current || "";
        return q ? `/faqs?q=${encodeURIComponent(q)}` : "/faqs";
      }
      case "videos": {
        const params = new URLSearchParams();
        if (selectedVideoSearchRef.current) {
          params.set("q", selectedVideoSearchRef.current);
        }
        if (selectedVideoCategoryRef.current) {
          params.set("category", selectedVideoCategoryRef.current);
        }
        if (selectedVideoIdRef.current) {
          params.set("videoId", String(selectedVideoIdRef.current));
        }
        const query = params.toString();
        return query ? `/videos?${query}` : "/videos";
      }
      case "processes":
        return "/processes";
      case "process-detail":
        return selectedProcessRef.current ? `/processes/${selectedProcessRef.current}` : "/processes";
      case "documents":
        return "/documents";
      case "events":
        return "/events";
      default:
        return "/";
    }
  }, []);

  const navigateByPage = useCallback((newPage) => {
    navigate(pageToPath(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, pageToPath]);

  const clearVideoSelection = useCallback(() => {
    selectedVideoCategoryRef.current = null;
    selectedVideoIdRef.current = null;
    selectedVideoSearchRef.current = "";
    setSelectedVideoCategory(null);
    setSelectedVideoId(null);
    setSelectedVideoSearch("");
  }, []);

  const clearFaqSelection = useCallback(() => {
    selectedFaqSearchRef.current = "";
    setSelectedFaqSearch("");
  }, []);

  const routeFaqSearch = searchParams.get("q") || "";
  const routeVideoSearch = searchParams.get("q") || "";
  const routeVideoCategory = searchParams.get("category") || null;
  const routeVideoIdRaw = searchParams.get("videoId");
  const parsedVideoId = routeVideoIdRaw ? Number(routeVideoIdRaw) : null;
  const routeVideoId = Number.isInteger(parsedVideoId) ? parsedVideoId : null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            setPage={navigateByPage}
            setSelectedProcess={updateSelectedProcess}
            setSelectedVideoCategory={updateSelectedVideoCategory}
            setSelectedVideoId={updateSelectedVideoId}
            setSelectedFaqSearch={updateSelectedFaqSearch}
            setSelectedVideoSearch={updateSelectedVideoSearch}
          />
        }
      />
      <Route
        path="/faqs"
        element={
          <FAQsPage
            setPage={navigateByPage}
            initialSearch={selectedFaqSearch || routeFaqSearch}
            clearSelection={clearFaqSelection}
          />
        }
      />
      <Route
        path="/videos"
        element={
          <VideosPage
            setPage={navigateByPage}
            selectedVideoCategory={selectedVideoCategory || routeVideoCategory}
            selectedVideoId={selectedVideoId || routeVideoId}
            initialSearch={selectedVideoSearch || routeVideoSearch}
            clearSelection={clearVideoSelection}
          />
        }
      />
      <Route
        path="/processes"
        element={
          <ProcessesPage
            setPage={navigateByPage}
            setSelectedProcess={updateSelectedProcess}
          />
        }
      />
      <Route
        path="/processes/:slug"
        element={
          <ProcessDetailRoute
            setPage={navigateByPage}
            setSelectedProcess={updateSelectedProcess}
          />
        }
      />
      <Route path="/documents" element={<DocumentsPage setPage={navigateByPage} />} />
      <Route path="/events" element={<EventsPage setPage={navigateByPage} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function AucoHelpCenter() {
  return (
    <BrowserRouter>
      <AucoHelpCenterRouter />
    </BrowserRouter>
  );
}
