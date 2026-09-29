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

## D-026 — Foundation implementation
Status: APPROVED FOR CURRENT PHASE

The foundation uses Next.js 16 App Router locale routing with `next-intl`, English and Arabic launch dictionaries, and a French route that falls back to the English foundation dictionary until approved French content exists. French is not emitted as an alternate-language SEO link until content is approved. Next.js 16's `proxy.ts` convention is used for locale routing; no database or third-party integration provider is added.

## D-027 — Content sourcing & approval governance
Status: APPROVED

Every published claim is recorded in `content/source-of-truth.md` with a source and a status before it reaches a page.

Source hierarchy: the CV is the primary source for historical and professional facts; LinkedIn is a verification layer for current public identity and recent activity (never a sole source for a formal claim, never on-site content); official organisations confirm sensitive claims; the doctor gives final approval and is not asked to restate what the CV already contains.

Status labels: `VERIFIED`, `APPROVED`, `PROPOSED`, `PLACEHOLDER`, `[APPROVAL REQUIRED]`. Only `APPROVED` content may ship. Missing information is marked `[APPROVAL REQUIRED]` and is never filled with a guess (locations, fees, numbers, dates, titles).

Copy flow: fact extraction (CV + official sources + LinkedIn) → copywriting (us) → final approval (doctor). Fonts and logo follow the same rule: we propose, the doctor approves visually.

Also approved in this decision: the homepage section and navigation label are **Professional Activities** (not "Professional Activities & Media"); the approved categories are Conferences, Professional Societies and Invited Talks, with no fourth category invented.

*Superseded by D-029: Professional Activities no longer appears on the homepage, in navigation, or in the sitemap.*

The CV has been supplied in full (2026-09-28) and extracted into `content/source-of-truth.md` §1–§18. Row schema for every content item: `Source` / `Status` / `Current` / `Publish`, with the CV default `Source: CV · Status: VERIFIED FROM CV · Current: NEEDS DOCTOR CONFIRMATION · Publish: NO — awaiting approval`. Publication tiers: T1 usable from the CV, T2 must be confirmed as current, T3 the doctor decides whether to publish (figures, superlatives, industry names). The CV is a source of facts, never final website copy. The doctor is asked only to confirm, correct or refuse — never to rewrite what the CV already contains. `content/approval-pack.md` is the single client-facing review document and references this file instead of duplicating it.

## D-028 — Standalone professional activities section rejected
Status: APPROVED

Professional Activities & Media was rejected by the doctor and is not a V1
website section. Conference, society, invited-talk, and professional activity
facts may remain inside Biography where appropriate, but no standalone
Professional Activities page or section exists in V1.

## D-029 — Final V1 information architecture
Status: APPROVED (doctor, 2026-09-29)

Professional Activities is removed completely from the homepage, from the
primary navigation, and from the sitemap. This supersedes the homepage-section
and navigation-label sentence in D-027; D-028 continues to apply. No route,
navigation item, homepage section, breadcrumb, metadata entry, or sitemap entry
for Professional Activities exists in V1.

Final V1 structure:

Home → Biography → Conditions → E-learning for Physicians → Remote Consultation → Contact → Legal / Privacy

Header primary navigation carries Home, Biography, Conditions, E-learning for
Physicians, Remote Consultation, and Contact. Legal / Privacy is carried by the
footer legal navigation (placement confirmed with the doctor, 2026-09-29). All
seven destinations are present in the sitemap for both launch locales. No other
page is added or removed by this decision.
