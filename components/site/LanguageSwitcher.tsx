"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { launchLocales, type Locale } from "@/content/site";

const labels: Record<(typeof launchLocales)[number], string> = {
  en: "EN",
  ar: "AR",
};

type LanguageSwitcherProps = Readonly<{
  locale: Locale;
  label: string;
  optionLabels: Readonly<Record<(typeof launchLocales)[number], string>>;
}>;

export function LanguageSwitcher({ locale, label, optionLabels }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getSwitchUrl = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
      return segments.join("/");
    }
    return `/${newLocale}`;
  };

  return (
    <nav className="language-switcher" aria-label={label}>
      {launchLocales.map((availableLocale) => (
        <Link
          aria-label={optionLabels[availableLocale]}
          aria-current={availableLocale === locale ? "true" : undefined}
          className="language-switcher__link"
          href={getSwitchUrl(availableLocale)}
          key={availableLocale}
        >
          {labels[availableLocale]}
        </Link>
      ))}
    </nav>
  );
}
