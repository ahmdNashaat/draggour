import { expect, test } from "@playwright/test";

import { conditionContent } from "../content/conditions";
import { publicPathnames } from "../content/page-placeholders";
import { siteIdentity } from "../content/site";
import arMessages from "../messages/ar.json";
import enMessages from "../messages/en.json";

const locales = ["en", "ar"] as const;
const messages = { en: enMessages, ar: arMessages };
const testOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

test("generic robots policy permits public pages for search and AI crawlers", async ({ page }) => {
  const response = await page.request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const robots = await response.text();

  expect(robots).toMatch(/User-agent:\s*\*/i);
  expect(robots).toMatch(/Allow:\s*\//i);
  expect(robots).not.toMatch(/Disallow:\s*\//i);

  // These crawlers currently inherit the generic allow rule without overrides.
  for (const crawler of ["Googlebot", "Bingbot", "OAI-SearchBot", "GPTBot"]) {
    expect(robots).not.toMatch(new RegExp(`User-agent:\s*${crawler}`, "i"));
  }

  if (testOrigin) expect(robots).toContain(`Sitemap: ${new URL("/sitemap.xml", testOrigin).toString()}`);
  else expect(robots).not.toContain("Sitemap:");
});

test("core identity and topical passages are present in crawlable page HTML", async ({ page }) => {
  for (const locale of locales) {
    const homeResponse = await page.request.get(`/${locale}`);
    expect(homeResponse.status()).toBe(200);
    const homeHtml = await homeResponse.text();
    expect(homeHtml).toContain(siteIdentity.localizedName[locale]);
    expect(homeHtml).toContain(siteIdentity.professionalTitle[locale]);
    expect(homeHtml).toContain(`/${locale}/biography`);
    expect(homeHtml).toContain(`/${locale}/remote-consultation`);

    const biographyResponse = await page.request.get(`/${locale}/biography`);
    expect(biographyResponse.status()).toBe(200);
    const biographyHtml = await biographyResponse.text();
    expect(biographyHtml).toContain(siteIdentity.localizedName[locale]);
    expect(biographyHtml).toContain("ProfilePage");
    expect(biographyHtml).toContain("#person");
    for (const section of ["currentPositions", "careerHistory", "qualifications", "societies", "teaching", "academic", "research", "clinicalExpertise"]) {
      expect(biographyHtml).toContain(`biography-${section.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`);
    }

    const conditionsResponse = await page.request.get(`/${locale}/conditions`);
    expect(conditionsResponse.status()).toBe(200);
    const conditionsHtml = await conditionsResponse.text();
    for (const condition of conditionContent) expect(conditionsHtml).toContain(`/${locale}/conditions/${condition.slug}`);

    for (const condition of conditionContent) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.request.get(route);
      expect(response.status(), route).toBe(200);
      const html = await response.text();
      expect(html).toContain(condition.slug);
      expect(html).toContain(locale === "ar" ? condition.arabicDescription : condition.description);
      expect(html).toContain(messages[locale].content.conditions.scopeIntro);
      expect(html).toContain(`/${locale}/remote-consultation`);
      expect(html).toContain(`/${locale}/biography`);
      expect(html).toContain(`/${locale}/legal`);
    }

    const learningResponse = await page.request.get(`/${locale}/e-learning`);
    expect(learningResponse.status()).toBe(200);
    const learningHtml = await learningResponse.text();
    expect(learningHtml).toContain(messages[locale].content.eLearningPage.title);
    expect(learningHtml).toContain(`/${locale}/biography`);

    const consultationResponse = await page.request.get(`/${locale}/remote-consultation`);
    expect(consultationResponse.status()).toBe(200);
    const consultationHtml = await consultationResponse.text();
    expect(consultationHtml).toContain(messages[locale].content.consultationPage.description);
    expect(consultationHtml).toContain(`/${locale}/legal`);

    const contactResponse = await page.request.get(`/${locale}/contact`);
    expect(contactResponse.status()).toBe(200);
    const contactHtml = await contactResponse.text();
    expect(contactHtml).toContain(`/${locale}/remote-consultation`);
    expect(contactHtml).toContain(`/${locale}/biography`);

    const legalResponse = await page.request.get(`/${locale}/legal`);
    expect(legalResponse.status()).toBe(200);
    const legalHtml = await legalResponse.text();
    expect(legalHtml).toContain(locale === "en" ? "Privacy Notice" : "إشعار الخصوصية");
    expect(legalHtml).toContain(locale === "en" ? "Medical Disclaimer" : "إخلاء المسؤولية الطبية");
    expect(legalHtml).toContain("[LEGAL NAME]");
  }
});

test("public sitemap contains only locale routes and no consultation-input routes", async ({ page }) => {
  const response = await page.request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const sitemap = await response.text();
  expect(sitemap).not.toMatch(/\/api\/|consultation\/success|[?&](name|email|phone|medical|file)=/i);
  expect(sitemap).not.toContain("/fr");
  if (testOrigin) {
    for (const pathname of publicPathnames) {
      for (const locale of locales) expect(sitemap).toContain(new URL(`/${locale}${pathname}`, testOrigin).toString());
    }
  }
});
