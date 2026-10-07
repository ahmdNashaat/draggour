import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Libre_Baskerville, Noto_Naskh_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { StickyConsultationCta } from "@/components/site/StickyConsultationCta";
import { legalNavigation, primaryNavigation } from "@/content/navigation";
import { getLocalizedPath, locales, localeDirections, hasLocale, type Locale } from "@/content/site";
import { getLocaleMetadata } from "@/lib/seo/metadata";

const displayFont = Libre_Baskerville({ subsets: ["latin"], variable: "--font-display-en", weight: ["400", "700"] });
const bodyFont = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body-en", weight: ["400", "500", "600", "700"] });
// These are only used by RTL pages. Avoid preloading them on every English route;
// the browser still loads them when the Arabic font is actually applied.
const arabicDisplayFont = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-display-ar", weight: ["400", "600", "700"], preload: false });
const arabicBodyFont = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], variable: "--font-body-ar", weight: ["400", "500", "600", "700"], preload: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!hasLocale(localeParam)) {
    return {};
  }

  const t = await getTranslations({ locale: localeParam, namespace: "metadata" });

  return getLocaleMetadata(localeParam, "", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!hasLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [messages, navigationTranslations, footerTranslations] = await Promise.all([
    getMessages(),
    getTranslations("navigation"),
    getTranslations("footer"),
  ]);

  const navigation = primaryNavigation.map(({ key, pathname }) => ({
    href: getLocalizedPath(locale, pathname),
    label: navigationTranslations(key),
    isPrimaryAction: key === "consultation",
  }));
  const footerLegalNavigation = legalNavigation.map(({ key, pathname }) => ({
    href: getLocalizedPath(locale, pathname),
    label: navigationTranslations(key),
  }));
  const year = new Date().getFullYear();

  return (
    <html
      className={`${displayFont.variable} ${bodyFont.variable} ${arabicDisplayFont.variable} ${arabicBodyFont.variable}`}
      data-scroll-behavior="smooth"
      lang={locale}
      dir={localeDirections[locale]}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-link">
            {navigationTranslations("skipToMainContent")}
          </a>
          <Header
            closeMenuLabel={navigationTranslations("menuClose")}
            homeLabel={navigationTranslations("home")}
            languageSwitcher={
              <LanguageSwitcher
                label={navigationTranslations("languageLabel")}
                locale={locale}
                optionLabels={{ en: navigationTranslations("switchToEnglish"), ar: navigationTranslations("switchToArabic") }}
              />
            }
            locale={locale}
            menuLabel={navigationTranslations("menuOpen")}
            navigation={navigation}
            navigationLabel={navigationTranslations("primaryLabel")}
          />
          {children}
          <StickyConsultationCta locale={locale} />
          <Footer
            copyright={footerTranslations("copyright", { year })}
            legalLabel={navigationTranslations("legalLabel")}
            legalNavigation={footerLegalNavigation}
            locale={locale}
            navigation={navigation}
            navigationLabel={navigationTranslations("primaryLabel")}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
