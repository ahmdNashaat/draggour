import Link from "next/link";

import { getLocalizedPath, type Locale } from "@/content/site";
import { getPageDefinition, type PlaceholderPageKey } from "@/content/page-placeholders";

type PlaceholderPageProps = Readonly<{
  locale: Locale;
  pageKey: PlaceholderPageKey;
}>;

export function PlaceholderPage({ locale, pageKey }: PlaceholderPageProps) {
  const page = getPageDefinition(locale, pageKey);

  return (
    <main className="placeholder-page" data-placeholder-page={pageKey}>
      <section className="placeholder-page__hero" aria-labelledby="placeholder-page-title">
        <div className="site-container">
          <p className="eyebrow">Information</p>
          <h1 id="placeholder-page-title">{page.title}</h1>
          <p className="placeholder-page__description">{page.description}</p>
          <div className="placeholder-page__notice">
            <p>{page.notice}</p>
          </div>
          <div className="placeholder-page__actions">
            <Link className="button button--primary" href={getLocalizedPath(locale, "/remote-consultation")}>
              {locale === "fr" ? "Voir la consultation" : "View the consultation process"}
            </Link>
            <Link className="text-link" href={getLocalizedPath(locale, "")}>
              {locale === "fr" ? "Retour à l’accueil" : "Return home"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
