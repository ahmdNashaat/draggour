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
 * - In development (`process.env.NODE_ENV === "development"`), the placeholder
 *   gallery is shown by default unless disabled with `?placeholder=0` or
 *   `NEXT_PUBLIC_MOMENTS_PLACEHOLDER=0`.
 * - In production builds, only `NEXT_PUBLIC_MOMENTS_PLACEHOLDER=1` enables the
 *   placeholder (Vercel Preview scope only, never Production). The development
 *   default branch is statically dead code in production builds and
 *   `searchParams` is not accessed in production, preserving static generation (SSG).
 */
async function resolveMoments(searchParams: SearchParams | undefined, locale: Locale): Promise<MomentsSource> {
  const isDev = process.env.NODE_ENV === "development";
  const dev = isDev && searchParams ? await searchParams : undefined;

  const rawCount = typeof dev?.moments === "string" ? dev.moments : undefined;
  const count = rawCount ? Number.parseInt(rawCount, 10) : undefined;
  if (count !== undefined && fixtureCounts.includes(count as FixtureCount)) {
    return { preview: biographyMomentsFixture(locale, count as FixtureCount) };
  }

  if (process.env.NEXT_PUBLIC_MOMENTS_PLACEHOLDER === "0") {
    return {};
  }

  if (isDev && dev?.placeholder === "0") {
    return {};
  }

  if (process.env.NEXT_PUBLIC_MOMENTS_PLACEHOLDER === "1") {
    const { placeholderMoments, placeholderMomentsPair } = await import("@/content/biography-moments-placeholder");
    // A flagged build breaks loudly if the sample gallery breaks a rule.
    assertBiographyMomentsValid(placeholderMomentsPair());
    return { sample: locale === "ar" ? placeholderMoments.ar : placeholderMoments.en };
  }

  if (isDev) {
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
