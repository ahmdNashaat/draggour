import type { Metadata } from "next";

import { getPageDefinition, type PlaceholderPageKey } from "@/content/page-placeholders";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/content/site";

export function getPlaceholderMetadata(locale: Locale, pageKey: PlaceholderPageKey): Metadata {
  const page = getPageDefinition(locale, pageKey);

  return getLocaleMetadata(locale, page.pathname, {
    title: page.title,
    description: page.description,
  });
}
