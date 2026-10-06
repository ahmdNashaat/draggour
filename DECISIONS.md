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
**Consequences**: The PNG asset is used in the Header, Footer, and Home Hero. A vector SVG should be requested from the designer/client for future updates.

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
