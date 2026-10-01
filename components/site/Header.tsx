"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import type { Locale } from "@/content/site";

export type HeaderNavigationItem = Readonly<{
  href: string;
  label: string;
  isPrimaryAction?: boolean;
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
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen((prev) => {
          if (prev) {
            menuButtonRef.current?.focus();
            return false;
          }
          return prev;
        });
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
            height={438}
            preload
            src="/brand/logo-primary.png"
            sizes="(max-width: 36rem) 8.5rem, 12rem"
            width={880}
          />
        </Link>

        <nav
          aria-label={navigationLabel}
          className={`site-header__nav${isOpen ? " site-header__nav--open" : ""}`}
          id="primary-navigation"
        >
          <ul>
            {navigation.map((item, index) => {
              const isRoot = item.href === `/${locale}`;
              const isActive = isRoot ? pathname === item.href : pathname.startsWith(item.href);
              const linkClasses = [
                isActive ? "is-active" : "",
                item.isPrimaryAction ? "button button--primary site-header__nav-cta" : ""
              ].filter(Boolean).join(" ");
              
              return (
                <li key={item.href} className={item.isPrimaryAction ? "site-header__nav-item--cta" : ""}>
                  <Link 
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive && !item.isPrimaryAction ? "page" : undefined}
                    className={linkClasses}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-header__tools">
          {languageSwitcher}
          <button
            ref={menuButtonRef}
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            className="menu-toggle"
            type="button"
            onClick={() => {
              setIsOpen((prev) => {
                if (!prev) {
                  setTimeout(() => firstLinkRef.current?.focus(), 50);
                  return true;
                }
                return false;
              });
            }}
          >
            <span className="sr-only">{isOpen ? closeMenuLabel : menuLabel}</span>
            <span aria-hidden="true" className="menu-toggle__lines" />
          </button>
        </div>
      </div>
    </header>
  );
}
