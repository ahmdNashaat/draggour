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
  keywords?: readonly string[];
}>;

export function getLocaleMetadata(locale: Locale, pathname = "", overrides: MetadataOverrides = {}): Metadata {
  const canonicalPath = getLocalizedPath(locale, pathname);
  const pageUrl = siteUrl ? new URL(canonicalPath, siteUrl).toString() : undefined;
  const localizedName = siteIdentity.localizedName[locale];
  const socialImage = siteUrl
    ? new URL("/brand/aggour-og-1200x630.png", siteUrl).toString()
    : undefined;
  const title = overrides.title
    ? overrides.title === localizedName || overrides.title.startsWith(`${localizedName} |`)
      ? overrides.title
      : `${overrides.title} | ${localizedName}`
    : localizedName;
  const languages = siteUrl && launchLocales.includes(locale as (typeof launchLocales)[number])
    ? Object.fromEntries(
        launchLocales.map((availableLocale) => [
          availableLocale,
          new URL(getLocalizedPath(availableLocale, pathname), siteUrl).toString(),
        ]),
      )
    : undefined;

  return {
    metadataBase: siteUrl ?? undefined,
    title,
    description: overrides.description ?? siteIdentity.description,
    ...(overrides.keywords ? { keywords: [...overrides.keywords] } : {}),
    alternates: {
      ...(pageUrl ? { canonical: pageUrl } : {}),
      ...(languages && siteUrl
        ? { languages }
        : {}),
    },
    openGraph: {
      type: "website",
      siteName: siteIdentity.name,
      title,
      description: overrides.description ?? siteIdentity.description,
      ...(pageUrl ? { url: pageUrl } : {}),
      ...(socialImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: siteIdentity.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: overrides.description ?? siteIdentity.description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    robots: {
      index: launchLocales.includes(locale as (typeof launchLocales)[number]),
      follow: true,
    },
  };
}
