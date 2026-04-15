import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import App from "./App";

beforeAll(() => {
  window.scrollTo = () => {};
});

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

describe("Smoke navigation", () => {
  it("permite navegar desde home a secciones principales", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: /Videos tutoriales/i })[0]);
    expect(screen.getByRole("heading", { name: "Videos tutoriales" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Volver a inicio/i }));
    fireEvent.click(screen.getByRole("button", { name: /Preguntas frecuentes/i }));
    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Volver a inicio/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Procesos/i }));
    expect(screen.getByRole("heading", { name: "Procesos" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Volver a inicio/i }));
    fireEvent.click(screen.getByRole("button", { name: /Eventos/i }));
    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();
  }, 10000);
});
