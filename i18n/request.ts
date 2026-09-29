import { getRequestConfig } from "next-intl/server";

import { hasLocale } from "@/content/site";
import { routing } from "@/i18n/routing";
import arabicMessages from "@/messages/ar.json";
import englishMessages from "@/messages/en.json";
import frenchMessages from "@/messages/fr.json";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && hasLocale(requestedLocale) ? requestedLocale : routing.defaultLocale;

  const messages = locale === "ar" ? arabicMessages : locale === "fr" ? frenchMessages : englishMessages;

  return {
    locale,
    messages,
  };
});
