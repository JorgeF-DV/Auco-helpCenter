import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateHelpCenterContentData } from "../src/help-center/content/validateContentData.js";

async function readJson(relativePath) {
  const absolutePath = resolve(process.cwd(), relativePath);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const [faqs, videos, processes] = await Promise.all([
    readJson("src/help-center/content/faqs.json"),
    readJson("src/help-center/content/videos.json"),
    readJson("src/help-center/content/processes.json"),
  ]);

  validateHelpCenterContentData({ faqs, videos, processes });
  console.log("[HelpCenterContent] OK");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
