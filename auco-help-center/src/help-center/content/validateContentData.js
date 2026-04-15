import { helpCenterContentSchema } from "./schemas.js";

export function validateHelpCenterContentData({ faqs, videos, processes, documents, events }) {
  const result = helpCenterContentSchema.safeParse({
    faqs,
    videos,
    processes,
    documents,
    events,
  });

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
        return `${path}${issue.message}`;
      })
      .join("\n");

    throw new Error(`[HelpCenterContent] ${issues}`);
  }
}
