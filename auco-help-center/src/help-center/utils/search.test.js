import { describe, expect, it } from "vitest";
import { includesNormalized, normalizeText } from "./search";

describe("search utils", () => {
  it("normaliza acentos, mayusculas y espacios", () => {
    expect(normalizeText("  ÁRbol  ")).toBe("arbol");
  });

  it("permite match acento-insensible", () => {
    expect(includesNormalized("validación de identidad", "validacion")).toBe(true);
  });

  it("retorna false cuando no hay match", () => {
    expect(includesNormalized("firma de documentos", "reportes")).toBe(false);
  });
});
