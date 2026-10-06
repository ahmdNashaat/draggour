import { redirect } from "next/navigation";

import { getLocalizedPath } from "@/content/site";
import { resolveRouteLocale } from "@/lib/route-locale";

export default async function LegacyCarotidStenosisPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveRouteLocale(params);
  redirect(getLocalizedPath(locale, "/conditions/carotid-intracranial-stenting"));
}
