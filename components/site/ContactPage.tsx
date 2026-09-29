import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { biographyContent } from "@/content/biography";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";

type ContactPageProps = Readonly<{ locale: Locale }>;

export async function ContactPage({ locale }: ContactPageProps) {
  const ui = await getTranslations("content");
  const availableLinks = biographyContent.externalLinks.filter((item) => item.detail?.startsWith("http"));

  return (
    <main className="content-page professional-page" data-contact-page>
      <section className="content-hero" aria-labelledby="contact-title">
        <div className="site-container content-hero__grid content-hero__grid--compact">
          <div>
            <p className="eyebrow">{ui("contactPage.eyebrow")}</p>
            <h1 id="contact-title">{ui("contactPage.title")}</h1>
            <p className="content-hero__description">{ui("contactPage.description")}</p>
          </div>
          <p className="content-hero__index" aria-hidden="true">03</p>
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="contact-intents">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("contactPage.intentsHeading")}</p>
            <h2 id="contact-intents">{ui("contactPage.intentsHeading")}</h2>
          </div>
          <div className="contact-intents">
            <article className="contact-intent">
              <h3>{ui("contactPage.patientIntent")}</h3>
              <Link className="arrow-link" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("contactPage.routeCta")} <span aria-hidden="true">↗</span></Link>
            </article>
            <article className="contact-intent">
              <h3>{ui("contactPage.physicianIntent")}</h3>
              <Link className="arrow-link" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("contactPage.routeCta")} <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="contact-links">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("contactPage.linksHeading")}</p>
            <h2 id="contact-links">{ui("contactPage.linksHeading")}</h2>
          </div>
          <div className="content-link-list">
            {availableLinks.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <a href={item.detail} rel="noreferrer" target="_blank">{item.detail}</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBreadcrumbJsonLd(locale, [{ name: ui("contactPage.title"), pathname: "/contact" }])) }} />
    </main>
  );
}
