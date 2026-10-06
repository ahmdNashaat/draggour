import { redirect } from "next/navigation";

import { resolveRouteLocale } from "@/lib/route-locale";
import { getLocalizedPath } from "@/content/site";

export default async function LegacyStrokePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  redirect(getLocalizedPath(locale, "/conditions/stroke-thrombectomy"));
}
