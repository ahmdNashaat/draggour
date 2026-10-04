import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { conditionContent } from "@/content/conditions";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";

type ConditionsPageProps = Readonly<{
  locale: Locale;
}>;

export async function ConditionsPage({ locale }: ConditionsPageProps) {
  const ui = await getTranslations("content.conditions");
  const home = await getTranslations("home");

  return (
    <main id="main-content" className="content-page conditions-page" data-conditions-page>
      <section className="content-hero" aria-labelledby="conditions-title">
        <div className="site-container">
          <p className="eyebrow">{ui("eyebrow")}</p>
          <h1 id="conditions-title">{ui("title")}</h1>
          <p className="content-hero__description">{ui("description")}</p>
        </div>
      </section>
      <section className="content-section content-section--surface" aria-labelledby="conditions-list-title">
        <div className="site-container">
          <h2 className="sr-only" id="conditions-list-title">{ui("title")}</h2>
          <div className="condition-route-grid">
            {conditionContent.map((condition) => {
              const summaryKey = `conditions.items.${condition.key}.summary`;
              return (
                <Link className="condition-route-card" href={getLocalizedPath(locale, `/conditions/${condition.slug}`)} key={condition.slug}>
                  <span className="condition-route-card__body">
                    <h3>{home(`conditions.items.${condition.key}.title`)}</h3>
                    {home.has(summaryKey) ? <span className="condition-route-card__summary">{home(summaryKey)}</span> : null}
                  </span>
                  <span className="condition-route-card__arrow" aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
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
