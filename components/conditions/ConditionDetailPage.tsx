import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { ConditionContent } from "@/content/conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type ConditionDetailPageProps = Readonly<{
  locale: Locale;
  condition: ConditionContent;
}>;

export async function ConditionDetailPage({ locale, condition }: ConditionDetailPageProps) {
  const ui = await getTranslations("content.conditions");
  const home = await getTranslations("home");
  const title = home(`conditions.items.${condition.key}.title`);
  const isArabic = locale === "ar";

  return (
    <main id="main-content" className="content-page condition-detail-page" data-condition-page={condition.slug}>
      <Breadcrumbs items={[
        { name: ui("title"), href: getLocalizedPath(locale, "/conditions") },
        { name: title }
      ]} />
      <section className="content-hero" aria-labelledby="condition-title">
        <div className="site-container content-hero__grid content-hero__grid--compact">
          <div>
            <h1 id="condition-title">{title}</h1>
            <p className="content-hero__description">{isArabic ? condition.arabicDescription : condition.description}</p>
          </div>
          <div className="content-hero__index" aria-hidden="true">0{condition.slug === "brain-aneurysm" ? "1" : condition.slug === "stroke" ? "2" : condition.slug === "avm" ? "3" : condition.slug === "carotid-stenosis" ? "4" : condition.slug === "venous-sinus-disorders" ? "5" : "6"}</div>
        </div>
      </section>
      <section className="content-section content-section--surface" aria-labelledby="condition-scope-title">
        <div className="site-container content-section__inner">
          <div>
            <h2 id="condition-scope-title">{ui("scopeHeading")}</h2>
          </div>
          <div className="content-section__body">
            <p className="content-section__body-text" style={{ marginBottom: "1.5rem" }}>{ui("scopeIntro")}</p>
            <ul className="content-bullet-list content-bullet-list--large">
              {(isArabic ? condition.arabicScope : condition.scope).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      {condition.emergency ? (
        <section className="content-section condition-emergency" aria-labelledby="condition-emergency-title">
          <div className="site-container">
            <h2 id="condition-emergency-title">{ui("emergencyTitle")}</h2>
            <p>{ui("emergencyBody")}</p>
          </div>
        </section>
      ) : null}
      <section className="content-section" aria-label={ui("consultationCta")}>
        <div className="site-container content-actions">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "/conditions")}>{ui("backToConditions")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "/biography")}>{ui("biographyCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "/legal")}>{ui("medicalDisclaimerCta")}</Link>
        </div>
      </section>
      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("title"), pathname: "/conditions" }, { name: title, pathname: `/conditions/${condition.slug}` }])} />
    </main>
  );
}
