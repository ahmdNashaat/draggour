import { expect, test } from "@playwright/test";

import { patientConditions } from "../content/patient-conditions";
import {
  getLearningLinks,
  selectLearningLinks,
  type LearningLink,
} from "../content/learning-links";

const locales = ["en", "ar"] as const;

test("all ten condition pages keep the supplied copy, review label, disclaimer and return link", async ({ page }) => {
  for (const locale of locales) {
    const headings: string[] = [];

    for (const condition of patientConditions) {
      const route = `/${locale}/conditions/${condition.slug}`;
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main[data-condition-page]")).toHaveAttribute("data-condition-page", condition.slug);
      await expect(page.locator(".condition-reviewed-by")).toHaveText(locale === "en"
        ? "Reviewed by Dr. Mohamed Aggour · Last reviewed 4 October 2026"
        : "راجعه د. محمد عجور · آخر مراجعة 4 أكتوبر 2026");
      await expect(page.locator(".condition-document__block").first()).toBeVisible();
      await expect(page.locator(`main a[href="/${locale}/conditions"]`)).toHaveCount(2);
      await expect(page.locator(`main a[href="/${locale}/remote-consultation"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);

      const heading = (await page.locator("h1").textContent())?.trim() ?? "";
      headings.push(heading);
      expect(heading).toBe(locale === "en" ? condition.en.title : condition.ar.title);
      const pageText = await page.locator("main").innerText();
      expect(pageText).toContain(locale === "en"
        ? "This page explains a condition in general terms. It is not advice about your own case"
        : "تشرح هذه الصفحة الحالة بشكل عام، وليست نصيحة طبية لحالتك الخاصة");
      expect(pageText).not.toContain("يُؤكَّد مكان إجراء الدكتور عجور");

      const anchors = (await page.locator("main a[href]").allTextContents()).map((text) => text.trim());
      expect(anchors.every((text) => text.length > 0 && text.length < 60)).toBe(true);
      expect(anchors.join(" ")).not.toMatch(/best|leading|world.?class|number one|#1/i);
    }

    expect(new Set(headings).size).toBe(10);
  }
});

test("stroke guidance in both languages directs urgent cases away from the website", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/conditions/stroke-thrombectomy`);
    const text = await page.locator("main").innerText();
    if (locale === "en") {
      expect(text).toContain("call emergency services now. Do not use this website or send a message.");
    } else {
      expect(text).toContain("فاتصل بالإسعاف فورًا. لا تستخدم هذا الموقع ولا ترسل رسالة.");
    }
  }
});

test("legacy condition paths route to the matching document slug in both locales", async ({ page }) => {
  const aliases = [
    ["stroke", "stroke-thrombectomy"],
    ["carotid-stenosis", "carotid-intracranial-stenting"],
    ["venous-sinus-disorders", "venous-sinus-stenting"],
  ] as const;

  for (const locale of locales) {
    for (const [oldSlug, newSlug] of aliases) {
      await page.goto(`/${locale}/conditions/${oldSlug}`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/conditions/${newSlug}$`));
      await expect(page.locator(`main[data-condition-page="${newSlug}"]`)).toBeVisible();
    }
  }
});

test("E-learning renders the learning links with safe external anchors and no teaching list", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/e-learning`);
    await expect(page.locator("h1")).toHaveText(locale === "en" ? "E-learning for Physicians" : "التعليم الطبي للأطباء");

    // Removed from this page: the hero index number and the teaching list.
    await expect(page.locator(".content-hero__index")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Teaching and education", exact: true })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "التعليم والتدريب", exact: true })).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: locale === "en" ? "Learning links" : "روابط التعلم", exact: true }),
    ).toBeVisible();

    const anchors = page.locator("main .learning-link__anchor");
    const rendered = await anchors.evaluateAll((items) =>
      items.map((anchor) => ({
        href: anchor.getAttribute("href") ?? "",
        target: anchor.getAttribute("target"),
        rel: anchor.getAttribute("rel") ?? "",
        text: anchor.textContent ?? "",
      })),
    );
    expect(rendered.length).toBeGreaterThan(0);

    for (const link of rendered) {
      const url = new URL(link.href);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).not.toMatch(/localhost|vercel\.app/i);
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
      expect(link.text).toMatch(locale === "en" ? /opens in a new tab/ : /يفتح في تبويب جديد/);
    }

    // Everything published in content/learning-links.ts reaches this page.
    const expected = getLearningLinks(locale).map((link) => link.url);
    expect([...rendered.map((link) => link.href)].sort()).toEqual([...expected].sort());

    await expect(page.locator(".learning-link--primary")).toHaveCount(1);
    await expect(page.locator("main a[href$='/biography']")).toHaveCount(1);
    await expect(page.locator("main a[href$='/remote-consultation']")).toHaveCount(1);
  }
});

test("learning links drop entries without a URL and localize from a single content file", () => {
  const sample: readonly LearningLink[] = [
    {
      id: "visible",
      platform: "youtube",
      url: " https://www.youtube.com/@channel ",
      title: { en: "YouTube Channel", ar: "قناة يوتيوب" },
      description: { en: "English line", ar: "سطر عربي" },
      primary: true,
    },
    {
      id: "hidden",
      platform: "other",
      url: "   ",
      title: { en: "Hidden entry", ar: "عنصر مخفي" },
      description: { en: "Hidden line", ar: "سطر مخفي" },
      primary: false,
    },
  ];

  const english = selectLearningLinks(sample, "en");
  const arabic = selectLearningLinks(sample, "ar");

  // An empty URL never reaches the page, so no dead link can be published.
  expect(english.map((link) => link.id)).toEqual(["visible"]);
  expect(arabic.map((link) => link.id)).toEqual(["visible"]);
  expect(english[0].url).toBe("https://www.youtube.com/@channel");
  expect(english[0].primary).toBe(true);
  // One entry carries both locales; the page picks the right one.
  expect(english[0].title).toBe("YouTube Channel");
  expect(arabic[0].title).toBe("قناة يوتيوب");
  expect(arabic[0].description).toBe("سطر عربي");
});

test("medical disclaimers and consultation limits are visible, with no governance notes rendered", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/legal`);
    const legalText = await page.locator("main").innerText();
    expect(legalText).toMatch(locale === "en" ? /does not replace an individual consultation/i : /لا تحل محل استشارة فردية/);
    expect(legalText).toMatch(locale === "en" ? /not an emergency service/i : /ليس خدمة طوارئ/);

    await page.goto(`/${locale}/remote-consultation`);
    const consultation = page.locator("main");
    const consultationText = await consultation.innerText();
    expect(consultationText).toMatch(locale === "en" ? /collects nothing/i : /لا يجمع هذا الموقع أي بيانات/);
    expect(consultationText).toMatch(locale === "en" ? /does not confirm an appointment/i : /لا تُؤكد موعداً/);
    expect(consultationText).toMatch(locale === "en" ? /not an emergency service/i : /ليس خدمة طوارئ/);
    await expect(page.locator(`main a[href="/${locale}/legal"]`)).toHaveCount(1);
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator("main input, main textarea")).toHaveCount(0);

    for (const path of ["", "/biography", "/conditions", "/conditions/stroke-thrombectomy", "/e-learning", "/remote-consultation", "/contact", "/legal"]) {
      await page.goto(`/${locale}${path}`);
      const visibleText = await page.locator("body").innerText();
      expect(visibleText).not.toMatch(/DOCTOR APPROVAL REQUIRED|Publish:\s*NO|CF[1-9]|T[123]\s*\/\s*Q/i);
    }
  }
});
