import type { ReactNode } from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import {
  getLearningLinks,
  type LearningLinkPlatform,
  type VisibleLearningLink,
} from "@/content/learning-links";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type ELearningPageProps = Readonly<{ locale: Locale }>;

/**
 * Inline platform marks drawn as plain SVG paths. No icon dependency, and one
 * mark per `platform` value declared in `content/learning-links.ts`.
 */
function PlatformIcon({ platform }: Readonly<{ platform: LearningLinkPlatform }>) {
  const shapes: Record<LearningLinkPlatform, ReactNode> = {
    youtube: (
      <>
        <rect height="14" rx="4" width="20" x="2" y="5" />
        <path d="m10 9.2 5.2 2.8L10 14.8Z" />
      </>
    ),
    facebook: (
      <>
        <path d="M15 4.5h-2.2a3.8 3.8 0 0 0-3.8 3.8V21" />
        <path d="M6 13h7" />
      </>
    ),
    platform: (
      <>
        <path d="m12 3.5 9.5 4.6L12 12.7 2.5 8.1 12 3.5Z" />
        <path d="M6.8 10.6v4.8c0 1.55 2.33 2.8 5.2 2.8s5.2-1.25 5.2-2.8v-4.8" />
        <path d="M21.5 8.1v5.4" />
      </>
    ),
    other: (
      <>
        <path d="M10.6 13.4a4.2 4.2 0 0 0 6 0l2.4-2.4a4.2 4.2 0 0 0-6-6l-1.2 1.2" />
        <path d="M13.4 10.6a4.2 4.2 0 0 0-6 0L5 13a4.2 4.2 0 0 0 6 6l1.2-1.2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="learning-link__icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
    >
      {shapes[platform]}
    </svg>
  );
}

function LearningLinkItem({
  link,
  newTabHint,
}: Readonly<{ link: VisibleLearningLink; newTabHint: string }>) {
  return (
    <li className={link.primary ? "learning-link learning-link--primary" : "learning-link"} data-learning-link={link.id}>
      <a className="learning-link__anchor" href={link.url} rel="noopener noreferrer" target="_blank">
        <PlatformIcon platform={link.platform} />
        <span className="learning-link__title">{link.title}</span>
        <span className="learning-link__description">{link.description}</span>
        {/* Announces that the destination leaves the site, without hiding the visible copy. */}
        <span className="sr-only">{newTabHint}</span>
        <svg aria-hidden="true" className="learning-link__arrow" fill="none" viewBox="0 0 18 18">
          <path
            d="M5 13 13 5M6.5 5H13v6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
        </svg>
      </a>
    </li>
  );
}

export async function ELearningPage({ locale }: ELearningPageProps) {
  const ui = await getTranslations("content");
  const nav = await getTranslations("navigation");

  const links = getLearningLinks(locale);
  const primaryLinks = links.filter((link) => link.primary);
  const secondaryLinks = links.filter((link) => !link.primary);
  const newTabHint = `(${ui("eLearningPage.newTabHint")})`;

  return (
    <main id="main-content" className="content-page professional-page" data-e-learning-page>
      <Breadcrumbs items={[
        { name: nav("home"), href: getLocalizedPath(locale, "") },
        { name: ui("eLearningPage.title") }
      ]} />
      <section className="content-hero" aria-labelledby="e-learning-title">
        <div className="site-container content-hero__grid content-hero__grid--single">
          <div>
            <p className="eyebrow">{ui("eLearningPage.eyebrow")}</p>
            <h1 id="e-learning-title">{ui("eLearningPage.title")}</h1>
            <p className="content-hero__description">{ui("eLearningPage.description")}</p>
          </div>
        </div>
      </section>

      {links.length > 0 ? (
        <section className="content-section" aria-labelledby="e-learning-links">
          <div className="site-container content-section__inner">
            <div>
              <h2 id="e-learning-links">{ui("eLearningPage.learningHeading")}</h2>
            </div>
            <div className="learning-links-groups">
              {primaryLinks.length > 0 ? (
                <ul className="learning-links">
                  {primaryLinks.map((link) => (
                    <LearningLinkItem key={link.id} link={link} newTabHint={newTabHint} />
                  ))}
                </ul>
              ) : null}
              {secondaryLinks.length > 0 ? (
                <ul className="learning-links learning-links--secondary">
                  {secondaryLinks.map((link) => (
                    <LearningLinkItem key={link.id} link={link} newTabHint={newTabHint} />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <nav className="content-next-links" aria-label={ui("eLearningPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/biography")}>{ui("eLearningPage.biographyCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("eLearningPage.consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("eLearningPage.backHome")}</Link>
        </div>
      </nav>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("eLearningPage.title"), pathname: "/e-learning" }])} />
    </main>
  );
}
