import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

beforeAll(() => {
  window.scrollTo = () => {};
  window.open = vi.fn();
});

beforeEach(() => {
  window.open.mockReset();
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
});
