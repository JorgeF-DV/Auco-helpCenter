import faqs from "./faqs.json";
import videos from "./videos.json";
import processes from "./processes.json";
import { validateHelpCenterContentData } from "./validateContentData";

export function validateHelpCenterContent() {
  return validateHelpCenterContentData({ faqs, videos, processes });
}
