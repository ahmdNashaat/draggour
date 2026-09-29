import { expect, test, type Page } from "@playwright/test";

const viewportWidths = [320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560];

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function choosePatientNonEmergencyOnline(page: Page, locale = "en") {
  await page.goto(`/${locale}/remote-consultation`);
  await page.getByRole("radio", { name: /Patient \/ Consultation|مريض \/ استشارة/ }).check();
  await page.getByRole("button", { name: /Continue|متابعة/ }).click();
  await page.getByRole("radio", { name: /Non-Emergency|غير طارئة/ }).check();
  await page.getByRole("button", { name: /Continue|متابعة/ }).click();
  await page.getByRole("radio", { name: /Online Consultation|استشارة عن بُعد/ }).check();
  await page.getByRole("button", { name: /Continue|متابعة/ }).click();
}

async function completePatientJourneyToReview(page: Page) {
  await page.locator("#full-name").fill("Prototype visitor");
  await page.locator("#email").fill("invalid-email");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator(".consultation-error[role=alert]")).toContainText("valid format");
  await page.locator("#email").fill("prototype@example.test");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.locator("#preferred-time-0").fill("2030-01-10T10:00");
  await page.getByRole("button", { name: "Add another preferred time" }).click();
  await page.locator("#preferred-time-1").fill("2030-01-11T11:00");
  await page.getByRole("button", { name: "Add another preferred time" }).click();
  await page.locator("#preferred-time-2").fill("2030-01-12T12:00");
  await expect(page.getByRole("button", { name: "Add another preferred time" })).toBeDisabled();
  await page.getByRole("button", { name: "Continue" }).click();

  const files = page.locator("#consultation-files");
  await files.setInputFiles([
    { name: "scan.pdf", mimeType: "application/pdf", buffer: Buffer.from("prototype") },
    { name: "image.jpg", mimeType: "image/jpeg", buffer: Buffer.from("prototype") },
    { name: "report.png", mimeType: "image/png", buffer: Buffer.from("prototype") },
  ]);
  await expect(page.getByText("scan.pdf", { exact: true })).toBeVisible();
  await files.setInputFiles({ name: "extra.pdf", mimeType: "application/pdf", buffer: Buffer.from("prototype") });
  await expect(page.locator(".consultation-error[role=alert]")).toContainText("maximum of three");
  await page.getByRole("button", { name: "Remove scan.pdf" }).click();
  await files.setInputFiles({ name: "not-allowed.txt", mimeType: "text/plain", buffer: Buffer.from("prototype") });
  await expect(page.locator(".consultation-error[role=alert]")).toContainText("only PDF, JPG, and PNG");
  await page.getByRole("button", { name: "Remove image.jpg" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator(".consultation-error[role=alert]")).toContainText("Consent is required");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator('[data-consultation-step="review"]')).toBeVisible();
}

test("patient non-emergency journey supports validation, review, edit and prototype receipt", async ({ page }) => {
  await choosePatientNonEmergencyOnline(page);
  await completePatientJourneyToReview(page);

  await expect(page.locator('[data-consultation-step="review"]')).toContainText("Prototype visitor");
  await expect(page.locator('[data-consultation-step="review"]')).toContainText("Online Consultation");
  await expect(page.locator('[data-consultation-step="review"]')).toContainText("report.png");

  await page.locator('[data-consultation-step="review"] .consultation-review-group button').first().click();
  await expect(page.locator('[data-consultation-step="requester"]')).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator('[data-consultation-step="review"]')).toBeVisible();

  const beforeUrl = page.url();
  const beforeStorage = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
  }));
  const submissionRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "fetch" || request.resourceType() === "xhr") submissionRequests.push(request.url());
  });

  await page.getByRole("button", { name: "Complete request preview" }).click();
  await expect(page.locator("[data-consultation-success]")).toBeVisible();
  expect(page.url()).toBe(beforeUrl);
  expect(submissionRequests).toEqual([]);
  await expect(page.locator("[data-consultation-success]")).toContainText("Appointment is not confirmed.");
  await expect(page.locator("[data-consultation-success]")).toContainText("Payment is not confirmed or processed.");
  await expect(page.locator("[data-consultation-success]")).toContainText("No diagnosis has been provided.");
  expect(await page.evaluate(() => ({ local: window.localStorage.length, session: window.sessionStorage.length }))).toEqual(beforeStorage);
});

test("emergency branch ends the normal flow without consultation controls", async ({ page }) => {
  await page.goto("/en/remote-consultation");
  await page.getByRole("radio", { name: "Patient / Consultation" }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.locator('input[name="urgency"][value="emergency"]').check();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator("[data-consultation-emergency]")).toBeVisible();
  await expect(page.locator("[data-consultation-emergency]")).toContainText("This website is not an emergency service.");
  await expect(page.locator("[data-consultation-emergency]")).toContainText("Contact local emergency services.");
  await expect(page.locator("[data-consultation-emergency]")).toContainText("Attend the nearest hospital.");
  await expect(page.locator("#consultation-files")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Show prototype receipt" })).toHaveCount(0);
  await expect(page.getByText("Online Consultation", { exact: true })).toHaveCount(0);
});

test("physician referral branch exposes only professional referral fields and clinic service", async ({ page }) => {
  await page.goto("/en/remote-consultation");
  await page.getByRole("radio", { name: "Physician / Referral" }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "Non-Emergency" }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "Clinic Visit" }).check();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator('[data-consultation-step="details"]')).toContainText("Physician / Referral details");
  await expect(page.locator("#physician-name")).toBeVisible();
  await expect(page.locator("#referral-summary")).toBeVisible();
  await expect(page.locator("#reason")).toHaveCount(0);
  await page.locator("#physician-name").fill("Referring physician");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator('[data-consultation-step="review"]')).toContainText("Clinic Visit");
  await expect(page.locator('[data-consultation-step="review"]')).toContainText("Referring physician");
});

test("remote consultation stays usable in EN/AR across the required viewport matrix", async ({ page }) => {
  for (const locale of ["en", "ar"]) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}/remote-consultation`);
      await expect(page.locator("[data-consultation-prototype]")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expectNoHorizontalOverflow(page);
    }
  }

  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/en/remote-consultation");
  await expectNoHorizontalOverflow(page);
  await page.getByRole("radio", { name: "Patient / Consultation" }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("radio", { name: "Patient / Consultation" })).toBeChecked();
});
