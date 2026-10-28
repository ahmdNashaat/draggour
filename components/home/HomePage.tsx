import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { getBiographyContent } from "@/content/biography";
import { getConditionListing } from "@/content/patient-conditions";
import { getLocalizedPath, siteIdentity, type Locale } from "@/content/site";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import { Logo, logoNameFor } from "@/components/site/Logo";
import { SectionHeading } from "./SectionHeading";

type HomePageProps = Readonly<{
  locale: Locale;
}>;

/** S3: the home preview leads with the preview's first full sentence. A
 *  two-letter abbreviation ("Dr.") never ends the lead. */
function splitFirstSentence(text: string): { lead: string; rest: string | null } {
  for (let index = text.indexOf(". "); index !== -1; index = text.indexOf(". ", index + 1)) {
    const precedingWord = text.slice(0, index).split(/\s+/).at(-1) ?? "";
    if (precedingWord.length > 2) {
      return { lead: text.slice(0, index + 1), rest: text.slice(index + 2) };
    }
  }
  return { lead: text, rest: null };
}

export async function HomePage({ locale }: HomePageProps) {
  const t = await getTranslations("home");
  const personJsonLd = buildPersonJsonLd();
  const conditionListing = getConditionListing(locale === "ar" ? "ar" : "en");
  // Same source as the biography page, so the preview can never drift from it.
  const biographySummary = getBiographyContent(locale).summary;
  const preview = splitFirstSentence(biographySummary[0]);

  return (
    <main id="main-content" data-homepage>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="site-container home-hero__grid">
          <div className="home-hero__content">
            <h1 id="home-title">{siteIdentity.localizedName[locale]}</h1>
            <p className="home-hero__title">{siteIdentity.professionalTitle[locale]}</p>
            {t.has("hero.plainLine") ? (
              <p className="home-hero__plain">{t("hero.plainLine")}</p>
            ) : null}
            {/* Order: name → title → CTAs → lockup. The D-054 lockup leads out
                below the buttons so the primary CTA clears the fold at
                1440×900 and 1366×768 (UI/UX committee S1; the lockup itself
                is untouched — client decision D-054). */}
            <div className="home-hero__actions">
              <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>
                {t("hero.cta")}
                <span aria-hidden="true" className="button__arrow">
                  →
                </span>
              </Link>
              <Link className="text-link" href={getLocalizedPath(locale, "/biography")}>
                {t("hero.secondaryCta")}
              </Link>
            </div>
            <Logo className="home-hero__logo" name={logoNameFor(locale)} size="hero" tone="color" variant="stacked" />
          </div>

          <div className="home-hero__portrait">
            <div className="home-hero__portrait-frame">
              <Image
                alt={t("hero.portraitLabel")}
                className="home-hero__portrait-image"
                height={1536}
                preload
                src="/images/doctor/dr-mohamed-aggour.png"
                sizes="(max-width: 48rem) min(100vw, 25rem), 50vw"
                width={1024}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-biography" id="biography-preview" aria-labelledby="biography-preview-title">
        <div className="site-container home-biography__grid">
          <SectionHeading
            href={getLocalizedPath(locale, "/biography")}
            id="biography-preview-title"
            title={t("biography.title")}
          />
          <div className="home-biography__copy">
            {/* S3: first sentence as lead, the rest as body — one approved
                paragraph, two typographic tiers. */}
            <p className="home-biography__lead">{preview.lead}</p>
            {preview.rest ? <p className="home-biography__rest">{preview.rest}</p> : null}
            <ArrowLink href={getLocalizedPath(locale, "/biography")}>
              {t("biography.cta")}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-section home-conditions" id="conditions" aria-labelledby="conditions-title">
        <div className="site-container">
          <SectionHeading
            href={getLocalizedPath(locale, "/conditions")}
            id="conditions-title"
            title={t("conditions.title")}
          />
          <ul className="condition-cards">
            {conditionListing.map((condition) => (
              <li key={condition.slug}>
                <Link className="condition-card" href={getLocalizedPath(locale, `/conditions/${condition.slug}`)}>
                  <h3 className="condition-card__title">{condition.title}</h3>
                  <p className="condition-card__description">{condition.description}</p>
                  <svg
                    aria-hidden="true"
                    className="condition-card__arrow"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M4 9h10M10 5l4 4-4 4"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section home-learning" id="e-learning" aria-labelledby="learning-title">
        <div className="site-container home-learning__grid">
          <SectionHeading
            eyebrow={t("learning.eyebrow")}
            href={getLocalizedPath(locale, "/e-learning")}
            id="learning-title"
            title={t("learning.title")}
          />
          <div className="home-learning__aside">
            <p className="home-learning__description">{t("learning.description")}</p>
            <ArrowLink href={getLocalizedPath(locale, "/e-learning")}>{t("learning.cta")}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-consultation" id="remote-consultation" aria-labelledby="consultation-title">
        <div className="site-container home-consultation__grid">
          <SectionHeading
            href={getLocalizedPath(locale, "/remote-consultation")}
            id="consultation-title"
            title={t("consultation.title")}
            description={t("consultation.description")}
          />
          <div className="home-consultation__details">
            <ol className="consultation-steps">
              {(["request", "review", "coordination"] as const).map((step, index) => (
                <li key={step}>
                  <span className="consultation-steps__number">0{index + 1}</span>
                  <span>{t(`consultation.steps.${step}`)}</span>
                </li>
              ))}
            </ol>
            <Link className="button button--light" href={getLocalizedPath(locale, "/remote-consultation")}>
              {t("consultation.cta")}
              <span aria-hidden="true" className="button__arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {personJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      ) : null}
    </main>
  );
}
