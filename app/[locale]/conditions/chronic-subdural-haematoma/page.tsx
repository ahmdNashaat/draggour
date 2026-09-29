import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ConditionDetailPage } from "@/components/conditions/ConditionDetailPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { getConditionContent } from "@/content/conditions";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

const pageKey = "chronic-subdural-haematoma" as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveRouteLocale(params);
  if (locale === "fr") return getPlaceholderMetadata(locale, pageKey);
  const condition = getConditionContent(pageKey);
  if (!condition) return {};
  const home = await getTranslations({ locale, namespace: "home" });
  return getLocaleMetadata(locale, `/conditions/${condition.slug}`, {
    title: home(`conditions.items.${condition.key}.title`),
    description: locale === "ar" ? condition.arabicDescription : condition.description,
  });
}

export default async function ChronicSubduralHaematomaPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  const condition = getConditionContent(pageKey);
  if (!condition) notFound();
  return locale === "fr" ? <PlaceholderPage locale={locale} pageKey={pageKey} /> : <ConditionDetailPage locale={locale} condition={condition} />;
}
