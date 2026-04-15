import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

beforeAll(() => {
  window.scrollTo = () => {};
  window.open = vi.fn();
});

beforeEach(() => {
  window.open.mockReset();
  window.history.pushState({}, "", "/");
});

describe("Help Center App", () => {
  it("renderiza home por defecto", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Centro de Ayuda", level: 1 })).toBeInTheDocument();
  });

  it("navega a videos desde la card de home", () => {
    render(<App />);

    const videosButton = screen.getAllByRole("button", { name: /Videos tutoriales/i })[0];
    fireEvent.click(videosButton);

    expect(screen.getByRole("heading", { name: "Videos tutoriales" })).toBeInTheDocument();
  });

  it("redirige desde resultado FAQ y aplica filtro", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Busca por pregunta, tema o palabra clave...");
    fireEvent.change(searchInput, { target: { value: "estado firmado que no tiene firmas" } });

    const faqResult = screen.getByRole("button", { name: /Documento en estado firmado que no tiene firmas/i });
    fireEvent.click(faqResult);

    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();
    const faqSearchInput = screen.getByPlaceholderText("Buscar por pregunta o palabra clave...");
    expect(faqSearchInput).toHaveValue("Documento en estado firmado que no tiene firmas.");
  });

  it("redirige a un proceso desde la búsqueda global", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Busca por pregunta, tema o palabra clave...");
    fireEvent.change(searchInput, { target: { value: "Cómo reactivar un proceso rechazado por un firmante" } });

    const processResult = await screen.findByRole("button", { name: /Cómo reactivar un proceso rechazado por un firmante/i });
    fireEvent.click(processResult);

    expect(screen.getByRole("heading", { name: "Cómo reactivar un proceso rechazado por un firmante" })).toBeInTheDocument();
  });

  it("abre un documento legal desde la búsqueda global", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Busca por pregunta, tema o palabra clave...");
    fireEvent.change(searchInput, { target: { value: "Auco vs DocuSign" } });

    const documentResult = screen.getByRole("button", { name: /Auco vs DocuSign/i });
    fireEvent.click(documentResult);

    expect(window.open).toHaveBeenCalledWith("/Documentos Legales/Auco vs Docusign.pdf", "_blank", "noopener,noreferrer");
  });

  it("resuelve deep-link a detalle de proceso por slug", () => {
    window.history.pushState({}, "", "/processes/reactivar-proceso-rechazado");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Cómo reactivar un proceso rechazado por un firmante" })).toBeInTheDocument();
    expect(screen.getByText("Pasos del proceso")).toBeInTheDocument();
  });

  it("resuelve deep-link de FAQs con query param", () => {
    window.history.pushState(
      {},
      "",
      "/faqs?q=Documento%20en%20estado%20firmado%20que%20no%20tiene%20firmas."
    );

    render(<App />);

    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por pregunta o palabra clave...")).toHaveValue(
      "Documento en estado firmado que no tiene firmas."
    );
  });

  it("resuelve deep-link de videos con filtros por query params", () => {
    window.history.pushState(
      {},
      "",
      "/videos?q=perfil&category=Perfil&videoId=1"
    );

    render(<App />);

    expect(screen.getByRole("heading", { name: "Videos tutoriales" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por título, tema o categoría...")).toHaveValue("perfil");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("actualiza la vista al navegar con historial (back/forward)", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Centro de Ayuda", level: 1 })).toBeInTheDocument();

    act(() => {
      window.history.pushState({}, "", "/faqs?q=Documento%20en%20estado%20firmado%20que%20no%20tiene%20firmas.");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por pregunta o palabra clave...")).toHaveValue(
      "Documento en estado firmado que no tiene firmas."
    );

    act(() => {
      window.history.pushState({}, "", "/videos?q=perfil&category=Perfil&videoId=1");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("heading", { name: "Videos tutoriales" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por título, tema o categoría...")).toHaveValue("perfil");
  });

  it("resuelve deep-link a listado de procesos", () => {
    window.history.pushState({}, "", "/processes");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Procesos" })).toBeInTheDocument();
  });

  it("resuelve deep-link a eventos y documentos", () => {
    window.history.pushState({}, "", "/events");

    const { unmount } = render(<App />);
    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();

    unmount();
    window.history.pushState({}, "", "/documents");

    render(<App />);
    expect(screen.getByRole("heading", { name: "Documentos Legales" })).toBeInTheDocument();
  });

  it("redirige rutas desconocidas al home", () => {
    window.history.pushState({}, "", "/ruta-no-existe");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Centro de Ayuda", level: 1 })).toBeInTheDocument();
  });
});
