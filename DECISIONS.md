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
Status: APPROVED (count superseded by D-037)

Six core condition destinations, concise and consultation-oriented.
D-037 replaces the count of six with the ten conditions of the approved
document and fixes the copy source.

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

## D-030 — Visual System Implementation as Source of Truth
Status: APPROVED

The implemented CSS in `globals.css` is the source of truth for the visual system, correcting deviations in the original specification. Key decisions:
- Accent color is Terracotta Red (`#c44e2f`), replacing Gold.
- Body font is IBM Plex Sans (English) and IBM Plex Sans Arabic, replacing Inter.
- Arabic Display font is Noto Naskh Arabic, replacing Noto Kufi Arabic, for better editorial tone.
- Breakpoints follow a desktop-first `max-width` implementation (~960px, ~768px, ~576px).

### D-031: Primary Logo Asset Format

**Date**: 2026-09-29
**Context**: The primary logo is a PNG (\/brand/logo-primary.png\). An SVG equivalent was checked for to improve sharpness, especially on high-DPI displays.
**Decision**: Retain the PNG.
**Consequences**: The PNG asset is used in the Header, Footer, and Home Hero. A vector SVG should be requested from the designer/client for future updates. *(Superseded by **D-044**: the vector master arrived and the PNG lockups were retired.)*

### D-032: Desktop-First Responsive Architecture

**Date**: 2026-09-29
**Context**: The initial RESPONSIVE_DESIGN.md implied a mobile-first (min-width) approach, but the codebase (globals.css) relies heavily on desktop-first (max-width) media queries.
**Decision**: Formalize the use of desktop-first (max-width) media queries as the project standard.
**Consequences**: Future CSS additions must use max-width media queries to gracefully degrade layout for smaller screens.

### D-033: Approved Arabic Name Spelling and Honorific

**Date**: 2026-09-30
**Context**: Arabic content used two spellings of the doctor's name (محمد عقور and محمد عجور), the Arabic home H1 showed the name without the "دكتور" honorific that English carries as "Dr." in every occurrence, and three Arabic strings in `content/biography.ts` carried Chinese characters where the Arabic term "التدخلي" was intended.
**Decision**: The approved Arabic spelling is **محمد عجور** — never عقور. The Arabic honorific **دكتور** is used wherever English uses "Dr.", including the home H1 (`siteIdentity.localizedName.ar`), metadata title and description, and footer brand and copyright. The English/Latin identity remains "Dr. Mohamed Aggour" unchanged. Characters from non-Arabic, non-Latin scripts must never appear in localized content; the affected strings now read "العلاج التدخلي".
**Consequences**: Every Arabic occurrence of the name — `content/site.ts`, `content/biography.ts`, `messages/ar.json` — uses عجور. New Arabic copy containing the name is reviewed against this spelling, and a content scan for foreign scripts is part of validation.

### D-034: Legal & Privacy page structure and required client data

**Date**: 2026-09-30
**Context**: `/legal` was a seven-heading skeleton: only the emergency line carried real copy and every other section rendered a generic "Information will be available here." placeholder. The privacy, disclaimer and consultation-terms wording also depends on values the implementation team may not invent — legal entity, official address, privacy e-mail, privacy/DPO contact, countries and recipients, service providers, retention periods, and the medical-upload mechanism.
**Decision**: The page is organised as four parts in this order — **Privacy Notice**, **Medical Disclaimer**, **Remote Consultation Terms**, **Cookies & Analytics** — with continuous section numbering 1–22 across the parts, published in English and Arabic from `content/legal.ts`. The eight values are rendered as visible bracketed placeholders (`LEGAL_PLACEHOLDERS`), and `tests/legal.privacy.spec.ts` fails if a placeholder disappears before the real value is published in `content/legal.ts`. The page name and the footer link are both **"Legal & Privacy"** / **"الخصوصية والشؤون القانونية"**, and `/legal` remains indexable under `SEO.md` while placeholders are present. The "last updated" line is content data and is refreshed whenever the notice changes materially.
**Consequences**: `/legal` cannot be launched while placeholders remain; supplying a value means editing `content/legal.ts` and `LEGAL_PLACEHOLDERS` together, because the test forces that step. Long-form legal copy lives in `content/legal.ts` (both locales together) while `messages/en.json` / `messages/ar.json` keep only page chrome — title, description, intro, date and CTAs. Approval-pack J5–J12 and source-of-truth §22 now list the eight values the client must supply. *(Placeholder mechanics superseded by **D-035** and then **D-043**, which leaves none pending.)*

### D-035: Shorten `/legal` and reduce the required placeholders to four

**Date**: 2026-10-01
**Context**: The stated purpose of the site is to stay simple and strong in SEO for Google and AI tools. The first version of `/legal` (D-034) carried 22 numbered sections and eight client-supplied placeholders — the heaviest page on the site, for content that exists to build trust rather than to rank. Several of the eight fields were redundant for a site of this size.
**Decision**: The four parts (Privacy Notice · Medical Disclaimer · Remote Consultation Terms · Cookies & Analytics) stay, but the copy is rewritten as short prose: 14 paragraphs, 5 subheadings, one flow line, no lists or field tables. The placeholder list drops from eight to four — `[LEGAL NAME]`, `[PRIVACY EMAIL]`, `[SERVICE PROVIDERS]`, `[RETENTION PERIODS]` — each used once inline in the sentence it belongs to. **Removed**: official address, separate DPO/privacy contact, countries-and-recipients (folded into the service-providers sentence) and secure-upload mechanism (folded into retention wording), superseding the 1–22 numbering of D-034. `tests/legal.privacy.spec.ts` now also guards size: each locale must stay between 150 and 500 words.
**Consequences**: The page is short, fast and scannable, and the facts blocking launch fall from eight to four. The removed facts stay tracked in source-of-truth §22 and approval-pack J9–J12, and are still required before the related handling is enabled (registered address on replies, separate DPO, transfers, medical attachments). If a legal reviewer asks for a fuller GDPR-style notice, that is a content edit in `content/legal.ts` keeping the same four-part structure; only the word-count guard would need adjusting. *(The four-value placeholder list is superseded by **D-043**, which removes three of those clauses and publishes the fourth.)*

### D-036 — Remote Consultation becomes a WhatsApp hand-off (no web form)

**Date**: 2026-10-05
**Context**: The doctor decided that the website will not carry a consultation form at all. The marketing team runs the conversation, and the chatbot is built on WhatsApp Business. The eight-step prototype wizard on `/remote-consultation` (requester → urgency → service → details → times → attachments → consent → review) was the last form surface in V1 and the source of the remaining collection, validation, upload and consent work.
**Decision**:
- The form is removed completely. `/remote-consultation` becomes a single-purpose landing page whose only action is **one button** that opens a WhatsApp Business chat. There is one button for everyone; the chatbot — not the website — asks whether the visitor is a patient or a referring physician (D-007 stays in force as a conversation model, not as a site form).
- The button opens the chat with a **localized pre-filled greeting** (Arabic on `/ar`, English on `/en`), defined as content, not as presentation.
- All other consultation CTAs in the site (home hero, home consultation section, biography, conditions, e-learning, legal, contact, sticky mobile bar, placeholder pages) keep pointing to `/remote-consultation`. **No `wa.me` link exists anywhere except that page**; `/en/contact` must still render zero WhatsApp links.
- The page keeps an **always-visible emergency block** (site is not an emergency service · contact local emergency services · attend the nearest hospital · do not wait for a reply here). Without a form there is no emergency branch to enter, so the guidance is permanent page content instead of a terminal state (CONSULTATION_FLOW §3, `DECIDED`).
- The page keeps an explicit statement that a message is a **request only** — not an appointment, payment, diagnosis or clinical decision — and a link to `/legal`.
- The number lives in `content/whatsapp.ts` as published content (`number: string | null`), because it is displayed publicly and is not a secret. While it is `null`, the CTA renders disabled next to a visible `[WHATSAPP NUMBER]` placeholder; `tests/consultation.smoke.spec.ts` fails if that placeholder disappears before the real number is published. The operational `WHATSAPP_*` environment values used by the adapters remain separate and are still not in source control.

**Consequences**:
- The site collects, validates, uploads and stores **nothing** before the visitor is on WhatsApp. There is no form state, no client validation, no attachment picker, no consent checkbox and no request payload leaving the site.
- The secure medical-upload blocker (approval-pack J12, phase-3 gate §8) is **no longer on the V1 critical path**: files are exchanged inside WhatsApp under the marketing team's chatbot. Retention, access and privacy wording for that channel are still required before real conversations are handled, and are tracked under J7/J8 — not invented here.
- D-012 (PDF/JPG/PNG, three files) and D-016 (file storage) remain valid decisions but are no longer exercised by the website; they reapply if an on-site upload ever returns.
- The provider-agnostic consultation layer stays as documented: `lib/integrations/contracts.ts` and `lib/consultation/submit.ts` remain unwired and untouched, because AGENTS.md requires `submitConsultation()` / `sendWhatsAppNotification()` / `sendStaffNotification()` / `handleWhatsAppWebhook()` to live outside presentation components. Nothing in the new page calls them.
- `tests/consultation.smoke.spec.ts` is rewritten: it now guards the WhatsApp CTA, the pending-number placeholder, the permanent emergency block, the absence of any form control, and the viewport matrix. `tests/medical.content.spec.ts` no longer walks a wizard on this page.
- `content/legal.ts` Remote Consultation Terms is unchanged and still true: a WhatsApp message is a request, and staff confirm the appointment separately.

### D-037 — Conditions: all ten destinations, one shared source

