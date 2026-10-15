import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { BiographyPage as BiographyView } from "@/components/biography/BiographyPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import type { BiographyMoments } from "@/content/biography";
import type { Locale } from "@/content/site";
import { assertBiographyMomentsValid } from "@/lib/biography-moments";
import { biographyMomentsFixture, fixtureCounts, type FixtureCount } from "@/tests/fixtures/biography-moments";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

const pageKey = "biography" as const;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type MomentsSource = Readonly<{
  /** Development-only counted preview; never resolved in production. */
  preview?: BiographyMoments;
  /** Temporary sample gallery, only while NEXT_PUBLIC_MOMENTS_PLACEHOLDER=1. */
  sample?: BiographyMoments;
}>;

/**
 * Which optional gallery sources this request carries.
 *
 * - `/en/biography?moments=5` previews a counted fixture set, development
 *   only, so the layout can be reviewed before the doctor's photos exist.
 * - The sample gallery needs NEXT_PUBLIC_MOMENTS_PLACEHOLDER=1 at build time
 *   (Vercel Preview scope only, never Production). In development the same
 *   rendering path can be exercised with `?placeholder=1`.
 *
 * The flag is read inline rather than through a helper, and the config file
 * always defines it, so a build without the flag folds this branch away and
 * the bundler drops the placeholder module entirely — none of its copy ships.
 */
async function resolveMoments(searchParams: SearchParams | undefined, locale: Locale): Promise<MomentsSource> {
  const dev = process.env.NODE_ENV !== "production" && searchParams ? await searchParams : undefined;

  const rawCount = typeof dev?.moments === "string" ? dev.moments : undefined;
  const count = rawCount ? Number.parseInt(rawCount, 10) : undefined;
  if (count !== undefined && fixtureCounts.includes(count as FixtureCount)) {
    return { preview: biographyMomentsFixture(locale, count as FixtureCount) };
  }

  if (process.env.NEXT_PUBLIC_MOMENTS_PLACEHOLDER === "1") {
    const { placeholderMoments, placeholderMomentsPair } = await import("@/content/biography-moments-placeholder");
    // A flagged build breaks loudly if the sample gallery breaks a rule.
    assertBiographyMomentsValid(placeholderMomentsPair());
    return { sample: locale === "ar" ? placeholderMoments.ar : placeholderMoments.en };
  }

  if (process.env.NODE_ENV !== "production" && dev?.placeholder === "1") {
    const { placeholderMoments, placeholderMomentsPair } = await import("@/content/biography-moments-placeholder");
    assertBiographyMomentsValid(placeholderMomentsPair());
    return { sample: locale === "ar" ? placeholderMoments.ar : placeholderMoments.en };
  }

  return {};
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

  const { preview, sample } = await resolveMoments(searchParams, locale);
  return <BiographyView locale={locale} momentsPreview={preview} placeholderMoments={sample} />;
}
