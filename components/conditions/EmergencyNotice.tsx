type EmergencyNoticeProps = Readonly<{
  body: string;
  /** Localized accessible name for the callout, e.g. "Emergency guidance". */
  label: string;
}>;

/**
 * Emergency guidance for a condition: an outlined callout on the page surface,
 * so urgency reads through structure and contrast rather than a red fill
 * (D-046). It carries no heading, so a condition page keeps the honest outline
 * H1 (page) → one H2 (condition) with nothing left over.
 *
 * Round 2 strengthens it without touching the wording: a red inline-start
 * rule, the same faint red tint that `.condition-urgent` uses, and the first
 * sentence promoted to bold so the eye lands on the action first.
 *
 * The copy is plain text from `urgentLead` and never carries a
 * country-specific number.
 */
export function EmergencyNotice({ body, label }: EmergencyNoticeProps) {
  const [lead, rest] = splitFirstSentence(body);

  return (
    <aside className="condition-emergency-lead emergency-notice" aria-label={label}>
      <svg
        aria-hidden="true"
        className="emergency-notice__icon"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3.75 21.25 20.25H2.75L12 3.75Z"
          strokeLinejoin="round"
          strokeWidth="1.5"
          stroke="currentColor"
        />
        <path d="M12 10.25v4.5" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" />
        <circle cx="12" cy="17.5" fill="currentColor" r="0.9" />
      </svg>
      <div className="emergency-notice__body">
        <p>
          <strong className="emergency-notice__lead">{lead}</strong>
          {rest ? <> {rest}</> : null}
        </p>
      </div>
    </aside>
  );
}

/**
 * Split `urgentLead` at its first sentence end. The data stays plain text —
 * only the presentation is split — and a lead with no terminator keeps its
 * whole body as the bold part.
 */
function splitFirstSentence(body: string): readonly [string, string] {
  const match = /^(.*?[.!?…])(\s+)([\s\S]*)$/.exec(body.trim());

  if (!match) return [body.trim(), ""];

  return [match[1], match[3].trim()];
}
