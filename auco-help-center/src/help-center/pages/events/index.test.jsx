import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EventsPage from "./index";

describe("EventsPage", () => {
  it("filtra eventos por categoria", () => {
    render(<EventsPage setPage={() => {}} />);

    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Taller (1)" }));

    expect(screen.getByRole("heading", { name: "Automatización de procesos de firma con Auco" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Introducción a la firma digital en Auco" })).not.toBeInTheDocument();
  });

  it("vuelve al home desde el boton superior", () => {
    const setPage = vi.fn();

    render(<EventsPage setPage={setPage} />);

    fireEvent.click(screen.getByRole("button", { name: /Volver al inicio/i }));
    expect(setPage).toHaveBeenCalledWith("home");
  });
});