**Date**: 2026-10-05
**Context**: The site carried two parallel condition datasets — the six CV-derived entries in `content/home.ts` + `content/conditions.ts` (several of whose slugs only redirected, `stroke`, `carotid-stenosis`, `venous-sinus-disorders`) and the ten transcribed entries of the approved document in `content/patient-conditions.ts`. The home preview showed six, the hub page showed ten cards, and neither used the approved document's own descriptions.
**Decision**:
- `content/patient-conditions.ts` is the **only** condition source. `getConditionListing(locale)` returns all ten conditions — `slug`, approved `title`, and `description` — in document order, and the home cards and the `/conditions` list both render that array, so a title or description edit lands on both surfaces and on the detail pages at once. The order is identical in English and Arabic.
- The description is the document's own lead paragraph, copied unchanged. Where the document opens with a headed "What it is." block that paragraph is used; the only exception is `stroke-thrombectomy`, whose first block is an unheaded emergency notice, so the first headed block ("Most strokes happen when a clot blocks an artery in the brain…") is used instead.
- The home section renders all ten conditions as **cards in a 3 / 2 / 1 column grid** (3 columns ≥ 960px, 2 columns 768–959px, 1 column below), each card a single link to the current document slug, with the approved title over the approved lead paragraph and one hover/focus state. Every home link points at a real slug — no redirecting slug is linked anywhere.
- `/conditions` renders a **vertical list**, not cards: one `<li>` per condition with a linked `<h2>` in the approved display font and the lead paragraph beneath it, separated by a light rule and generous spacing. The page keeps a single `H1`; the previous sr-only section heading is replaced by an `aria-label` so the heading outline is `H1` + ten `H2`.
- The legacy files `content/home.ts` and `content/conditions.ts`, the `home.conditions.items` message keys, and the pending short summaries (APPROVAL.md #2) and procedure labels (APPROVAL.md #3) are removed, because both surfaces they fed no longer exist.

**Consequences**:
- Adding, renaming or re-copying a condition is a single edit in `content/patient-conditions.ts`; the home cards, the hub list, the detail routes, the sitemap and the tests follow. No slug outside that file may be linked from a page.
- Short marketing summaries for the home cards are no longer a mechanism; if the doctor wants titles-only cards, that is a presentation change in `components/home/HomePage.tsx`, not a content change.
- `tests/topic.seo.spec.ts` guards the decision: exact slug order in both locales, ten home links matching the document slugs, `H1` + ten `H2` on the hub, and hub descriptions equal to the document's lead paragraphs.
- **Partially superseded by `D-041`**: the hub now prints each condition's whole document instead of the lead paragraph alone; the shared source, the slug list, the home cards and the `H1` + ten `H2` outline are unchanged.

### D-038 — Biography: two-paragraph summary, everything else in one collapsed Full CV

**Date**: 2026-10-05
**Status**: Partially superseded by **D-040** the same day — the Full CV disclosure was removed; only the two-paragraph summary stayed on the page.
**Context**: The doctor approved a final, short biography text (two paragraphs) and asked that the page stop showing the long chronology above the fold. The page previously rendered an overview block (key facts + six paragraphs) followed by current positions, education, societies, teaching, research, clinical areas, the annual clinical activity figures and the external-links section.
**Decision**:
- `/biography` shows the `H1`, the portrait and the professional title unchanged, then **exactly the two approved paragraphs, verbatim**, in the existing type and spacing system with a comfortable reading measure. The two strings live once in `content/biography.ts` as `summary: readonly [string, string]`; the home page biography preview reads `getBiographyContent(locale).summary[0]`, so preview and page cannot drift.
- Every other section of the current page moves unchanged into **one** native `<details data-biography-full-cv>` disclosure titled "Full CV" / "السيرة الكاملة", closed by default, placed directly below the paragraphs. It is `<details>`/`<summary>` with no client JS, and the content is present in the served HTML for crawlers. Sections keep their original ids (`biography-current-positions`, …, `biography-external-links`), so anchors and structured data are unaffected.
- The **Annual Clinical Activity section is removed from the page** permanently; the figures stay as source data in `content/biography.ts` (`annualActivity`) but are no longer rendered.
- `BiographyToc` is deleted along with its CSS: a table of contents linking into a collapsed disclosure served no purpose. The disclosure's chevron reuses the direction-neutral `.condition-section__summary` rotation, so it points down when closed and up when open in both LTR and RTL.
- Structured data (`ProfilePage`/`Person`) and all metadata are unchanged. Dead message keys removed: `home.biography.body` (en/ar/fr), `content.biography.annualActivity` (en/ar); new key `content.biography.fullCv`.

**Consequences**:
- The page reads as a short professional statement first and a full CV on demand; nothing in `content/biography.ts` was deleted, so expanding the page again later is a presentation change only.
- `tests/biography.content.spec.ts` guards the new structure: verbatim summary in both locales, collapsed-by-default Full CV with its content in initial HTML, keyboard operation, RTL chevron, and the 14-width × 2-locale overflow matrix in both the closed and open states. `tests/social.identity.spec.ts` and `tests/medical.content.spec.ts` open the disclosure before asserting on the sections that now live inside it.
- Because the disclosure ships closed, any future section added inside it must be re-checked for crawlability in the initial HTML, not only for visibility.

### D-039 — E-learning: "Learning links" replaces the teaching list on the page

**Date**: 2026-10-05
**Context**: `/e-learning` rendered a hero index number (`01`) and a "Teaching and education" list pulled from `content/biography.ts`, while the hero description still spoke about "teaching, faculty and physician-education activity". The page's actual job is to send physicians to the doctor's video destinations, so both the number and the teaching list were dead weight on this route.
**Decision**:
- The hero index number and the teaching section are removed from `/e-learning` only. `.content-hero__index` stays: `/contact` (`03`) and `/legal` (`04`) each render their own number inline, and no shared component owns it, so nothing else changes. The teaching content itself is untouched — it still renders inside Biography's Full CV from `content/biography.ts`.
- The teaching section is replaced by **Learning links** / **روابط التعلم**, driven by one new content file, `content/learning-links.ts`. Each entry carries `id`, `platform` (`youtube | facebook | platform | other`), `url`, `title { en, ar }`, `description { en, ar }` and `primary`. Adding a destination is an edit to that array and appears in both launch locales with no component or message change.
- The `primary` entry renders as one large navy card; every other entry renders as a smaller card underneath, so future destinations need no code change. An entry whose `url` is empty or whitespace-only is filtered out before render, so a placeholder can never publish a dead link. Platform marks are inline SVG (no icon package), and every external anchor uses `target="_blank" rel="noopener noreferrer"` plus an sr-only "opens in a new tab" / "يفتح في تبويب جديد" note, with the whole card as the link target.
- The hero description becomes **"Educational videos and resources for physicians in interventional neuroradiology."** / **"فيديوهات وموارد تعليمية للأطباء في مجال الأشعة العصبية التداخلية."** (approved by the doctor in this task), replacing the teaching/faculty wording.
- The YouTube destination ships as the temporary `https://www.youtube.com`, marked TODO in `content/learning-links.ts`. This deliberately supersedes approval-pack G1 and the `website-content-map.md` "only after the official destination is verified" line for the placeholder period: `tests/medical.content.spec.ts` and `tests/responsive.smoke.spec.ts` now assert that the links exist, open safely in a new tab and come from the content file, instead of asserting that no YouTube link exists.
- The temporary URL is **not** added to `approvedSameAs` in `lib/seo/person-entity.ts`; a TODO there records that the final channel URL must be added once supplied.

**Consequences**:
- A new learning destination is a single entry in `content/learning-links.ts`; it appears in English and Arabic at once. `getLearningLinks()` / `selectLearningLinks()` are the only render path, so locale fallback and the empty-URL rule cannot be bypassed by a component.
- The hero no longer reserves a second grid column (`.content-hero__grid--single`), so removing the number leaves no empty gutter; the header-to-section transition keeps the existing `content-hero` → `content-section` surfaces and rule.
- `content.eLearningPage.teachingHeading` is removed from `messages/en.json` and `messages/ar.json` (it had no other consumer) and replaced by `learningHeading` + `newTabHint`.
- Launch still requires the real channel URL: replace the TODO value, then add that same URL to `approvedSameAs`, so the Person `sameAs` and the page always agree.

### D-040 — Biography: the Full CV is removed; the page is the summary only

**Date**: 2026-10-06
**Context**: D-038 kept the rest of the CV behind a collapsed **Full CV** disclosure below the two approved paragraphs. The doctor then asked to remove that section as well — "احذف سيكشن ال Full CV، هنكتفي بنبذة مهنية فقط".
**Decision**:
- `/biography` renders exactly four things: the hero (H1 + portrait + professional title + description), the section labelled **Professional Overview** / **نبذة مهنية** carrying the two approved paragraphs verbatim, the navigation CTA row (conditions · e-learning · remote consultation · home), and the structured data. The `<details data-biography-full-cv>` element, its summary bar, the `.biography-full-cv*` CSS and the `content.biography.fullCv` message key are deleted.
- No CV section renders anymore: `biography-current-positions`, `biography-career-history`, `biography-previous-positions`, `biography-qualifications`, `biography-societies`, `biography-teaching`, `biography-academic`, `biography-research`, `biography-leadership`, `biography-milestones`, `biography-clinical-expertise` and `biography-external-links` are all gone from the page. The External Professional Links section going with them means the one approved LinkedIn URL is reachable only from `/contact`.
- `content/biography.ts` keeps **every** CV dataset (positions, career history, qualifications, societies, teaching, academic, research, leadership, milestones, clinical expertise, external links, annual activity) — no content file was edited. Bringing any of it back is a presentation change in `components/biography/BiographyPage.tsx`.
- The message keys that only fed those headings (`fullCv`, `currentPositions`, `careerHistory`, `previousPositions`, `qualifications`, `societies`, `teaching`, `academic`, `leadership`, `milestones`, `clinicalExpertise`, `research`, `externalLinks`, `pubMedCta`) are removed from `messages/en.json` and `messages/ar.json`.
- The presentation polish from D-038 stays: `.content-section__body` is capped at `36rem` so the two paragraphs hold a comfortable measure, and `p + p` inside it gets `--space-5` so the two paragraphs read as two.
- Metadata and structured data are untouched: title, description, canonical, Open Graph and the `ProfilePage` / `Person` JSON-LD are exactly as they were.

**Consequences**:
- The page is a short professional statement plus three CTAs — the thinnest text page on the site. `content.biography.description` still says the profile covers "career, qualifications, teaching, academic activity and clinical expertise", which is no longer true of the body copy; it is left unchanged because it is approved copy and is also the meta description. Flagged for the doctor, not edited here.
- Tests now guard the absence as well as the summary: `tests/biography.content.spec.ts` (two verbatim paragraphs in both locales, no disclosure, no CV id in the served HTML, governance scan, 14-width × 2-locale overflow matrix), `tests/ai.discoverability.spec.ts` (the summary paragraphs are the crawlable biography content, CV ids absent), `tests/social.identity.spec.ts` (biography renders zero external profile links; the LinkedIn destination guarded on `/contact`), `tests/medical.content.spec.ts` (no disclosure to open).
- The CV copy still exists in source but is not published anywhere. If the doctor wants it findable for SEO or for referrers again, the options are visible sections on `/biography` or a separate route — either is a new decision, not a patch.

### D-041 — Conditions: full documents on the hub, plus a review stamp and standing notice

**Date**: 2026-10-06
**Context**: The doctor asked for two things on the conditions experience: a review line over every condition page and its index ("Reviewed by Dr. Mohamed Aggour · Last reviewed 4 October 2026" / "راجعه د. محمد عجور · آخر مراجعة 4 أكتوبر 2026"), with the standing patient notice at the foot of the same pages; and an `/conditions` index that shows each condition **in full** instead of one lead paragraph.
**Decision**:
- The two lines live once in `content/patient-conditions.ts`: `getConditionReviewLine(locale)` over `conditionLastReviewed` (`4 October 2026` / `4 أكتوبر 2026`) and `conditionMedicalDisclaimer`. `components/conditions/ConditionNotices.tsx` renders them, so the hub and the ten condition pages cannot drift apart, and the placeholder `[date]` / `[التاريخ]` is gone.
- Scope is **those 11 pages only** (the hub and the ten condition pages), not every route of the site: the notice says "this page explains a condition", which is untrue elsewhere.
- `/conditions` prints **each condition's whole document verbatim** under its linked `<h2>` — heading, paragraphs and bullet lists, in source order — instead of the single lead paragraph. Block headings render as `<h3>`, so the outline stays `H1` (page) → ten `H2` (conditions) → `H3` (sections); a condition page keeps `H1` (condition) → `H2` (sections).
- One renderer, `components/conditions/ConditionBlocks.tsx` with `headingLevel`, feeds both surfaces, and `getConditionListing()` now also returns `blocks`. The home cards keep rendering title + lead paragraph from the same array.
- The duplication between the hub and the ten condition pages (identical text on 11 URLs) is **accepted deliberately**, on the doctor's choice; the alternative readings were rejected explicitly, not overlooked.
- `.condition-index__description` is replaced by `.condition-index__body` (grid, `70ch` measure, display-font block headings).

**Consequences**:
- Editing a condition is still one edit in `content/patient-conditions.ts`: home cards, hub, detail pages, review date, notice and tests all read from it. Changing the review date is a one-line edit to `conditionLastReviewed`.
- `tests/topic.seo.spec.ts` now asserts the hub's full document (every heading, paragraph and bullet in order) plus the review stamp and notice on the hub; `tests/medical.content.spec.ts` locks the dated review line on the ten pages.
- If duplication later becomes a concern, the fix is a presentation decision (index-only summary or detail-only body), not a content change.

### D-042 — Contact: the intents block is removed; five approved profile links are added

**Date**: 2026-10-06
**Context**: The doctor asked, in one instruction, to delete the **Choose the appropriate route** section from `/contact`, to publish five additional professional profile URLs after the existing LinkedIn link "بشكل وطريقة احترافية", and to remove the hero index number `03` from the page.
**Decision**:
- `/contact` renders exactly three blocks: the hero (H1 + description, now on `.content-hero__grid--single` so no empty index column is reserved), the **Professional links** section, and the CTA row (remote consultation · biography · legal · home). The intents section, its `contact-intents` grid and `.contact-intent*` CSS are deleted; `content.contactPage.intentsHeading`, `patientIntent` and `physicianIntent` are removed from `messages/en.json` and `messages/ar.json` (`routeCta` stays — it feeds the CTA row).
- The hero index number `03` is removed. `.content-hero__index` itself survives this decision — `/legal` still rendered `04` at the time — and is deleted in full by **D-043**.
- The five client-supplied destinations are published after LinkedIn, in the client's order: ESMINT executive committee, eMedEvents speaker profile, ResearchGate, CHC professional profile, X. They are entries in `content/biography.ts` `externalLinks` (English and Arabic), the same list `/contact` already renders — a new link is one content row, not a component change. Each carries an internal `review` note recording the 2026-10-06 approval; `review` is never rendered.
- The bare `@Aggour` handle record is retired: X is now the full URL `https://x.com/Aggour`. The stale "no approved URLs" institutional placeholder goes with it, since ESMINT and CHC URLs now exist. PubMed and the YouTube placeholder stay `internalOnly`.
- `/contact` now reads the localized list (`getBiographyContent(locale)`), so the Arabic page shows Arabic link titles. Each destination renders as `target="_blank" rel="noopener noreferrer"` with an `sr-only` new-tab hint, matching the `/e-learning` link rules.

**Consequences**:
- The requester types of **D-007** (Patient / Consultation · Physician / Referral) are untouched as a consultation concept; they are simply no longer surfaced as two cards on `/contact`. `/remote-consultation` remains the single consultation hand-off and `/contact` still links to it, so `tests/ai.discoverability.spec.ts` (contact HTML contains `/{locale}/remote-consultation`) still holds.
- `tests/social.identity.spec.ts` now locks all six visible destinations **and their order**, their `https` + safe-anchor attributes, the absence of the intents heading and the index number, and that X appears exactly once as a full URL — never as a bare handle.
- `sameAs` in `lib/seo/person-entity.ts` is deliberately **not** touched: adding these URLs to the Person structured data is a separate SEO decision (it would also change `tests/social.identity.spec.ts`'s "sameAs stays empty" guard). Recommended follow-up, not done here.

### D-043 — Legal: WhatsApp is the correspondence channel, so `/legal` ships with no pending values and no index number

**Date**: 2026-10-06
**Context**: The doctor ruled that WhatsApp is the practice's primary correspondence channel (in line with D-036). That made three of the four remaining `/legal` placeholders pointless: a privacy e-mail address nobody writes to, a service-providers list, and retention periods. The fourth, `[LEGAL NAME]`, was only waiting for the operator's name. A follow-up instruction asked for the decorative hero index `04` to be deleted as well — the last one left on the site after **D-042** removed `03` from `/contact`.
**Decision**:
- **Removed from the Privacy Notice in both locales**: the "Retention" / "مدة الاحتفاظ" heading with its paragraph, the "Your rights and contact" / "حقوقك وتواصلك" heading with its paragraph, the closing "this notice may be updated…" / "قد يُحدَّث هذا الإشعار…" paragraph, and the inline sentence "The website runs with the help of: [SERVICE PROVIDERS]." / "ويُشغَّل الموقع بالتعاون مع: [SERVICE PROVIDERS]."
- **`[LEGAL NAME]` is published** as `Mohamed Aggour` (EN) / `محمد عجور` (AR), inside the opening sentence that stays otherwise untouched — "This website is operated by … as the professional website of Dr. Mohamed Aggour." / "يُدار هذا الموقع باسم … بوصفه الموقع المهني لدكتور محمد عجور."
- `LEGAL_PLACEHOLDERS` becomes an **empty tuple**. `LegalPage` returns text untouched when the list is empty (the splitting regex would otherwise match the empty string), and `tests/legal.privacy.spec.ts` gates the other way now: any bracketed token that appears must be listed there, so an unlisted placeholder reappearing fails the suite.
- The hero index `04` is deleted. Its hero moves to `.content-hero__grid--single` (the variant D-042 established for `/contact`), so no empty index column is reserved, and `.content-hero__index`, `.professional-page .content-hero__index`, their responsive rule and the now-unused `.content-hero__grid--compact` are removed from `app/globals.css` — the class has no renderer left.
- The four parts, the "last updated" line, and every safety statement required by the same test are unchanged.

**Consequences**:
- The page ships with **nothing pending**: J5 is published, J6–J8 are no longer shown at all; approval-pack J-section, source-of-truth §22 and `SECURITY_AND_PRIVACY.md` were rewritten to match, and `tests/ai.discoverability.spec.ts` checks the published name instead of the token.
- The Privacy Notice no longer tells visitors how to exercise access/erasure rights or how long their data is kept. If the doctor wants that back, it should point at WhatsApp rather than an invented mailbox — a copy edit in `content/legal.ts`, not an architectural change. Whether a rights clause is legally required in the launch market is a question for the client's legal reviewer, not for the site.
- `tests/legal.privacy.spec.ts` also locks the smaller outline (4 × `H2`, 3 × `H3`, 0 placeholders, 5 flow steps) and keeps the 150–500 word guard. The suite's `.content-hero__index` assertions stay: they are "not present" checks on `/e-learning` and `/contact`, and now hold site-wide.
- This entry is **D-043**: it was drafted as D-042 before the Contact decision took that number, so every reference to it was renumbered rather than duplicated.

### D-044 — Logo pack: vector emblem + live-text wordmark replaces the raster lockups

**Date**: 2026-10-06
**Context**: The client supplied the AGGOUR logo pack (`newlogofiles/`): three emblem vectors (flat colour, mono light, mono dark), a simplified favicon set (SVG + ICO + PNG), iOS/PWA icons, square 1024 PNG fallbacks, and the original 3D artwork `AGGOUR_Brain_and_Spine_Emblem.png`. It supersedes the proposed `MA` monogram / `MOHAMED AGGOUR` wordmark direction recorded in `content/source-of-truth.md` §23, and **D-031** ("retain the PNG"), whose stated missing prerequisite — a vector master from the designer — now exists.
**Decision**:
- Every lockup renders through one component, `components/site/Logo.tsx`: `<Logo variant="horizontal | stacked | emblem" size="hero" tone="color | light" />`. The emblem is always a supplied SVG; the name and tagline are live HTML text and are never baked into an image at any size. *(the `dark` tone was retired with the mono-dark vector — D-054)*
- **Header wordmark language** *(amended 2026-10-06)*: the header wordmark follows the page language — `AGGOUR` on the EN site, `عجـــور` (verbatim, tatweel included) on the AR site — as live HTML text, never baked into an image. Each name span carries its own `lang`/`dir` (`lang="ar" dir="rtl"` for the Arabic wordmark) inside the lockup's `lang="en" dir="ltr"` box, which always orders emblem-then-name; only the lockup's *position* follows the page direction (start side). The English name uses `var(--font-display-en)`; the Arabic name uses `var(--font-display-ar)` with Latin tracking dropped. The tagline, and the **footer** lockup's name, remain fixed English in every locale — the localization is header-only. The header home link's accessible name mirrors the visible wordmark (`Home - AGGOUR` / `الرئيسية - عجـــور`, the site's own approved Home label from `messages/*/navigation.home`, WCAG 2.5.3).
- Header: horizontal / colour / emblem at 56px desktop / 48px below 36rem, same sticky bar, height and grid. *(sizes amended 2026-10-16, D-054; the 44px legibility floor still holds)* Footer: stacked / light (mono-light) / emblem at 56px + name + tagline; the brand name appears nowhere else in the footer. **Footer lockup layout** *(amended 2026-10-07, client request)*: the footer lockup shares the **header lockup's inline edge** — it hugs the container's start edge in both directions, so the header and footer marks sit on one alignment line — while the stack inside its box mirrors the hero composition: emblem on top, name under it, then the tagline as one segment per line (`Interventional Neuroradiology`, `Brain & Spine`), no `·` separator, centred within the lockup; the segments read as one sentence to assistive tech. When a narrow header cannot fit emblem + wordmark, a container query drops the lockup to the emblem alone; the link keeps its accessible name either way.
- Assets *(amended 2026-10-16, D-054)*: `public/brand/aggour-emblem-{flat,mono-light}.svg` with their `-1024.png` fallbacks and `public/brand/aggour-og-1200x630.png`. The v2 retinted vectors (1000×1000 flat, cropped 640×640 mono-light) replaced the v1 traced pair; `mono-dark`, `aggour-brain-and-spine-emblem.png` and their fallbacks are retired out of `public/`. App Router icons are `app/favicon.ico` (16/32/48, 32bpp), `app/icon.svg`, `app/icon.png` (48×48) and `app/apple-icon.png` (180×180, full-bleed RGB tile with no alpha) — **rendered from `public/brand/aggour-favicon-simplified.svg`**, the pack's simplified small-size mark, because the full emblem turned to texture at 16px (`app/icon.svg` is byte-identical to that source). The `app/icon.png` slot is kept as the raster tab-icon fallback so `/icon.png` never breaks.
- OG image: 1200×630, the flat emblem on the `#f7f5f0` brand field with the Libre Baskerville lockup *(rebuilt in D-054)*, used for both locales with the existing OG title and description. Person JSON-LD gains `image` = `<canonical>/brand/aggour-emblem-flat-1024.png`; `sameAs` and every other property are untouched.
**Consequences**:
- Deleted as unreferenced: `public/brand/logo-primary.png`, `public/brand/logo-monogram.png`, and the retired `dr-aggour-brand-assets/` logo and favicon originals. `dr-aggour-brand-assets/dr-mohamed-aggour.png` stays (portrait master). The unused `logoLabel` message key, which described the old logo in each locale, is removed from `messages/en.json`, `ar.json`, `fr.json` and `ar-pending.json`.
- The home hero's slot now renders the stacked live-text lockup (emblem 96px, wordmark 2.25rem, uppercase taglines capped at 15rem) with the wordmark localized like the header; below 48rem the lockup drops with the two-column layout, exactly as the artwork's slot always did. *(amended 2026-10-16, D-054)*
- `icon-192.png` / `icon-512.png` are **not** wired: there is no web manifest and creating one is outside V1 scope. They stay in the pack until a manifest is decided.
- Tests: `responsive.smoke`, `performance.assets`, `social.identity` and `seo.entity` were repointed at the new assets, and the new `tests/brand.identity.spec.ts` locks the localized header wordmark (AGGOUR on EN, عجـــور on AR, footer English in both), the favicon provenance (byte-identical SVG favicon vs the simplified mark, ICO 16/32/48, icon dimensions), the retired-asset 404s *(list extended in D-054)*, the hero lockup scale and the OG dimensions. *(provenance source and hero assertions amended in D-054)*

### D-045 — Arabic professional title becomes "خبير الأشعة التداخلية وقسطرة المخ العلاجية"

**Date**: 2026-10-15
**Context**: The Arabic professional title was `استشاري الأشعة العصبية التداخلية`, a literal translation of the English "Consultant Interventional Neuroradiologist". The client chose a different Arabic wording for the title itself while keeping the English title unchanged.
**Decision**:
- The Arabic professional title is **`خبير الأشعة التداخلية وقسطرة المخ العلاجية`**. The English (and French) title stays `Consultant Interventional Neuroradiologist`.
- The title lives in exactly two strings — `siteIdentity.professionalTitle.ar` (`content/site.ts`) and `messages/ar.json` (`metadata.title`, `metadata.description`, `home.hero.professionalTitle`) — plus the Arabic biography summary and its `keyFacts` first entry in `content/biography.ts`. Everything derived from `siteIdentity` (home hero, biography hero, `Person` JSON-LD `jobTitle`, metadata) follows automatically.
- **Scope**: only the title. Historical and institutional position lines in the biography (`currentPositions`, `careerHistory`, `previousPositions`), the pending copy in `content/pending-copy.ts` / `messages/pending/*`, and the English/French copy are untouched.
**Consequences**: `content/source-of-truth.md` §2 and approval-pack A2 record the new Arabic title as a client decision; `tests/topic.seo.spec.ts` asserts the Arabic home title and description contain it. A future change to the Arabic title is one string edit in `content/site.ts` plus `messages/ar.json` — no component change.

### D-046 — Emergency guidance is presented calmly: no red fill, no warning pictogram

**Date**: 2026-10-15
**Context**: The permanent emergency strip on `/remote-consultation` rendered as a red-tinted card with a red warning triangle and a red lead sentence. The client found it visually alarming ("بيخض الناس") on a page whose purpose is reassurance, and asked for it to be removed or calmed down.
**Decision**:
- **The wording is unchanged and the guidance stays visible.** `CONSULTATION_FLOW.md` §3, `SECURITY_AND_PRIVACY.md` "Emergency" and `D-008` still require: this website is not an emergency service · contact local emergency services · attend the nearest hospital · do not wait for a response here. No country-specific number is invented.
- **Presentation is calm**: the strip becomes one quiet line at container width — a hairline rule (`--color-line-strong`) above it, body copy in `--color-neutral-600`, and the lead sentence in navy (`--color-navy-950`, 600). The red fill (`--color-red-700` at 7%), the box/border/radius and the `TriangleAlert` pictogram are removed from `RemoteConsultationPage.tsx`.
- The same alarm colour is removed from the condition-page callout icon (`.emergency-notice__icon` → navy), so no emergency surface in the system uses red as its signal.
**Consequences**: Urgency now reads through wording, position (directly under the hero, above the CTA) and typography rather than through alarm colour — matching the existing "urgency reads through structure and contrast instead of a red fill" rule already documented for condition pages. `tests/consultation.smoke.spec.ts` ("permanent strip above the content, not a card") and `tests/medical.content.spec.ts` still pass unmodified, because they assert presence, position and wording, never colour or icon. Reintroducing a red alert treatment is a reversal of this decision and needs a new entry.

### D-047 — One approved paragraph per condition, inline emphasis markers, a compact two-column /conditions index, and a dormant media capability

**Date**: 2026-10-15
**Context**: The doctor replaced the ten conditions' multi-block `blocks` documents with **one approved paragraph each** (EN + AR), delivered as plain text with two inline emphasis markers, and asked for `/conditions` to stop reading as ten long documents on a page. The same brief asked for an optional illustration or YouTube video per condition, to be built now but not activated until the media itself is approved.
**Decision**:
- **Data model**: `content/patient-conditions.ts` replaces `blocks` with `body` (the one paragraph, verbatim, with inline markers), `urgentLead?` (an extra plain sentence above it, present only for `stroke-thrombectomy`) and `media?`. `title`, `slug`, `searchTerms`, the redirects and `conditionLastReviewed` (4 October 2026) are untouched; the medical wording is stored exactly as supplied and is pending the doctor's sign-off.
- **Two markers, one parser**: `**Label:**` renders `<strong class="condition-label">`, `!!Urgent sentence.!!` renders `<strong class="condition-urgent">`, and a blank line is a paragraph break. `lib/condition-text.ts` (`parseConditionText` / `stripConditionMarkup` / `renderConditionText`) builds React elements from fresh regexes — never a markup string and never `dangerouslySetInnerHTML` — and **an unbalanced marker stays literal text** instead of swallowing the rest of the paragraph. `getConditionMetaDescription()` cuts the first sentence to ≤160 characters for the detail page's `<meta name="description">`, so the emergency lead is never the search snippet.
- **Hub**: `/conditions` is a compact index — a hero whose right column is a numbered jump list (a scroll-snapped chip row below 60rem), then one row per condition: `title | (urgentLead, media, paragraph)` in a `minmax(12rem, 21rem) minmax(0, 46rem)` grid, id-anchored at `#slug`. The hero keeps its bottom rule, the first row keeps no top padding or border, and `--space-section-compact` caps the hero→first-row gap; the section itself spends no padding, the rows carry the rhythm.
- **Detail page**: urgent lead, optional media, the paragraph, then an "Other conditions" block linking the remaining nine, the disclaimer and the CTA band. The CTA band is the shared `components/conditions/ConditionsCtaBand.tsx`, but the detail page keeps its own slots (back-to-conditions + medical disclaimer) and the hub keeps its (consultation + biography) — one component, no duplicated layout, no change to the tests' link counts. `EmergencyNotice.tsx` is rewritten in place as a heading-less `body`/`label` callout, so the outline stays H1 → one H2 per condition; `ConditionBlocks.tsx` is deleted.
- **Media, dormant**: `ConditionMedia` is `{type:"image"}` (self-hosted `public/` file, intrinsic width/height, alt unless `decorative`) or `{type:"video"}` (YouTube, 11-char `videoId`, self-hosted poster, duration label). The hub renders an image, and a video as its **poster linked to the condition page** (never a player on the index); the detail page renders an image, or a 16:9 click-to-play facade whose client chunk swaps to a `youtube-nocookie.com` iframe only on click, moving focus into the player. `lib/condition-media.ts` validates every declared entry — file existence under `public/`, dimensions, alt rules, self-hosted poster — and the detail route's `generateStaticParams()` calls `assertConditionMediaValid()`, so **invalid media fails `next build`**. No condition declares media today, so no page adds markup, height, requests or client JS for it.
- **New message keys** (EN + AR parity): `indexLabel`, `otherConditions`, `actionsLabel`, `playVideo`. `tests/fixtures/condition-media.ts` and `app/[locale]/condition-media-fixture/page.tsx` are the test-only surface; the route 404s outside development unless `CONDITION_MEDIA_FIXTURE=1` and is `noindex`.
**Consequences**:
- **The hub and the detail page now show the same paragraph** — the duplication **D-041** was written for is now structural, because the doctor's approved text is a single paragraph with nowhere to cut a lead. Removing the duplication needs a separate decision (a shorter hub preview, or hub titles only).
- The meta description is one sentence ≤160 characters instead of the block lead; `tests/topic.seo.spec.ts` asserts it against `getConditionMetaDescription()`.
- Page height drops (the paragraphs replaced whole documents) and the home-page card row's tenth card spans the full width and lays out sideways (`.condition-cards > li:last-child:nth-child(3n + 1)`), scoped to the three-column breakpoint so the 2- and 1-column layouts are unchanged.
- Unused CSS is removed with its renderers: `.condition-document__block*`, `.condition-index__body`, `.condition-emergency`, `.emergency-notice__body h2`; `html { scroll-padding-top }` drops from `10rem` to `6rem` to match the shorter anchor targets. `components/conditions/ConditionSections.tsx` is pre-existing dead code, left alone deliberately rather than folded into this change.
- New tests: `tests/condition.text.spec.ts` (parser, including unbalanced markers and every published paragraph), `tests/condition.content.spec.ts` (one non-empty marked-up paragraph per locale, balanced markers, no raw `**`/`!!` in the DOM, `urgentLead` only for stroke-thrombectomy), `tests/condition.media.spec.ts` (validation rules, zero media markup or video-host requests on real pages, the player chunk staying out of a media-free page's download, the fixture in both locales, RTL mirroring).



### D-048 — Conditions round 2: visual polish, mobile collapse, shared media on hub and detail, and duplicate-text mitigation

**Date**: 2026-10-15
**Context**: Round 1 (D-047) was reviewed against screenshots and a measurement report. The doctor chose to keep the full paragraph on both hub and detail. Three downstream problems followed: very long mobile hub pages (EN 12,092 px, AR 10,430 px at 390 wide); video available only on detail pages; and unavoidable text duplication between the hub and detail paragraphs. This round fixes all three without removing the full paragraph from either surface.
**Decisions**:

**A — Visual polish (from round-1 review):**
- **A1 `.condition-urgent`**: Underline removed (cut through Arabic diacritics and read as a link). Weight 600 and `--color-red-900` kept. Tint: `background: color-mix(in srgb, var(--color-red-900) 8%, transparent)`, `padding-inline: 0.2em`, `box-decoration-break: clone` (+ `-webkit-` prefix). No `letter-spacing` (damages Arabic letter joining). Text-on-tint contrast measured at 7.84:1 (page surface), 8.55:1 (card), 9.29:1 (white) — all ≥4.5:1.
- **A2 `urgentLead` / `EmergencyNotice`**: Converted from a neutral outline to a warning notice: `border-inline-start: 4px solid var(--color-red-900)`, 8% red tint background, hairline or no other borders. First sentence of `urgentLead` rendered in `<strong class="emergency-notice__lead">` (plain-text data unchanged; split at first `.` in `EmergencyNotice.tsx`). Icon colour changed to red. Width capped at 42rem (paragraph column width), paragraph-size text (1.125rem/1.75).
- **A3 Hub paragraph measure**: Hub grid second column `minmax(0, 42rem)` (was `minmax(0, 46rem)`). `.condition-paragraph` set to `max-inline-size: 42rem`, `font-size: 1.125rem`, `line-height: 1.75` (RTL 1.95). Measured chars/line at 1440: EN ≈72, AR ≈76 — both inside the 70–78 target.
- **A4 Detail page**: `.condition-detail-page .content-hero` scoped to `padding-block: clamp(2rem, 4vw, 3.5rem)` — hero reduces from 527 px to ≤240 px at 1440 while the shared `.content-hero` rule is unchanged. `.condition-document__content` `max-width` reduced from 54rem to 42rem so the reading column aligns to the same inline-start edge as the breadcrumb and H1.
- **A5 Home-card description**: `getConditionDescription()` now truncates at a sentence end within ~180 characters (falling back to word boundary) so cards no longer stop mid-sentence. The detail page's `getConditionMetaDescription()` (160-char, same algorithm) is unchanged. *(Amended 2026-10-20 — UI/UX committee P0-K3: the card cap is now ~130 characters and the card's CSS `-webkit-line-clamp` is removed; the summary itself carries the limit so no card text is clipped mid-line or mid-word. Truncated output also collapses stray "…."/"...." runs to one marker; amended again 2026-10-21 — a cut now stops at the last sentence end, else the last clause comma (at least a third into the cap), else the last word, so summaries never end mid-phrase and never stack "،…".)*

**B — Mobile collapse (hub only, below 60rem)**:
- `ConditionCollapsible` client component (`components/conditions/ConditionCollapsible.tsx`) wraps each hub row's paragraph. Collapsed by default (5 lines via CSS `-webkit-line-clamp`). Full text always in the DOM. Safety tail (`!!…!!` segments) extracted by `splitConditionSafety()` into `ConditionSafetyBody`, rendered outside the clamp so it stays visible when collapsed. `urgentLead` already sits outside the paragraph.
- No layout shift on load/hydration (CSS-driven clamp, initial state matches component default). Works without JS (paragraphs render in full — the toggle is hidden from 60rem up, and without JS the clamp still shows but no button lies about toggling it; the whole text is accessible). Keyboard operable, `:focus-visible` ring, `prefers-reduced-motion` transition suppressed.
- New message keys `readMore` / `showLess` in `messages/en.json` and `messages/ar.json` ("Read more" / "Show less"; "اقرأ المزيد" / "إخفاء").
- Measured hub heights at 390 wide after collapse: EN ≈5,200 px, AR ≈4,600 px (both below the 5,500 px target, down from 12,092 / 10,430 px).

**C — Hub media (same as detail)**:
- Round-1 rule (hub shows only a poster link for videos) is reversed. `ConditionMediaView.tsx` now has no `surface` or `detailHref` prop. One component serves both surfaces: images as images; videos as the same 16:9 click-to-play facade. Nothing is requested from YouTube before the click on either surface. `condition-media-fixture/page.tsx` and `tests/condition.media.spec.ts` updated to reflect this.

**D — Duplicate text**:
- No change to routes, redirects, canonical, or robots. Each detail page has its own unique `<title>` and meta description (≤160 chars, first sentence of the paragraph). The hub's title and description come from the shared `messages/` translations, not the condition's paragraph. The `condition-media-fixture` route returns 404 in a production build when `CONDITION_MEDIA_FIXTURE` is not set.

**Consequences**:
- Hub heights at 390 wide roughly halved vs round 1. Desktop hub and detail pages unchanged in reading experience.
- `condition.media.spec.ts` tests rewritten: hub video row now asserts the facade, not a poster link.
- `condition.content.spec.ts` line 51 still passes (10 × `.condition-paragraph`): all 10 conditions have a single paragraph body and their entire urgent content is trailing (safety tail is empty), so `ConditionClampedBody` produces exactly one `<p class="condition-paragraph">` per condition with no `ConditionSafetyBody` paragraph alongside it.
- The text duplication between hub and detail remains structural (doctor's choice). `canonical` and `robots` are already correct (detail pages are canonical; hub is the index). No further mitigation is applied in this round.

### D-049 — Two condition title renames and anchor-text guard raised to 80

**Date**: 2026-10-16
**Context**: The doctor approved two title changes (slugs, redirects, routes and paragraph text are unchanged):
- `angiography` EN: "Cerebral and spinal angiography" → "Diagnostic cerebral catheter angiography"
- `angiography` AR: «تصوير الأوعية الدماغية والشوكية بالقسطرة» → «قسطرة المخ التشخيصية»
- `avm` EN: "Brain and spinal AVM embolisation" → "Brain and spinal AVM treatment by catheter"
- `avm` AR: «علاج التشوهات الشريانية الوريدية في المخ والعمود الفقري بالانسداد» → «علاج التشوهات الشريانية الوريدية في المخ والعمود الفقري عن طريق القسطرة المخية»

**Decision**: Titles are updated everywhere they appear (H1, `<title>`, breadcrumb, breadcrumb JSON-LD, hub rows, index chips, home cards, "Other conditions" links, and JSON-LD `knowsAbout`). New `searchTerms` entries are added (old terms kept). No short-title field is added.

**Anchor-text guard**: The new AR AVM title is 77 characters. The existing `< 60` guard in `topic.seo.spec.ts` and `medical.content.spec.ts` was raised to `< 80`. Condition titles are already exempt from the guard by name (they are filtered out before the assertion). Only non-title anchors are checked against the guard; the longest of those is "Request a consultation" (21 chars EN) or "اقرأ المزيد" (12 chars AR), so the higher guard does not weaken the test in practice.

**Resulting `<title>` lengths** (format: `{condition title} | Dr. Mohamed Aggour`):
- angiography EN: "Diagnostic cerebral catheter angiography | Dr. Mohamed Aggour" — **62 chars**
- angiography AR: "قسطرة المخ التشخيصية | دكتور محمد عجور" — **38 chars**
- avm EN: "Brain and spinal AVM treatment by catheter | Dr. Mohamed Aggour" — **64 chars**
- avm AR: "علاج التشوهات الشريانية الوريدية في المخ والعمود الفقري عن طريق القسطرة المخية | دكتور محمد عجور" — **97 chars**

**Consequences**: All `<title>` lengths are within acceptable SEO range (≤ 60–70 chars is preferred; the AR AVM title at 97 chars will be truncated by search engines but is fully descriptive). No short-title field is added; if truncation is a concern, a new decision is needed.

### D-050 — The closing navigation / CTA band is removed from biography

**Date**: 2026-10-15
**Context**: The biography page ended with a closing navigation band (`.content-next-links` with links to conditions, e-learning, remote consultation). The client asked to remove that final section from the biography page.
**Decision**:
- The `BiographyLinks` block and the `.content-next-links` nav element are removed from `BiographyPage.tsx`.
- Internal linking is held by the header and footer navigation (`content/navigation.ts`), which render on every page.
- Dead message keys for biography CTA links are cleaned up.
**Consequences**:
- The biography page ends cleanly on its own content (the Moments gallery), providing a focused reading experience.
- `tests/biography.content.spec.ts` asserts `.content-next-links` count is 0.

### D-051 — Biography placeholder moments: flag scope and production guarantee

**Date**: 2026-10-15
**Context**: The doctor has no event photos for the biography gallery yet. A temporary placeholder gallery (six entries using the existing hero portrait, with sample meta and captions drawn only from the biography text already on the site) was built so he can judge the section before real photos arrive. The placeholders are about a real person and must never reach production; the gallery section renders nothing until real photos are approved.
**Decision**:
- The placeholder data lives entirely in `content/biography-moments-placeholder.ts`, imported only when `NEXT_PUBLIC_MOMENTS_PLACEHOLDER === "1"`. A production build without that flag contains no placeholder string (verified by grep of `.next` output for `"20XX"` and the English captions — both return no results).
- The flag is read inline in `app/[locale]/biography/page.tsx`; the bundler folds the branch away when the variable is absent or not `"1"`, so the placeholder module does not ship.
- In development, the same rendering path is exercised via `?placeholder=1` on the route; `?moments=3..6` (the counted fixture preview) wins if both are present.
- **Vercel scope**: the flag must be set in the **Preview environment only** — never in Production. The doctor's main `*.vercel.app` alias resolves to a Production deployment; if he wants to review the placeholders on Vercel he must use a **branch deployment URL** (the per-commit Preview URL, not the main alias) or review locally with `?placeholder=1` on the dev server.
- A visible, plainly-worded disclaimer tag renders at the top of the section when the placeholder is active. The placeholder gallery passes the same validator rules as an approved gallery (3–6 items, EN/AR parity, captions ≤45 words, files exist, no empty copy).
**Consequences**:
- `tests/biography.placeholder.spec.ts` guards both paths: flag off (no `.bio-moments` element, no `20XX`, no sample alt text), flag on (six items, visible disclaimer, EN and AR, RTL mirrors, no horizontal overflow).
- Replacing a placeholder entry with a real photo is a one-line edit in `content/biography.ts` `moments`; once all six are real the placeholder file and the flag can be removed in one commit.

### D-052 — Condition emergency guidance uses a calm informational style

**Date**: 2026-10-16
**Context**: The doctor asked for the stroke-thrombectomy guidance box to read as a quiet informational note rather than an alarming warning.
**Decision**:
- Keep all approved guidance wording and placement unchanged, but remove the warning-triangle icon and red treatment.
- Use the shared note style on the conditions index and detail pages: a light neutral surface, a thin neutral border and a quiet 2px inline-start rule. Keep any bold text in the normal text colour.
- Apply the same neutral text emphasis to inline urgent phrases throughout condition copy so bold safety wording does not appear red.
**Consequences**: The shared `EmergencyNotice` implementation keeps both condition surfaces consistent in English and Arabic; tests assert the icon-free structure and neutral computed styles.

### D-053 — Remove closing quick-link sections from Conditions, Contact and E-learning

**Date**: 2026-10-16
**Context**: The client asked to remove the closing quick-link sections from the Conditions, Contact and E-learning pages.
**Decision**:
- Remove each page's closing quick-link navigation completely; retain the page content itself and the shared site header/footer navigation.
- Remove translation keys used only by those sections.
**Consequences**: `tests/topic.seo.spec.ts` asserts the three pages render no `.content-next-links` section in English or Arabic. The Conditions detail pages' separate disclaimer/back-to-conditions actions are unchanged.
### D-054 — Flat brand rollout: v2 emblem vectors, live-text hero, favicon set and OG rebuild

**Date**: 2026-10-16
**Context**: The v2 logo delivery (`newlogofiles/v2-2026-10-08/`, staged from the designer's `svg/` folder) retints the brand for flat, light-background use: deep navy `#0b2a44`, brand field `#f7f8fa`, cyan inside the emblem only. The v1 traced vectors, the 1.7 MB 3D hero artwork, the favicon set built from the full emblem and the old OG card no longer match that direction. D-044 recorded the original lockup system; this decision rolls the v2 artwork out across every surface and retires what it replaced.
**Decision**:
- **Emblem vectors**: `public/brand/aggour-emblem-flat.svg` (1000×1000 viewBox, 5,318 B) and `aggour-emblem-mono-light.svg` (cropped viewBox `180 20 640 640`, 5,197 B) replace the v1 traced pair (29,252 B / 29,170 B); their `-1024.png` fallbacks were re-rendered from the same sources (134,895 B / 106,421 B). Filenames and served paths are unchanged. `Logo.tsx` keeps `EMBLEM_DIMENSION = 751` as the `<img>` width/height pair — the aspect-ratio contract `performance.assets.spec.ts` pins; rendering is driven by CSS, not by the SVG viewBox.
- **Hero**: the home hero slot renders `<Logo variant="stacked" size="hero" tone="color" name={logoNameFor(locale)} />` — emblem 96px, localized wordmark 2.25rem, the two English tagline segments at 0.875rem / 0.12em uppercase, lockup capped at 15rem. The wordmark follows the page language like the header; taglines stay English in every locale (D-044 plus the client's instruction). The `dark` tone and `aggour-emblem-mono-dark.*` retire with it. Two hero fixes ride along: **7a** `home-hero__content` gains `padding-block-end: clamp(4rem, 10vw, 9rem)` so the actions row never hugs the section edge; **7b** the portrait highlight becomes `radial-gradient(circle closest-side at 50% 58%, …)` so the glow stays inside the frame. **Fallback**: below 48rem the lockup hides together with the two-column layout (the rule its artwork slot always had) and the 48px header emblem carries the brand; from 48.001rem up the stack leads its column with the 96px emblem above the name and taglines.
- **Header sizes**: the horizontal lockup's emblem goes 48px → 56px on desktop, and its mobile floor 44px → 48px (below 36rem); both stay above the 44px touch/legibility floor. The container query that drops narrow headers to the emblem alone is unchanged.
- **Favicon set (owner choice B)**: the whole set was regenerated from `public/brand/aggour-favicon-simplified.svg` — `app/icon.svg` (byte-identical to that source), `app/favicon.ico` (16/32/48, 32bpp), `app/icon.png` (48×48) and `app/apple-icon.png` (180×180). The apple tile is full-bleed RGB with no alpha channel (iOS fills transparent corners with black): solid `#f7f8fa` brand field with the mark centred at ~78% width so the disc edge stays visible; cyan stays inside the mark only. The provenance assertion in `tests/brand.identity.spec.ts` compares `/icon.svg` against `/brand/aggour-favicon-simplified.svg`.
- **OG**: `aggour-og-1200x630.png` rebuilt from the flat emblem on the `#f7f5f0` field with the Libre Baskerville lockup — 358,738 B → 47,493 B, IHDR unchanged (1200×630, pinned by the test).
- **Retired from `public/brand/`** (archived under `newlogofiles/v2-2026-10-08/old-assets/`): `aggour-brain-and-spine-emblem.png` (1,718,931 B), `aggour-emblem-mono-dark.svg` (29,170 B) and `aggour-emblem-mono-dark-1024.png` (211,713 B); the v1 traced vectors, the old favicon set and the old OG card were archived earlier.
- **Numbering note**: the favicon regeneration shipped as `ed14633` citing "(D-048)" before D-048–D-053 were claimed by the conditions/biography rounds; the provenance comment now reads D-054 and this entry owns the rollout. The old commit message stays as sealed history inside the merge.
**Consequences**:
- `tests/brand.identity.spec.ts`: the hero test now asserts the live-text lockup (`.logo--stacked.logo--hero`, `aggour-emblem-flat.svg` emblem, height 96, `logoNameFor(locale)` name, two tagline segments, width ≤ 241) instead of the 3D PNG's single-locale ≥ 280px; the retired list grows from two to five paths, so the hero PNG and the mono-dark pair must 404.
- `tests/fixtures/condition-media.ts` points the conditions media fixture at `aggour-emblem-flat-1024.png` (1024×1024), keeping `condition.media.spec`'s existence checks on a file that still ships.
- The home page stops downloading its own hero image variant: 85,366 B transferred before → 0 after (header and footer already share the 5,318 B emblem SVG).
- Measured at 320/360/375/390/412/430/480/768/1440, EN and AR: no horizontal overflow, no truncated wordmark (hidden at 320 via the unchanged container query, shown and untruncated from 360 up), header and footer lockups on one container edge (delta 0), header emblem 56/48px, footer 56px, hero stack 96px / 240px wide / 36px name / 14px tracked uppercase taglines.

### D-055 — UI/UX committee next P1 round: warm borders, logical card arrows, unified card radius, menu accessibility and the A2 a11y gate

**Date**: 2026-10-21
**Context**: The committee's next round in its prescribed order: C2/L1/A1/K6 (warmer darker borders, non-text arrow contrast, button state table), K4 + R2 (logical →/← arrows, Contact arrow to the title line), K2 (one card family — flagged there as an open design discussion), M5 (menu cross and focus trap) and A2 (Axe, keyboard and screen-reader coverage; the project had no automated accessibility tests).
**Decision**:
- **C2/L1**: `--color-line` `#d9e0e7` → `#d0c8bc` (1.12:1 → 1.39:1 on the cream section background) and `--color-line-strong` `#b8c4cf` → `#b5ab98` (1.49:1 → 1.91:1), both warm stone; `DESIGN_SYSTEM.md` records the new values. The portrait placeholder keeps the literal cool `#b8c4cf` because it sits on the deliberately cool gradient.
- **A1/K4**: card arrows rest at `--color-navy-950-a60` (`rgb(11 42 68 / 60%)`): 2.65:1 → 4.02:1 on surface, 3.76:1 on surface-cool, above the 3:1 non-text minimum. Both card glyphs (home condition cards, e-learning links) move from ↗ to a horizontal → that the existing `[dir="rtl"]` `scaleX(-1)` rules mirror to ←.
- **K6**: the button system is documented in `DESIGN_SYSTEM.md` (levels plus default/hover/focus/pressed/disabled tables for primary, light, quiet, text/arrow, nav and footer links); `.button:disabled` is locked to neutral grey and no hover/focus state may light it up (previously a disabled button still took the live hover colour). CTA wording unification remains a client-copy decision and was not touched.
- **K2 (open discussion)**: the condition cards adopt the shared `--radius-card` (1rem) as the flat variant of the family already expressed by the raised (consultation panels, foundation card) and dark (promoted learning card) variants, so radius is constant across families. The direction was chosen from the existing token system and is presented to the committees via screenshots; reversal is one declaration.
- **R2**: each /contact row becomes a single link (title + URL + new-tab hint); the arrow rides the title line as a mirrored → so a wrapped URL can no longer strand a ↗ mid-text on mobile. Link count, href uniqueness, `target`/`rel` and the visible new-tab hint are unchanged (`social.identity` passes).
- **M5**: the open menu draws a cross in place of the hamburger (the three lines collapse into an X under `[aria-expanded="true"]`), and Tab/Shift+Tab cycle inside the header while the menu is open; Escape already closed it and still restores focus to the toggle.
- **A2**: `@axe-core/playwright` (dev-only dependency, explicitly requested by the committee) adds `tests/a11y.axe.spec.ts`: WCAG 2.1 AA axe scans over eight routes per locale plus the open mobile menu, and a keyboard spec (skip link is the first tab stop with its focus ring, menu focus trap in both directions, Escape restoring focus). The first run caught a real WCAG 2.5.3 defect in K1's switcher: the `aria-label` hid the visible word on /ar (`label-content-name-mismatch`), so the switch phrase now ships as screen-reader-only content inside the link — the accessible name contains the visible word and each language keeps its own voice cue.
**Consequences**:
- Green: `tests/a11y.axe.spec.ts` (4), `seo.multilingual`, `navigation.structure`, `responsive.smoke`, `social.identity`, plus `typecheck` and `lint`. `social.identity`'s canonical pair requires `NEXT_PUBLIC_SITE_URL` to be a valid HTTPS origin (`getSiteUrl()` rejects localhost by design); the checkout ships without one, so that pair runs with the env set to the reserved `example.com` domain.
- `DESIGN_SYSTEM.md` now carries the button state tables, the warm border values and the card-family spec; its stale `#7b2a31` red-900 value was corrected to the implemented `#6e252c`.
- Client-decision items stay untouched: K5 as the first proposed condition, K11, R3, CTA wording, the lockup (D-054) and any Notice-with-icon work.

### D-056 — UI/UX committee P2 micro-round: contact URL wrapping and weight, scaled dark-card arrow, arrow proximity, plus the approved screen-reader checklist

**Date**: 2026-10-21
**Context**: The committee accepted all seven P1 items (round `uiux-p1b-2026-10-21`) and registered four small P2 notes from the same screenshots, plus approved preparing a manual screen-reader checklist (A2 follow-up) and asked that K2's radius change be surfaced to the client before it ships.
**Decision**:
- **Contact URL wrapping**: `ContactPage` inserts `<wbr>` after every `-` and `/` in the displayed URL, and `.content-link-list__url` switches from the inherited `overflow-wrap: anywhere` to `break-word`, so a 390px line breaks at its separators (`.../in/` + `mohamed-aggour-1414a941`) instead of splitting a word mid-syllable. `<wbr>` adds no text: the link's textContent and accessible name are byte-identical (asserted by `social.identity` and the round-4 script).
- **Contact URL weight**: the URL no longer inherits the row heading's display serif (it rendered at 24px Libre Baskerville, underlined, navy — competing with the title). It is now body sans, `0.9375rem`, `--color-neutral-600` (5.9:1), no resting underline; the underline is a hover/focus affordance that returns with the row's red-900 hover colour. The heading leads again.
- **Dark-card arrow**: the promoted e-learning card keeps its 18px box only at small widths — beside its 48px icon and 38px title it read as ≈12px (committee measurement). It now scales with the card: `clamp(1.125rem, 2vw, 1.5rem)` (24px at 1440). Same path, same stroke, same resting colour; only the box scales.
- **S7 arrow proximity**: `.condition-card__arrow` drops `margin-block-start: auto`, so the arrow follows its description (uniform 12px) instead of pinning to the card floor where a third of short cards sat empty. Leftover space now falls below the arrow as ordinary card breathing room; the orphan wide card's centred side-column arrow is unchanged (its explicit `margin-block-start: 0` became redundant and was removed with it).
- **Screen-reader checklist**: `docs/A11Y-SCREEN-READER-CHECKLIST.md` documents the manual pass axe cannot do — a 5-row matrix (NVDA/Chrome, NVDA/Firefox, VoiceOver/macOS, VoiceOver/iOS, TalkBack), eight sections (global chrome, home, contact, conditions, professional pages, mobile menu trap, locale pronunciation, 200%/400% zoom), each row with the expected announcement, bilingual coverage and a sign-off rule keyed to P1 rows.
- **K2 client exposure**: the radius unification (D-055) is flagged for the client conversation — Home cards changed most visibly from near-square to 1rem. The direction stays as implemented until the client answers; reversal remains one declaration.
**Consequences**:
- Green: `typecheck`, `lint`, `a11y.axe` (4), `social.identity` (4, with `NEXT_PUBLIC_SITE_URL`), `navigation.structure` + `brand.identity` (11), `responsive.smoke` + `consultation.smoke` (12), and the round-4 script (`p4-verify.cjs`): 12/12 live asserts — URL computed style, byte-identical text, separator-only line breaks at 390px, hover underline, nine 12px arrow gaps, 24px primary arrow.
- `DESIGN_SYSTEM.md` gains an "External link rows" section and the two arrow rules (proximity + promoted-card scaling).
- The dev server must run with `NEXT_PUBLIC_SITE_URL` set for `social.identity`'s canonical pair: the canonical renders server-side from that variable, so a server started without it serves no canonical at all (observed this round as two identical 30s timeouts, not a flake).
- Screenshots for the committee: `screenshots/uiux-p2notes-2026-10-21/` (EN/AR contact rows at 390, home card grid, orphan card, promoted learning card).

### D-057 - UI/UX committee v16 closure round: column alignment, sticky titles, hero crop, bio hierarchy, separators, breadcrumbs and the Arabic heading weight

**Date**: 2026-10-22
**Context**: The committee's v16 closure plan executed in its prescribed order: the quick CSS batch (H4/H5/L4/T6/A4/S8/H3), the columns and spacing batch (S5/S6/S4/K8/K9), the visual composition batch (M1/S2/S3/L2/T3), then a tests-only pass (K7/M8/A5/M2/M3). Three items closed without code change (documented only) and seven items stay deferred to the client.
**Decision**:
- **Grid alignment (S5)**: one two-column token everywhere a page splits into title column + content column - `minmax(0, 0.85fr) minmax(0, 1.15fr)` with `gap: clamp(2rem, 8vw, 8rem)`: `.content-section__inner` (Contact, E-learning, Legal) and `.condition-index__item` (>=60rem) join the home biography grid, so the content column starts at ~48% of the container on all of them. The home e-learning band (`.home-learning__grid`) was the committee's measured ~54% outlier (it was `1fr 1fr`) and joins the same token; the E-learning page's own `content-section__inner` moves from `0.78fr/1.22fr` (~44.8%) to the shared token. Conditions rows keep their 42rem reading cap on the content column. The footer's identity column becomes `1.83fr 1fr 1fr`, which starts the primary-navigation column on the same ~48% line; the Legal column still sits at ~76%, which lands on no agreed grid line - flagged as an open sub-point (the candidate lines are the 75% quarter or the 66.7% third, and the 66.7% variant squeezes the nav column to ~170px). The Remote Consultation card pair stays exempt (two equal cards, not a title/content split).
- **Sticky title columns (S4)**: at >=64rem the title column holds under the 80px sticky header (`position: sticky; top: 6rem`): the home biography heading, `.content-section__inner`'s first column, and each Conditions-hub title above its own paragraph. Nothing is sticky below 64rem.
- **Closing rhythm (S6)**: two tiers matching each page's opening rhythm - editorial pages (Home, E-learning, Contact) close at `--space-section`; compact pages (Biography overview, Conditions disclaimer, Remote shell) close at `--space-section-compact` (Remote's old ~32px strip and the disclaimer's 28px both become the 40px rhythm their heroes open with).
- **Footer on phones (K8)**: `.site-footer__main` keeps two link columns under 36rem (identity spans the full row below 48rem); only the three-column card grids still collapse to one column.
- **Breadcrumbs (K9)**: the `.site-breadcrumb` band (Home -> page title) now sits above the hero on Biography, Conditions hub, Remote Consultation and Contact, joining E-learning and the legal/condition pages; the Home page shows none. Breadcrumb links become >=44px touch targets (`min-block-size: 2.75rem` on inline-flex, band padding trimmed to compensate - A4).
- **Underline language (L4/T6)**: `--link-underline-thickness` (2px) and `--link-underline-offset` (0.2em) replace the scattered 1px/2px + 0.18em/4px values on text links, section-heading links, condition-index titles, conditions jump-index links, "other condition" links and the contact-URL hover; `[dir="rtl"] a` sets `text-decoration-skip-ink: none` so an Arabic underline runs through descenders.
- **Footer stickiness (S8/A5)**: `body` becomes `display: flex; flex-direction: column; min-height: 100dvh` (replacing `100svh`) and `main` gets `flex: 1 0 auto`, so the footer pins to the viewport floor on short pages; `.foundation-shell` follows to `100dvh`. The skip link parks with `transform: translateY(-120%)` instead of a fixed `top: -40px`: the zoom verification (A5) caught the old fixed offset letting the bar peek above the header at both 130% and 200% text zoom, because the bar grows with the root font size while the offset did not.
- **Contact hierarchy (H3)**: `[data-contact-page] .content-section h2` steps down to `clamp(1.375rem, 2vw, 1.75rem)` so the H2 no longer matches the H1, and the contact URL sheds the H3's inherited weight (`font-weight: 400`).
- **Card titles (H4/H5)**: `.learning-link__title` joins the global `text-wrap: balance` (it is a span, not a heading), and the closing wide card's title column widens `20rem -> 28rem` so its long title keeps to two lines.
- **Hero portrait (M1/S2)**: the home hero frame keeps the exact 2/3 ratio of the cut-out PNG and the image scales 12% from the base (`transform: scale(1.12); transform-origin: 50% 100%`), cropping the transparent headroom, enlarging the subject and closing the measured ~148px visible gap toward the 70-80px target; the mobile content column gives back ~16px (`padding-block-end: clamp(3rem, 8vw, 4rem)` below 48rem).
- **Home bio hierarchy (S3)**: `splitFirstSentence` (a two-letter abbreviation such as "Dr." never ends the lead) renders the approved preview paragraph as a 20-22px lead plus a 16-17px continuation - same approved text, no new content; the column gap tightens to 64-80px on desktop and the section's vertical padding closes ~25% tighter (`clamp(2.25rem, 6vw, 6rem)`).
- **Separators (L2)**: one separator means per boundary - the hairlines between differently coloured sections are gone (home hero/biography/conditions, content-hero into body sections, content-section before the footer), while same-surface boundaries keep their hairline (content-hero -> `content-section--surface` on Contact/Biography/condition detail via `:has(+ .content-section--surface)`, chained Legal sections, the breadcrumb band, Conditions index rows).
- **Arabic heading weight (T3)**: `Noto_Naskh_Arabic` loads 500 alongside 400/600/700; the large Arabic display headings (home H1, content/consultation H1s, section H2s, foundation title) render at 500, smaller Arabic UI text keeps 600. Adopted from an A/B render (t3-A/B screenshots in the round folder) as the clearer weight at >=40px.
- **Closed without change (documented in DESIGN_SYSTEM.md)**: C4 (the brick-red primary-button hover `#a8401f` at 6.1:1 is an intentional state, already in the K6 tables), K10 (the hero cut-out and the Biography framed portrait are two intentional variants of one approved PNG), and the card-arrow proximity rule stays as the accepted taste decision (S7 follow-up).
- **Deferred to the client - not executed**: K2 (radius family, applied and reversible), K5 (Notice component), K11 (logo repetition), R3 (Arabic wordmark SVG), S9 (home length / consultation band order), CTA wording unification, and the Notice-in-Home question.
**Consequences**:
- Tests-only pass recorded for K7 (header at 1024 in both locales: all six nav links plus CTA and language switcher fit with no overflow - the nav is the expanded desktop row above 60rem), M8 (the professional-title line wraps to two lines at 360/375/390 with the coral accent bar intact) and A5 (130% and 200% text zoom keep no horizontal overflow and the hero CTA inside the viewport at both scales; the skip-link fix above came out of this check). At 200% the home H1 name breaks mid-word ("Aggou/r"); that is the accepted cost of the project-wide `overflow-wrap: anywhere` no-horizontal-scroll guarantee, not a regression. M9 (hero height with browser chrome shown/hidden) needs no code: the hero is content-sized and the only `100dvh` consumer is the document floor, so chrome show/hide never resizes it. M2/M3 were verified functionally only, per the plan's tests-only scope: the chips scroll sideways and are a labelled navigation, every hub-row title is a link, and each toggle carries `aria-expanded` - but the committee's cosmetic asks are **not** implemented (the chips still show a thin scrollbar with no edge fade, and "Read more" is still a bordered button rather than plain text). That delta is flagged for a decision. The scripted assertions live in the round-5 verify script, and the manual NVDA/VoiceOver pass remains a human task per `docs/A11Y-SCREEN-READER-CHECKLIST.md`.
- The suite needs `NEXT_PUBLIC_SITE_URL` on the Playwright test process as well as the dev server (D-056): the robots/sitemap/canonical assertions read the same variable, and without it `ai.discoverability`, `social.identity` and `seo.entity` fail on missing origin-bound markup. Final record: a fresh `next dev` started with that env, all routes warmed (including the French placeholders that had never been warm), gives a clean full run - **118/118 passed in 9.5m with no test changes**. The earlier rounds' failures were goto/CDP timing stalls against a long-running dev server plus the env gap, never assertion failures.
- `tests/condition.content.spec.ts` had one stale pin from before D-055: it asserted the old cool `--color-line-strong` (`#b8c4cf`) on the emergency lead's border; the assertion now pins the accepted warm value (`#b5ab98`). The requirement itself (quiet, icon-free emergency styling) is unchanged.
- `DESIGN_SYSTEM.md` gains the underline tokens, the grid token and its ~48% line, the sticky rule, the separator rule, the two-tier closing rhythm, the breadcrumb rule, the two portrait variants, the Arabic 500-weight rule and the footer grid.
- Screenshots for the committee: `screenshots/uiux-closure-2026-10-22/` (desktop 1440 + mobile 390, EN/AR, all eight public page types, plus header-1024, title-360/375, zoom-130/200, conditions-mobile and the T3 A/B pairs), regenerated after the final home-band and skip-link fixes.

### D-058 - UI/UX committee v17 closure: portrait crop P0, S3's gap superseded by S5, M2/M3 executed, footer Legal at 75%

**Date**: 2026-10-23
**Context**: The committee accepted the v16 round as-is (S5, the S3 type gradient, H3/K9, K7, A5, T3 = 500, M9, the accepted 200% H1 mid-word break) but found one new P0 before closure - the home hero portrait's crown severed by a straight horizontal line in every language and width, plus a straight vertical edge at the right sleeve - and ruled on the two held items (M2/M3) and the footer Legal sub-point.
**Decision**:
- **P0 portrait crop - root cause**: round 16's `transform: scale(1.12); transform-origin: 50% 100%` inside the frame's `overflow: hidden` (HEAD carries no transform). The cut-out PNG (720x1080) has measurable alpha margins - 8.8% top, 3.3% left, 0.14% right (the elbow reaches the file's own edge), 0% bottom - so at scale 1.12 the crown overshot the frame top by ~17px, the sleeve/elbow the right edge by ~31px and the left sleeve by ~12px, each severed by a straight clip line. No scale value can fix this while the image is sized 100% of its clip box: with a 0.14% right margin any scale above ~0.99 clips the elbow, and scaling below 1 would surrender M1's enlargement entirely.
- **P0 fix - the container carries the enlargement** (the committee's second named option): `.home-hero__portrait` keeps the exact 2/3 layout footprint (hero rhythm, fold position and the M1 box-gap check unchanged), while `.home-hero__portrait-frame` grows around it (`position: absolute; inset-inline: -6%; inset-block-end: 0; aspect-ratio: 2/3` = +12% upward, `padding: 1px` sub-pixel inset); the PNG's transform is removed and `.home-hero { overflow-x: clip }` keeps the phone-width spill from becoming page scroll. The subject renders at exactly the accepted 1.12x size, its transparent margins stay between subject and every clip edge, and the crown is no longer severed. The phone content column returns 12px (`padding-block-end: clamp(3.75rem, 10vw, 5rem)`) because the now-unclipped crown rises ~11px above its cell - the visible link-to-head gap stays inside the 70-80px band (the layout gap measures 84px at 390).
- **P0 verification - the committee's alpha-edge rule**: a scripted scan reads the source PNG's alpha bounds (threshold alpha >= 8 = visible content; the file carries alpha 1-7 antialias noise on its own edge columns) and maps them onto the rendered frame rect; every frame edge must keep >= 0.5px clearance and the page must not scroll horizontally. Asserted at 360/390/1024/1440/1920 in EN and AR - all passing (clearances: top 48.8-76.5px, left 13.2-20.5px, right 1-2.3px, bottom 1px). The 118 suite tests do not look at pixels; this block lives in the round-5 verify script.
- **S3's column gap superseded (S5 wins)**: the desktop-only `gap: clamp(4rem, 5.5vw, 5rem)` override on `.home-biography__grid` is removed - the committee ruled S5 wins for cross-page alignment. The biography grid now uses the shared token (box gap 115px at 1440; content starts at 47.7%, the same line as every other split page; it was 46.2%). S3's remaining scope is the typographic ramp (lead 22 / rest 17 / link 16) plus the ~25% tighter vertical padding; the r5 check for the 64-80px box gap is retired and recorded as info.
- **M2 executed**: the chips row hides its scrollbar (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`) and gains a direction-aware inline-end fade (`mask-image: linear-gradient(to right, ... 3rem)` in LTR, `to left` in RTL); at >=60rem the numbered two-column jump list steps the fade aside (`mask-image: none`). The row stays a labelled, scroll-snapped navigation.
- **M3 executed**: the hub-row toggle wears the site's text-link face - navy underlined text (L4 tokens, weight 700), the `arrow-link` chevron as an `aria-hidden` SVG mirrored in RTL via `--icon-mirror`, no border or fill, `min-height: 2.75rem` (>=44px touch target). It stays a `<button>` with `aria-expanded`/`aria-controls` and its accessible name is the label only (the SVG contributes nothing to textContent, so the existing label assertions pass unchanged).
- **Footer Legal at 75%**: `.site-footer__main` becomes `minmax(0, 1.73fr) minmax(0, 0.89fr) minmax(0, 1fr)` - the nav column stays on the ~48% line untouched, as ordered, and Legal starts at 74.8-75% at 1440 (about 74.7% at 1024-1280); the r5 check promotes Legal from info to an assert in [74, 76].
**Consequences**:
- Green: `tsc --noEmit` and `pnpm lint`; the round-5 script passes every check, including the new P0 block (10 edge checks + 2 clip checks), the promoted M2/M3 asserts and the footer Legal check; the v16 screenshot sections of that script are now gated behind `R5_SHOTS=1` so a verification run cannot overwrite the v16 archive.
- e2e suite: 114/118 in 20.0m with zero assertion failures; the four red tests (`medical.content.spec.ts:12/66/162`, `seo.technical.spec.ts:85`) are the documented D-057 stall class - dense goto loops against Playwright's fixed 30s test budget in dev mode, where every navigation pays the 13.4MB `main-app.js` dev bundle (~2s). All core assertions of those four tests were re-verified directly in one browser with no time budget: 255/255 pass (status, `data-condition-page`, reviewed-by, link counts, legacy redirects, disclaimer lines, FR noindex/hreflang), and every stalled route responds 200 in under 1.1s over HTTP. The red is environment timing, not a regression.
- `DESIGN_SYSTEM.md` gains the container-carries-the-enlargement portrait rule (with the P0 regression guard), the S5/S3 scope settlement, the footer 75% line and a Conditions-hub-controls section for M2/M3; the underline list now includes the hub toggle.
- Review for the committee is two spots only: the hero at 1440 and mobile at 390, EN/AR (`screenshots/uiux-v17-hero-2026-10-23/`).
- The human task remains: the NVDA/VoiceOver pass per `docs/A11Y-SCREEN-READER-CHECKLIST.md`.
- The working tree stays uncommitted (standing instruction).

### D-059 - v17 closure on a production build: env-aware suite, the image-optimizer hang and its warm-up protocol

**Date**: 2026-10-24
**Context**: The committee's v17 ruling closed the portrait-crop P0 (pixel-verified at 360/390/1024/1440/1920 in both locales) and accepted S3/S5, M2/M3, the footer Legal at 75% and the elbow-at-the-mobile-edge as accepted P2 full-bleed; the sole remaining closure condition was one full e2e run on a production build (`next build` then `next start`) proving the whole group passes and that the build emits the font files. The baseline production run gave **90 passed / 28 failed in 21.6m**: 21 were dev-only preview surfaces asserting themselves in production, 3 the dev-only condition-media fixture, 1 production idle traffic miscounted as interaction, and 3 `goto` hangs blocked by an image request that never completed.
**Decision**:
- **Env-aware test strategy**: branch where production carries a real requirement; skip with a recorded reason where a test measures a dev-only preview. Applied: `biography.content` (EN/AR branches on the `devGalleryServed` probe), `biography.placeholder` (two dev-preview tests skip; the counted-preview test branches to "…and production drops the parameter"), `biography.moments` (the 13 rendering-block tests skip when no gallery is published, while "the real pages render no gallery at all" still asserts in production), `consultation.smoke` (`productionBuild` on the test process branches the CTA assertions around the same `whatsappConfigured` contract), `condition.media` (the fixture route answers 404 in production by its own documented contract, so the per-locale test asserts that 404 and the two-column mirror test skips with reason), and `measurement.privacy` (benign production idle traffic - `?_rsc=` route prefetches and `/_next/static/` chunks, which cannot carry consultation input - is filtered from the interaction capture).
- **The image-optimizer hang, root-caused**: the three hanging tests were blocked by `/_next/image?...&w=828&q=75` never responding while the same URL answered in milliseconds over plain HTTP. On a long-lived `next start` process on this Windows machine, the **first fresh (not yet cached) webp encode requested by a browser after enough page-navigation churn never completes**, and every later request for that variant joins the hung job and hangs with it - which is why the poisoned width looked deterministic (`w=828` in the baseline run; `w=1080` at width 2560 after the cache was wiped, one width later each time the process was restarted). Encodes issued while the process is still idle always complete: 14/14 in a row, largest 387ms, and every real srcset width from 256 to 3840.
- **Fix - warm the cache while the server is idle**: `scripts/warm-image-cache.mjs` requests every srcset width the prerendered pages actually expose for the portrait (extracted from the built HTML, not assumed from defaults - the real set includes 3840 and excludes widths the pages never reference) with the browser's webp Accept, so during the suite the browser only ever sees cache hits. Test-infrastructure only: no product, config or shipped-srcset change.
- **Production run protocol**: `next build` → `next start` with `NEXT_PUBLIC_SITE_URL` → `node scripts/warm-image-cache.mjs` → `$env:NODE_ENV = "production"; pnpm test:e2e` (the test process needs `NODE_ENV=production` for the consultation CTA branch, and `NEXT_PUBLIC_SITE_URL` for the origin-bound SEO assertions, per D-056).
**Consequences**:
- The committee's production run: **118 tests - 102 passed, 16 environment skips, 0 failed, in 1.4m** (baseline before these fixes: 90/28 in 21.6m). All 16 skips are the dev-only surfaces a production build must not publish, each carrying its skip reason; every production-meaningful assertion in those files still runs - the real pages render no gallery, a production build hides the placeholder gallery and drops the parameter, and the fixture route 404s. Every previously hanging test passed.
- Fonts: the build emits 29 woff2 files under `.next/static/media/`; none of the 65 built HTML pages references an external font host; no dev-gallery marker appears in built HTML.
- Green: `tsc --noEmit` and `pnpm lint`.
- Review spots for the committee are unchanged: the six closing shots in `screenshots/uiux-v17-close-2026-10-24/` (conditions chips and hub toggle at 390, footer at 1440, EN/AR).
- The warm-up protocol is required for production runs on this machine; hosted deployments optimize images per request and are not expected to need it, but the script is harmless there and costs ~2s.
- The human task remains: the NVDA/VoiceOver pass per `docs/A11Y-SCREEN-READER-CHECKLIST.md`. The v17 client-deferred list stands as ruled: K2, K5, K11, R3, S9, CTA wording unification, the Notice in Home and K3 card summaries.
- The working tree stays uncommitted (standing instruction).

### D-060 - Committee v18: the five closure points answered (measurement scope, encode-concurrency probe, CTA test-number run, production hero proof)

**Date**: 2026-10-24
**Context**: The committee accepted the v17 production closure record (build, 102 passed / 16 environment skips / 0 failed, fonts, six closing shots, uncommitted tree) but withheld official closure pending five points: the correct wording of the result; an explanation for the `measurement.privacy` failure seen in the baseline production run; the production risk of the image-encode hang (the portrait is the LCP element), with a concurrency test if self-hosting is chosen; a production run whose build carries a test WhatsApp number so the consultation CTA path actually executes; and two Hero screenshots from the production server proving the fonts, the original symptom having been a Turbopack-in-dev artifact.
**Decision**:
- **Wording of the record**: "102 passed, 16 environment skips, 0 failed" - never "118/118". D-059 already states it this way; the closure summary must too.
- **`measurement.privacy` was a measurement-scope bug in the test, not a leak and not a stall**: the baseline failure counted the page's own idle same-origin traffic (`?_rsc=` route prefetches and `/_next/static/` lazy chunks, which production fires after hydration while the capture flag is up) as "interaction requests". Those requests are structurally incapable of carrying consultation input; the fix (`isIdlePageTraffic()`) filters exactly those two benign patterns and nothing else. Every privacy assertion is unchanged - no analytics scripts or globals, no form or input, no private tokens in the URL, metadata or JSON-LD, no external scripts. It passed in both final production runs (424ms and 1.6s).
- **Encode-concurrency probe**: on a fresh `next start` with a cold image cache, 8 simultaneous cold encodes (256 through 1920) all completed in 1.7-2.5s, and 6 simultaneous identical requests (w=3840) all completed through the dedupe path in ~1.0s - **concurrency alone does not trigger the hang**. The observed failure required accumulated navigation churn on a long-lived local Windows process. Hosting guidance recorded: managed platforms that optimize images per request (e.g. Vercel) are low-risk; a self-hosted deployment must run the warm-up (about 2s) after each deploy or restart and repeat the acceptance run on the actual server before go-live.
- **CTA test-number run**: `content/whatsapp.ts` was temporarily set to the fictional `15550000000` (a build-time constant, so the build was regenerated), and the full suite ran with the CTA branches active - **102 passed / 16 skipped / 0 failed in 4.2m**. The built EN/AR consultation HTML contains the `wa.me/15550000000` link and no `[WHATSAPP NUMBER]` placeholder; the CTA's box geometry, its visibility across the 28-load viewport matrix and its fold-reachability on a 390x844 phone all ran. The number was then restored to `null` (no diff against HEAD), and the canonical build was re-verified end to end - **102 passed / 16 skipped / 0 failed in 4.0m**; the component's own build log confirms the restored state by logging the CTA omission per D-036.
- **Production hero proof**: four screenshots from `next start` in `screenshots/uiux-v17-prod-hero-2026-10-24/` (1440x900 viewport and the full `.home-hero` section, EN and AR at 2x) show Libre Baskerville with IBM Plex Sans (EN) and Noto Naskh Arabic at weight 500 with IBM Plex Sans Arabic (AR); 13 woff2 responses were logged, all same-origin under `/_next/static/media/`, with no external font host.
**Consequences**:
- The v18 closure conditions are answered; official closure now rests on the two human tasks: the NVDA/VoiceOver pass per `docs/A11Y-SCREEN-READER-CHECKLIST.md`, and the client-deferred decisions (K2, K5, K11, R3, S9, CTA wording unification, the Notice in Home, K3 card summaries).
- The production-run protocol (build, start, warm, suite) stands as the recorded acceptance procedure; the warm-up is a machine-environment mitigation, not a product requirement.
- The working tree stays uncommitted (standing instruction).

### D-061 - Moments gallery framing: portraits render whole (contain), landscapes fill (cover)

**Date**: 2026-10-25
**Context**: The doctor reviewed the trial placeholder gallery («من الممارسة والتدريس») and asked that the image framing be fixed so the portrait is never cut at the head or anywhere else. Measured on the trial portrait (1024x1536, transparent cutout): the subject's crown starts at **8.9%** of the image height, while the old `focus = { x: 50, y: 20 }` cropped the top 10% in a 4/3 cell (12.5% in a 16/9 closing row) - clipping ~17px of the hair in every tile. The code comment claiming "The 4/3 crop keeps the face in frame" was false. The cell ratios (4/3, and 16/9 for odd-count closing rows) are test-pinned in `tests/biography.moments.spec.ts` and must not change.
**Decision**:
- **Framing rule** (`components/biography/BiographyMoments.tsx`, `fitMode()`): a moment whose photo is taller than wide (`height > width`) renders with `object-fit: contain`, so the whole photo shows inside the fixed cell and no crop can ever clip a subject's head or feet; landscape photos keep `cover` with their per-photo `focus` point - the editorial crop the grid is built for. `app/globals.css` keeps `cover` as the fallback with an updated comment; cell ratios untouched.
- **Placeholder cover fallback**: `focus` y changed 20 -> 0 (top-anchored, still inside the validator's 0-100 range), with the measured crown math recorded in the comment in `content/biography-moments-placeholder.ts`.
- **Pixel verification**: in the rendered cell the subject spans 9% to 99.8% of the tile height - full figure, sole at the bottom edge, head with its full 8.9% headroom - versus the pre-fix crop that clipped the crown. Screenshots in `screenshots/moments-preview-2026-10-24/`: `moments-final-{en,ar}-{1440,390}.png` (delivery), `moments-before-*` (the old head crop), and `tile-cover-fixed.png` vs `tile-contain-full.png` (the waist-up editorial alternative, if ever preferred).
- **No-background preview (same-day follow-up)**: the doctor then asked for the six images "same size, but without any background". The white block was never in the photo - the portrait PNG is a transparent cutout (alpha 0 at the corners, measured) - it was the tile's CSS fill `background: var(--color-neutral-100)` (`#edf0f3`, a cool white) sitting on the section's warm background (`#eeebe3`, `--color-surface-subtle`). The fill was removed from `.bio-moment__media`; the box keeps its `aspect-ratio: 4/3` (the same size, the caption geometry and the test-pinned ratios untouched) and the figure now sits directly on the section background. Pixel-verified in the new screenshots: `#edf0f3` = 0 samples in all four shots and the tile close-up; delivery shots `moments-nobg-{en,ar}-{1440,390}.png` + `tile-nobg.png`.
**Consequences**:
- The doctor's preview shows the complete figure in every tile, EN/AR, 390 and 1440. Choosing the closer waist-up crop instead would be a one-line change back (`cover` + `focus` y=0).
- Production still ships no gallery: the placeholder stays dev-only and `tests/biography.placeholder.spec.ts` re-verified it.
- `tsc --noEmit` and `pnpm lint` exit 0. Screenshots were taken only from `pnpm dev:webpack` (font-artifact rule).
- Verification record for the framing fix: the full dev suite under the D-056 protocol (fresh `next dev --webpack` with `NEXT_PUBLIC_SITE_URL`, 76 routes warmed including French, the same env on the test process, no `NODE_ENV` override) gave **116 passed, 2 failed, 22.0m** - both failures environmental in `medical.content` (a closed CDP session on the ten-conditions test and a 30s `goto` stall on `/ar/legal`), the D-056 long-running-server stall pattern, never assertions; every biography, gallery, placeholder, a11y and SEO test passed (1-72 and 74-118 green).
- Verification record for the **final tree** (after the no-background change): the full suite on a fresh, re-warmed dev server under the same protocol gave **112 passed, 6 failed, 31.9m** - the six failures again purely environmental (closed CDP sessions, 30s `goto`/`evaluateAll` stalls, one `net::ERR_NETWORK_IO_SUSPENDED` on localhost, one navigation test stretched to 14.4m) while the machine ran with only 4.8 GB of 15.7 GB free; **zero assertion failures** - every assertion in the 112 green tests, and every failure log, was a timeout or session error. Re-running the five affected spec files against the then-idle server gave **44 passed, 0 failed, 2.9m** (exit 0), including the stalled `biography.content:224`, `biography.moments:258`, `medical.content:12/162`, `condition.media:70` and `navigation.structure:63` - confirming the stall diagnosis and closing this decision green.
- Two operational lessons re-confirmed while verifying: a leftover shell resuming a stale chain (killed `pnpm start` -> warm -> suite with `NODE_ENV=production` against the dev server) produced purely environmental failures, never assertion failures; and the dev-protocol suite needs `NEXT_PUBLIC_SITE_URL` on both the dev server and the test process (D-056) - a run without it fails `ai.discoverability`/`social.identity` on missing canonical/JSON-LD by design.
- The working tree stays uncommitted (standing instruction).
