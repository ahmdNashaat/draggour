# Phase 3 Approval Gate

Internal implementation-control document for the Dr. Mohamed Aggour website.

This document consolidates the current state of decisions, verification,
approval, assets, and publication readiness. It is not a new questionnaire and
does not create a doctor-contact cycle.

## Control rules

- `content/source-of-truth.md` remains the factual source of truth.
- `content/approval-pack.md` remains the client-facing approval record.
- The CV is source material, not final website copy.
- Only explicitly approved content may be published.
- Verification does not equal publication approval.
- Unresolved conflicts remain unresolved; the implementation team must not
  choose between conflicting facts.
- Existing V1 decisions are closed unless a new explicit project decision is
  recorded.
- This phase modifies only this document.

### Status vocabulary

Only these statuses are used in this document:

- `DECIDED` — the project decision is closed and must not be reopened without a
  new explicit project decision.
- `VERIFIED` — the information is recorded in an identified source, but may
  still require publication approval.
- `NEEDS CURRENT VERIFICATION` — the information may have changed or conflicts
  with another recorded statement.
- `APPROVAL REQUIRED` — doctor, legal, operational, or asset approval is still
  required before publication or production use.
- `MISSING` — the required value or asset is not currently available in the
  source material or approved project assets.
- `NOT FOR PUBLICATION` — the item must not be exposed on the public website.

## 1. Closed V1 decisions

The following decisions are already closed and must not be reopened during
implementation:

| Decision | Status | Reference |
| --- | --- | --- |
| Website direction is elegant, professional, simple, clean, calm, and restrained. | `DECIDED` | PROJECT_BRIEF §§2–3; D-001, D-002 |
| No heavy 3D/WebGL and no animation-heavy experience. | `DECIDED` | PROJECT_BRIEF §3; D-002 |
| Use `Biography` instead of `About`. | `DECIDED` | D-003 |
| Exactly six initial Conditions destinations. | `DECIDED` | PROJECT_BRIEF §5; D-006 |
| Conditions are concise and consultation-oriented, not long medical articles. | `DECIDED` | PROJECT_BRIEF §5; D-006 |
| E-learning for Physicians points primarily to YouTube. | `DECIDED` | PROJECT_BRIEF §5; D-004 |
| No separate Research page or platform in V1; research belongs within Biography. | `DECIDED` | PROJECT_BRIEF §5; D-005 |
| The approved section name is `Professional Activities`. | `DECIDED` | PROJECT_BRIEF §5; D-027 |
| Professional Activities has exactly Conferences, Professional Societies, and Invited Talks. | `DECIDED` | PROJECT_BRIEF §5; source §20; D-027 |
| No Media section. | `DECIDED` | PROJECT_BRIEF §5; D-027 |
| English and Arabic are the launch languages. | `DECIDED` | D-019, D-026 |
| French remains structurally supported but non-indexed and inactive for launch until approved content exists. | `DECIDED` | D-019, D-026; SEO.md |
| No patient portal or patient accounts. | `DECIDED` | AGENTS.md; PROJECT_BRIEF §7 |
| No persistent consultation history in V1. | `DECIDED` | PROJECT_BRIEF §7; D-013 |
| No database in V1. | `DECIDED` | AGENTS.md; PROJECT_BRIEF §7; D-014 |
| No admin dashboard in V1. | `DECIDED` | AGENTS.md; D-015 |
| No custom booking engine in V1; booking is manual. | `DECIDED` | D-020 |
| No custom payment gateway in V1; payment is manual. | `DECIDED` | D-021 |
| Human review occurs before appointment and payment. | `DECIDED` | PROJECT_BRIEF §6; D-010 |
| Form submission is a request and does not confirm an appointment. | `DECIDED` | CONSULTATION_FLOW §§6, 10; D-010 |
| WhatsApp is a required communication and automation channel. | `DECIDED` | PROJECT_BRIEF §6; D-011 |
| The emergency branch stops the normal consultation flow. | `DECIDED` | CONSULTATION_FLOW §§2–3; D-008 |
| Medical attachments are limited to PDF/JPG/PNG and a maximum of three files. | `DECIDED` | PROJECT_BRIEF §6; D-012 |
| No country-specific emergency numbers may be invented. | `DECIDED` | CONSULTATION_FLOW §3; source §21 |
| Medical files require an approved secure transfer/storage approach. | `DECIDED` | SECURITY_AND_PRIVACY; D-016 |
| The site is not an emergency service. | `DECIDED` | CONSULTATION_FLOW §3; SECURITY_AND_PRIVACY |

