type EmergencyNoticeProps = Readonly<{
  id: string;
  title: string;
  body: string;
}>;

/**
 * Emergency guidance for a condition page: an outlined callout on a cool
 * surface, so urgency reads through structure and contrast rather than a red
 * fill. The copy is the approved general wording and never carries a
 * country-specific number.
 */
export function EmergencyNotice({ id, title, body }: EmergencyNoticeProps) {
  return (
    <section className="content-section condition-emergency" aria-labelledby={id}>
      <div className="site-container">
        <div className="emergency-notice">
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
            <h2 id={id}>{title}</h2>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
