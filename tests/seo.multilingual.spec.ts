import { expect, test } from "@playwright/test";

import { publicPathnames } from "../content/page-placeholders";
import { siteIdentity } from "../content/site";
import englishMessages from "../messages/en.json";
import arabicMessages from "../messages/ar.json";

const locales = ["en", "ar"] as const;
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function messageLeafKeys(value: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child !== null && typeof child === "object"
      ? messageLeafKeys(child as Record<string, unknown>, path)
      : [path];
  });
}

test("English and Arabic launch dictionaries have matching message keys", () => {
  expect(messageLeafKeys(englishMessages).sort()).toEqual(messageLeafKeys(arabicMessages).sort());
});

test("every launch page has a localized reciprocal page pair and matching document language", async ({ page }) => {
  for (const pathname of publicPathnames) {
    const rendered: Record<(typeof locales)[number], { title: string; h1: string; description: string }> = {
      en: { title: "", h1: "", description: "" },
      ar: { title: "", h1: "", description: "" },
    };

    for (const locale of locales) {
      const route = `/${locale}${pathname}`;
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");

      const title = await page.title();
      const h1 = (await page.locator("main h1").textContent())?.trim() ?? "";
      const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
      rendered[locale] = { title, h1, description };

      expect(title).toContain(siteIdentity.localizedName[locale]);
      expect(description.length).toBeGreaterThan(20);
      if (locale === "ar") {
        expect(`${title} ${h1} ${description}`).toMatch(/[\u0600-\u06ff]/);
      } else {
        expect(`${title} ${h1} ${description}`).toMatch(/[A-Za-z]/);
      }

      const languageSwitcher = page.locator("nav.language-switcher");
      await expect(languageSwitcher).toHaveCount(1);
      await expect(languageSwitcher).toHaveAttribute("aria-label", locale === "ar" ? "تغيير اللغة" : "Switch language");
      await expect(languageSwitcher.locator("a")).toHaveCount(2);
      await expect(languageSwitcher.locator(`a[aria-current="true"]`)).toHaveCount(1);

      if (siteOrigin) {
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveAttribute("href", new URL(route, siteOrigin).toString());
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
          "href",
          new URL(`/en${pathname}`, siteOrigin).toString(),
        );
        await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute(
          "href",
          new URL(`/ar${pathname}`, siteOrigin).toString(),
        );
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(0);
      }

      const otherLocale = locale === "en" ? "ar" : "en";
      await expect(languageSwitcher.locator(`a[href="/${otherLocale}${pathname}"]`)).toHaveCount(1);
    }

    expect(rendered.en.h1, `${pathname || "/"} should have distinct English and Arabic headings`).not.toBe(rendered.ar.h1);
    expect(rendered.en.description).not.toBe(rendered.ar.description);
  }
});

test("language switcher navigates between equivalent condition routes on mobile in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/conditions/stroke");
  await page.locator("nav.language-switcher").getByRole("link", { name: "Switch to Arabic" }).click();
  await expect(page).toHaveURL(/\/ar\/conditions\/stroke$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.locator("nav.language-switcher").getByRole("link", { name: "التبديل إلى الإنجليزية" }).click();
  await expect(page).toHaveURL(/\/en\/conditions\/stroke$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("French prototype remains outside launch-language switching and metadata alternates", async ({ page }) => {
  await page.goto("/fr/biography");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await expect(page.locator("nav.language-switcher a")).toHaveCount(2);
  await expect(page.locator("nav.language-switcher a[href^='/fr']")).toHaveCount(0);
});

test("invalid locale prefixes and untranslated condition routes do not fall back to another language", async ({ page }) => {
  for (const route of ["/xx/biography", "/en/conditions/not-a-condition", "/ar/conditions/not-a-condition"]) {
    const response = await page.request.get(route);
    expect(response.status(), route).toBe(404);
  }
});
