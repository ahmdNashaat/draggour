import { expect, test } from "@playwright/test";

const privateName = "Private Measurement Test 918273";
const privateEmail = "measurement-private-918273@example.test";
const privateMedicalText = "Private measurement medical detail 918273";

test("consultation information stays out of analytics, URLs, metadata, and JSON-LD", async ({ page }) => {
  const externalScripts: string[] = [];
  const interactionRequests: string[] = [];
  let captureInteractionRequests = false;
  page.on("request", (request) => {
    if (captureInteractionRequests) interactionRequests.push(request.url());
    if (request.resourceType() !== "script") return;
    const requestUrl = new URL(request.url());
    if (requestUrl.hostname !== "localhost" && requestUrl.hostname !== "127.0.0.1") {
      externalScripts.push(request.url());
    }
  });

  for (const locale of ["en", "ar"] as const) {
    await page.goto(`/${locale}/remote-consultation`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('script[src*="gtag"], script[src*="googletagmanager"], script[src*="analytics"], script[src*="clarity"]')).toHaveCount(0);
    expect(await page.evaluate(() => ({
      dataLayer: typeof (window as Window & { dataLayer?: unknown }).dataLayer,
      gtag: typeof (window as Window & { gtag?: unknown }).gtag,
    }))).toEqual({ dataLayer: "undefined", gtag: "undefined" });

    // The consultation page has no form and no input, so nothing typed can leak.
    await expect(page.locator("main form, main input, main textarea")).toHaveCount(0);
    captureInteractionRequests = true;

    expect(page.url()).not.toContain(privateName);
    expect(page.url()).not.toContain(privateEmail);
    expect(page.url()).not.toContain(privateMedicalText);
    const publicMetadata = await page.locator("head").evaluate((head) => {
      const metadata = [...head.querySelectorAll("title, meta, link[rel]")].map((element) =>
        [element.textContent, ...Array.from(element.attributes, (attribute) => attribute.value)].join(" "),
      );
      return metadata.join("\n");
    });
    expect(publicMetadata).not.toContain(privateName);
    expect(publicMetadata).not.toContain(privateEmail);
    expect(publicMetadata).not.toContain(privateMedicalText);
    const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
    expect(jsonLd).not.toContain(privateName);
    expect(jsonLd).not.toContain(privateEmail);
    expect(jsonLd).not.toContain(privateMedicalText);
    captureInteractionRequests = false;
    expect(interactionRequests).toEqual([]);
    interactionRequests.length = 0;
  }

  expect(externalScripts).toEqual([]);
});
