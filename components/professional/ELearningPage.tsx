import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBiographyContent, type BiographyItem } from "@/content/biography";
import { getLocalizedPath, prototypeBrand, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";

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

  return (
    <main className="content-page professional-page" data-e-learning-page>
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
            <p className="eyebrow">{ui("eLearningPage.teachingHeading")}</p>
            <h2 id="e-learning-teaching">{ui("eLearningPage.teachingHeading")}</h2>
          </div>
          <TeachingList items={getBiographyContent(locale).teaching} />
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="e-learning-youtube">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("eLearningPage.youtubeHeading")}</p>
            <h2 id="e-learning-youtube">{ui("eLearningPage.youtubeHeading")}</h2>
          </div>
          <div className="unavailable-panel">
            <a className="button button--primary" href={prototypeBrand.temporaryYouTubeUrl} rel="noreferrer" target="_blank">
              {ui("eLearningPage.youtubeCta")}
            </a>
          </div>
        </div>
      </section>

      <nav className="content-next-links" aria-label={ui("eLearningPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/biography")}>{ui("eLearningPage.biographyCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("eLearningPage.consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("eLearningPage.backHome")}</Link>
        </div>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBreadcrumbJsonLd(locale, [{ name: ui("eLearningPage.title"), pathname: "/e-learning" }])) }} />
    </main>
  );
}
