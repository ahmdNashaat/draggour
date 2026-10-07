import { getSiteUrl, siteIdentity, type Locale } from "../../content/site";
import { buildPersonId, personEntityConfig } from "./person-entity";

export type JsonLdValue = Record<string, unknown>;

export function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function personEntity(origin: URL): JsonLdValue {
  const person: JsonLdValue = {
    "@type": "Person",
    "@id": buildPersonId(origin),
    name: personEntityConfig.canonicalName,
    alternateName: personEntityConfig.localizedName.ar,
    jobTitle: [personEntityConfig.professionalTitles.en, personEntityConfig.professionalTitles.ar],
    knowsAbout: [
      ...personEntityConfig.knowsAbout,
      ...personEntityConfig.conditions.map((condition) => {
        const conditionUrl = new URL(`/en/conditions/${condition.slug}`, origin).toString();
        return {
          "@type": "MedicalCondition",
          "@id": conditionUrl,
          name: condition.name,
          url: conditionUrl,
        };
      }),
    ],
    url: new URL("/en/biography", origin).toString(),
    // Square 1024 emblem on the canonical domain; sameAs and every other
    // property stay exactly as they were.
    image: new URL("/brand/aggour-emblem-flat-1024.png", origin).toString(),
  };

  if (personEntityConfig.approvedSameAs.length > 0) {
    person.sameAs = [...personEntityConfig.approvedSameAs];
  }

  return person;
}

export function buildPersonJsonLd(siteUrl: URL | null = getSiteUrl()): JsonLdValue | null {
  if (!siteUrl) return null;
  const person = personEntity(siteUrl);

  return {
    "@context": "https://schema.org",
    ...person,
  };
}

export function buildBiographyJsonLd(locale: Locale, siteUrl: URL | null = getSiteUrl()): JsonLdValue | null {
  if (!siteUrl) return null;
  const profileUrl = new URL(`/${locale}/biography`, siteUrl).toString();
  const person = personEntity(siteUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profilepage`,
        url: profileUrl,
        name: locale === "ar"
          ? `السيرة الذاتية | ${siteIdentity.localizedName.ar}`
          : `Biography | ${siteIdentity.name}`,
        inLanguage: locale,
        mainEntity: { "@id": buildPersonId(siteUrl) },
      },
      person,
    ],
  };
}

export function buildBreadcrumbJsonLd(locale: Locale, items: readonly { name: string; pathname: string }[]): JsonLdValue | null {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;

  const origin = siteUrl.toString().replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}/${locale}${item.pathname}`,
    })),
  };
}
