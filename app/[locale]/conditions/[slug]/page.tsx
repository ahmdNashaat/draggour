import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConditionDetailPage } from "@/components/conditions/ConditionDetailPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { getPatientCondition, patientConditions } from "@/content/patient-conditions";
import type { PlaceholderPageKey } from "@/content/page-placeholders";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return patientConditions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveRouteLocale(params);

  if (locale === "fr") {
    return getPlaceholderMetadata(locale, slug as PlaceholderPageKey);
  }

  const condition = getPatientCondition(slug);
  if (!condition) return {};

  const content = condition[locale === "ar" ? "ar" : "en"];
  const description = content.blocks.flatMap((block) => block.paragraphs ?? [])[0] ?? content.title;

  return getLocaleMetadata(locale, `/conditions/${condition.slug}`, {
    title: content.title,
    description,
    keywords: content.searchTerms,
  });
}

export default async function PatientConditionRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveRouteLocale(params);

  if (locale === "fr") {
    return <PlaceholderPage locale={locale} pageKey={slug as PlaceholderPageKey} />;
  }

  const condition = getPatientCondition(slug);
  if (!condition) notFound();

  return <ConditionDetailPage condition={condition} locale={locale} />;
}