## 2. Identity and brand gate

| Item | What is known or missing | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- | --- |
| English professional title | `Consultant Interventional Neuroradiologist` is recorded and consistent with the Project Brief/CV, but the source marks it as awaiting confirmation. | source §2; PROJECT_BRIEF §1; approval-pack A1 | It appears in the hero, Biography, metadata, and entity references. | `APPROVAL REQUIRED` | Use only the doctor-approved title. Do not add post-nominals or additional titles by inference. |
| Arabic name spelling | The current build spelling is not present in the CV and is explicitly marked for approval. | source §1; approval-pack A3 | It affects Arabic identity, navigation, metadata, and entity consistency. | `APPROVAL REQUIRED` | Record the approved Arabic spelling before final Arabic publication. |
| Arabic professional title | The current build translation is not an approved source fact. | source §2; approval-pack A2 | Incorrect translation would affect trust and Arabic SEO. | `APPROVAL REQUIRED` | Record the approved Arabic title before final Arabic publication. |
| Final portrait | `public/images/doctor/dr-mohamed-aggour.png` is present in the repository, but the source does not record it as an approved final portrait. | source §1; DESIGN_SYSTEM.md “Imagery” | The portrait is a primary brand asset and must be correctly cropped and used. | `APPROVAL REQUIRED` | Confirm the final portrait, crop/usage guidance, alt-text treatment, and launch suitability. |
| Primary logo | The AGGOUR emblem pack (D-044) supplies `public/brand/aggour-emblem-flat.svg` plus the live-text header wordmark (`AGGOUR` on EN, `عجـــور` on AR) that replaced `public/brand/logo-primary.png`; the favicon/search icon is rendered from that same emblem. Delivery does not establish final brand approval. | source §§1, 23; DESIGN_SYSTEM.md; repository asset inventory | The logo is used across shell, identity, metadata/image contexts, and future collateral. | `APPROVAL REQUIRED` | Approve the primary logo direction and final production asset. Do not treat the delivered pack as final. |
| Monogram / favicon | The old `MA` monogram (`public/brand/logo-monogram.png`) is retired; `app/favicon.ico`, `app/icon.svg`, `app/icon.png` and `app/apple-icon.png` now carry the new emblem, but the favicon direction is not finally approved. | source §§1, 23; DESIGN_SYSTEM.md | The mark must work at small sizes and across approved brand contexts. | `APPROVAL REQUIRED` | Approve the emblem/favicon and verify small-size use. |
| SVG/vector extraction | Vector masters now exist for all three emblem tones and the favicon, but `newlogofiles/README.md` records them as traced from the supplied PNG rather than drawn by the designer. | source §23; DESIGN_SYSTEM.md; `newlogofiles/README.md` | Production use needs a scalable, controlled asset for responsive and print contexts. | `APPROVAL REQUIRED` | Approve the traced vectors or obtain designer-drawn masters before production branding. |
| Final brand colors | Direction is navy / neutral / restrained red, but exact final colors are not approved. | source §23; DESIGN_SYSTEM.md | Final colors affect brand consistency, contrast, and accessibility. | `APPROVAL REQUIRED` | Approve exact color roles and values before final visual lock. |
| Final fonts | Candidates are Libre Baskerville + IBM Plex Sans for EN/FR and Noto Serif Arabic + IBM Plex Sans Arabic for AR; they are not approved. | source §23; DESIGN_SYSTEM.md | Typography affects identity, Arabic rendering, performance, and metadata-adjacent presentation. | `APPROVAL REQUIRED` | Approve the font pair and weights before `next/font` production use. |

The currently supplied logo files are therefore recorded as available working
assets, not final approved brand assets. The vector gap is closed by the
traced emblem pack (D-044); designer-drawn masters remain a pre-production
preference, not a blocker.

## 3. Current professional status gate

Current-status facts must not be resolved by the implementation team.

