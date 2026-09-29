import Link from "next/link";

import { launchLocales, type Locale } from "@/content/site";

const labels: Record<(typeof launchLocales)[number], string> = {
  en: "EN",
  ar: "AR",
};

type LanguageSwitcherProps = Readonly<{
  locale: Locale;
  label: string;
}>;

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  return (
    <div className="language-switcher" aria-label={label}>
      {launchLocales.map((availableLocale) => (
        <Link
          aria-current={availableLocale === locale ? "page" : undefined}
          className="language-switcher__link"
          href={`/${availableLocale}`}
          key={availableLocale}
        >
          {labels[availableLocale]}
        </Link>
      ))}
    </div>
  );
}
