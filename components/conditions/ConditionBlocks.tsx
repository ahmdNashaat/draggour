import type { PatientConditionBlock } from "@/content/patient-conditions";

type ConditionBlocksProps = Readonly<{
  blocks: readonly PatientConditionBlock[];
  /**
   * On a condition page the condition title is the H1, so blocks head with H2.
   * On the /conditions hub the page owns the H1 and the condition owns an H2,
   * so the same blocks must head with H3 to keep one honest heading order.
   */
  headingLevel: 2 | 3;
  /** Distinguishes blocks across conditions rendered on the same page. */
  blockKey: string;
}>;

/**
 * Renders a condition document exactly as written. Shared by the hub and the
 * condition page so the duplicated copy can never diverge between the two.
 */
export function ConditionBlocks({ blocks, headingLevel, blockKey }: ConditionBlocksProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <>
      {blocks.map((block, index) => (
        <section className="condition-document__block" key={`${blockKey}-${index}`}>
          {block.heading ? <Heading>{block.heading}</Heading> : null}
          {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {block.items ? (
            <ul className="content-bullet-list">
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}
