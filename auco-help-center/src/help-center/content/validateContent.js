import faqs from "./faqs.json";
import videos from "./videos.json";
import processes from "./processes.json";
import documents from "./documents.json";
import { validateHelpCenterContentData } from "./validateContentData";

export function validateHelpCenterContent() {
  return validateHelpCenterContentData({ faqs, videos, processes, documents });
}
