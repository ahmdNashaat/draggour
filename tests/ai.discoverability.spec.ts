import { expect, test } from "@playwright/test";

import { getBiographyContent } from "../content/biography";
import { patientConditions } from "../content/patient-conditions";
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
    // The approved summary is the crawlable biography content (D-040: no CV section).
    for (const paragraph of getBiographyContent(locale).summary) expect(biographyHtml).toContain(paragraph);
    expect(biographyHtml).not.toContain("biography-current-positions");
    expect(biographyHtml).not.toContain("biography-external-links");

    const conditionsResponse = await page.request.get(`/${locale}/conditions`);
    expect(conditionsResponse.status()).toBe(200);
    const conditionsHtml = await conditionsResponse.text();
    for (const condition of patientConditions) expect(conditionsHtml).toContain(`/${locale}/conditions/${condition.slug}`);

    for (const condition of patientConditions) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.request.get(route);
      expect(response.status(), route).toBe(200);
      const html = await response.text();
      expect(html).toContain(condition.slug);
      const content = condition[locale];
      expect(html).toContain(content.title);
      for (const paragraph of content.blocks.flatMap((block) => block.paragraphs ?? [])) expect(html).toContain(paragraph);
      expect(html).toContain(`/${locale}/remote-consultation`);
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
    // The operator name is published on both locales' legal pages (D-043).
    expect(legalHtml).toContain(locale === "ar" ? "محمد عجور" : "Mohamed Aggour");
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
