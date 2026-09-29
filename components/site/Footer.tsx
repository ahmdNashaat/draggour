import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/content/site";

export type FooterNavigationItem = Readonly<{
  href: string;
  label: string;
}>;

type FooterProps = Readonly<{
  locale: Locale;
  brandName: string;
  description: string;
  navigation: readonly FooterNavigationItem[];
  legalNavigation: readonly FooterNavigationItem[];
  navigationLabel: string;
  legalLabel: string;
  copyright: string;
}>;

export function Footer({
  locale,
  brandName,
  description,
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
              <Image
                alt=""
                className="brand__monogram"
                height={256}
                src="/brand/logo-monogram.png"
                width={580}
              />
              <span className="brand__name">{brandName}</span>
            </Link>
            <p>{description}</p>
          </div>

          <nav aria-label={navigationLabel}>
            <p className="site-footer__label">{navigationLabel}</p>
            <ul className="site-footer__links">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={legalLabel}>
            <p className="site-footer__label">{legalLabel}</p>
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
          <p>{brandName}</p>
        </div>
      </div>
    </footer>
  );
}
