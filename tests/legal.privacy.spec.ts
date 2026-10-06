import { expect, test } from "@playwright/test";

import { LEGAL_PLACEHOLDERS, getLegalContent, type LegalBlock } from "../content/legal";

const locales = ["en", "ar"] as const;

const placeholderGateHint =
  "Any bracketed token must be listed in LEGAL_PLACEHOLDERS and published in content/legal.ts before launch; " +
  "removing the token without the real value fails this gate on purpose.";

function blockTexts(blocks: readonly LegalBlock[]): string[] {
  return blocks.flatMap((block) => (block.type === "flow" ? [...block.items] : [block.text]));
}

function bracketTokens(text: string): string[] {
  return text.match(/\[[A-Z0-9 &/_-]+\]/g) ?? [];
}

test("legal content declares no pending client-supplied placeholder value", () => {
  // D-043: the operator name is published, and the clauses that carried the
  // other three tokens are removed because WhatsApp is the primary channel, so
  // nothing on the page is still waiting on the client.
  expect(LEGAL_PLACEHOLDERS).toHaveLength(0);

  for (const locale of locales) {
    const parts = getLegalContent(locale);
    expect(parts.map((part) => part.id), `${locale} part ids`).toEqual([
      "privacy-notice",
      "medical-disclaimer",
      "remote-consultation-terms",
      "cookies-analytics",
    ]);

    const declared = new Set(parts.flatMap((part) => bracketTokens(blockTexts(part.blocks).join(" "))));
    expect([...declared].sort(), `${locale} placeholders — ${placeholderGateHint}`).toEqual(
      [...LEGAL_PLACEHOLDERS].sort(),
    );
  }
});

test("legal page stays short, complete, and carries no pending client-supplied value", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);
    await expect(page.locator("[data-legal-page]")).toBeVisible();

    const parts = getLegalContent(locale);
    const headings = page.locator("main h2");
    await expect(headings).toHaveCount(4);
    await expect(headings).toHaveText(parts.map((part) => part.title));

    const expectedSubheadings = parts
      .flatMap((part) => part.blocks)
      .filter((block) => block.type === "subheading").length;
    await expect(page.locator("main h3")).toHaveCount(expectedSubheadings);

    await expect(page.locator("main .legal-placeholder"), `${locale} has no pending value to mark`).toHaveCount(0);

    const bodyText = await page.locator("main").innerText();
    expect(bodyText, `${locale} still shows an unpublished placeholder — ${placeholderGateHint}`).not.toMatch(
      /\[[A-Z0-9 &/_-]+\]/,
    );
    expect(bodyText, `${locale} must not invent a contact email`).not.toMatch(/[\w.+-]+@[\w-]+\.[A-Za-z]{2,}/);
    expect(bodyText, `${locale} must not invent a phone number`).not.toMatch(/\+?\d[\d\s-]{7,}\d/);
    expect(bodyText).not.toMatch(/Information will be available here|ستتوفر المعلومات هنا/);

    // Size guard (DECISIONS.md D-035): the page is a short trust notice, not a content asset.
    const words = bodyText.split(/\s+/).filter(Boolean).length;
    expect(words, `${locale} legal page word count: ${words}`).toBeLessThan(500);
    expect(words, `${locale} legal page word count: ${words}`).toBeGreaterThan(150);
  }
});

test("legal page carries the required safety statements in both launch locales", async ({ page }) => {
  const requiredStatements: Record<(typeof locales)[number], readonly string[]> = {
    en: [
      "not an emergency service",
      "does not confirm an appointment",
      "It does not replace an individual consultation",
      "never sell personal information",
      "never used for analytics or advertising",
      "Last updated:",
    ],
    ar: [
      "هذا الموقع ليس خدمة طوارئ",
      "لا يؤكد موعداً",
      "ولا تحل محل استشارة فردية",
      "لا نبيع بياناتك الشخصية",
      "لا يُستخدم محتوى الاستشارة أبداً لأغراض التحليلات أو الإعلانات",
      "آخر تحديث:",
    ],
  };

  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);
    const bodyText = await page.locator("main").innerText();

    for (const statement of requiredStatements[locale]) {
      expect(bodyText, `${locale}: ${statement}`).toContain(statement);
    }

    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page).toHaveTitle(/Legal & Privacy|الخصوصية والشؤون القانونية/);

    if (locale === "ar") {
      expect(bodyText).toMatch(/[\u0600-\u06ff]/);
      // No characters from non-Arabic, non-Latin scripts (DECISIONS.md D-033).
      expect(bodyText).not.toMatch(/[\u3000-\u9fff\uf900-\ufaff]/);
    }
  }
});

test("legal page structure stays in EN/AR parity and placeholders are marked up", async ({ page }) => {
  const countsPerLocale: Record<(typeof locales)[number], { h2: number; h3: number; placeholders: number; steps: number }> = {
    en: { h2: 0, h3: 0, placeholders: 0, steps: 0 },
    ar: { h2: 0, h3: 0, placeholders: 0, steps: 0 },
  };

  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);

    countsPerLocale[locale] = {
      h2: await page.locator("main h2").count(),
      h3: await page.locator("main h3").count(),
      placeholders: await page.locator("main .legal-placeholder").count(),
      steps: await page.locator("main .legal-body__flow li").count(),
    };

    await expect(page.locator("main section.content-section[aria-labelledby^='legal-']")).toHaveCount(4);
  }

  expect(countsPerLocale.ar).toEqual(countsPerLocale.en);
  expect(countsPerLocale.en).toEqual({ h2: 4, h3: 3, placeholders: 0, steps: 5 });
});
