import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VideosPage from "./index";

describe("VideosPage modal accessibility", () => {
  it("abre el modal al hacer click en un video y enfoca el boton cerrar", () => {
    render(
      <VideosPage
        setPage={() => {}}
        selectedVideoCategory={null}
        selectedVideoId={null}
        initialSearch=""
        clearSelection={() => {}}
      />
    );

    const videoTitle = screen.getByText("Cómo gestionar tu perfil en Auco");
    const videoCard = videoTitle.closest("article");

    expect(videoCard).not.toBeNull();
    fireEvent.click(videoCard);

    const closeButton = screen.getByRole("button", { name: "Cerrar video" });
    expect(closeButton).toBeInTheDocument();
    expect(document.activeElement).toBe(closeButton);
  });

  it("cierra el modal con Escape", () => {
    render(
      <VideosPage
        setPage={() => {}}
        selectedVideoCategory={null}
        selectedVideoId={null}
        initialSearch=""
        clearSelection={() => {}}
      />
    );

    const videoTitle = screen.getByText("Cómo gestionar tu perfil en Auco");
    const videoCard = videoTitle.closest("article");

    expect(videoCard).not.toBeNull();
    fireEvent.click(videoCard);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
