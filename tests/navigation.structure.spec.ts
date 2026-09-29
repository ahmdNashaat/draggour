import { expect, test } from "@playwright/test";

import { legalNavigation, primaryNavigation } from "../content/navigation";
import { publicPathnames } from "../content/page-placeholders";

/**
 * Approved V1 structure (DECISIONS.md D-029):
 * Home → Biography → Conditions → E-learning for Physicians → Remote Consultation → Contact → Legal / Privacy
 */
const primaryPathnames = ["", "/biography", "/conditions", "/e-learning", "/remote-consultation", "/contact"] as const;

const allPathnames = [
  "",
  "/biography",
  "/conditions",
  "/conditions/brain-aneurysm",
  "/conditions/stroke",
  "/conditions/avm",
  "/conditions/carotid-stenosis",
  "/conditions/venous-sinus-disorders",
  "/conditions/chronic-subdural-haematoma",
  "/e-learning",
  "/remote-consultation",
  "/contact",
  "/legal",
] as const;

const locales = ["en", "ar"] as const;

const primaryLabels: Record<(typeof locales)[number], readonly string[]> = {
  en: ["Home", "Biography", "Conditions", "E-learning for Physicians", "Remote Consultation", "Contact"],
  ar: ["الرئيسية", "السيرة الذاتية", "الحالات", "التعليم الطبي", "الاستشارة عن بُعد", "تواصل معنا"],
};

const legalLabel: Record<(typeof locales)[number], string> = {
  en: "Privacy & legal",
  ar: "الخصوصية والشروط",
};

const prohibitedSectionName: Record<(typeof locales)[number], RegExp> = {
  en: /Professional Activities/i,
  ar: /الأنشطة المهنية/,
};

function normalizedPath(pathname: string) {
  return pathname.replace(/^\/(en|ar)/, "") || "/";
}

test("navigation content model matches the approved V1 structure", () => {
  expect(primaryNavigation.map((item) => item.pathname)).toEqual([...primaryPathnames]);
  expect(legalNavigation.map((item) => item.pathname)).toEqual(["/legal"]);
  expect([...publicPathnames]).toEqual([...allPathnames]);

  for (const pathname of [...primaryPathnames, ...publicPathnames, ...legalNavigation.map((item) => item.pathname)]) {
    expect(pathname).not.toMatch(/professional-activities|\/media/);
  }
});

test("header and footer navigation expose the approved V1 structure", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);

    const headerLinks = page.locator("#primary-navigation ul li a");
    await expect(headerLinks).toHaveCount(primaryPathnames.length);
    await expect(headerLinks).toHaveText([...primaryLabels[locale]]);

    for (const [index, pathname] of primaryPathnames.entries()) {
      await expect(headerLinks.nth(index)).toHaveAttribute("href", `/${locale}${pathname}`);
    }

    const footerLists = page.locator(".site-footer__links");
    await expect(footerLists.nth(0).locator("li a")).toHaveText([...primaryLabels[locale]]);

    const legalLinks = footerLists.nth(1).locator("li a");
    await expect(legalLinks).toHaveCount(1);
    await expect(legalLinks).toHaveText(legalLabel[locale]);
    await expect(legalLinks).toHaveAttribute("href", `/${locale}/legal`);

    await expect(page.locator('a[href*="professional-activities"]')).toHaveCount(0);
    await expect(page.locator('a[href="/en/media"], a[href="/ar/media"]')).toHaveCount(0);
  }
});

test("homepage contains no Professional Activities section", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    await expect(page.locator("[data-homepage]")).toBeVisible();

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toMatch(prohibitedSectionName[locale]);
    await expect(page.locator('a[href*="professional-activities"]')).toHaveCount(0);
  }
});

test("Professional Activities routes are not served", async ({ page }) => {
  for (const route of ["/en/professional-activities", "/ar/professional-activities", "/en/media"]) {
    const response = await page.request.get(route);
    expect(response?.status(), `${route} should not exist`).toBe(404);
  }
});

test("sitemap lists the V1 destinations and omits Professional Activities", async ({ page }) => {
  const response = await page.request.get("/sitemap.xml");
  expect(response?.ok()).toBeTruthy();

  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  for (const location of locations) {
    expect(location).not.toMatch(/professional-activities|\/media/);
  }

  // The sitemap is empty until NEXT_PUBLIC_SITE_URL is configured; when present
  // it must contain exactly the approved V1 destinations for both launch locales.
  if (locations.length > 0) {
    const actual = new Set(locations.map((location) => normalizedPath(new URL(location).pathname)));
    const expected = new Set(allPathnames.map((pathname) => pathname || "/"));
    expect([...actual].sort()).toEqual([...expected].sort());
    expect(locations).toHaveLength(allPathnames.length * locales.length);
  }
});
