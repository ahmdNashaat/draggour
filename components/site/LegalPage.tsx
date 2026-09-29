import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type LegalPageProps = Readonly<{ locale: Locale }>;

export async function LegalPage({ locale }: LegalPageProps) {
  const ui = await getTranslations("content");
  const nav = await getTranslations("navigation");
  const sections = [
    "privacy",
    "medicalDisclaimer",
    "emergencyGuidance",
    "consultationTerms",
    "consent",
    "attachments",
    "cookies",
  ] as const;

  return (
    <main id="main-content" className="content-page professional-page" data-legal-page>
      <Breadcrumbs items={[
        { name: nav("home"), href: getLocalizedPath(locale, "") },
        { name: ui("legalPage.title") }
      ]} />
      <section className="content-hero" aria-labelledby="legal-title">
        <div className="site-container content-hero__grid content-hero__grid--compact">
          <div>
            <p className="eyebrow">{ui("legalPage.eyebrow")}</p>
            <h1 id="legal-title">{ui("legalPage.title")}</h1>
            <p className="content-hero__description">{ui("legalPage.description")}</p>
          </div>
          <p className="content-hero__index" aria-hidden="true">04</p>
        </div>
      </section>

      <div className="site-container">
        <p className="content-section__body-text">{ui("legalPage.intro")}</p>
      </div>

      {sections.map((sectionKey) => (
        <section className="content-section" key={sectionKey} aria-labelledby={`legal-${sectionKey}`}>
          <div className="site-container content-section__inner">
            <div>
              <h2 id={`legal-${sectionKey}`}>{ui(`legalPage.${sectionKey}`)}</h2>
            </div>
            <div className="legal-draft">
              <p>{sectionKey === "emergencyGuidance" ? ui("legalPage.emergencyPrinciple") : ui("legalPage.placeholder")}</p>
            </div>
          </div>
        </section>
      ))}

      <nav className="content-next-links" aria-label={ui("legalPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/contact")}>{ui("legalPage.contactCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("legalPage.consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("legalPage.homeCta")}</Link>
        </div>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBreadcrumbJsonLd(locale, [{ name: ui("legalPage.title"), pathname: "/legal" }])) }} />
    </main>
  );
}
