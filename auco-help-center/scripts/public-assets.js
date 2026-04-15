import { existsSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { cwd } from "node:process";

const publicRoot = resolve(cwd(), "public");

function toPublicRelativePath(reference) {
  const trimmedReference = reference.trim().split(/[?#]/, 1)[0];

  if (!trimmedReference.startsWith("/")) {
    return null;
  }

  return trimmedReference.slice(1);
}

function publicAssetExists(reference) {
  const relativePath = toPublicRelativePath(reference);

  if (!relativePath) {
    return false;
  }

  const absolutePath = resolve(publicRoot, relativePath);
  const publicRelativePath = relative(publicRoot, absolutePath);

  if (publicRelativePath.startsWith("..") || publicRelativePath.includes(":")) {
    return false;
  }

  if (!existsSync(absolutePath)) {
    return false;
  }

  return statSync(absolutePath).isFile();
}

export function validateReferencedPublicAssets({ processes, documents }) {
  const issues = [];

  processes.forEach((process, processIndex) => {
    process.steps.forEach((step, stepIndex) => {
      if (typeof step.image === "string" && step.image.trim().length > 0 && !publicAssetExists(step.image)) {
        issues.push({
          path: ["processes", processIndex, "steps", stepIndex, "image"],
          message: `archivo no encontrado en public: ${step.image}`,
        });
      }
    });
  });

  documents.forEach((document, documentIndex) => {
    if (typeof document.url === "string" && !publicAssetExists(document.url)) {
      issues.push({
        path: ["documents", documentIndex, "url"],
        message: `archivo no encontrado en public: ${document.url}`,
      });
    }
  });

  if (issues.length > 0) {
    throw new Error(`[HelpCenterContent] ${issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n")}`);
  }
}