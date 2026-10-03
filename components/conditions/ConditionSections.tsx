"use client";

import { useEffect, useRef } from "react";

export type ConditionSection = Readonly<{
  id: string;
  title: string;
  body: string;
}>;

type ConditionSectionsProps = Readonly<{
  sections: readonly ConditionSection[];
}>;

/**
 * Approved condition sections. On small screens they are collapsed
 * accordions; on wider screens they open for uninterrupted reading. The
 * markup ships open, so without JavaScript every section stays readable.
 */
export function ConditionSections({ sections }: ConditionSectionsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || sections.length === 0) {
      return;
    }

    const narrow = window.matchMedia("(max-width: 47.999rem)");
    const sync = () => {
      for (const item of list.querySelectorAll<HTMLDetailsElement>("details")) {
        item.open = !narrow.matches;
      }
    };

    sync();
    narrow.addEventListener("change", sync);
    return () => narrow.removeEventListener("change", sync);
  }, [sections.length]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="content-section condition-sections">
      <div className="site-container condition-sections__list" ref={listRef}>
        {sections.map((section) => (
          <details className="condition-section" key={section.id} open>
            <summary className="condition-section__summary">{section.title}</summary>
            <p className="condition-section__body">{section.body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