| Item | Recorded material | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- | --- |
| St George’s position | Consultant INR at St George’s University Hospitals, London, is recorded in the CV; current public identity is also detected on LinkedIn. | source §3, §16 | Current position affects Biography, entity trust, and SEO. | `NEEDS CURRENT VERIFICATION` | Confirm current position and approved public wording. LinkedIn cannot be the sole source of a formal claim. |
| CHC MontLégia position | Consultant INR at CHC MontLégia, Liège, is recorded in the CV. | source §3 | Current position affects Biography and entity trust. | `NEEDS CURRENT VERIFICATION` | Confirm current status and approved public wording. |
| ESMINT role | CV has both a current-sounding board/committee description and 2017–2023 historical entries. | source §§3, 3.1, 11; CF1; approval-pack CF1 | Current leadership wording must not be inferred. | `NEEDS CURRENT VERIFICATION` | Preserve CF1 unresolved until current or completed status and wording are recorded. |
| PAIRS role | CV records Program Director 2017–2024 and President 2018–present. | source §§3, 3.1, 12; CF2; approval-pack CF2 | Conflicting titles affect current Biography and Professional Activities. | `NEEDS CURRENT VERIFICATION` | Preserve CF2 unresolved until the current title/status is recorded. |
| Royal London Hospital | Position list records 2020–2022; Biography draft uses present-tense wording. | source §§3.1, 4, 15; CF3 | Past/current confusion would create a false current claim. | `NEEDS CURRENT VERIFICATION` | Preserve CF3 unresolved; confirm it is historical or provide corrected current wording. |
| Years of experience | Biography draft says “more than nineteen years”. | source §§3.1, 15, 17; CF4/Q1 | Time-sensitive numeric identity claim may become inaccurate. | `NEEDS CURRENT VERIFICATION` | Preserve CF4 unresolved; use no experience figure until current wording is approved. |
| Societies and affiliations | SFNR, ESMINT, ESNR, PAIRS, and UKNG are listed; currentness/completeness is not confirmed. | source §7; approval-pack C2 | Public membership claims must be current and complete. | `NEEDS CURRENT VERIFICATION` | Verify the list and then approve which memberships may be published. |
| Editorial/reviewer roles | Journal reviewer/editorial roles are recorded, including Journal of Neuroradiology and other journals; current status is not confirmed. | source §§5, 9; approval-pack D1 | Current role wording affects authority claims. | `NEEDS CURRENT VERIFICATION` | Verify current roles and approve the public selection and wording. |

### CF1–CF4 preservation

These conflicts remain explicitly unresolved:

- **CF1:** ESMINT board/committee role — current versus completed in 2023.
- **CF2:** PAIRS — Program Director 2017–2024 versus President 2018–present.
- **CF3:** Royal London Hospital — dated 2020–2022 versus present-tense draft wording.
- **CF4:** Years of experience — “more than nineteen years” versus the current
  figure to publish.

No conflict is resolved in this document.

## 4. Biography publication readiness

No row below is final website copy. CV material remains source material and
requires the source-of-truth publication gate.

| Biography area | Source/reference | Current readiness | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- | --- |
| Professional Overview | source §§2, 13, 15; website-content-map §3 | Title and clinical overview are recorded, but draft wording is not final copy. | It is the primary first impression and authority summary. | `APPROVAL REQUIRED` | Approve rewritten overview, title, scope wording, and any experience claim after CF4. |
| Career History | source §§4–5, 15 | Historical roles and dates are recorded; Royal London tense conflict remains. | It establishes a trustworthy professional timeline. | `NEEDS CURRENT VERIFICATION` | Confirm CF3, preserve dates, and approve the rewritten historical timeline. |
| Education / Qualifications | source §6; approval-pack C1 | Twelve degrees/diplomas are recorded from the CV. | Qualifications support professional identity. | `APPROVAL REQUIRED` | Confirm the list and approve the presentation; do not infer equivalencies. |
| Professional Societies | source §7; approval-pack C2 | Membership list is recorded but not confirmed current/complete. | Membership claims are current-facing public claims. | `NEEDS CURRENT VERIFICATION` | Verify current/complete list and approve the publishable subset. |
| Teaching / Education | source §8; approval-pack C3 | Courses, organized meetings, and tutoring are recorded. | Supports the physician education proposition and activities page. | `APPROVAL REQUIRED` | Curate and approve factual items; exclude unapproved company names and T3 claims. |
| Academic / Scientific Activity | source §§9, 11, 12, 15; approval-pack D1–D6 | Research fields, journal activity, ESMINT, PAIRS, and study participation are recorded. | Supports authority without creating a research platform. | `APPROVAL REQUIRED` | Approve the factual selection and rewrite; keep research inside Biography. |
| Professional Leadership | source §§3, 5, 11, 12; CF1–CF2 | Leadership roles include unresolved current-status conflicts. | Leadership wording can materially misstate present status. | `NEEDS CURRENT VERIFICATION` | Resolve CF1/CF2 through the existing approval record, then approve wording. |
| Professional Milestones | source §§5, 11, 12 | Historical congress roles, ESMINT details, and PAIRS activity are recorded. | Provides context without overstating authority. | `APPROVAL REQUIRED` | Select approved factual milestones and remove unapproved superlatives/T3 detail. |
| Clinical Expertise | source §13; relevant source §15; website-content-map §4 | Procedure groups are recorded, but they are not final patient-facing copy. | Supports Biography and the six concise condition routes. | `APPROVAL REQUIRED` | Rewrite and approve factual scope language; do not imply outcomes, guarantees, or universal suitability. |
| Selected Research / Publications | source §§9–10; approval-pack D2–D4 | PubMed destination is recorded; selected list is not curated. | Supports discoverability while avoiding a research platform. | `APPROVAL REQUIRED` | Decide and approve curated list, link-only treatment, or omission. |
| External Professional Links | source §16; approval-pack G3–G5 | LinkedIn and PubMed are recorded; YouTube, X URL, and organisation URLs are incomplete or pending approval. | Links support entity consistency and discoverability. | `APPROVAL REQUIRED` | Approve each destination and use links only; no feeds, counts, or invented URLs. |

