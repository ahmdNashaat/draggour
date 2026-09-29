import type { Metadata } from "next";

import { ELearningPage as ELearningContent } from "@/components/professional/ELearningPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { getTranslations } from "next-intl/server";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";
import { getLocaleMetadata } from "@/lib/seo/metadata";

const pageKey = "e-learning" as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveRouteLocale(params);
  const t = await getTranslations({ locale, namespace: "content" });

  return locale === "fr"
    ? getPlaceholderMetadata(locale, pageKey)
    : getLocaleMetadata(locale, "/e-learning", {
        title: t("eLearningPage.title"),
        description: t("eLearningPage.description"),
      });
}

export default async function ELearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  return locale === "fr" ? <PlaceholderPage locale={locale} pageKey={pageKey} /> : <ELearningContent locale={locale} />;
}
