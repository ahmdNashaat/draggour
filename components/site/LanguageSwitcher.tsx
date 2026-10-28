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
 * One button naming the language it leads to (UI/UX committee decision K1):
 * the target language only, written in its own script with a `lang` cue, plus
 * the switch phrase as screen-reader-only *content* — not `aria-label`, so the
 * accessible name still contains the visible word (WCAG 2.5.3, enforced by the
 * A2 axe gate) while each language keeps its own voice. There is no
 * current-language segment, no `aria-current` and no short-code fallback; the
 * single reciprocal link stays crawlable and the hreflang alternates in the
 * document head are untouched. On /fr (not a launch language) the switch
 * points at the site's primary locale.
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

  const target: LaunchLocale = locale === "en" ? "ar" : "en";

  const handleSwitch = (event: React.MouseEvent<HTMLAnchorElement>, newLocale: LaunchLocale) => {
    rememberLocale(newLocale);

    // The href stays a plain path (crawlable, link-like); only the live
    // navigation has to carry the current query string and hash over.
    const extra = `${window.location.search}${window.location.hash}`;
    if (!extra) return;

    event.preventDefault();
    const destination = event.currentTarget.getAttribute("href");
    if (destination) router.push(`${destination}${extra}`);
  };

  return (
    <nav className="language-switcher" aria-label={label}>
      <Link
        className="language-switcher__link"
        href={getSwitchUrl(target)}
        onClick={(event) => handleSwitch(event, target)}
      >
        <span className="language-switcher__name" lang={target}>
          {fullNames[target]}
        </span>
        <span className="sr-only">{optionLabels[target]}</span>
      </Link>
    </nav>
  );
}
