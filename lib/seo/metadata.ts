import type { Metadata } from "next";

import {
  getLocalizedPath,
  getSiteUrl,
  launchLocales,
  siteIdentity,
  type Locale,
} from "@/content/site";

const siteUrl = getSiteUrl();

type MetadataOverrides = Readonly<{
  title?: string;
  description?: string;
}>;

export function getLocaleMetadata(locale: Locale, pathname = "", overrides: MetadataOverrides = {}): Metadata {
  const canonicalPath = getLocalizedPath(locale, pathname);
  const languages = Object.fromEntries(
    launchLocales.map((availableLocale) => [availableLocale, getLocalizedPath(availableLocale, pathname)]),
  );

  return {
    metadataBase: siteUrl ?? undefined,
    title: {
      default: overrides.title ?? siteIdentity.name,
      template: `%s | ${siteIdentity.name}`,
    },
    description: overrides.description ?? siteIdentity.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...languages,
        "x-default": getLocalizedPath("en", pathname),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteIdentity.name,
      title: overrides.title ?? siteIdentity.name,
      description: overrides.description ?? siteIdentity.description,
      url: canonicalPath,
      locale: locale === "ar" ? "ar_EG" : locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: launchLocales.filter((availableLocale) => availableLocale !== locale),
    },
    robots: {
      index: launchLocales.includes(locale as (typeof launchLocales)[number]),
      follow: true,
    },
  };
}
