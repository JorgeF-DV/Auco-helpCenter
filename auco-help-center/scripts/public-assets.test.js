import { describe, expect, it } from "vitest";
import { validateReferencedPublicAssets } from "./public-assets.js";

function basePayload() {
  return {
    processes: [
      {
        steps: [
          {
            step_number: 1,
            action: "Paso 1",
            image: "/como-agregar-usuario-organizacion/step-1.png",
            imageAlt: "Paso 1",
          },
        ],
      },
    ],
    documents: [
      {
        url: "/legal-docs/auco-vs-docusign.pdf",
      },
    ],
  };
}

describe("validateReferencedPublicAssets", () => {
  it("accepts assets that exist in public", () => {
    expect(() => validateReferencedPublicAssets(basePayload())).not.toThrow();
  });

  it("throws when a referenced asset is missing", () => {
    const payload = basePayload();
    payload.processes[0].steps[0].image = "/no-existe.png";

    expect(() => validateReferencedPublicAssets(payload)).toThrow(/processes\.0\.steps\.0\.image: archivo no encontrado en public/);
  });
});