## 5. Six conditions gate

The exact six conditions below are closed as the V1 condition set. The clinical
copy fields are not written here and remain gated. Pages must stay concise and
consultation-oriented, not become long medical articles.

| Condition | English name | Arabic name | Patient-facing short description | Approved clinical scope wording | Consultation CTA wording | Emergency wording | Status | Required resolution before publication |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Brain Aneurysm | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §13 contains aneurysm procedure groups; no approved patient-facing wording exists. | Final CTA wording is not approved. | Use only approved general emergency guidance where relevant; no condition-specific wording is approved. | `APPROVAL REQUIRED` | Approve Arabic name, short description, factual scope wording, CTA, and emergency treatment. |
| 2 | Stroke | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §§13 and 15 contain stroke/thrombectomy material; no approved patient-facing wording exists. | Final CTA wording is not approved. | Must state the site is not an emergency service, direct visitors to local emergency services and the nearest hospital, and stop normal flow. | `APPROVAL REQUIRED` | Approve Arabic name, concise copy, CTA, and exact emergency wording; no invented numbers. |
| 3 | AVM | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §13 contains bAVM embolisation material; no approved patient-facing wording exists. | Final CTA wording is not approved. | Use only the approved general emergency branch where relevant. | `APPROVAL REQUIRED` | Approve Arabic name, short description, scope wording, CTA, and emergency treatment. |
| 4 | Carotid Stenosis | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §13 contains angioplasty/stenting and carotid stenting material; no approved patient-facing wording exists. | Final CTA wording is not approved. | Use only the approved general emergency branch where relevant. | `APPROVAL REQUIRED` | Approve Arabic name, short description, scope wording, CTA, and emergency treatment. |
| 5 | Venous Sinus Disorders | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §13 contains venous sinus stenting and related context; no approved patient-facing wording exists. | Final CTA wording is not approved. | Use only the approved general emergency branch where relevant. | `APPROVAL REQUIRED` | Approve Arabic name, short description, scope wording, CTA, and emergency treatment. |
| 6 | Chronic Subdural Haematoma | In-build Arabic label exists; final spelling is not approved. | No approved description exists. | Source §13 contains treatment of chronic subdural haematomas; no approved patient-facing wording exists. | Final CTA wording is not approved. | Use only the approved general emergency branch where relevant. | `APPROVAL REQUIRED` | Approve Arabic name, short description, scope wording, CTA, and emergency treatment. |

The condition set is exactly six. No seventh condition, unsupported treatment
claim, outcome claim, or medical encyclopedia content may be introduced.

## 6. Professional Activities gate

The approved section name and category structure are closed:

1. Conferences
2. Professional Societies
3. Invited Talks

