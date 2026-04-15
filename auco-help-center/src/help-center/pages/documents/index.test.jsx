import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import DocumentsPage from "./index";

beforeAll(() => {
  window.scrollTo = () => {};
});

beforeEach(() => {
  window.open = vi.fn();
});

describe("DocumentsPage", () => {
  it("abre un documento legal desde la tarjeta", () => {
    render(<DocumentsPage setPage={() => {}} />);

    const documentCard = screen.getByRole("button", { name: /Auco vs DocuSign/i });
    fireEvent.click(documentCard);

    expect(window.open).toHaveBeenCalledWith("/legal-docs/auco-vs-docusign.pdf", "_blank", "noopener,noreferrer");
  });

  it("descarga un documento legal desde el boton secundario", () => {
    const realCreateElement = document.createElement.bind(document);
    let anchorElement = null;

    const createElementSpy = vi.spyOn(document, "createElement").mockImplementation((tagName, options) => {
      const element = realCreateElement(tagName, options);
      if (tagName === "a") {
        element.click = vi.fn();
        anchorElement = element;
      }
      return element;
    });

    render(<DocumentsPage setPage={() => {}} />);

    const documentCard = screen.getByRole("button", { name: /Auco vs DocuSign/i });
    const downloadButton = within(documentCard).getByRole("button", { name: "Descargar" });
    fireEvent.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(anchorElement).not.toBeNull();
    expect(anchorElement.href).toContain("/legal-docs/auco-vs-docusign.pdf");
    expect(anchorElement.click).toHaveBeenCalled();

    createElementSpy.mockRestore();
  });
});