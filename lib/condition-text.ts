import { createElement, Fragment, type ReactNode } from "react";

/**
 * The condition paragraph's inline markup, parsed once and used three ways:
 * rendered as React nodes, stripped to plain text for cards and meta tags, and
 * asserted by the tests. `dangerouslySetInnerHTML` is never involved, so the
 * approved copy can never smuggle markup into the page.
 *
 *   **text**   -> <strong class="condition-label">   a label such as "Ask your doctor:"
 *   !!text!!   -> <strong class="condition-urgent"> a safety or emergency sentence
 *   blank line -> a new paragraph
 *
 * Markers only match in balanced pairs, so a stray `**` or `!!` (a typo in the
 * source) stays literal text instead of swallowing the rest of the paragraph.
 */

export type ConditionTextNode = Readonly<{ kind: "text" | "label" | "urgent"; text: string }>;

function scanInline(text: string): readonly ConditionTextNode[] {
  // A fresh regex per call: the recursive scan below must not disturb an
  // in-flight lastIndex on the outer one.
  const marker = /(\*\*|!!)([\s\S]+?)\1/g;
  const nodes: ConditionTextNode[] = [];
  let cursor = 0;
  let match = marker.exec(text);

  while (match) {
    if (match.index > cursor) {
      nodes.push({ kind: "text", text: text.slice(cursor, match.index) });
    }
    const kind: ConditionTextNode["kind"] = match[1] === "**" ? "label" : "urgent";
    for (const child of scanInline(match[2])) {
      nodes.push(child.kind === "text" ? { kind, text: child.text } : child);
    }
    cursor = match.index + match[0].length;
    match = marker.exec(text);
  }

  if (cursor < text.length) {
    nodes.push({ kind: "text", text: text.slice(cursor) });
  }

  return nodes;
}

function splitParagraphs(text: string): readonly string[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

/** One array of inline nodes per paragraph. */
export function parseConditionText(text: string): readonly (readonly ConditionTextNode[])[] {
  return splitParagraphs(text).map(scanInline);
}

/**
 * The trailing safety segments of a paragraph, split off so a collapsed
 * mobile row can keep them on screen. Only the nodes *after* the last urgent
 * segment are returned, so a paragraph whose safety text sits mid-flow (the
 * paediatric entry, whose questions follow the warning) clamps nothing away;
 * a paragraph with no urgent segment has nothing to split and stays whole.
 */
export function splitConditionSafety(text: string): Readonly<{
  /** Everything up to and including the last urgent node, markup parsed. */
  main: readonly (readonly ConditionTextNode[])[];
  /** The trailing nodes that must never be hidden by the mobile clamp. */
  safety: readonly (readonly ConditionTextNode[])[];
}> {
  const paragraphs = parseConditionText(text);

  for (let index = paragraphs.length - 1; index >= 0; index -= 1) {
    const urgentAt = paragraphs[index].findLastIndex?.((node) => node.kind === "urgent");
    if (urgentAt === undefined || urgentAt < 0) continue;

    const lead = paragraphs[index].slice(0, urgentAt + 1);
    const trail = paragraphs[index].slice(urgentAt + 1);

    return {
      main: [...paragraphs.slice(0, index), lead],
      safety: trail.length > 0 ? [trail] : [],
    };
  }

  return { main: paragraphs, safety: [] };
}

/** The paragraph as plain, single-line text: markers removed, wording untouched. */
export function stripConditionMarkup(text: string): string {
  return parseConditionText(text)
    .map((paragraph) => paragraph.map((node) => node.text).join(""))
    .join(" ");
}

function inlineNodes(paragraph: readonly ConditionTextNode[]): ReactNode[] {
  return paragraph.map((node, nodeIndex) =>
    node.kind === "text"
      ? node.text
      : createElement(
          "strong",
          {
            className: node.kind === "label" ? "condition-label" : "condition-urgent",
            key: nodeIndex,
          },
          node.text,
        ),
  );
}

/** The paragraph as React nodes: one <p class="condition-paragraph"> per paragraph. */
export function renderConditionText(text: string): ReactNode {
  return createElement(
    Fragment,
    null,
    parseConditionText(text).map((paragraph, index) =>
      createElement(
        "p",
        { className: "condition-paragraph", key: `condition-paragraph-${index}` },
        inlineNodes(paragraph),
      ),
    ),
  );
}

/**
 * The clamped half of a hub row's paragraph: every paragraph up to and
 * including the last urgent sentence. Stands alone so the hub can hand it to
 * the client-side collapse without shipping a client component for the text.
 */
export function ConditionClampedBody({ text }: Readonly<{ text: string }>) {
  const { main } = splitConditionSafety(text);

  return createElement(
    Fragment,
    null,
    main.map((paragraph, index) =>
      createElement(
        "p",
        { className: "condition-collapsible__text condition-paragraph", key: `condition-main-${index}` },
        inlineNodes(paragraph),
      ),
    ),
  );
}

/**
 * The safety tail: whatever follows the last urgent sentence. It sits outside
 * the clamp, so a collapsed row still shows it in full.
 */
export function ConditionSafetyBody({ text }: Readonly<{ text: string }>) {
  const { safety } = splitConditionSafety(text);

  if (safety.length === 0) return null;

  return createElement(
    "div",
    { className: "condition-safety" },
    safety.map((paragraph, index) =>
      createElement(
        "p",
        { className: "condition-safety__paragraph condition-paragraph", key: `condition-safety-${index}` },
        inlineNodes(paragraph),
      ),
    ),
  );
}