| Item | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- |
| Section name: `Professional Activities` | PROJECT_BRIEF §5; source §20; D-027 | It is the approved public information architecture. | `DECIDED` | Preserve this exact section name in future implementation. |
| Conferences | source §§8, 11, 12, 20 | Provides a factual home for approved conference activity and milestones. | `APPROVAL REQUIRED` | Curate and approve items; distinguish historical from current roles. |
| Professional Societies | source §§7, 11, 12, 20 | Provides a factual home for approved memberships and leadership. | `NEEDS CURRENT VERIFICATION` | Verify current memberships/roles and approve the public subset. |
| Invited Talks | source §§8, 15, 20 | Provides a factual home for approved talks, faculty, and lectures. | `APPROVAL REQUIRED` | Select concrete factual items and approve their wording. |
| Media / Media Appearances / Podcasts / Press / fourth category | PROJECT_BRIEF §5; source §20; D-027 | These are outside the approved V1 website structure. | `NOT FOR PUBLICATION` | Do not add them without a new explicit project decision. |

Any old implementation containing `Professional Activities & Media` is
implementation drift and must be corrected in a later implementation pass.

## 7. E-learning gate

| Item | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- |
| Official YouTube URL | source §16; approval-pack G1; D-004 | YouTube is the approved primary destination for physician education. | `MISSING` | Record the official approved URL; do not infer or invent it. |
| Section introduction | PROJECT_BRIEF §§2, 5; D-004 | Establishes the physician-facing purpose of the page. | `APPROVAL REQUIRED` | Approve a concise introduction without claiming unrecorded content. |
| Playlists | source §16; approval-pack G2 | Determines what visitors can actually discover. | `MISSING` | Record approved playlists or explicitly approve having none. |
| Featured lectures/items | source §§8, 15; approval-pack G2 | Prevents invented or unapproved educational claims. | `MISSING` | Curate and approve specific items, if any. |
| Video platform architecture | D-004; PROJECT_BRIEF §5 | The site should link/curate YouTube rather than host videos. | `DECIDED` | Preserve a simple outbound destination; do not add a video platform. |

## 8. Remote Consultation gate

Submission means **request received only**. It must never imply a confirmed
appointment, confirmed payment, diagnosis, or clinical decision.

| Readiness item | Source/reference | Why it matters | Status | Required resolution before production/publication |
| --- | --- | --- | --- | --- |
| Requester labels | CONSULTATION_FLOW §1; PROJECT_BRIEF §6; D-007 | Controls the two approved top-level journeys. | `DECIDED` | Preserve exactly `Patient / Consultation` and `Physician / Referral`; approve localized wording before publication. |
| Required versus optional fields | CONSULTATION_FLOW §5; SECURITY_AND_PRIVACY “Form security” | Determines data minimization and validation scope. | `APPROVAL REQUIRED` | Define the final required/optional field set without collecting unnecessary medical data. |
| Emergency wording | CONSULTATION_FLOW §3; SECURITY_AND_PRIVACY “Emergency”; source §21 | Prevents the website from acting as an emergency service. | `APPROVAL REQUIRED` | Approve exact wording: site is not an emergency service, contact local emergency services, attend nearest hospital; no invented numbers. |
| Non-emergency service wording | CONSULTATION_FLOW §4; D-009 | Controls the normal consultation branch. | `DECIDED` | Preserve exactly Online Consultation and Clinic Visit; approve localized explanatory copy. |
| Online consultation fee | source §21; approval-pack I1 | Required for truthful operational expectations. | `MISSING` | Record approved fee or approved decision not to publish a fee. |
| Approximate duration | source §21; approval-pack I2 | Required if visitors are given a time expectation. | `MISSING` | Record approved duration or approved decision not to publish it. |
| Clinic availability | source §21; approval-pack I3 | Required for a truthful Clinic Visit path. | `MISSING` | Record approved availability or approved decision not to publish it. |
| Clinic locations | source §21; SECURITY_AND_PRIVACY | Prevents guessed or stale location claims. | `MISSING` | Record approved locations; never infer cities from the CV. |
| Consultation languages | source §21; approval-pack I6 | Affects routing and visitor expectations. | `MISSING` | Record approved language support. |
| WhatsApp number | source §21; D-011; INTEGRATIONS | Required for the approved communication channel. | `MISSING` | Record the approved operational number and keep it out of source control/secrets. |
| Operational recipient | source §21; INTEGRATIONS “Staff notification” | Determines where requests are safely routed. | `MISSING` | Record the approved recipient and notification channel. |
| Secretary contact | PROJECT_BRIEF §6; CONSULTATION_FLOW §12; source §21 | Supports the human review model. | `MISSING` | Record approved contact/role details or keep them internal. |
| Expected response time | CONSULTATION_FLOW §§10–11; source §21 | Sets accurate expectations after receipt. | `APPROVAL REQUIRED` | Approve the response-time wording; do not promise appointment timing. |
| Payment arrangement | D-010, D-021; source §21 | Payment occurs only after review and appointment confirmation. | `MISSING` | Record the approved manual arrangement and user-facing wording. |
| Consent wording | CONSULTATION_FLOW §8; SECURITY_AND_PRIVACY; source §22 | Required before collecting request/medical information. | `APPROVAL REQUIRED` | Approve exact privacy/consent language. |
| Attachment size limits | CONSULTATION_FLOW §7; D-012; SECURITY_AND_PRIVACY | Required for safe server-side validation. | `MISSING` | Configure approved per-file and total limits before production. |
| Secure attachment transfer/storage | D-016; SECURITY_AND_PRIVACY; INTEGRATIONS | Medical files cannot use a public or casually emailed destination. | `MISSING` | Approve a secure provider/storage approach, access model, and operational handling. |
| Retention/deletion | SECURITY_AND_PRIVACY “Medical files” and “Future database”; source §21 | Defines privacy and legal handling of medical attachments. | `MISSING` | Record approved retention/deletion policy and user-facing wording. |
| Anti-spam and repeated submissions | SECURITY_AND_PRIVACY “Form security”; QA_AND_ACCEPTANCE | Protects a sensitive public form. | `APPROVAL REQUIRED` | Define production controls and safe user-facing behavior. |
| Fallback/error wording | INTEGRATIONS “Failure behavior”; CONSULTATION_FLOW §9 | WhatsApp/provider failure must not imply request loss. | `APPROVAL REQUIRED` | Approve controlled fallback and error copy; staff notification must remain reliable. |
| Success message | CONSULTATION_FLOW §10; source §21; approval-pack I10 | Must confirm receipt only. | `APPROVAL REQUIRED` | Approve receipt-only wording; no appointment, payment, diagnosis, or clinical decision implication. |
| Human review model | CONSULTATION_FLOW §12; D-010, D-020, D-021 | Preserves manual review, coordination, booking, and payment. | `DECIDED` | Preserve doctor/secretary review before appointment/payment; no custom booking/payment system. |
| Persistence model | PROJECT_BRIEF §7; D-013, D-014 | Limits privacy and scope. | `DECIDED` | No request history, patient account, database, or dashboard in V1. |

