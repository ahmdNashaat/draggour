import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BiographyPage as BiographyView } from "@/components/biography/BiographyPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

const pageKey = "biography" as const;

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

export default async function BiographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  return locale === "fr" ? <PlaceholderPage locale={locale} pageKey={pageKey} /> : <BiographyView locale={locale} />;
}
