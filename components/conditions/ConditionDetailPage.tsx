import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getConditionListing, type PatientCondition } from "@/content/patient-conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { renderConditionText } from "@/lib/condition-text";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ConditionMediaView } from "@/components/conditions/ConditionMediaView";
import { ConditionMedicalDisclaimer, ConditionReviewLine } from "@/components/conditions/ConditionNotices";
import { ConditionsCtaBand } from "@/components/conditions/ConditionsCtaBand";
import { EmergencyNotice } from "@/components/conditions/EmergencyNotice";

type ConditionDetailPageProps = Readonly<{
  locale: Locale;
  condition: PatientCondition;
}>;

export async function ConditionDetailPage({ locale, condition }: ConditionDetailPageProps) {
  const ui = await getTranslations("content.conditions");
  const home = await getTranslations("home");
  const content = condition[locale === "ar" ? "ar" : "en"];
  const otherConditions = getConditionListing(locale === "ar" ? "ar" : "en").filter(
    (item) => item.slug !== condition.slug,
  );

  return (
    <main id="main-content" className="content-page condition-detail-page" data-condition-page={condition.slug}>
      <Breadcrumbs items={[
        { name: ui("title"), href: getLocalizedPath(locale, "/conditions") },
        { name: content.title },
      ]} />
      <section className="content-hero" aria-labelledby="condition-title">
        <div className="site-container">
          <h1 id="condition-title">{content.title}</h1>
          <ConditionReviewLine locale={locale} />
          <div className="content-hero__actions">
            <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>
              {home("consultation.cta")}
            </Link>
          </div>
        </div>
      </section>

      <article className="condition-document content-section content-section--surface">
        <div className="site-container condition-document__content">
          {content.urgentLead ? (
            <EmergencyNotice body={content.urgentLead} label={ui("emergencyTitle")} />
          ) : null}
          {content.media ? (
            <ConditionMediaView
              detailHref={getLocalizedPath(locale, `/conditions/${condition.slug}`)}
              locale={locale}
              media={content.media}
              playLabel={ui("playVideo", { title: content.title })}
              surface="detail"
            />
          ) : null}
          {renderConditionText(content.body)}
        </div>
      </article>

      {/* A single paragraph would leave a thin page: the rest of the index,
          as links, keeps the visitor moving through the same approved copy. */}
      <section className="condition-other" aria-labelledby="condition-other-title">
        <div className="site-container condition-other__inner">
          <h2 id="condition-other-title">{ui("otherConditions")}</h2>
          <ul className="condition-other__list">
            {otherConditions.map((item) => (
              <li key={item.slug}>
                <Link href={getLocalizedPath(locale, `/conditions/${item.slug}`)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ConditionMedicalDisclaimer locale={locale} />

      <ConditionsCtaBand label={ui("actionsLabel")}>
        <Link className="text-link" href={getLocalizedPath(locale, "/conditions")}>{ui("backToConditions")}</Link>
        <Link className="text-link" href={getLocalizedPath(locale, "/legal")}>{ui("medicalDisclaimerCta")}</Link>
      </ConditionsCtaBand>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [
        { name: ui("title"), pathname: "/conditions" },
        { name: content.title, pathname: `/conditions/${condition.slug}` },
      ])} />
    </main>
  );
}
