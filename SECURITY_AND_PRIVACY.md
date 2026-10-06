# Security & Privacy

## Core rule
This is a medical website. Minimize data collection and minimize persistence.

## V1
- no persistent request history
- no patient accounts
- no database

If a feature requires persistent storage, stop and record the decision before implementation.

## Medical files
Potential uploads:
- PDF
- JPG
- PNG
- max 3

Never:
- expose public object URLs
- commit medical files to Git
- log file contents or full payloads
- place secrets in client code
- assume an external file service is acceptable without approval

If the website receives files directly:
- private storage only
- strict MIME/type and size limits
- non-guessable object keys
- no executable files
- consider malware scanning if supported
- short-lived signed access when needed
- defined retention/deletion behavior

## External file transfer
A provider such as WeTransfer may be considered only after the doctor/organisation approves it from privacy, operational and contractual perspectives.

## Form security
Server-side validation is mandatory.
Protect against:
- injection
- malformed payloads
- oversized submissions
- spam/bot abuse
- CSRF where applicable
- repeated submissions
- unsafe redirects

## Upload validation
Client validation is UX only. Server validation must enforce allowed types, file count, size and submission context.

Do not trust browser-provided MIME type alone.

## Secrets
Use environment variables / secret management.
Never commit `.env` files with secrets.

## Logging
Do not log:
- full form payloads
- medical descriptions
- phone numbers
- emails
- file contents
- access tokens

Prefer:
- opaque reference/request ID
- event name
- success/failure
- timestamp
- provider error code

## WhatsApp webhooks
Verify provider authenticity/signatures. Handle duplicates/replay safely and avoid automation loops.

## Email
Do not put sensitive medical attachments into ordinary notification emails by default.

## Emergency
Emergency submissions should not trigger booking, payment or clinical promises.

## Future database
If storage is introduced later:
- least privilege
- separated client/server access
- retention/deletion policy
- audit of privileged actions
- role-based access
- review jurisdictional requirements

## Legal approval
Before production handling of medical data, the appropriate privacy/legal owner must approve storage provider, retention, data location, transfer implications, privacy notice, consent and disclaimer wording.

The published Legal & Privacy page is a short notice that currently carries no
pending value: the operator name is published (`Mohamed Aggour` / `محمد
عجور`), and the clauses that held the contact mailbox, the service providers
and the retention periods were removed because WhatsApp is the practice's
primary correspondence channel (D-043). `LEGAL_PLACEHOLDERS` in
`content/legal.ts` is therefore empty and `tests/legal.privacy.spec.ts` fails
if a bracketed token reappears without being listed there, so the page cannot
go live with invented controller, contact, provider or retention details. The
other items of the list above — registered address, separate DPO contact,
transfer locations and the secure upload mechanism — are still not shown on
the page (D-035) but are required before the related handling (attachments,
transfers) is enabled.
