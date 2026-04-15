import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateHelpCenterContentData } from "../src/help-center/content/validateContentData.js";
import { validateReferencedPublicAssets } from "./public-assets.js";

async function readJson(relativePath) {
  const absolutePath = resolve(process.cwd(), relativePath);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const [faqs, videos, processes, documents, events] = await Promise.all([
    readJson("src/help-center/content/faqs.json"),
    readJson("src/help-center/content/videos.json"),
    readJson("src/help-center/content/processes.json"),
    readJson("src/help-center/content/documents.json"),
    readJson("src/help-center/content/events.json"),
  ]);

  validateHelpCenterContentData({ faqs, videos, processes, documents, events });
  validateReferencedPublicAssets({ processes, documents });
  console.log("[HelpCenterContent] OK");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
