// WCAG contrast ratios for the round 2 report. Tints are composited by hand
// because the page's own background must be resolved first.
const hex = (value) => {
  const clean = value.replace("#", "");
  const full = clean.length === 3 ? [...clean].map((c) => c + c).join("") : clean;
  return [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16));
};

const channel = (value) => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const over = (fg, alpha, bg) =>
  fg.map((value, index) => value * alpha + bg[index] * (1 - alpha));

const contrast = (a, b) => {
  // Accept either an [r, g, b] triple or a "#rrggbb" literal.
  const [hi, lo] = [luminance(typeof a === "string" ? hex(a) : a), luminance(typeof b === "string" ? hex(b) : b)].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
};

const mix = (colour, alpha, backdrop) => over(hex(colour), alpha, hex(backdrop));

const report = (label, fg, bg) => {
  const ratio = contrast(hex(fg), bg);
  const verdict = ratio >= 4.5 ? "PASS" : "FAIL";
  console.log(`${label.padEnd(50)} ${ratio.toFixed(2)}:1  ${verdict}`);
};

const surface = "#eeebe3"; // --color-surface-subtle: the page background
const card = "#f7f5f0"; // --color-surface: cards and heroes
const white = "#ffffff";
const red900 = "#6e252c"; // --color-red-900
const neutral600 = "#52606d"; // --color-neutral-600
const neutral900 = "#18212b"; // --color-neutral-900

console.log("--- A1: .condition-urgent, red-900 text on an 8% red-900 tint ---");
report("on page surface", red900, mix(red900, 0.08, surface));
report("on card surface", red900, mix(red900, 0.08, card));
report("on white", red900, mix(red900, 0.08, white));

console.log("\n--- A2: emergency notice, same tint as background ---");
report("neutral-900 body on 8% tint / page surface", neutral900, mix(red900, 0.08, surface));
report("red-900 first sentence on 8% tint / surface", red900, mix(red900, 0.08, surface));

console.log("\n--- A5: secondary text as actually painted ---");
report("neutral-600 on card surface", neutral600, card);
report("neutral-600 on page surface", neutral600, surface);
report("neutral-600 on white", neutral600, white);
report("red-900 on page surface (no tint)", red900, surface);
report("red-900 on card surface (no tint)", red900, card);
