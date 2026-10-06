import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getConditionListing } from "@/content/patient-conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { ConditionBlocks } from "@/components/conditions/ConditionBlocks";
import { ConditionMedicalDisclaimer, ConditionReviewLine } from "@/components/conditions/ConditionNotices";

type ConditionsPageProps = Readonly<{
  locale: Locale;
}>;

export async function ConditionsPage({ locale }: ConditionsPageProps) {
  const ui = await getTranslations("content.conditions");
  const listing = getConditionListing(locale === "ar" ? "ar" : "en");

  return (
    <main id="main-content" className="content-page conditions-page" data-conditions-page>
      <section className="content-hero" aria-labelledby="conditions-title">
        <div className="site-container">
          <p className="eyebrow">{ui("eyebrow")}</p>
          <h1 id="conditions-title">{ui("title")}</h1>
          <p className="content-hero__description">{ui("description")}</p>
          <ConditionReviewLine locale={locale} />
        </div>
      </section>
      {/* Each entry repeats the condition's own document, so the hub reads
          completely while the linked heading still opens the condition page. */}
      <section className="content-section content-section--surface" aria-label={ui("title")}>
        <div className="site-container">
          <ol className="condition-index">
            {listing.map((condition) => (
              <li className="condition-index__item" key={condition.slug}>
                <h2 className="condition-index__title">
                  <Link href={getLocalizedPath(locale, `/conditions/${condition.slug}`)}>
                    {condition.title}
                  </Link>
                </h2>
                <div className="condition-index__body">
                  <ConditionBlocks blocks={condition.blocks} headingLevel={3} blockKey={condition.slug} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ConditionMedicalDisclaimer locale={locale} />
      <section className="content-section" aria-label={ui("consultationCta")}>
        <div className="site-container content-actions">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "/biography")}>{ui("biographyCta")}</Link>
        </div>
      </section>
      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("title"), pathname: "/conditions" }])} />
    </main>
  );
}
