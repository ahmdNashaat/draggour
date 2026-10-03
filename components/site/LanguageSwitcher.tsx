"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { launchLocales, type Locale } from "@/content/site";

type LaunchLocale = (typeof launchLocales)[number];

/** Full name of each launch language, always written in its own script. */
const fullNames: Record<LaunchLocale, string> = {
  en: "English",
  ar: "عربي",
};

/** Short fallback used only by the current-language segment below 24rem. */
const shortCodes: Record<LaunchLocale, string> = {
  en: "EN",
  ar: "AR",
};

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LanguageSwitcherProps = Readonly<{
  locale: Locale;
  label: string;
  optionLabels: Readonly<Record<LaunchLocale, string>>;
}>;

function rememberLocale(newLocale: LaunchLocale) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * One compact two-segment control. The current language stays quiet; the other
 * language is the emphasised segment and carries the link a visitor expects.
 * The markup still exposes exactly two crawlable <a> elements with their
 * existing accessible names.
 */
export function LanguageSwitcher({ locale, label, optionLabels }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getSwitchUrl = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
      return segments.join("/");
    }
    return `/${newLocale}`;
  };

  // Current language first, then the language being offered. On /fr neither
  // launch locale is current, so the natural launch order is kept.
  const orderedLocales = [...launchLocales].sort(
    (a, b) => Number(b === locale) - Number(a === locale),
  );

  const handleSwitch = (event: React.MouseEvent<HTMLAnchorElement>, newLocale: LaunchLocale) => {
    rememberLocale(newLocale);

    // The href stays a plain path (crawlable, link-like); only the live
    // navigation has to carry the current query string and hash over.
    const extra = `${window.location.search}${window.location.hash}`;
    if (!extra) return;

    event.preventDefault();
    const target = event.currentTarget.getAttribute("href");
    if (target) router.push(`${target}${extra}`);
  };

  return (
    <nav className="language-switcher" aria-label={label}>
      {orderedLocales.map((availableLocale) => {
        const isCurrent = availableLocale === locale;

        return (
          <Link
            aria-label={optionLabels[availableLocale]}
            aria-current={isCurrent ? "true" : undefined}
            className={`language-switcher__link language-switcher__link--${isCurrent ? "current" : "other"}`}
            href={getSwitchUrl(availableLocale)}
            key={availableLocale}
            onClick={(event) => handleSwitch(event, availableLocale)}
          >
            <span className="language-switcher__name" lang={isCurrent ? undefined : availableLocale}>
              {fullNames[availableLocale]}
            </span>
            {isCurrent ? (
              <span className="language-switcher__code" aria-hidden="true">
                {shortCodes[availableLocale]}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