Emergency requests must not continue into normal consultation, booking, or
payment. WhatsApp is a communication channel, not the V1 system of record.

## 9. Contact gate

| Item | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- |
| Official email | source §22; approval-pack I11 | Required for any published email contact route. | `MISSING` | Record an approved address or do not publish an email route. |
| WhatsApp contact | source §§21–22; D-011 | Required if direct WhatsApp contact is offered. | `MISSING` | Record the approved number and operational handling. |
| Physical address | source §22 | Prevents misleading location information. | `MISSING` | Record an approved address or omit it. |
| Social/institution links | source §§16, 22; approval-pack G3–G5 | Supports entity discoverability and professional verification. | `APPROVAL REQUIRED` | Approve each official URL; do not invent or embed feeds. |
| Recipient/handling rules | source §22; CONSULTATION_FLOW §12; INTEGRATIONS | Determines which enquiry paths are actually supported. | `MISSING` | Define approved enquiry destinations and handling ownership. |
| Patient / Consultation and Physician / Referral paths | CONSULTATION_FLOW §1; D-007 | These are the supported consultation intents. | `DECIDED` | Route them through the approved consultation branches. |
| General, hospital, organisation, or other professional enquiry paths | PROJECT_BRIEF audiences; website-content-map §8 | These are not independently operationally specified. | `APPROVAL REQUIRED` | Add only if a supported recipient/channel is approved; do not invent channels. |

## 10. Legal and privacy gate

