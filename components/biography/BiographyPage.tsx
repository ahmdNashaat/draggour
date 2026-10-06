import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBiographyContent } from "@/content/biography";
import { getLocalizedPath, siteIdentity, type Locale } from "@/content/site";
import { buildBiographyJsonLd, buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";

type BiographyPageProps = Readonly<{
  locale: Locale;
}>;

function BiographyLinks({ locale, ui }: Readonly<{ locale: Locale; ui: Awaited<ReturnType<typeof getTranslations>> }>) {
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
  const biographyJsonLd = buildBiographyJsonLd(locale);
  const isArabic = locale === "ar";
  const portraitAlt = home("hero.portraitLabel");

  return (
    <main id="main-content" className="content-page biography-page" data-biography-page>
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
            preload
            src="/images/doctor/dr-mohamed-aggour.png"
            sizes="(max-width: 48rem) min(100vw, 24rem), 40vw"
            width={1024}
          />
        </div>
      </section>

      {/* The whole visible body of the page: the two approved paragraphs. */}
      <section className="content-section content-section--surface" aria-labelledby="biography-overview">
        <div className="site-container content-section__inner">
          <div>
            <h2 id="biography-overview">{ui("biography.overview")}</h2>
          </div>
          <div className="content-section__body">
            {content.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <BiographyLinks locale={locale} ui={ui} />
      {biographyJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(biographyJsonLd) }} />
      ) : null}
      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("biography.title"), pathname: "/biography" }])} />
    </main>
  );
}
