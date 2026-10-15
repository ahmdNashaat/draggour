import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BiographyPage as BiographyView } from "@/components/biography/BiographyPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import type { BiographyMoments } from "@/content/biography";
import type { Locale } from "@/content/site";
import { biographyMomentsFixture, fixtureCounts, type FixtureCount } from "@/tests/fixtures/biography-moments";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

const pageKey = "biography" as const;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/**
 * `/en/biography?moments=5` previews the gallery with test-only fixtures while
 * the doctor's photos are still pending. Production never reads `searchParams`,
 * so the route stays statically rendered and the preview cannot be served.
 */
async function momentsPreview(searchParams: SearchParams | undefined, locale: Locale): Promise<BiographyMoments | undefined> {
  if (process.env.NODE_ENV === "production" || !searchParams) return undefined;

  const raw = (await searchParams).moments;
  if (typeof raw !== "string") return undefined;

  const count = Number.parseInt(raw, 10);
  if (!fixtureCounts.includes(count as FixtureCount)) return undefined;

  return biographyMomentsFixture(locale, count as FixtureCount);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveRouteLocale(params);

  if (locale === "fr") {
    return getPlaceholderMetadata(locale, pageKey);
  }

  const t = await getTranslations({ locale, namespace: "content" });
  return getLocaleMetadata(locale, "/biography", {
    title: t("biography.title"),
    description: t("biography.description"),
  });
}

export default async function BiographyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: SearchParams;
}) {
  const locale = await resolveRouteLocale(params);
  if (locale === "fr") return <PlaceholderPage locale={locale} pageKey={pageKey} />;

  return <BiographyView locale={locale} momentsPreview={await momentsPreview(searchParams, locale)} />;
}
