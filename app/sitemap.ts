import type { MetadataRoute } from "next";

import { publicPathnames } from "@/content/page-placeholders";
import { getLocalizedPath, getSiteUrl, launchLocales } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const origin = siteUrl.toString().replace(/\/$/, "");
  return publicPathnames.flatMap((pathname) => {
    const alternateLanguages = Object.fromEntries(
      launchLocales.map((locale) => [locale, `${origin}${getLocalizedPath(locale, pathname)}`]),
    );

    return launchLocales.map((locale) => ({
      url: `${origin}${getLocalizedPath(locale, pathname)}`,
      alternates: { languages: alternateLanguages },
    }));
  });
}
