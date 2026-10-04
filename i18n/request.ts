import { getRequestConfig } from "next-intl/server";

import { hasLocale } from "@/content/site";
import { showPendingCopy } from "@/content/pending-copy";
import { routing } from "@/i18n/routing";
import arabicMessages from "@/messages/ar.json";
import englishMessages from "@/messages/en.json";
import frenchMessages from "@/messages/fr.json";
import pendingArabicMessages from "@/messages/pending/ar.json";
import pendingEnglishMessages from "@/messages/pending/en.json";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merges proposed copy over approved messages; approved keys win when absent. */
function mergePending<T>(base: T, pending: object): T {
  const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(pending)) {
    const current = merged[key];
    merged[key] = isPlainObject(value) && isPlainObject(current) ? mergePending(current, value) : value;
  }
  return merged as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && hasLocale(requestedLocale) ? requestedLocale : routing.defaultLocale;

  let messages = locale === "ar" ? arabicMessages : locale === "fr" ? frenchMessages : englishMessages;

  // Section 5 staging: a development-only preview of wording that has not
  // been approved yet. Production builds ignore the flag entirely.
  if (showPendingCopy && (locale === "en" || locale === "ar")) {
    messages = mergePending(messages, locale === "ar" ? pendingArabicMessages : pendingEnglishMessages);
  }

  return {
    locale,
    messages,
  };
});
