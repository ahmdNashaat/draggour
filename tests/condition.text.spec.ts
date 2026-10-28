import { expect, test } from "@playwright/test";
import { createElement, Fragment, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { patientConditions } from "../content/patient-conditions";
import { renderConditionText, stripConditionMarkup } from "../lib/condition-text";

/** The paragraph as the browser would receive it, without a JSX file. */
function render(text: string): string {
  return renderToStaticMarkup(createElement(Fragment, null, renderConditionText(text)) as ReactElement);
}

test("renderConditionText turns the three markup rules into elements, not HTML strings", () => {
  const label = render("**Ask your doctor:** Do I need this test?");
  expect(label).toContain('<p class="condition-paragraph">');
  expect(label).toContain('<strong class="condition-label">Ask your doctor:</strong>');
  expect(label).toContain("Do I need this test?");
  // The marker characters themselves never reach the page.
  expect(label).not.toContain("**");

  const urgent = render("!!Call emergency services.!!");
  expect(urgent).toContain('<strong class="condition-urgent">Call emergency services.</strong>');
  expect(urgent).not.toContain("!!");
  // The warning is never signalled by colour alone: it is a strong element too,
  // and CSS gives it the underline on top of the accent.
  expect(urgent.match(/<strong/g)).toHaveLength(1);

  // A blank line is a paragraph break.
  const split = render("First paragraph.\n\nSecond paragraph.");
  expect(split.match(/<p class="condition-paragraph">/g)).toHaveLength(2);
  expect(split).toContain(">First paragraph.</p>");
  expect(split).toContain(">Second paragraph.</p>");

  // A single paragraph renders exactly one <p>, so callers may drop it straight
  // into a flex column.
  expect(render("One paragraph.").match(/<p/g)).toHaveLength(1);
});

test("stripConditionMarkup returns the wording alone, on one line", () => {
  expect(stripConditionMarkup("**Ask your doctor:** Do I need this test?")).toBe(
    "Ask your doctor: Do I need this test?",
  );
  expect(stripConditionMarkup("!!Call emergency services.!!")).toBe("Call emergency services.");
  expect(stripConditionMarkup("First.\n\nSecond.")).toBe("First. Second.");
  expect(stripConditionMarkup("")).toBe("");
  // Mixed markers in one sentence keep every part in order.
  expect(stripConditionMarkup("A **b** and !!c!! and d.")).toBe("A b and c and d.");
});

test("unbalanced markers stay literal instead of swallowing the paragraph", () => {
  // Nothing closes the marker, so there is nothing to promote to a <strong>.
  const label = render("An **unclosed marker here");
  expect(label).toContain("An **unclosed marker here");
  expect(label).not.toContain("<strong");
  expect(stripConditionMarkup("An **unclosed marker here")).toBe("An **unclosed marker here");

  const urgent = render("An !!unclosed marker here");
  expect(urgent).toContain("An !!unclosed marker here");
  expect(urgent).not.toContain("<strong");
  expect(stripConditionMarkup("An !!unclosed marker here")).toBe("An !!unclosed marker here");

  // A balanced marker followed by an orphan one: the pair still renders, the
  // orphan stays as typed.
  const mixed = render("**Closed** then **open");
  expect(mixed).toContain('<strong class="condition-label">Closed</strong>');
  expect(mixed).toContain("then **open");
  expect(stripConditionMarkup("**Closed** then **open")).toBe("Closed then **open");

  // The other marker inside an open one does not close it either.
  expect(render("!!open ** pair")).toContain("!!open ** pair");
});

test("every published paragraph renders clean and strips to a single line", () => {
  for (const condition of patientConditions) {
    for (const locale of ["en", "ar"] as const) {
      const body = condition[locale].body;
      const where = `${condition.slug} ${locale}`;

      expect(body.trim().length, where).toBeGreaterThan(0);
      expect(stripConditionMarkup(body), where).not.toMatch(/\*\*|!!/);
      expect(stripConditionMarkup(body), where).not.toContain("\n");

      const markup = render(body);
      expect(markup, where).not.toContain("**");
      expect(markup, where).not.toContain("!!");
      // One <p> per paragraph: the approved copy is a single paragraph today.
      expect(markup.match(/<p class="condition-paragraph">/g), where).toHaveLength(1);
    }
  }
});
