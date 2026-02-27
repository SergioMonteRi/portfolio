import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  /** PT served at `/`, EN served at `/en`. */
  localePrefix: "as-needed",
});
