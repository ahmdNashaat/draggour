import { expect, test } from "@playwright/test";

import { publicPathnames } from "../content/page-placeholders";
import { siteIdentity } from "../content/site";

const launchLocales = ["en", "ar"] as const;
const expectedSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const publicRoutes = publicPathnames.flatMap((pathname) =>
  launchLocales.map((locale) => `/${locale}${pathname}`),
);

test("launch routes render unique page metadata, correct language, and safe SEO signals", async ({ page }) => {
  // Full metadata sweep across every launch route; a cold dev server needs more
  // than the default 30s to load all of them.
  test.setTimeout(180_000);
  const titlesByLocale: Record<(typeof launchLocales)[number], string[]> = { en: [], ar: [] };
  const descriptionsByLocale: Record<(typeof launchLocales)[number], string[]> = { en: [], ar: [] };

  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);

    const locale = route.startsWith("/ar") ? "ar" : "en";
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("h1")).toHaveCount(1);

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    titlesByLocale[locale].push(title);
    descriptionsByLocale[locale].push(description ?? "");
    expect(title).toContain(siteIdentity.localizedName[locale]);
    expect(title.length).toBeGreaterThan(10);
    expect(description).toBeTruthy();
    expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("index");

    const canonicals = page.locator('link[rel="canonical"]');
    await expect(canonicals).toHaveCount(expectedSiteUrl ? 1 : 0);
    if (expectedSiteUrl) {
      const canonical = await canonicals.getAttribute("href");
      expect(canonical).toBe(new URL(route, expectedSiteUrl).toString());
      expect(canonical).not.toMatch(/localhost|127\.0\.0\.1|\.vercel\.app/i);
    }

    const openGraphTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    const openGraphDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
    expect(openGraphTitle).toBe(title);
    expect(openGraphDescription).toBe(description);
    expect(await page.locator('meta[property="og:type"]').getAttribute("content")).toBe("website");
    expect(await page.locator('meta[property="og:site_name"]').getAttribute("content")).toBe("Dr. Mohamed Aggour");
    await expect(page.locator('meta[property="og:locale"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(0);
    const openGraphUrls = page.locator('meta[property="og:url"]');
    await expect(openGraphUrls).toHaveCount(expectedSiteUrl ? 1 : 0);
    if (expectedSiteUrl) await expect(openGraphUrls).toHaveAttribute("content", new URL(route, expectedSiteUrl).toString());
    expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image");
    expect(await page.locator('meta[name="twitter:title"]').getAttribute("content")).toBe(title);
    expect(await page.locator('meta[name="twitter:description"]').getAttribute("content")).toBe(description);

    const alternateLinks = page.locator('link[rel="alternate"][hreflang]');
    await expect(alternateLinks).toHaveCount(expectedSiteUrl ? 2 : 0);
    if (expectedSiteUrl) {
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", new URL(route.replace(/^\/(en|ar)/, "/en"), expectedSiteUrl).toString());
      await expect(page.locator('link[hreflang="ar"]')).toHaveAttribute("href", new URL(route.replace(/^\/(en|ar)/, "/ar"), expectedSiteUrl).toString());
    }

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const script of jsonLdScripts) {
      const jsonLd = JSON.parse(script) as { "@type"?: string; itemListElement?: { item?: string }[] };
      if (jsonLd["@type"] === "BreadcrumbList") {
        expect(expectedSiteUrl).toBeTruthy();
        for (const item of jsonLd.itemListElement ?? []) {
          expect(item.item).toMatch(/^https:\/\//);
        }
      }
    }
  }

  for (const locale of launchLocales) {
    expect(new Set(titlesByLocale[locale]).size, `${locale} titles should be unique`).toBe(publicPathnames.length);
    expect(new Set(descriptionsByLocale[locale]).size, `${locale} descriptions should be unique`).toBe(publicPathnames.length);
  }
});

test("French routes remain noindex and do not advertise launch hreflang alternates", async ({ page }) => {
  for (const pathname of publicPathnames) {
    const route = `/fr${pathname}`;
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  }
});

test("sitemap and robots expose only configured launch URLs and allow public crawling", async ({ page }) => {
  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  expect(robots).toMatch(/Allow:\s*\//i);
  expect(robots).not.toMatch(/Disallow:\s*\/(?:en|ar|_next|images|brand)/i);

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(sitemapResponse.headers()["content-type"]).toContain("xml");
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("<urlset");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);

  if (!expectedSiteUrl) {
    expect(urls).toHaveLength(0);
    expect(robots).not.toContain("Sitemap:");
    return;
  }

  const expectedUrls = publicRoutes.map((route) => new URL(route, expectedSiteUrl).toString()).sort();
  expect([...urls].sort()).toEqual(expectedUrls);
  expect(new Set(urls).size).toBe(urls.length);
  expect(sitemapEntries).toHaveLength(expectedUrls.length);
  for (const entry of sitemapEntries) {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    expect(loc).toBeTruthy();
    const pathname = new URL(loc!).pathname.replace(/^\/(en|ar)/, "");
    const expectedEnglish = new URL(`/en${pathname}`, expectedSiteUrl).toString();
    const expectedArabic = new URL(`/ar${pathname}`, expectedSiteUrl).toString();
    expect(entry).toContain(`hreflang="en" href="${expectedEnglish}"`);
    expect(entry).toContain(`hreflang="ar" href="${expectedArabic}"`);
    expect(entry).not.toContain("x-default");
  }
  expect(sitemap).not.toMatch(/localhost|127\.0\.0\.1|\.vercel\.app|\/fr(?:\/|<)/i);
  expect(robots).toContain(`Sitemap: ${new URL("/sitemap.xml", expectedSiteUrl).toString()}`);
});

test("unknown and removed routes return real 404 responses", async ({ page }) => {
  for (const route of ["/en/not-a-real-route", "/ar/not-a-real-route", "/en/professional-activities", "/ar/professional-activities", "/en/media"]) {
    const response = await page.request.get(route);
    expect(response.status(), route).toBe(404);
  }
});

test("root and trailing-slash URLs use one stable localized path", async ({ page }) => {
  const root = await page.request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toBe("/en");

  const trailingSlash = await page.request.get("/en/biography/", { maxRedirects: 0 });
  expect(trailingSlash.status()).toBe(308);
  expect(trailingSlash.headers().location).toBe("/en/biography");
});

test("query parameters do not change the canonical destination", async ({ page }) => {
  await page.goto("/en/biography?utm_source=seo-test");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveCount(expectedSiteUrl ? 1 : 0);
  if (expectedSiteUrl) {
    await expect(canonical).toHaveAttribute("href", new URL("/en/biography", expectedSiteUrl).toString());
  }
});
