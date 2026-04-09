import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import ProcessDetailPage from "./[slug]";
import processes from "../../content/processes.json";

beforeAll(() => {
  window.scrollTo = () => {};
});

describe("ProcessDetailPage", () => {
  it("muestra los pasos en flujo vertical sin controles de carrusel", () => {
    const process = processes.find((item) => item.slug === "reactivar-proceso-rechazado");

    render(
      <ProcessDetailPage
        slug={process.slug}
        setPage={() => {}}
        setSelectedProcess={() => {}}
      />
    );

    expect(screen.getByRole("heading", { name: process.title })).toBeInTheDocument();
    process.steps.forEach((step) => {
      expect(screen.getByText(step.action)).toBeInTheDocument();
    });
    expect(screen.getByText(process.tip)).toBeInTheDocument();
    expect(screen.queryByLabelText("Paso siguiente")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Paso anterior")).not.toBeInTheDocument();
  });
});