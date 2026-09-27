# Architecture & Product Decisions

This file records decisions that should not be silently reversed.

## D-001 — Website positioning
Status: APPROVED

High-end professional medical website, not a traditional CV and not a patient portal.

## D-002 — Visual direction
Status: APPROVED

Elegant, clean, professional, minimal. Avoid animation-heavy experiences and heavy 3D.

## D-003 — Main profile terminology
Status: APPROVED

Use `Biography` rather than `About`.

## D-004 — E-learning
Status: APPROVED

YouTube is the main destination for physician educational video content. No video platform.

## D-005 — Research
Status: APPROVED

No separate complex research platform in V1. Present selected research/academic work through Biography unless scope changes.

## D-006 — Conditions
Status: APPROVED

Six core condition destinations, concise and consultation-oriented.

## D-007 — Requester types
Status: APPROVED

Exactly:
- Patient / Consultation
- Physician / Referral

## D-008 — Emergency split
Status: APPROVED

After requester type:
- Emergency
- Non-Emergency

Emergency ends in guidance. No normal consultation booking/payment flow.

## D-009 — Non-emergency services
Status: APPROVED

- Online Consultation
- Clinic Visit

## D-010 — Human review before payment
Status: APPROVED

Payment happens after staff review and appointment confirmation.

## D-011 — WhatsApp
Status: APPROVED

WhatsApp is a primary communication channel and automation is required.
Minimum automation: receipt confirmation + response-time expectation.

## D-012 — Medical attachments
Status: APPROVED

Allowed: PDF/JPG/PNG. Maximum: 3 files. Exact size limits remain to be configured.

## D-013 — Request history
Status: APPROVED

No persistent request history in V1.

## D-014 — Database
Status: APPROVED FOR V1

No database unless a new requirement makes persistent data necessary.

## D-015 — Admin dashboard
Status: DEFERRED

No admin dashboard in V1. Keep future addition feasible.

## D-016 — File storage
Status: OPEN

Choose between an approved secure external transfer service and approved private object storage. No public upload destination.

## D-017 — WhatsApp provider
Status: OPEN

Provider not locked.

## D-018 — Email provider
Status: OPEN

Provider not locked.

## D-019 — French
Status: OPEN

English + Arabic are the launch baseline. French architecture-ready; content activation depends on approval.

## D-020 — Booking
Status: V1 MANUAL

No custom booking engine in V1.

## D-021 — Payment
Status: V1 MANUAL

No custom payment gateway in V1.

## D-022 — Domain
Status: APPROVED

The official doctor-owned domain is the production canonical domain. The Vercel hostname is a deployment/preview identity.

## D-023 — SEO
Status: APPROVED

SEO is a core requirement from day one: technical SEO, multilingual SEO, structured data, entity discoverability, Search Console/Bing, and authoritative content.

No guaranteed ranking is promised.

## D-024 — Responsive quality
Status: NON-NEGOTIABLE

Responsive behavior is a release-blocking requirement.

## D-025 — Current next step
Status: READY

Build the first full website prototype around the approved page structure and consultation journey before introducing optional infrastructure.
