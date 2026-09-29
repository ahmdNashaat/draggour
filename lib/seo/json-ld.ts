import { getSiteUrl, siteIdentity, type Locale } from "@/content/site";

export type JsonLdValue = Record<string, unknown>;

export function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(locale: Locale): JsonLdValue {
  const siteUrl = getSiteUrl();
  const person: JsonLdValue = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteIdentity.localizedName[locale],
    inLanguage: locale,
  };

  if (siteUrl) {
    person.url = `${siteUrl.toString().replace(/\/$/, "")}${`/${locale}`}`;
  }

  return person;
}

export function buildBiographyJsonLd(locale: Locale): JsonLdValue {
  const person = buildPersonJsonLd(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Biography | ${siteIdentity.name}`,
    inLanguage: locale,
    mainEntity: {
      ...person,
      jobTitle: siteIdentity.professionalTitle[locale],
    },
  };
}

export function buildBreadcrumbJsonLd(locale: Locale, items: readonly { name: string; pathname: string }[]): JsonLdValue {
  const siteUrl = getSiteUrl();
  const origin = siteUrl?.toString().replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: origin ? `${origin}/${locale}${item.pathname}` : `/${locale}${item.pathname}`,
    })),
  };
}
