import Link from "next/link";

import type { Locale } from "@/content/site";

import { Logo } from "@/components/site/Logo";

export type FooterNavigationItem = Readonly<{
  href: string;
  label: string;
}>;

type FooterProps = Readonly<{
  locale: Locale;
  navigation: readonly FooterNavigationItem[];
  legalNavigation: readonly FooterNavigationItem[];
  navigationLabel: string;
  legalLabel: string;
  copyright: string;
}>;

export function Footer({
  locale,
  navigation,
  legalNavigation,
  navigationLabel,
  legalLabel,
  copyright,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__main">
          <div className="site-footer__identity">
            <Link className="brand brand--footer" href={`/${locale}`}>
              <Logo tone="light" variant="stacked" />
            </Link>
          </div>

          {/* No visible heading: the aria-label alone names the landmark (WCAG 2.4.6). */}
          <nav aria-label={navigationLabel}>
            <ul className="site-footer__links">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={legalLabel}>
            <ul className="site-footer__links">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
