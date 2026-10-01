import { expect, test } from "@playwright/test";

import { personEntityConfig } from "../lib/seo/person-entity";
import { siteIdentity } from "../content/site";

const locales = ["en", "ar"] as const;
const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const expectedVisibleProfiles = [
  "https://www.linkedin.com/in/mohamed-aggour-1414a941",
];
const socialPlatformHosts = new Set([
  "youtube.com",
  "www.youtube.com",
  "linkedin.com",
  "www.linkedin.com",
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
  "facebook.com",
  "www.facebook.com",
  "instagram.com",
  "www.instagram.com",
]);

function isGenericPlatformHomepage(url: URL) {
  return socialPlatformHosts.has(url.hostname.toLowerCase()) && (url.pathname === "" || url.pathname === "/");
}

function collectPersonNodes(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap(collectPersonNodes);
  if (typeof value !== "object" || value === null) return [];

  const node = value as Record<string, unknown>;
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  return [
    ...(types.includes("Person") ? [node] : []),
    ...Object.values(node).flatMap(collectPersonNodes),
  ];
}

test("Person sameAs stays empty until exact external identity URLs are approved", () => {
  const sameAs = personEntityConfig.approvedSameAs;
  expect(new Set(sameAs).size).toBe(sameAs.length);

  for (const value of sameAs) {
    const url = new URL(value);
    expect(url.protocol).toBe("https:");
    expect(isGenericPlatformHomepage(url)).toBe(false);
    expect(url.hostname).not.toMatch(/localhost|vercel\.app/i);
    expect(url.href).not.toMatch(/[?&](utm_|fbclid=|gclid=)/i);
  }
});

for (const locale of locales) {
  test(`${locale} public profile links and social metadata use consistent approved destinations`, async ({ page }) => {
    const biographyUrl = `/${locale}/biography`;
    await page.goto(biographyUrl);
    await expect(page.locator("header .brand")).toHaveAttribute("aria-label", siteIdentity.localizedName[locale]);
    await expect(page.locator("header .brand")).toBeVisible();
    await expect(page.locator("h1")).toContainText(locale === "en" ? "Biography" : "السيرة الذاتية");

    const profileSection = page.locator('section[aria-labelledby="biography-external-links"]');
    const profileLinks = profileSection.locator("a[href]");
    const hrefs = await profileLinks.evaluateAll((anchors) => anchors.map((anchor) => (anchor as HTMLAnchorElement).href));
    expect([...hrefs].sort()).toEqual([...expectedVisibleProfiles].sort());
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(profileSection).not.toContainText("@Aggour");
    expect(profileSection).not.toContainText("Twitter / X");
    expect(profileSection).not.toContainText("PubMed");
    expect(profileSection.locator('a[href^="https://x.com/"], a[href^="https://twitter.com/"]')).toHaveCount(0);
    expect(profileSection.locator('a[href^="https://youtube.com/"], a[href^="https://www.youtube.com/"]')).toHaveCount(0);

    for (const href of hrefs) {
      const url = new URL(href);
      expect(url.protocol).toBe("https:");
      expect(isGenericPlatformHomepage(url)).toBe(false);
      expect(url.hostname).not.toMatch(/localhost|vercel\.app/i);
    }

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(canonical).toBe(`${origin}${biographyUrl}`);
    expect(openGraphUrl).toBe(canonical);
    expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBe(await page.title());
    expect(await page.locator('meta[property="og:description"]').getAttribute("content")).toBeTruthy();
    expect(await page.locator('meta[property="og:site_name"]').getAttribute("content")).toBe(siteIdentity.name);

    const socialImage = `${origin}/brand/logo-primary.png`;
    expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toBe(socialImage);
    expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image");
    expect(await page.locator('meta[name="twitter:title"]').getAttribute("content")).toBe(await page.title());
    expect(await page.locator('meta[name="twitter:description"]').getAttribute("content")).toBeTruthy();
    expect(await page.locator('meta[name="twitter:image"]').getAttribute("content")).toBe(socialImage);
    await expect(page.locator('meta[name="twitter:site"], meta[name="twitter:creator"]')).toHaveCount(0);

    const researchSection = page.locator('section[aria-labelledby="biography-research"]');
    await expect(researchSection).toContainText(locale === "en" ? "PubMed listing" : "قائمة PubMed");
    await expect(researchSection.locator('a[href="https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584"]')).toHaveCount(1);

    await page.goto(`/${locale}/contact`);
    const contactLinks = page.locator('section[aria-labelledby="contact-links"] a[href]');
    await expect(contactLinks).toHaveCount(1);
    await expect(contactLinks).toHaveAttribute("href", expectedVisibleProfiles[0]);

    await page.goto(biographyUrl);
    const jsonLdValues = await page.locator('script[type="application/ld+json"]').allTextContents();
    const personNodes = jsonLdValues.flatMap((jsonLd) => collectPersonNodes(JSON.parse(jsonLd)));
    expect(personNodes).toHaveLength(1);
    expect(personNodes[0].name).toBe(siteIdentity.name);
    expect(personNodes[0].sameAs ?? []).toEqual([]);
  });
}

test("the X handle stays in source review data but is not public profile content", async ({ page }) => {
  const biography = await import("../content/biography");
  for (const content of [biography.biographyContent, biography.biographyContentArabic]) {
    const xCandidate = content.externalLinks.find((item) => item.detail === "@Aggour");
    expect(xCandidate?.internalOnly).toBe(true);
    expect(xCandidate?.review).toContain("no matching public account has been verified");
  }

  for (const locale of locales) {
    await page.goto(`/${locale}/biography`);
    await expect(page.locator('section[aria-labelledby="biography-external-links"]')).not.toContainText("@Aggour");
  }
});
