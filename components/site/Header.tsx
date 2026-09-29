"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { Locale } from "@/content/site";

export type HeaderNavigationItem = Readonly<{
  href: string;
  label: string;
}>;

type HeaderProps = Readonly<{
  locale: Locale;
  brandName: string;
  navigation: readonly HeaderNavigationItem[];
  languageSwitcher: React.ReactNode;
  menuLabel: string;
  closeMenuLabel: string;
  navigationLabel: string;
}>;

export function Header({
  locale,
  brandName,
  navigation,
  languageSwitcher,
  menuLabel,
  closeMenuLabel,
  navigationLabel,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const homeHref = `/${locale}`;

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="brand" href={homeHref} aria-label={brandName} onClick={() => setIsOpen(false)}>
          <Image
            alt={brandName}
            className="brand__logo"
            height={440}
            priority
            src="/brand/logo-primary.png"
            width={880}
          />
        </Link>

        <nav
          aria-label={navigationLabel}
          className={`site-header__nav${isOpen ? " site-header__nav--open" : ""}`}
          id="primary-navigation"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__tools">
          {languageSwitcher}
          <button
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            className="menu-toggle"
            type="button"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">{isOpen ? closeMenuLabel : menuLabel}</span>
            <span aria-hidden="true" className="menu-toggle__lines" />
          </button>
        </div>
      </div>
    </header>
  );
}
