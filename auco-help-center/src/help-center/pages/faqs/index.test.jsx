import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import FAQsPage from "./index";

beforeAll(() => {
  window.scrollTo = () => {};
});

describe("FAQsPage", () => {
  it("filtra por categoria y por busqueda", () => {
    render(
      <FAQsPage
        setPage={() => {}}
        initialSearch=""
        clearSelection={() => {}}
      />
    );

    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Organización" }));
    expect(screen.getByText(/en "Organización"/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Buscar por pregunta o palabra clave...");
    fireEvent.change(searchInput, { target: { value: "texto inexistente" } });

    expect(screen.getByText(/No se encontraron preguntas con ese criterio/i)).toBeInTheDocument();
  }, 15000);

  it("limpia la seleccion al desmontar", () => {
    const clearSelection = vi.fn();

    const { unmount } = render(
      <FAQsPage
        setPage={() => {}}
        initialSearch=""
        clearSelection={clearSelection}
      />
    );

    unmount();
    expect(clearSelection).toHaveBeenCalledTimes(1);
  });
});
