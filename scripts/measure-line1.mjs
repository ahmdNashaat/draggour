import { chromium } from "@playwright/test";

const BASE = process.env.BASE ?? "http://localhost:3002";
const browser = await chromium.launch();

for (const locale of ["en", "ar"]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    locale: locale === "ar" ? "ar-EG" : "en-GB",
  });
  await page.goto(`${BASE}/${locale}/conditions`, { waitUntil: "networkidle" });

  const line1Info = await page.evaluate(() => {
    // Select the first condition paragraph
    const p = document.querySelector(".condition-row__content .condition-paragraph");
    if (!p) return null;

    const range = document.createRange();
    let firstLineTop = null;
    let firstLineText = "";

    function inspectNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        for (let i = 0; i < text.length; i++) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const rect = range.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;
          if (firstLineTop === null) {
            firstLineTop = Math.round(rect.top);
          }
          if (Math.abs(Math.round(rect.top) - firstLineTop) <= 4) {
            firstLineText += text[i];
          } else {
            return false;
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const child of node.childNodes) {
          if (!inspectNode(child)) return false;
        }
      }
      return true;
    }

    inspectNode(p);

    // Also get all lines of the first paragraph to compute average and check each line
    const text = p.textContent.trim();
    const style = getComputedStyle(p);

    return {
      firstLineText: firstLineText.trim(),
      firstLineCharCount: firstLineText.trim().length,
      firstLineWithTrailingSpaceCount: firstLineText.length,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      boxWidth: p.getBoundingClientRect().width,
      totalChars: text.length,
    };
  });

  console.log(`=== Locale: ${locale} ===`);
  console.log("Line 1 text:", JSON.stringify(line1Info?.firstLineText));
  console.log("Line 1 char count (trimmed):", line1Info?.firstLineCharCount);
  console.log("Line 1 char count (with space):", line1Info?.firstLineWithTrailingSpaceCount);
  console.log("Box width:", line1Info?.boxWidth);
  console.log("Font:", line1Info?.fontFamily, line1Info?.fontSize, line1Info?.lineHeight);

  // Let's also check all conditions on this page for average first-line character count
  const allConditions = await page.evaluate(() => {
    const ps = Array.from(document.querySelectorAll(".condition-row__content .condition-paragraph"));
    return ps.map((p, idx) => {
      const range = document.createRange();
      let firstLineTop = null;
      let firstLineText = "";

      function inspectNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          for (let i = 0; i < text.length; i++) {
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rect = range.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;
            if (firstLineTop === null) {
              firstLineTop = Math.round(rect.top);
            }
            if (Math.abs(Math.round(rect.top) - firstLineTop) <= 4) {
              firstLineText += text[i];
            } else {
              return false;
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          for (const child of node.childNodes) {
            if (!inspectNode(child)) return false;
          }
        }
        return true;
      }

      inspectNode(p);
      return {
        index: idx + 1,
        line1: firstLineText.trim(),
        count: firstLineText.trim().length,
      };
    });
  });

  console.log("All 10 conditions first-line char counts:");
  for (const c of allConditions) {
    console.log(`  Condition ${c.index}: ${c.count} chars -> "${c.line1}"`);
  }
  const avg = allConditions.reduce((acc, c) => acc + c.count, 0) / allConditions.length;
  console.log(`Average first-line characters across 10 conditions: ${avg.toFixed(1)} chars`);

  await page.close();
}

await browser.close();
