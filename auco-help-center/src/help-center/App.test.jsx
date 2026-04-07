import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import App from "./App";

beforeAll(() => {
  window.scrollTo = () => {};
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
});
