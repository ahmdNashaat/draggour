import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { renderConditionText } from "@/lib/condition-text";
import { resolveRouteLocale } from "@/lib/route-locale";
import { ConditionMediaView } from "@/components/conditions/ConditionMediaView";
import { EmergencyNotice } from "@/components/conditions/EmergencyNotice";
import { imageFixture, videoFixture } from "@/tests/fixtures/condition-media";

/**
 * Test-only surface for the optional condition media (Part F). It renders the
 * same wrappers the hub and the condition page use, with fixture media from
 * tests/fixtures/, so the image, the poster link and the click-to-play facade
 * can be checked in both locales without publishing any media.
 *
 * It answers 404 outside development unless `CONDITION_MEDIA_FIXTURE=1`, so a
 * production build never serves it.
 */
export const metadata: Metadata = {
  title: "Condition media fixture",
  robots: { index: false, follow: false },
};

const fixtureEnabled =
  process.env.NODE_ENV !== "production" || process.env.CONDITION_MEDIA_FIXTURE === "1";

export default async function ConditionMediaFixturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveRouteLocale(params);

  if (locale === "fr" || !fixtureEnabled) {
    notFound();
  }

  const ui = await getTranslations("content.conditions");
  const playLabel = ui("playVideo", { title: videoFixture.type === "video" ? videoFixture.title : "" });

  return (
    <main className="content-page" data-media-fixture id="main-content">
      <section className="content-hero" aria-labelledby="fixture-title">
        <div className="site-container">
          <h1 id="fixture-title">Condition media fixture</h1>
        </div>
      </section>

      <section className="conditions-index" aria-label="Fixture rows">
        <div className="site-container">
          <ol className="condition-index">
            <li className="condition-index__item" id="fixture-image">
              <h2 className="condition-index__title">Fixture image row</h2>
              <div className="condition-row__content">
                <ConditionMediaView
                  locale={locale}
                  media={imageFixture}
                  playLabel={playLabel}
                />
                {renderConditionText("Fixture paragraph for the image row.")}
              </div>
            </li>
            <li className="condition-index__item" id="fixture-video-index">
              <h2 className="condition-index__title">Fixture video index row</h2>
              <div className="condition-row__content">
                <ConditionMediaView
                  locale={locale}
                  media={videoFixture}
                  playLabel={playLabel}
                />
                {renderConditionText("Fixture paragraph for the poster row.")}
              </div>
            </li>
          </ol>
        </div>
      </section>

      <article className="condition-document content-section content-section--surface" data-fixture-detail>
        <div className="site-container">
          <div className="condition-document__content">
            <EmergencyNotice body="Fixture emergency lead." label={ui("emergencyTitle")} />
          <ConditionMediaView
            locale={locale}
            media={videoFixture}
            playLabel={playLabel}
          />
          {renderConditionText("Fixture paragraph for the player row. **Ask your doctor:** a fixture question?")}
          </div>
        </div>
      </article>
    </main>
  );
}
