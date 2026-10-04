import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleIntlRequest = createMiddleware(routing);

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

/** Arab League member states: used only as the third detection fallback. */
const ARABIC_LEAGUE_COUNTRIES = new Set([
  "AE", "BH", "DJ", "DZ", "EG", "IQ", "JO", "KM", "KW", "LB", "LY",
  "MA", "MR", "OM", "PS", "QA", "SA", "SD", "SO", "SY", "TN", "YE",
]);

/** True when the primary subtag of any offered language is Arabic ("ar", "ar-EG"). */
function acceptsArabic(header: string | null): boolean {
  if (!header) return false;

  for (const entry of header.split(",")) {
    const [tag = "", ...parameters] = entry.trim().split(";");
    const quality = parameters.map((value) => value.trim()).find((value) => value.startsWith("q="));

    if (quality && Number(quality.slice(2)) === 0) continue;
    if (tag.trim().toLowerCase().split("-")[0] === "ar") return true;
  }

  return false;
}

/**
 * Locale for the bare root only: saved choice, then Arabic in Accept-Language,
 * then an Arab League country header, then English. Never French.
 */
function resolveRootLocale(request: NextRequest): "en" | "ar" {
  const saved = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (saved === "en" || saved === "ar") return saved;

  if (acceptsArabic(request.headers.get("accept-language"))) return "ar";

  const country = (
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? ""
  )
    .trim()
    .toUpperCase();
  if (ARABIC_LEAGUE_COUNTRIES.has(country)) return "ar";

  return "en";
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Automatic language applies on the bare root and nowhere else, so shared
  // deep links always open in the language they were shared in.
  if (pathname === "/") {
    // Next relativizes same-host redirect Location values, so the absolute URL
    // reaches crawlers and tests as the stable "/en" or "/ar" path.
    const target = new URL(`/${resolveRootLocale(request)}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(target);
  }

  return handleIntlRequest(request);
}

export const config = {
  matcher: [
    // Keep API, Next internals, metadata routes, and dotted static assets out
    // of locale negotiation.
    "/((?!api|_next|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
