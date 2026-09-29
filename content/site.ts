export const locales = ["en", "ar", "fr"] as const;

export type Locale = (typeof locales)[number];

export const launchLocales = ["en", "ar"] as const satisfies readonly Locale[];

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
  fr: "ltr",
};

export const siteIdentity = {
  name: "Dr. Mohamed Aggour",
  localizedName: {
    en: "Dr. Mohamed Aggour",
    ar: "محمد عقور",
    fr: "Dr. Mohamed Aggour",
  },
  professionalTitle: {
    en: "Consultant Interventional Neuroradiologist",
    ar: "استشاري الأشعة العصبية التداخلية",
    fr: "Consultant Interventional Neuroradiologist",
  },
  description: "Official website of Dr. Mohamed Aggour.",
} as const;

export const prototypeBrand = {
  colors: {
    primaryNavy: "#0B2A44",
    warmNeutral: "#D7D0C6",
    restrainedVermilion: "#C44E2F",
    offWhite: "#F7F5F0",
    darkText: "#18212B",
  },
  // TEMPORARY PROTOTYPE URL — replace with doctor's official YouTube URL.
  temporaryYouTubeUrl: "https://www.youtube.com/",
} as const;

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getSiteUrl(): URL | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function getLocalizedPath(locale: Locale, pathname = "") {
  return `/${locale}${pathname}`;
}
