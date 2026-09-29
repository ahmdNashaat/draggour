import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { conditionItems } from "@/content/home";
import { getLocalizedPath, siteIdentity, type Locale } from "@/content/site";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import { SectionHeading } from "./SectionHeading";

type HomePageProps = Readonly<{
  locale: Locale;
}>;

export async function HomePage({ locale }: HomePageProps) {
  const t = await getTranslations("home");

  return (
    <main id="main-content" data-homepage>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="site-container home-hero__grid">
          <div className="home-hero__content">
            <h1 id="home-title">{siteIdentity.localizedName[locale]}</h1>
            <p className="home-hero__title">{siteIdentity.professionalTitle[locale]}</p>
            <Image
              alt={siteIdentity.name}
              className="home-hero__logo"
              height={440}
              src="/brand/logo-primary.png"
              width={880}
            />
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
          </div>

          <div className="home-hero__portrait">
            <div className="home-hero__portrait-frame">
              <Image
                alt={t("hero.portraitLabel")}
                className="home-hero__portrait-image"
                height={1536}
                priority
                src="/images/doctor/dr-mohamed-aggour.png"
                width={1024}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-biography" id="biography-preview" aria-labelledby="biography-preview-title">
        <div className="site-container home-biography__grid">
          <SectionHeading
            id="biography-preview-title"
            title={t("biography.title")}
          />
          <div className="home-biography__copy">
            <p>{t("biography.body")}</p>
            <ArrowLink href={getLocalizedPath(locale, "/biography")}>
              {t("biography.cta")}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-section home-conditions" id="conditions" aria-labelledby="conditions-title">
        <div className="site-container">
          <SectionHeading
            id="conditions-title"
            title={t("conditions.title")}
          />
          <ul className="condition-list">
            {conditionItems.map((condition) => (
              <li key={condition.slug}>
                <Link href={getLocalizedPath(locale, `/conditions/${condition.slug}`)}>
                  <span>{t(`conditions.items.${condition.key}.title`)}</span>
                  <span aria-hidden="true" className="condition-list__arrow">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section home-learning" id="e-learning" aria-labelledby="learning-title">
        <div className="site-container home-learning__grid">
          <div>
            <SectionHeading
              eyebrow={t("learning.eyebrow")}
              id="learning-title"
              title={t("learning.title")}
              description={t("learning.description")}
            />
            <ArrowLink href={getLocalizedPath(locale, "/e-learning")}>{t("learning.cta")}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-consultation" id="remote-consultation" aria-labelledby="consultation-title">
        <div className="site-container home-consultation__grid">
          <SectionHeading
            eyebrow={t("consultation.eyebrow")}
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPersonJsonLd(locale)) }}
      />
    </main>
  );
}
