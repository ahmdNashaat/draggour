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
 * The copy is plain text from `urgentLead` and never carries a
 * country-specific number.
 */
export function EmergencyNotice({ body, label }: EmergencyNoticeProps) {
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
        <p>{body}</p>
      </div>
    </aside>
  );
}
