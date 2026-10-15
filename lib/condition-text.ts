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

/** The paragraph as plain, single-line text: markers removed, wording untouched. */
export function stripConditionMarkup(text: string): string {
  return parseConditionText(text)
    .map((paragraph) => paragraph.map((node) => node.text).join(""))
    .join(" ");
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
        paragraph.map((node, nodeIndex) =>
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
        ),
      ),
    ),
  );
}
