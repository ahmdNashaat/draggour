import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Libre_Baskerville, Noto_Naskh_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { legalNavigation, primaryNavigation } from "@/content/navigation";
import { getLocalizedPath, locales, localeDirections, hasLocale, siteIdentity, type Locale } from "@/content/site";
import { getLocaleMetadata } from "@/lib/seo/metadata";

const displayFont = Libre_Baskerville({ subsets: ["latin"], variable: "--font-display-en", weight: ["400", "700"] });
const bodyFont = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body-en", weight: ["400", "500", "600", "700"] });
const arabicDisplayFont = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-display-ar", weight: ["400", "600", "700"] });
const arabicBodyFont = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], variable: "--font-body-ar", weight: ["400", "500", "600", "700"] });

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
  }));
  const footerLegalNavigation = legalNavigation.map(({ key, pathname }) => ({
    href: getLocalizedPath(locale, pathname),
    label: navigationTranslations(key),
  }));
  const year = new Date().getFullYear();

  return (
    <html data-scroll-behavior="smooth" lang={locale} dir={localeDirections[locale]}>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${arabicDisplayFont.variable} ${arabicBodyFont.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header
            brandName={siteIdentity.localizedName[locale]}
            closeMenuLabel={navigationTranslations("menuClose")}
            languageSwitcher={<LanguageSwitcher label={navigationTranslations("languageLabel")} locale={locale} />}
            locale={locale}
            menuLabel={navigationTranslations("menuOpen")}
            navigation={navigation}
            navigationLabel={navigationTranslations("primaryLabel")}
          />
          {children}
          <Footer
            brandName={siteIdentity.localizedName[locale]}
            copyright={footerTranslations("copyright", { year })}
            description={footerTranslations("description")}
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
