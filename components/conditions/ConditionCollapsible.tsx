"use client";

import { useId, useState, type ReactNode } from "react";

type ConditionCollapsibleProps = Readonly<{
  /** The paragraph, clamped by CSS until expanded. */
  children: ReactNode;
  /** The safety text that stays visible even while collapsed. */
  safety: ReactNode;
  /** Localized "Read more" / "Show less" labels. */
  readMore: string;
  showLess: string;
  /** The clamp, as a CSS custom property, so the media query owns the value. */
  maxLines: number;
}>;

/**
 * The mobile-only collapse for a hub row (Part B of round 2).
 *
 * The full paragraph is always in the DOM: the clamp is a visual `-webkit-
 * line-clamp` on a child element, so crawlers and screen readers read the
 * whole approved text whether or not the visitor expands it. Only the button
 * and the clamp toggle; the safety tail is a sibling of the clamped element
 * and is never inside it, so a collapsed row still shows the warning.
 *
 * CSS hides the button from 60rem up and removes the clamp there, which also
 * means that with JavaScript disabled the paragraphs simply render in full.
 */
export function ConditionCollapsible({
  children,
  safety,
  readMore,
  showLess,
  maxLines,
}: ConditionCollapsibleProps) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  return (
    <div className="condition-collapsible" data-expanded={expanded ? "true" : "false"}>
      <div
        className="condition-collapsible__clamp"
        data-clamp={String(maxLines)}
        id={bodyId}
      >
        {children}
      </div>
      {safety}
      <button
        aria-controls={bodyId}
        aria-expanded={expanded}
        className="condition-collapsible__toggle"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        {expanded ? showLess : readMore}
      </button>
    </div>
  );
}
