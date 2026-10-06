import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { WhatsappIcon } from "@/components/consultation/WhatsappIcon";
import { getLocalizedPath, type Locale } from "@/content/site";
import { getConsultationWhatsappUrl, isConsultationWhatsappConfigured, whatsappPlaceholder } from "@/content/whatsapp";

const flowSteps = ["request", "coordination", "confirmation"] as const;

/** The pending CTA is a build-time signal for the developer, never for a patient. */
const isProductionBuild = process.env.NODE_ENV === "production";

/**
 * The remote-consultation page is a hand-off, not a form: one button opens a
 * WhatsApp conversation and the practice's chatbot takes it from there
 * (DECISIONS.md D-036). Nothing is collected, validated or uploaded here.
 *
 * Layout: hero → permanent emergency strip → two equal columns (the CTA card
 * and the "what happens next" steps). Grid follows the writing direction, so
 * the primary column leads on the right in Arabic without a second rule set.
 */
export async function RemoteConsultationPage({ locale }: Readonly<{ locale: Locale }>) {
  const t = await getTranslations({ locale, namespace: "content.consultationPage" });
  const whatsappUrl = getConsultationWhatsappUrl(locale);
  const configured = isConsultationWhatsappConfigured();
  const showPending = !configured && !isProductionBuild;

  if (!configured && isProductionBuild) {
    console.error(
      "[remote-consultation] WhatsApp number is not configured: the consultation CTA was omitted from the published page. Set `consultationWhatsapp.number` in content/whatsapp.ts.",
    );
  }

  return (
    <main id="main-content" className="consultation-page" data-consultation-page data-locale={locale}>
      <section className="consultation-hero" aria-labelledby="consultation-title">
        <div className="site-container">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 id="consultation-title">{t("title")}</h1>
          <p className="consultation-hero__description">{t("lead")}</p>
        </div>
      </section>

      <aside className="consultation-emergency" data-consultation-emergency aria-labelledby="consultation-emergency-title">
        <div className="site-container">
          <div className="consultation-emergency__bar">
            <h2 id="consultation-emergency-title" className="sr-only">
              {t("emergency.heading")}
            </h2>
            <span className="consultation-emergency__icon" aria-hidden="true">
              <TriangleAlert strokeWidth={1.75} />
            </span>
            <p className="consultation-emergency__text">
              <strong className="consultation-emergency__lead">{t("emergency.body")}</strong>{" "}
              {t("emergency.local")} {t("emergency.hospital")} {t("emergency.stop")}
            </p>
          </div>
        </div>
      </aside>

      <div className="site-container consultation-shell">
        <section className="consultation-panel" data-consultation-whatsapp aria-labelledby="whatsapp-heading">
          <h2 id="whatsapp-heading">{t("cta.heading")}</h2>
          <p className="consultation-panel__intro">{t("cta.intro")}</p>

          {whatsappUrl ? (
            <a
              className="button button--primary consultation-whatsapp"
              data-consultation-whatsapp-cta
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsappIcon />
              <span>{t("cta.button")}</span>
              <span className="sr-only">({t("cta.newTabHint")})</span>
            </a>
          ) : showPending ? (
            <button className="button button--primary consultation-whatsapp" data-consultation-whatsapp-cta disabled type="button">
              <WhatsappIcon />
              <span>{t("cta.button")}</span>
            </button>
          ) : null}

          {showPending ? (
            <p className="consultation-whatsapp__pending" data-consultation-whatsapp-pending>
              {t("cta.pendingLabel")}: <span className="legal-placeholder">{whatsappPlaceholder}</span>
            </p>
          ) : null}

          <p className="consultation-panel__note">
            {t("cta.note")} <Link className="text-link" href={getLocalizedPath(locale, "/legal")}>{t("cta.legalLink")}</Link>
          </p>
        </section>

        <section className="consultation-flow" aria-labelledby="consultation-flow-title">
          <h2 id="consultation-flow-title">{t("flow.heading")}</h2>
          <ol className="consultation-flow__list">
            {flowSteps.map((step, index) => (
              <li key={step}>
                <span className="consultation-flow__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{t(`flow.${step}`)}</span>
              </li>
            ))}
          </ol>
          <p className="consultation-flow__note">{t("cta.notConfirmation")}</p>
        </section>
      </div>
    </main>
  );
}
