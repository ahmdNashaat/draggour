import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { hasLocale, type Locale } from "@/content/site";

export async function resolveRouteLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale: localeParam } = await params;

  if (!hasLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  setRequestLocale(locale);
  return locale;
}