| Item | Source/reference | Why it matters | Status | Required resolution before production/publication |
| --- | --- | --- | --- | --- |
| Privacy policy | SECURITY_AND_PRIVACY; source §22; approval-pack J1 | Medical request data requires approved privacy treatment. | `APPROVAL REQUIRED` | Approve and record the final privacy policy. |
| Medical disclaimer | SECURITY_AND_PRIVACY; source §22; approval-pack J2 | Prevents the site from making clinical promises or acting as a medical service. | `APPROVAL REQUIRED` | Approve exact disclaimer wording. |
| Emergency guidance | CONSULTATION_FLOW §3; SECURITY_AND_PRIVACY “Emergency”; approval-pack J4 | Protects emergency visitors and stops unsafe flow continuation. | `APPROVAL REQUIRED` | Approve exact guidance without country-specific numbers. |
| Consultation terms | CONSULTATION_FLOW; source §22; approval-pack J3 | Defines request/review/appointment/payment boundaries. | `APPROVAL REQUIRED` | Approve wording that appointment/payment are not confirmed at submission. |
| Consent wording | CONSULTATION_FLOW §8; SECURITY_AND_PRIVACY | Required before collecting personal/medical information. | `APPROVAL REQUIRED` | Approve exact consent and privacy acknowledgement. |
| Cookie/analytics decision | SEO.md “Analytics and monitoring”; source §22 | Determines whether non-essential tracking and consent are needed. | `MISSING` | Record whether analytics/cookies are approved and the resulting consent requirement. |
| Attachment/privacy wording | SECURITY_AND_PRIVACY “Medical files”; source §21 | Visitors need accurate handling expectations for medical files. | `APPROVAL REQUIRED` | Approve provider, access, transfer, retention, deletion, and user-facing wording. |
| Retention/deletion requirements | SECURITY_AND_PRIVACY; source §21 | Required before medical files are handled in production. | `MISSING` | Record retention/deletion rules and operational ownership. |

No legal text is treated as approved merely because a principle is specified in
the technical documents.

## 11. SEO readiness gate

| SEO item | Source/reference | Why it matters | Status | Required resolution before publication |
| --- | --- | --- | --- | --- |
| Final page titles | SEO.md “Metadata”; website-content-map §10 | Every indexable page needs a unique intentional title. | `MISSING` | Create titles from approved identity/content; do not ship placeholders or keyword-stuffed titles. |
| Final page descriptions | SEO.md “Metadata”; website-content-map §10 | Every indexable page needs a useful description. | `MISSING` | Create descriptions from approved copy; do not invent claims. |
| Official links and `sameAs` candidates | source §16; SEO.md “Entity strategy” | External identity links must be official and justified. | `APPROVAL REQUIRED` | Approve LinkedIn/PubMed/YouTube/organisation links individually before use. |
| English entity naming | source §1; PROJECT_BRIEF §1; D-027 | Keeps the official entity consistent. | `DECIDED` | Use `Dr. Mohamed Aggour` consistently unless a new explicit decision changes it. |
| Arabic entity naming | source §1; approval-pack A2–A3 | Current build spelling is not a CV/source-approved final. | `APPROVAL REQUIRED` | Approve Arabic name and title before final Arabic metadata or structured data. |
| English indexability | D-019, D-026; SEO.md | English is a launch language and must be indexable when approved page content exists. | `DECIDED` | Preserve indexability rules and complete page-specific metadata before publication. |
| Arabic indexability | D-019, D-026; SEO.md | Arabic is a launch language and must be indexable when approved page content exists. | `DECIDED` | Preserve Arabic `lang`, `dir`, canonical, alternates, and approved metadata. |
| French architecture/readiness | D-019, D-026; SEO.md | French route support must not be confused with launch publication. | `DECIDED` | Keep French structurally ready but non-indexed, absent from launch sitemap/alternates, and inactive until approved French content exists. |
| Structured data | SEO.md “Structured data” | JSON-LD must reflect genuinely qualified approved content. | `APPROVAL REQUIRED` | Use only justified `ProfilePage`, `Person`, `BreadcrumbList`, or other approved relevant types; validate before launch. |
| Canonical/locale metadata | SEO.md; D-022, D-026 | Prevents duplicate or temporary-hostname indexing problems. | `DECIDED` | Use the official doctor-owned domain when connected; do not make the Vercel hostname permanent canonical identity. |

## 12. Phase 3 implementation-control summary

### Already closed and available for implementation

- Core visual direction and restraint requirements.
- Biography terminology and the no-separate-research rule.
- Exact six-condition information architecture.
- Professional Activities section name and exactly three categories.
- YouTube as the E-learning destination direction.
- English/Arabic launch and French-ready/non-indexed architecture.
- Consultation branch structure, emergency stop, manual human review, and
  receipt-only submission semantics.
- No patient portal, database, request history, admin dashboard, booking engine,
  payment gateway, or public medical-file storage.
- Attachment file types and maximum count.
- No invented emergency numbers and no emergency-service positioning.

### Blocked by missing content or assets

