import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { LEGAL_PLACEHOLDERS, getLegalContent, type LegalBlock } from "@/content/legal";
import { getLocalizedPath, type Locale } from "@/content/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type LegalPageProps = Readonly<{ locale: Locale }>;

const placeholderTokens = LEGAL_PLACEHOLDERS as readonly string[];
/** `null` while no client value is pending, so text is never split on an empty match. */
const placeholderPattern = placeholderTokens.length
  ? new RegExp(`(${placeholderTokens.map(escapeRegExp).join("|")})`, "g")
  : null;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wraps the pending client-supplied values so they stay visibly marked until they are replaced. */
function renderLegalText(text: string) {
  if (!placeholderPattern) return text;

  return text.split(placeholderPattern).map((part, index) =>
    placeholderTokens.includes(part) ? (
      <span className="legal-placeholder" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function renderBlock(block: LegalBlock, key: string) {
  switch (block.type) {
    case "subheading":
      return (
        <h3 className="legal-body__subheading" key={key}>
          {renderLegalText(block.text)}
        </h3>
      );
    case "paragraph":
      return <p key={key}>{renderLegalText(block.text)}</p>;
    case "note":
      return (
        <p className="legal-body__note" key={key}>
          {renderLegalText(block.text)}
        </p>
      );
    case "flow":
      return (
        <ol className="legal-body__flow" key={key}>
          {block.items.map((item, index) => (
            <li key={index}>{renderLegalText(item)}</li>
          ))}
        </ol>
      );
  }
}

export async function LegalPage({ locale }: LegalPageProps) {
  const ui = await getTranslations("content");
  const nav = await getTranslations("navigation");
  const parts = getLegalContent(locale);

  return (
    <main id="main-content" className="content-page professional-page" data-legal-page>
      <Breadcrumbs items={[
        { name: nav("home"), href: getLocalizedPath(locale, "") },
        { name: ui("legalPage.title") }
      ]} />
      <section className="content-hero" aria-labelledby="legal-title">
        <div className="site-container content-hero__grid content-hero__grid--single">
          <div>
            <p className="eyebrow">{ui("legalPage.eyebrow")}</p>
            <h1 id="legal-title">{ui("legalPage.title")}</h1>
            <p className="content-hero__description">{ui("legalPage.description")}</p>
          </div>
        </div>
      </section>

      <div className="site-container legal-intro">
        <p className="content-section__body-text">{ui("legalPage.intro")}</p>
        <p className="legal-intro__updated">{ui("legalPage.lastUpdated")}</p>
      </div>

      {parts.map((part) => (
        <section className="content-section" key={part.id} aria-labelledby={`legal-${part.id}`}>
          <div className="site-container content-section__inner">
            <div>
              <h2 id={`legal-${part.id}`}>{part.title}</h2>
            </div>
            <div className="legal-body">
              {part.blocks.map((block, index) => renderBlock(block, `${part.id}-${index}`))}
            </div>
          </div>
        </section>
      ))}

      <nav className="content-next-links" aria-label={ui("legalPage.title")}>
        <div className="site-container">
          <Link className="button button--primary" href={getLocalizedPath(locale, "/contact")}>{ui("legalPage.contactCta")}</Link>
          <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>{ui("legalPage.consultationCta")}</Link>
          <Link className="text-link" href={getLocalizedPath(locale, "")}>{ui("legalPage.homeCta")}</Link>
        </div>
      </nav>

      <JsonLd value={buildBreadcrumbJsonLd(locale, [{ name: ui("legalPage.title"), pathname: "/legal" }])} />
    </main>
  );
}
