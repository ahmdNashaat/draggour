type ConditionsCtaBandProps = Readonly<{
  /** Localized accessible name for the band. */
  label: string;
  children: React.ReactNode;
}>;

/**
 * The band that closes both the conditions hub and every condition page:
 * one compact row (3rem of breathing room instead of a full section) holding
 * the two page actions. The links are passed in, so each page keeps its own
 * pair while the treatment stays identical.
 */
export function ConditionsCtaBand({ label, children }: ConditionsCtaBandProps) {
  return (
    <section className="conditions-cta" aria-label={label}>
      <div className="site-container content-actions">{children}</div>
    </section>
  );
}
