import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBiographyContent, type BiographyItem } from "@/content/biography";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type ELearningPageProps = Readonly<{ locale: Locale }>;

function TeachingList({ items }: Readonly<{ items: readonly BiographyItem[] }>) {
  return (
    <ul className="content-item-list">
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
        </li>
      ))}
    </ul>
  );
}

export async function ELearningPage({ locale }: ELearningPageProps) {
  const ui = await getTranslations("content");
  const nav = await getTranslations("navigation");

  return (
    <main id="main-content" className="content-page professional-page" data-e-learning-page>
      <Breadcrumbs items={[
        { name: nav("home"), href: getLocalizedPath(locale, "") },
        { name: ui("eLearningPage.title") }
      ]} />
      <section className="content-hero" aria-labelledby="e-learning-title">
        <div className="site-container content-hero__grid content-hero__grid--compact">
          <div>
            <p className="eyebrow">{ui("eLearningPage.eyebrow")}</p>
            <h1 id="e-learning-title">{ui("eLearningPage.title")}</h1>
            <p className="content-hero__description">{ui("eLearningPage.description")}</p>
          </div>
          <p className="content-hero__index" aria-hidden="true">01</p>
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="e-learning-intro">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("eLearningPage.eyebrow")}</p>
            <h2 id="e-learning-intro">{ui("eLearningPage.title")}</h2>
          </div>
          <p className="content-section__body-text">{ui("eLearningPage.intro")}</p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="e-learning-teaching">
        <div className="site-container content-section__inner">
          <div>
            <h2 id="e-learning-teaching">{ui("eLearningPage.teachingHeading")}</h2>
          </div>
          <TeachingList items={getBiographyContent(locale).teaching} />
        </div>
      </section>

      <nav className="content-next-links" aria-label={ui("eLearningPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/biography")}>{ui("eLearningPage.biographyCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("eLearningPage.consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("eLearningPage.backHome")}</Link>
        </div>
      </nav>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("eLearningPage.title"), pathname: "/e-learning" }])} />
    </main>
  );
}
