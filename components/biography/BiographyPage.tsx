import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBiographyContent, type BiographyItem } from "@/content/biography";
import { getLocalizedPath, siteIdentity, type Locale } from "@/content/site";
import { buildBiographyJsonLd, buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";

type BiographyPageProps = Readonly<{
  locale: Locale;
}>;

function isUrl(value: string) {
  return value.startsWith("http");
}

function ItemList({ items }: Readonly<{ items: readonly BiographyItem[] }>) {
  return (
    <ul className="content-item-list">
      {items.map((item) => (
        <li key={`${item.title}-${item.detail ?? ""}`}>
          <h3>{item.title}</h3>
          {item.detail ? (
            isUrl(item.detail) ? (
              <p>
                <a href={item.detail} rel="noreferrer" target="_blank">
                  {item.detail}
                </a>
              </p>
            ) : (
              <p>{item.detail}</p>
            )
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ContentListSection({
  id,
  title,
  items,
  muted = false,
}: Readonly<{
  id: string;
  title: string;
  items: readonly BiographyItem[];
  muted?: boolean;
}>) {
  return (
    <section className={`content-section${muted ? " content-section--surface" : ""}`} aria-labelledby={id}>
      <div className="site-container content-section__inner">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 id={id}>{title}</h2>
        </div>
        <ItemList items={items} />
      </div>
    </section>
  );
}

async function BiographyLinks({ locale, ui }: Readonly<{ locale: Locale; ui: Awaited<ReturnType<typeof getTranslations>> }>) {
  return (
    <nav className="content-next-links" aria-label={ui("biography.title")}>
      <div className="site-container">
        <Link className="button button--primary" href={getLocalizedPath(locale, "/conditions")}>{ui("biography.conditionsCta")}</Link>
        <Link className="button button--primary" href={getLocalizedPath(locale, "/e-learning")}>{ui("biography.learningCta")}</Link>
        <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("biography.consultationCta")}</Link>
        <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("biography.backHome")}</Link>
      </div>
    </nav>
  );
}

export async function BiographyPage({ locale }: BiographyPageProps) {
  const ui = await getTranslations("content");
  const home = await getTranslations("home");
  const content = getBiographyContent(locale);
  const isArabic = locale === "ar";
  const portraitAlt = home("hero.portraitLabel");
  const renderedLinks = content.externalLinks.filter((item) => !item.internalOnly);

  return (
    <main className="content-page biography-page" data-biography-page>
      <section className="content-hero" aria-labelledby="biography-title">
        <div className="site-container content-hero__grid">
          <div>
            <p className="eyebrow">{ui("biography.eyebrow")}</p>
            <h1 id="biography-title">{ui("biography.title")}</h1>
            <p className="content-hero__lead">
              {isArabic ? `${siteIdentity.localizedName[locale]} — ${siteIdentity.professionalTitle[locale]}` : siteIdentity.professionalTitle[locale]}
            </p>
            <p className="content-hero__description">{ui("biography.description")}</p>
          </div>
          <Image
            alt={isArabic ? portraitAlt : "Portrait of Dr. Mohamed Aggour"}
            className="content-hero__portrait"
            height={1536}
            priority
            src="/images/doctor/dr-mohamed-aggour.png"
            width={1024}
          />
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="biography-overview">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("biography.eyebrow")}</p>
            <h2 id="biography-overview">{ui("biography.overview")}</h2>
          </div>
          <div className="content-section__body">
            {content.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <ContentListSection id="biography-current-positions" title={ui("biography.currentPositions")} items={content.currentPositions} />

      <section className="content-section content-section--surface" aria-labelledby="biography-career-history">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("biography.careerHistory")}</p>
            <h2 id="biography-career-history">{ui("biography.careerHistory")}</h2>
          </div>
          <ol className="career-timeline">
            {content.careerHistory.map((item) => (
              <li key={item.title}>
                <time>{item.detail}</time>
                <div>
                  <h3>{item.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContentListSection
        id="biography-previous-positions"
        title={ui("biography.previousPositions")}
        items={content.previousPositions}
      />
      <ContentListSection id="biography-qualifications" title={ui("biography.qualifications")} items={content.qualifications.map((title) => ({ title }))} muted />
      <ContentListSection id="biography-societies" title={ui("biography.societies")} items={content.societies.map((title) => ({ title }))} />
      <ContentListSection id="biography-teaching" title={ui("biography.teaching")} items={content.teaching} muted />
      <ContentListSection id="biography-academic" title={ui("biography.academic")} items={content.academic} />
      <ContentListSection id="biography-research" title={ui("biography.research")} items={content.research} muted />
      <ContentListSection id="biography-leadership" title={ui("biography.leadership")} items={content.leadership} />
      <ContentListSection id="biography-milestones" title={ui("biography.milestones")} items={content.milestones} muted />

      <section className="content-section" aria-labelledby="biography-clinical-expertise">
        <div className="site-container">
          <p className="eyebrow">{ui("biography.clinicalExpertise")}</p>
          <h2 id="biography-clinical-expertise">{ui("biography.clinicalExpertise")}</h2>
          <div className="content-card-grid content-card-grid--three">
            {content.clinicalExpertise.map((item) => (
              <article className="content-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section--surface" aria-labelledby="biography-annual-activity">
        <div className="site-container">
          <p className="eyebrow">{ui("biography.annualActivity")}</p>
          <h2 id="biography-annual-activity">{ui("biography.annualActivity")}</h2>
          <div className="content-card-grid content-card-grid--four">
            {content.annualActivity.map((item) => (
              <article className="content-card content-card--metric" key={item.title}>
                <p className="content-card__metric">{item.detail}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="biography-external-links">
        <div className="site-container content-section__inner">
          <div>
            <p className="eyebrow">{ui("biography.externalLinks")}</p>
            <h2 id="biography-external-links">{ui("biography.externalLinks")}</h2>
          </div>
          <div className="content-link-list">
            {renderedLinks.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                {item.detail && isUrl(item.detail) ? (
                  <a href={item.detail} rel="noreferrer" target="_blank">{item.detail}</a>
                ) : (
                  <p>{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BiographyLinks locale={locale} ui={ui} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBiographyJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBreadcrumbJsonLd(locale, [{ name: ui("biography.title"), pathname: "/biography" }])) }} />
    </main>
  );
}
