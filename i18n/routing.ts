import { defineRouting } from "next-intl/routing";

import { locales } from "@/content/site";

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  // French is route-ready but has no approved content in this phase.
  alternateLinks: false,
});
