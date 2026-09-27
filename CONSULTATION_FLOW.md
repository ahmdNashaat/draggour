# Consultation Flow Specification

## Purpose
The consultation flow is the main functional feature of the website.

It should collect enough information for staff review while keeping the process simple.

## 1. First choice
Exactly one:
- Patient / Consultation
- Physician / Referral

## 2. Second choice
After either requester type:
- Emergency
- Non-Emergency

## 3. Emergency
Emergency requests do NOT continue into normal consultation, booking or payment.

Show approved emergency guidance:
- this website is not an emergency service
- contact local emergency services
- attend the nearest hospital

Do not invent country-specific emergency numbers.

## 4. Non-emergency service choice
Show:
- Online Consultation
- Clinic Visit

## 5. Dynamic form
Fields depend on requester type and service type.

### Common fields
Only collect what is needed, such as:
- full name
- phone
- WhatsApp number
- email
- country
- preferred language

### Patient flow
Possible fields:
- reason for consultation
- short description
- relevant context
- preferred dates/times

### Physician/referral flow
Possible fields:
- physician name
- specialty
- institution
- contact details
- referral summary
- preferred communication route

Do not ask for unnecessary medical information.

## 6. Preferred times
The requester may provide up to 3 preferred times.

Submission is NOT appointment confirmation. Staff reviews and confirms the actual appointment.

## 7. Attachments
Allowed:
- PDF
- JPG
- PNG

Maximum:
- 3 files per request

Final per-file and total-size limits must be configured before production.

## 8. Consent
Use approved privacy/consent wording before submission.

## 9. Submit behavior
1. Client-side validation for usability.
2. Server-side validation as the source of truth.
3. Process submission.
4. Notify staff.
5. Trigger WhatsApp confirmation.
6. Show success screen.

## 10. Success message
Suggested direction:
"Your request has been received successfully. Our team will review your request and contact you as soon as possible via WhatsApp."

Do not imply confirmed appointment/payment/diagnosis unless it actually happened.

## 11. WhatsApp automation
WhatsApp is a communication channel, not the system of record in V1.

Minimum automation:
- request received confirmation
- team will review/respond

Future optional automation:
- status updates
- appointment confirmation
- payment instructions
- reminders

Full conversational bot behavior requires explicit scope approval.

## 12. Human operational model
Doctor/secretary reviews requests.
Secretary may:
- contact requester
- confirm appointment
- coordinate payment
- provide next steps

The website does not make clinical or scheduling decisions.

## 13. V1 persistence
- no persistent request history
- no patient account
- no request dashboard

If direct file upload is implemented, its storage/access model must be separately approved.

## 14. Future-ready submission layer
Keep form submission logic independent of UI:

```text
ConsultationForm
   ↓
submitConsultation()
   ↓
integration layer
   ├── V1: notifications/automation only
   └── future V2: persistent system
```
