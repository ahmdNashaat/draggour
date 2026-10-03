import { defineRouting } from "next-intl/routing";

import { locales } from "@/content/site";

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  // Detection is handled in proxy.ts and only ever resolves to en or ar, so
  // next-intl must never negotiate a visitor onto the French prototype routes.
  localeDetection: false,
  // French is route-ready but has no approved content in this phase.
  alternateLinks: false,
});
