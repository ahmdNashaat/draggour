import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBiographyContent } from "@/content/biography";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";

type ContactPageProps = Readonly<{ locale: Locale }>;

export async function ContactPage({ locale }: ContactPageProps) {
  const ui = await getTranslations("content");
  const availableLinks = getBiographyContent(locale).externalLinks.filter(
    (item) => !item.internalOnly && item.detail?.startsWith("http"),
  );
  const newTabHint = `(${ui("contactPage.newTabHint")})`;

  return (
    <main id="main-content" className="content-page professional-page" data-contact-page>
      <section className="content-hero" aria-labelledby="contact-title">
        <div className="site-container content-hero__grid content-hero__grid--single">
          <div>
            <p className="eyebrow">{ui("contactPage.eyebrow")}</p>
            <h1 id="contact-title">{ui("contactPage.title")}</h1>
            <p className="content-hero__description">{ui("contactPage.description")}</p>
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
                <h3>{item.title}</h3>
                <a href={item.detail} rel="noopener noreferrer" target="_blank">
                  {item.detail}
                  <span aria-hidden="true"> ↗</span>
                  {/* Announces that the destination leaves the site. */}
                  <span className="sr-only">{newTabHint}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="content-next-links" aria-label={ui("contactPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("contactPage.routeCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/biography")}>{ui("contactPage.biographyCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/legal")}>{ui("contactPage.legalCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("contactPage.backHome")}</Link>
        </div>
      </nav>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("contactPage.title"), pathname: "/contact" }])} />
    </main>
  );
}