- Final portrait approval and usage guidance.
- Final primary logo, monogram/favicon, and SVG/vector master.
- Final brand colors and fonts.
- Arabic name and title.
- Page-specific approved titles/descriptions and final page copy.
- Six condition descriptions, scope wording, CTA wording, and Arabic labels.
- Curated Biography, Professional Activities, and E-learning items.
- Official YouTube URL, playlists, and featured lectures.
- Official email, WhatsApp number, physical address, and approved external links.

### Blocked by future operational or legal approval

- Current positions, affiliations, editorial roles, and CF1–CF4.
- Consultation fees, duration, locations, languages, recipient, secretary
  handling, response expectation, and payment arrangement.
- Attachment size limits, secure transfer/storage provider, access model, and
  retention/deletion policy.
- Consent, privacy policy, disclaimer, emergency, consultation, and attachment
  wording.
- Anti-spam, fallback/error behavior, cookie/analytics decision, and tracking
  consent requirements.

### Work that can continue without another doctor-contact cycle

- Implement the already-decided route and component structure.
- Build localized shell and page templates with explicit non-final placeholders.
- Implement the six-condition information architecture without publishing
  unapproved medical copy.
- Prepare consultation presentation/validation boundaries without providers or
  production submission behavior.
- Prepare SEO plumbing, route metadata interfaces, and French no-index rules.
- Prepare responsive, accessible, RTL/LTR, and QA foundations.
- Prepare asset slots and vector handoff requirements without treating raster
  working assets as final brand approval.

### Must be resolved before production/publication

- All `NEEDS CURRENT VERIFICATION`, `APPROVAL REQUIRED`, and `MISSING` items
  that affect the relevant page or operational flow.
- Final identity assets and typography.
- Final approved medical, biography, consultation, legal, and localized copy.
- Secure medical-file handling and retention/deletion decisions before uploads
  are enabled.
- Operational notification/WhatsApp details and failure behavior before real
  submissions are enabled.
- Final SEO titles, descriptions, links, canonicals, alternates, structured
  data, and launch indexability checks.

## Phase 3 Exit Criteria

### Implementation readiness

The project is **ready for Phase 4 prototype/page implementation** in an
approval-gated form. Phase 4 may implement the decided information architecture,
shell, templates, placeholders, accessibility, responsive behavior, SEO
plumbing, and consultation presentation boundaries without treating open items
as approved public claims.

### Publication readiness

The project is **not ready for final production publication**. Identity assets,
current professional status, medical copy, localized copy, operational values,
legal/privacy wording, secure attachment handling, and page-specific SEO content
remain gated as recorded above.

### Exit interpretation

- Closed decisions can be implemented without reopening scope.
- Missing content/assets block final public copy and brand lock.
- Operational/legal gates block real consultation submission, medical uploads,
  production notifications, and final publication.
- Implementation may continue without another doctor-contact cycle by using
  explicit placeholders and preserving the approval gate.
- Production/publication must wait for the relevant open items to be resolved.

## Final consistency check against `content/website-content-map.md`

| Check | Result |
| --- | --- |
| Contradictions found | The same CF1–CF4 source conflicts are preserved. No conflict is resolved. |
| Missing approval items | Identity, Arabic naming, portrait/logo/fonts/colors, Biography categories, condition copy, Professional Activities items, E-learning assets, consultation wording, contact data, legal text, and SEO copy remain explicitly gated. |
| Items already decided/closed | V1 scope, page structure, six conditions, three Professional Activities categories, launch languages, French no-index rule, consultation branch, human review, attachment count/types, and V1 non-goals are preserved. |
| Items requiring current verification | Current roles, affiliations, Royal London status, years of experience, editorial/reviewer roles, current activity, and current external profiles. |
| Items requiring future doctor approval | Final copy, brand assets, Arabic naming, medical wording, activity selection, YouTube destination/items, contact/legal wording, and publication claims. |
| New scope introduced | None. The document only consolidates existing decisions, source material, approval gates, and missing values. |
| Media drift | The map and this gate preserve `Professional Activities` with exactly three categories. Any existing `Professional Activities & Media` implementation remains drift to correct later. |
| Phase 4 readiness | Ready for controlled prototype/page implementation; not ready for unrestricted public publication. |

## Phase 4.5 superseding information-architecture decision

Professional Activities & Media was rejected by the doctor and is not a V1
website section. Conference, society, invited-talk, and professional activity
facts may remain inside Biography where appropriate, but no standalone
Professional Activities page or section exists in V1. The earlier Phase 3
approval of that standalone section is superseded by this explicit decision;
CF1–CF4 source conflicts remain unchanged.
