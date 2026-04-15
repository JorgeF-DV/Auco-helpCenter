import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProcessesPage from "./index";
import processes from "../../content/processes.json";

describe("ProcessesPage", () => {
  it("navega al detalle al hacer click en una guia", () => {
    const setPage = vi.fn();
    const setSelectedProcess = vi.fn();
    const firstProcess = processes[0];

    render(
      <ProcessesPage
        setPage={setPage}
        setSelectedProcess={setSelectedProcess}
      />
    );

    expect(screen.getByRole("heading", { name: "Procesos" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: new RegExp(firstProcess.title, "i") }));

    expect(setSelectedProcess).toHaveBeenCalledWith(firstProcess.slug);
    expect(setPage).toHaveBeenCalledWith("process-detail");
  });
});
