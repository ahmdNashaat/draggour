import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getConditionListing } from "@/content/patient-conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { renderConditionText } from "@/lib/condition-text";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { ConditionMediaView } from "@/components/conditions/ConditionMediaView";
import { ConditionMedicalDisclaimer, ConditionReviewLine } from "@/components/conditions/ConditionNotices";
import { ConditionsCtaBand } from "@/components/conditions/ConditionsCtaBand";
import { EmergencyNotice } from "@/components/conditions/EmergencyNotice";

type ConditionsPageProps = Readonly<{
  locale: Locale;
}>;

export async function ConditionsPage({ locale }: ConditionsPageProps) {
  const ui = await getTranslations("content.conditions");
  const listing = getConditionListing(locale === "ar" ? "ar" : "en");

  return (
    <main id="main-content" className="content-page conditions-page" data-conditions-page>
      {/* The hero carries its own compact rhythm and the jump index, so the
          old hero rule + section padding stack is gone: the first condition
          starts one row's padding below the hero. */}
      <section className="content-hero conditions-hero" aria-labelledby="conditions-title">
        <div className="site-container conditions-hero__grid">
          <div className="conditions-hero__intro">
            <p className="eyebrow">{ui("eyebrow")}</p>
            <h1 id="conditions-title">{ui("title")}</h1>
            <p className="content-hero__description">{ui("description")}</p>
            <ConditionReviewLine locale={locale} />
          </div>
          <nav aria-label={ui("indexLabel")} className="conditions-hero__index">
            <ol>
              {listing.map((condition) => (
                <li key={condition.slug}>
                  <a href={`#${condition.slug}`}>{condition.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Each entry repeats the condition's own paragraph, so the hub reads
          completely while the linked heading still opens the condition page. */}
      <section className="conditions-index" aria-label={ui("title")}>
        <div className="site-container">
          <ol className="condition-index">
            {listing.map((condition) => (
              <li className="condition-index__item" id={condition.slug} key={condition.slug}>
                <h2 className="condition-index__title">
                  <Link href={getLocalizedPath(locale, `/conditions/${condition.slug}`)}>
                    {condition.title}
                  </Link>
                </h2>
                <div className="condition-row__content">
                  {condition.urgentLead ? (
                    <EmergencyNotice body={condition.urgentLead} label={ui("emergencyTitle")} />
                  ) : null}
                  {condition.media ? (
                    <ConditionMediaView
                      detailHref={getLocalizedPath(locale, `/conditions/${condition.slug}`)}
                      locale={locale}
                      media={condition.media}
                      playLabel={ui("playVideo", { title: condition.title })}
                      surface="index"
                    />
                  ) : null}
                  {renderConditionText(condition.body)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ConditionMedicalDisclaimer locale={locale} />

      <ConditionsCtaBand label={ui("consultationCta")}>
        <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("consultationCta")}</Link>
        <Link className="text-link" href={getLocalizedPath(locale, "/biography")}>{ui("biographyCta")}</Link>
      </ConditionsCtaBand>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("title"), pathname: "/conditions" }])} />
    </main>
  );
}
