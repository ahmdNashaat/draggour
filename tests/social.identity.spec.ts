import { expect, test } from "@playwright/test";

import { personEntityConfig } from "../lib/seo/person-entity";
import { siteIdentity } from "../content/site";

const locales = ["en", "ar"] as const;
const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
// Rendered, in order, by the "Professional links" list on /contact.
const expectedVisibleProfiles = [
  "https://www.linkedin.com/in/mohamed-aggour-1414a941",
  "https://www.esmint.eu/executive-committee/mohamed-aggour/",
  "https://www.emedevents.com/speaker-profile/mohamed-aggour",
  "https://www.researchgate.net/profile/Mohamed-Aggour",
  "https://www.chc.be/Professionnels/Mohamed-AGGOUR",
  "https://x.com/Aggour",
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

    // D-040/D-042: the biography page carries no external profile links at all;
    // the approved destinations live on /contact only.
    const biographyHrefs = await page
      .locator("main a[href]")
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => (anchor as HTMLAnchorElement).href)
          .filter((href) => !href.startsWith(window.location.origin)),
      );
    expect(biographyHrefs).toEqual([]);
    await expect(
      page.locator('main a[href*="linkedin.com"], main a[href*="x.com"], main a[href*="twitter.com"], main a[href*="youtube.com"]'),
    ).toHaveCount(0);

    const biographyText = await page.locator("main").innerText();
    expect(biographyText).not.toContain("@Aggour");
    expect(biographyText).not.toContain("Twitter / X");
    expect(biographyText).not.toContain("PubMed");

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

    await page.goto(`/${locale}/contact`);
    const contactLinks = page.locator('section[aria-labelledby="contact-links"] a[href]');
    await expect(contactLinks).toHaveCount(expectedVisibleProfiles.length);

    const contactHrefs = await contactLinks.evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: (anchor as HTMLAnchorElement).href,
        target: (anchor as HTMLAnchorElement).target,
        rel: (anchor as HTMLAnchorElement).rel,
        text: anchor.textContent ?? "",
      })),
    );
    expect(contactHrefs.map((link) => link.href)).toEqual(expectedVisibleProfiles);
    expect(new Set(contactHrefs.map((link) => link.href)).size).toBe(contactHrefs.length);
    for (const link of contactHrefs) {
      const url = new URL(link.href);
      expect(url.protocol).toBe("https:");
      expect(isGenericPlatformHomepage(url)).toBe(false);
      expect(url.hostname).not.toMatch(/localhost|vercel\.app/i);
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
      expect(link.text).toMatch(locale === "en" ? /opens in a new tab/ : /يفتح في تبويب جديد/);
    }

    // D-042: the "Choose the appropriate route" intents block and the hero index
    // number are gone from /contact; only the professional links section stays.
    await expect(page.locator(".contact-intents, .content-hero__index")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: locale === "en" ? "Choose the appropriate route" : "اختر المسار المناسب" }),
    ).toHaveCount(0);

    await page.goto(biographyUrl);
    const jsonLdValues = await page.locator('script[type="application/ld+json"]').allTextContents();
    const personNodes = jsonLdValues.flatMap((jsonLd) => collectPersonNodes(JSON.parse(jsonLd)));
    expect(personNodes).toHaveLength(1);
    expect(personNodes[0].name).toBe(siteIdentity.name);
    expect(personNodes[0].sameAs ?? []).toEqual([]);
  });
}

test("the X destination is the approved profile URL and never a bare handle", async ({ page }) => {
  const biography = await import("../content/biography");
  for (const content of [biography.biographyContent, biography.biographyContentArabic]) {
    const xLinks = content.externalLinks.filter((item) =>
      /@aggour|x\.com|twitter|إكس/i.test(`${item.title} ${item.detail ?? ""}`),
    );
    expect(xLinks).toHaveLength(1);
    expect(xLinks[0].detail).toBe("https://x.com/Aggour");
    expect(xLinks[0].internalOnly).toBeFalsy();
    expect(content.externalLinks.some((item) => item.detail === "@Aggour")).toBe(false);
  }

  for (const locale of locales) {
    await page.goto(`/${locale}/biography`);
    await expect(page.locator("main")).not.toContainText("@Aggour");
  }
});
