import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { getBiographyContent, type BiographyMoments } from "@/content/biography";
import { siteIdentity, type Locale } from "@/content/site";
import { assertBiographyMomentsValid } from "@/lib/biography-moments";
import { buildBiographyJsonLd, buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import { BiographyMoments as MomentsGallery } from "@/components/biography/BiographyMoments";
import { JsonLd } from "@/components/site/JsonLd";

type BiographyPageProps = Readonly<{
  locale: Locale;
  /** Development-only gallery preview; never set in production. */
  momentsPreview?: BiographyMoments;
  /** Temporary sample gallery, while the doctor's event photos are pending. */
  placeholderMoments?: BiographyMoments;
}>;

export async function BiographyPage({ locale, momentsPreview, placeholderMoments }: BiographyPageProps) {
  const ui = await getTranslations("content");
  const home = await getTranslations("home");
  const content = getBiographyContent(locale);
  // Fails the render (and so the build) while an approved gallery breaks a rule.
  assertBiographyMomentsValid();
  const biographyJsonLd = buildBiographyJsonLd(locale);
  const isArabic = locale === "ar";
  const portraitAlt = home("hero.portraitLabel");

  // Precedence: dev preview, then the approved gallery, then the sample one.
  const gallery = momentsPreview ?? content.moments ?? placeholderMoments;
  const galleryIsPlaceholder = !momentsPreview && !content.moments && Boolean(placeholderMoments);

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

      {/* The whole visible body of the page: the two approved paragraphs,
          aligned to the hero text's inline-start edge. The section stays
          labelled for screen readers through the visually hidden H2. */}
      <section className="content-section content-section--surface biography-overview" aria-labelledby="biography-overview">
        <div className="site-container">
          <h2 id="biography-overview" className="sr-only">{ui("biography.overview")}</h2>
          <div className="biography-overview__body">
            {content.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <MomentsGallery moments={gallery} placeholder={galleryIsPlaceholder} />

      {biographyJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(biographyJsonLd) }} />
      ) : null}
      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("biography.title"), pathname: "/biography" }])} />
    </main>
  );
}
