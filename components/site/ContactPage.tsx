import { Fragment } from "react";

import { getTranslations } from "next-intl/server";

import { getBiographyContent, type BiographyItem } from "@/content/biography";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type ContactPageProps = Readonly<{ locale: Locale }>;

/** Offers the browser a line break after every hyphen and slash, so a long URL
 *  wraps at its separators instead of splitting a word mid-syllable on narrow
 *  screens (UI/UX committee P2 contact-URL note). `<wbr>` adds no text, so the
 *  link's accessible name and text content stay byte-for-byte identical. */
function withBreakOpportunities(value: string) {
  const parts = value.split(/([-/])/);
  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index % 2 === 1 ? <wbr /> : null}
    </Fragment>
  ));
}

export async function ContactPage({ locale }: ContactPageProps) {
  const ui = await getTranslations("content");
  const nav = await getTranslations("navigation");
  const availableLinks = getBiographyContent(locale).externalLinks.filter(
    (item): item is BiographyItem & { detail: string } =>
      !item.internalOnly && item.detail?.startsWith("http") === true,
  );
  const newTabHint = `(${ui("contactPage.newTabHint")})`;

  return (
    <main id="main-content" className="content-page professional-page" data-contact-page>
      {/* One breadcrumb rule across every internal page (UI/UX committee K9). */}
      <Breadcrumbs items={[
        { name: nav("home"), href: getLocalizedPath(locale, "") },
        { name: ui("contactPage.title") }
      ]} />
      <section className="content-hero" aria-labelledby="contact-title">
        <div className="site-container content-hero__grid content-hero__grid--single">
          <div>
            <p className="eyebrow">{ui("contactPage.eyebrow")}</p>
            <h1 id="contact-title">{ui("contactPage.title")}</h1>
          </div>
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="contact-links">
        <div className="site-container content-section__inner">
          <div>
            <h2 id="contact-links">{ui("contactPage.linksHeading")}</h2>
          </div>
          <div className="content-link-list">
            {availableLinks.map((item) => (
              <div key={item.detail}>
                <h3>
                  <a href={item.detail} rel="noopener noreferrer" target="_blank">
                    {/* The arrow rides the heading line: a wrapped URL used to
                        strand ↗ mid-text on mobile (UI/UX committee R2), and
                        this → mirrors to ← in RTL like every other
                        directional arrow on the site. */}
                    <span className="content-link-list__heading">
                      {item.title}
                      <span aria-hidden="true" className="content-link-list__arrow">
                        →
                      </span>
                    </span>
                    {/* `bdi` keeps the URL one LTR run inside the RTL line, so
                        the trailing slash can no longer migrate to the visual
                        left (UI/UX committee P0-R1); `<wbr>` gives it break
                        points after - and / so it no longer splits mid-word. */}
                    <bdi dir="ltr" className="content-link-list__url">
                      {withBreakOpportunities(item.detail)}
                    </bdi>
                    {/* Announces that the destination leaves the site. */}
                    <span className="sr-only">{newTabHint}</span>
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("contactPage.title"), pathname: "/contact" }])} />
    </main>
  );
}
