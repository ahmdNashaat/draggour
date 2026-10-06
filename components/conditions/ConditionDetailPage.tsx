import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { PatientCondition } from "@/content/patient-conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ConditionBlocks } from "@/components/conditions/ConditionBlocks";
import { ConditionMedicalDisclaimer, ConditionReviewLine } from "@/components/conditions/ConditionNotices";

type ConditionDetailPageProps = Readonly<{
  locale: Locale;
  condition: PatientCondition;
}>;

export async function ConditionDetailPage({ locale, condition }: ConditionDetailPageProps) {
  const ui = await getTranslations("content.conditions");
  const home = await getTranslations("home");
  const content = condition[locale === "ar" ? "ar" : "en"];

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
          <ConditionBlocks blocks={content.blocks} headingLevel={2} blockKey={condition.slug} />
        </div>
      </article>
      <ConditionMedicalDisclaimer locale={locale} />
      <div className="content-section">
        <div className="site-container content-actions">
          <Link className="text-link" href={getLocalizedPath(locale, "/conditions")}>{ui("backToConditions")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "/legal")}>{ui("medicalDisclaimerCta")}</Link>
        </div>
      </div>
      <JsonLd value={buildBreadcrumbJsonLd(locale, [
        { name: ui("title"), pathname: "/conditions" },
        { name: content.title, pathname: `/conditions/${condition.slug}` },
      ])} />
    </main>
  );
}
