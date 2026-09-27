# Integrations

## Principle
External providers should remain replaceable. Do not couple presentation components to vendor APIs.

## V1 candidates
### Hosting
Vercel

### Email
A transactional email provider such as Resend, SES, or another approved vendor.
Provider not locked yet.

### WhatsApp
WhatsApp Business Platform/API or an approved provider built on it.
Provider not locked yet.

### File transfer
Either an approved external secure transfer service or approved private object storage.

### Booking
Manual in V1 unless a specific provider is approved.

### Payment
Manual after review/appointment confirmation unless a specific provider is approved.

### Analytics
GA4 if approved.

### Search
Google Search Console
Bing Webmaster Tools

## Consultation operations
Required logical operations:
```text
submitConsultation
notifyStaff
sendWhatsAppConfirmation
```

Possible future operations:
```text
sendWhatsAppStatusUpdate
sendAppointmentConfirmation
sendPaymentInstruction
```

## Staff notification
Minimum information:
- new consultation request
- requester type
- service type
- reference identifier if used
- attachment count
- timestamp
- safe action/link where appropriate

Do not include unnecessary medical content.

## WhatsApp confirmation
Minimum message:
- request received
- team will review/respond
- reference identifier if used

Message copy is an operational/marketing decision and must be approved.

## Webhooks
If inbound WhatsApp events are used:
- verify signatures
- make processing idempotent
- handle duplicates
- avoid loops
- return correct HTTP codes
- log safe operational metadata

## Failure behavior
If WhatsApp fails after a form submission:
- do not tell the user the request was lost
- ensure staff still receives the request notification
- show a controlled fallback where appropriate
- log safe provider failure details
- allow retry where useful

The request should not depend entirely on one external provider.

## Provider configuration
Conceptual environment variables:
```text
WHATSAPP_PROVIDER=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
EMAIL_PROVIDER=
EMAIL_API_KEY=
CONSULTATION_RECIPIENT=
```
Never commit real values.
