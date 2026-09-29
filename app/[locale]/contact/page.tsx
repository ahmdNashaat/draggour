import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { ContactPage as ContactPageContent } from "@/components/site/ContactPage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocaleMetadata } from "@/lib/seo/metadata";
import { getPlaceholderMetadata } from "@/lib/seo/placeholder-metadata";

const pageKey = "contact" as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveRouteLocale(params);
  const t = await getTranslations({ locale, namespace: "content" });

  return locale === "fr"
    ? getPlaceholderMetadata(locale, pageKey)
    : getLocaleMetadata(locale, "/contact", {
        title: t("contactPage.title"),
        description: t("contactPage.description"),
      });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  return locale === "fr" ? <PlaceholderPage locale={locale} pageKey={pageKey} /> : <ContactPageContent locale={locale} />;
}
