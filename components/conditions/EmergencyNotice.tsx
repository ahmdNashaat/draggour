type EmergencyNoticeProps = Readonly<{
  body: string;
  /** Localized accessible name for the callout, e.g. "Emergency guidance". */
  label: string;
}>;

/**
 * Calm informational guidance for a condition. It carries no heading, so a
 * condition page keeps the outline H1 (page) → one H2 (condition).
 */
export function EmergencyNotice({ body, label }: EmergencyNoticeProps) {
  const [lead, rest] = splitFirstSentence(body);

  return (
    <aside className="condition-emergency-lead emergency-notice" aria-label={label}>
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
