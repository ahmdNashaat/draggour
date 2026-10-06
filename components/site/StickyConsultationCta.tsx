"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { getLocalizedPath, type Locale } from "@/content/site";

type StickyConsultationCtaProps = Readonly<{
  locale: Locale;
}>;

/**
 * The consultation action is promoted on Home and condition detail pages.
 * The Conditions hub stays clear for browsing its full list of destinations.
 */
function isStickyPath(pathname: string, locale: Locale): boolean {
  const home = `/${locale}`;
  const conditions = `${home}/conditions`;
  return pathname === home || pathname.startsWith(`${conditions}/`);
}

/**
 * Fixed mobile action bar for the journeys where a visitor is reading about
 * a condition and may want to ask about it. It sits outside the page content,
 * stays under the header, hides while the navigation menu is open, and steps
 * aside when the page's own primary call to action or the footer is already
 * on screen.
 */
export function StickyConsultationCta({ locale }: StickyConsultationCtaProps) {
  const pathname = usePathname() ?? "/";
  const t = useTranslations();
  const barRef = useRef<HTMLDivElement>(null);

  const allowed = isStickyPath(pathname, locale);

  // The bar reserves body space only while it is actually showing, so the
  // last of the page can never sit underneath it (section 3.7).
  useEffect(() => {
    const body = document.body;
    if (!allowed) {
      body.classList.remove("has-sticky-cta");
      return;
    }

    const bar = barRef.current;
    if (!bar) {
      return;
    }

    const apply = (visible: boolean) => {
      bar.dataset.visible = visible ? "true" : "false";
      body.classList.toggle("has-sticky-cta", visible);
    };

    const sentinels = [
      document.querySelector<HTMLElement>("main .button--primary"),
      document.querySelector<HTMLElement>("footer.site-footer"),
    ].filter((element): element is HTMLElement => element !== null);

    if (sentinels.length === 0) {
      apply(true);
      return () => body.classList.remove("has-sticky-cta");
    }

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onScreen.add(entry.target);
        } else {
          onScreen.delete(entry.target);
        }
      }
      apply(onScreen.size === 0);
    });

    for (const sentinel of sentinels) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
      body.classList.remove("has-sticky-cta");
    };
  }, [allowed, pathname]);

  if (!allowed) {
    return null;
  }

  return (
    <div className="sticky-cta" data-visible="false" ref={barRef}>
      <Link
        className="button button--primary sticky-cta__button"
        href={getLocalizedPath(locale, "/remote-consultation")}
      >
        {t("home.consultation.cta")}
        <span aria-hidden="true" className="button__arrow">
          →
        </span>
      </Link>
    </div>
  );
}
