import { expect, test } from "@playwright/test";

import { patientConditions } from "../content/patient-conditions";
import { stripConditionMarkup } from "../lib/condition-text";

const locales = ["en", "ar"] as const;

test("every condition has one non-empty, fully marked-up paragraph in both locales", () => {
  for (const condition of patientConditions) {
    for (const locale of locales) {
      const page = condition[locale];
      const where = `${condition.slug} ${locale}`;

      expect(page.body.trim().length, where).toBeGreaterThan(0);
      expect(page.title.trim().length, where).toBeGreaterThan(0);
      expect(page.searchTerms.length, where).toBeGreaterThan(0);

      // Markers only work in pairs; an odd count would leak a literal ** or !!
      // into the published page.
      const labels = page.body.match(/\*\*/g)?.length ?? 0;
      const urgents = page.body.match(/!!/g)?.length ?? 0;
      expect(labels % 2, `${where}: ** count ${labels}`).toBe(0);
      expect(urgents % 2, `${where}: !! count ${urgents}`).toBe(0);
      expect(stripConditionMarkup(page.body), where).not.toMatch(/\*\*|!!/);
    }
  }
});

test("only stroke-thrombectomy leads with an emergency instruction, as plain text", () => {
  for (const condition of patientConditions) {
    for (const locale of locales) {
      const page = condition[locale];
      const where = `${condition.slug} ${locale}`;
      const hasUrgentLead = Boolean(page.urgentLead);

      expect(hasUrgentLead, where).toBe(condition.slug === "stroke-thrombectomy");
      if (page.urgentLead) {
        expect(page.urgentLead.trim().length, where).toBeGreaterThan(0);
        expect(page.urgentLead, where).not.toMatch(/\*\*|!!/);
        // It is never part of the card or the meta description.
        expect(page.body, where).not.toContain(page.urgentLead);
      }
    }
  }
});

test("the rendered pages carry no marker syntax and no pre-paragraph markup", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/conditions`);
    await expect(page.locator("main h3")).toHaveCount(0);
    await expect(page.locator(".condition-paragraph")).toHaveCount(10);
    // Two labelled questions (angiography, paediatric) and eight urgent
    // sentences across the ten paragraphs.
    await expect(page.locator(".condition-label")).toHaveCount(2);
    await expect(page.locator(".condition-urgent")).toHaveCount(8);
    // The stroke lead stands alone, above its paragraph, with no heading.
    await expect(page.locator(".condition-emergency-lead")).toHaveCount(1);
    await expect(page.locator(".condition-emergency-lead h2")).toHaveCount(0);

    const hubText = await page.locator("main").innerText();
    expect(hubText, locale).not.toMatch(/\*\*|!!/);

    for (const condition of patientConditions) {
      const content = condition[locale];
      await page.goto(`/${locale}/conditions/${condition.slug}`);
      const where = `${condition.slug} ${locale}`;

      await expect(page.locator(".condition-paragraph"), where).toHaveCount(1);
      expect(await page.locator(".condition-paragraph").innerText(), where).toBe(
        stripConditionMarkup(content.body),
      );
      await expect(page.locator(".condition-emergency-lead"), where).toHaveCount(
        content.urgentLead ? 1 : 0,
      );

      const text = await page.locator("main").innerText();
      expect(text, where).not.toMatch(/\*\*|!!/);
      if (content.urgentLead) expect(text, where).toContain(content.urgentLead);
    }
  }
});

test("hub rows collapse on mobile below 60rem with accessible toggle and keep full text in DOM", async ({ page }) => {
  // Mobile viewport (below 60rem / 960px): toggle buttons appear and are collapsed by default
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/conditions");

  const toggles = page.locator(".condition-collapsible__toggle");
  await expect(toggles).toHaveCount(10);
  await expect(toggles.first()).toBeVisible();
  await expect(toggles.first()).toHaveAttribute("aria-expanded", "false");
  await expect(toggles.first()).toHaveText("Read more");

  // Controls attribute references the clamped element's id
  const clampId = await toggles.first().getAttribute("aria-controls");
  expect(clampId).toBeTruthy();
  await expect(page.locator(`[id="${clampId}"]`)).toBeAttached();

  // Expanding changes button state and label
  await toggles.first().click();
  await expect(toggles.first()).toHaveAttribute("aria-expanded", "true");
  await expect(toggles.first()).toHaveText("Show less");

  // Collapsing restores initial state
  await toggles.first().click();
  await expect(toggles.first()).toHaveAttribute("aria-expanded", "false");
  await expect(toggles.first()).toHaveText("Read more");

  // Arabic mobile labels
  await page.goto("/ar/conditions");
  const arToggles = page.locator(".condition-collapsible__toggle");
  await expect(arToggles.first()).toBeVisible();
  await expect(arToggles.first()).toHaveText("اقرأ المزيد");
  await arToggles.first().click();
  await expect(arToggles.first()).toHaveText("إخفاء");

  // Desktop viewport (≥60rem): toggles are hidden via CSS
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(arToggles.first()).toBeHidden();
});

