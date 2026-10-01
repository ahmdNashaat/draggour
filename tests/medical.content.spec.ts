import { expect, test } from "@playwright/test";

import { conditionContent } from "../content/conditions";

const locales = ["en", "ar"] as const;

test("all condition pages have distinct topic content, one H1 and the relevant trust links", async ({ page }) => {
  for (const locale of locales) {
    const introductions: string[] = [];

    for (const condition of conditionContent) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main[data-condition-page]")).toHaveAttribute("data-condition-page", condition.slug);
      await expect(page.locator(".content-hero__description")).toBeVisible();
      await expect(page.locator(".content-bullet-list li").first()).toBeVisible();
      await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/biography"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);

      const introduction = (await page.locator(".content-hero__description").textContent())?.trim() ?? "";
      introductions.push(introduction);
      expect(introduction.length).toBeGreaterThan(20);

      const anchors = (await page.locator("main a[href]").allTextContents()).map((text) => text.trim());
      expect(anchors.every((text) => text.length > 0 && text.length < 60)).toBe(true);
      expect(anchors.join(" ")).not.toMatch(/best|leading|world.?class|number one|#1/i);
    }

    expect(new Set(introductions).size).toBe(6);
  }
});

test("stroke guidance in both languages directs urgent cases away from the website", async ({ page }) => {
  const expected = {
    en: ["not an emergency service", "local emergency services", "nearest hospital", "Do not wait"],
    ar: ["ليس خدمة طوارئ", "خدمات الطوارئ المحلية", "أقرب مستشفى", "لا تنتظر"],
  } as const;

  for (const locale of locales) {
    await page.goto(`/${locale}/conditions/stroke`);
    const emergency = page.locator(".condition-emergency");
    await expect(emergency).toBeVisible();
    const text = await emergency.innerText();
    for (const phrase of expected[locale]) expect(text).toContain(phrase);
  }
});

test("E-learning presents physician education without linking to a generic YouTube homepage", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/e-learning`);
    await expect(page.locator("h1")).toHaveText(locale === "en" ? "E-learning for Physicians" : "التعليم الطبي للأطباء");
    await expect(page.locator('a[href="https://www.youtube.com/"]')).toHaveCount(0);
    await expect(page.locator('a[href^="https://www.youtube.com/"]')).toHaveCount(0);
    await expect(page.locator("main a[href$='/biography']")).toHaveCount(1);
    await expect(page.locator("main a[href$='/remote-consultation']")).toHaveCount(1);
  }
});

test("medical disclaimers and consultation limits are visible, with no governance notes rendered", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);
    const legalText = await page.locator("main").innerText();
    expect(legalText).toMatch(locale === "en" ? /does not replace an individual consultation/i : /لا تحل محل استشارة فردية/);
    expect(legalText).toMatch(locale === "en" ? /not an emergency service/i : /ليس خدمة طوارئ/);

    await page.goto(`/${locale}/remote-consultation`);
    const consultation = page.locator("main");
    let consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /does not send or store/i : /لا ترسل هذه الصفحة معلوماتك ولا تخزنها/);
    const choose = (en: string, ar: string) => page.getByRole("radio", { name: locale === "en" ? en : ar }).check();
    const advance = async () => page.getByRole("button", { name: locale === "en" ? "Continue" : "متابعة" }).click();
    await choose("Patient / Consultation", "مريض / استشارة");
    await advance();
    await choose("Non-Emergency", "غير طارئة");
    await advance();
    consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /not an appointment confirmation/i : /ليس تأكيداً لموعد/);
    await choose("Online Consultation", "استشارة عن بُعد");
    await advance(); // requester details
    await advance(); // preferred times
    await advance(); // attachments
    await advance(); // consent
    await expect(page.locator(`.consultation-consent-panel a[href="/${locale}/legal"]`)).toBeVisible();
    await page.getByRole("checkbox").check();
    await advance(); // review
    consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /does not confirm an appointment/i : /لا يؤكد طلب الاستشارة هذا موعداً/);
    await page.getByRole("button", { name: locale === "en" ? "Complete request preview" : "إكمال معاينة الطلب" }).click();
    consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /Nothing was sent to the team/i : /لم يتم إرساله إلى الفريق/);
    expect(consultationText).toMatch(locale === "en" ? /Appointment is not confirmed/i : /لم يتم تأكيد الموعد/);

    for (const path of ["", "/biography", "/conditions", "/conditions/stroke", "/e-learning", "/remote-consultation", "/contact", "/legal"]) {
      await page.goto(`/${locale}${path}`);
      const visibleText = await page.locator("body").innerText();
      expect(visibleText).not.toMatch(/DOCTOR APPROVAL REQUIRED|Publish:\s*NO|CF[1-9]|T[123]\s*\/\s*Q/i);
    }
  }
});
