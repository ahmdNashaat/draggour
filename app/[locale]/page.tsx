import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/home/HomePage";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";
import { hasLocale, type Locale } from "@/content/site";

export default async function FoundationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;

  if (!hasLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  setRequestLocale(locale);

  return locale === "fr" ? <PlaceholderPage locale={locale} pageKey="home" /> : <HomePage locale={locale} />;
}
