# Website Content Map

Phase 2.5 content architecture document for the Dr. Mohamed Aggour website.

This document maps the current content source to the approved V1 information
architecture. It is not a source of factual content and does not replace
[`source-of-truth.md`](source-of-truth.md) or [`approval-pack.md`](approval-pack.md).

## Phase 4.5 information-architecture override

Professional Activities & Media was rejected by the doctor and is not a V1
website section. Conference, society, invited-talk, and professional activity
facts may remain inside Biography where appropriate, but no standalone
Professional Activities page or section exists in V1. The older mapping rows
below are retained as historical planning material and are superseded by this
decision.

## Governance

- `content/source-of-truth.md` remains the single factual source of truth.
- The CV is source material, not final website copy.
- Only rows marked `Publish: YES` in the source of truth may ship.
- Facts marked as verified but not approved are mapped here for planning only.
- Copy must be rewritten for the web and approved before publication.
- French remains architecture-ready but is not an activated content language.
- This phase creates no page copy, routes, components, integrations, or application logic.

### Mapping status vocabulary

| Status | Meaning in this map |
| --- | --- |
| `VERIFIED` | The fact is recorded in an identified source. It is not automatically publishable. |
| `NEEDS CURRENT VERIFICATION` | The fact may have changed or conflicts with another source/statement. |
| `APPROVAL REQUIRED` | The doctor must approve the wording, publication, or missing value. |
| `SOURCE ONLY` | Useful for extraction and drafting, but not intended for direct website publication. |
| `NOT FOR PUBLICATION` | Must not be exposed on the public website. |
| `READY FOR WEB COPY` | The factual material can be rewritten into web copy, subject to the source-of-truth approval gate. |

`VERIFIED` and `READY FOR WEB COPY` never override the source-of-truth rule
that only approved rows may ship.

## 1. Page inventory

Routes below are localized under `/[locale]`. The launch locales are `/en` and
`/ar`; `/fr` is structurally supported but remains non-indexable and absent
from the launch sitemap until French content is approved (D-019).

| Page / section | Proposed localized route | Purpose | Primary audience | Primary CTA | Secondary CTA | Main source sections | SEO importance | Content approval requirements |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `/[locale]` | Establish identity, authority, entry points, and the next step. | Patients/families; physicians/referrers | Remote consultation | Biography; Conditions; E-learning | Project Brief §5; source §§1–2, 19–22; D-004, D-006, D-025 | Critical entity and navigation page | Name is approved for use; title, statement, portrait, logo, section copy, Arabic naming, and all final localized copy require approval where marked in the source. |
| Biography | `/[locale]/biography` | Present the approved professional profile and authority information. | Patients/families; physicians; academic/professional contacts | Remote consultation | E-learning; approved external professional links | Project Brief §5; source §§3–13, 15–18; D-003, D-005, D-028 | Critical authority page | Rewrite and approve all biography copy; resolve CF1–CF4; confirm current positions, societies, claims, and any selected publications. |
| Conditions index | `/[locale]/conditions` | Give visitors concise, understandable routes to the six approved condition topics. | Patients/families; referrers | Select a condition / Remote consultation | Biography | Project Brief §5; source §§13, 19; D-006 | High topical and conversion importance | Condition names are listed in the brief/source; explanatory copy, Arabic labels, and medical wording require approval. |
| Brain Aneurysm | `/[locale]/conditions/brain-aneurysm` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 19; D-006 | High topical importance | No approved description exists. All medical explanation, scope, and emergency wording require approval. |
| Stroke | `/[locale]/conditions/stroke` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 15, 19; D-006; CONSULTATION_FLOW §3 | High topical importance | No approved description exists. Emergency handling must be explicit, approved, and must stop the normal flow. |
| AVM | `/[locale]/conditions/avm` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 19; D-006 | High topical importance | No approved description exists. Clinical wording and any procedure references require approval. |
| Carotid Stenosis | `/[locale]/conditions/carotid-stenosis` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 19; D-006 | High topical importance | No approved description exists. Clinical wording requires approval. |
| Venous Sinus Disorders | `/[locale]/conditions/venous-sinus-disorders` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 19; D-006 | High topical importance | No approved description exists. Clinical wording requires approval. |
| Chronic Subdural Haematoma | `/[locale]/conditions/chronic-subdural-haematoma` | Provide a concise, consultation-oriented entry point for the condition. | Patients/families; referrers | Remote consultation | Conditions index | source §§13, 19; D-006 | High topical importance | No approved description exists. Clinical wording requires approval. |
| E-learning for Physicians | `/[locale]/e-learning` | Present source-derived teaching and physician-education activity. | Physicians/referring professionals | Review teaching activity or visit Biography; add a YouTube link only after the official destination is verified | Biography | High professional discoverability importance | Introduction, official URL, playlists, and featured educational items require approval; no generic YouTube homepage is presented as the doctor's channel. |
| Remote Consultation | `/[locale]/remote-consultation` | Collect and route a non-emergency consultation request for human review. | Patients/families; physicians/referrers | Start consultation request | Contact | Project Brief §6; CONSULTATION_FLOW §§1–13; source §21; D-007–D-012 | Critical conversion page | Flow rules are approved; fees, duration, locations, contacts, languages, consent, emergency wording, success copy, and operational details require approval. |
| Contact | `/[locale]/contact` | Offer only approved enquiry destinations and contact methods. | Patients; physicians; hospitals/organisations; approved professional contacts | Choose an approved enquiry path | Remote consultation | Project Brief §§2, 5; source §§16, 22; CONSULTATION_FLOW §§1, 5 | High trust/conversion importance | No official email, phone/WhatsApp number, physical address, or complete contact destination is currently approved. |
| Legal / Privacy | `/[locale]/legal` | Publish approved privacy, disclaimer, consultation, emergency, and applicable consent information. | All visitors | Return to consultation or contact | Home | SECURITY_AND_PRIVACY.md; source §22; CONSULTATION_FLOW §§3, 8; QA_AND_ACCEPTANCE.md | Required trust and compliance page | All legal language is `APPROVAL REQUIRED` unless exact approved wording is later recorded. |

### Information architecture constraints

- Professional activity facts are mapped into Biography; there is no standalone
  Professional Activities or Media website section in V1 (D-028).
- Research, publications, and academic work belong within Biography; there is no
  separate research platform or V1 research page (D-005).
- Conditions remain concise and conversion-oriented; they are not long medical
  articles.
- Remote Consultation is the primary operational journey.
- There is no patient portal, persistent consultation history, database, admin
  dashboard, custom booking engine, or custom payment gateway in V1.

## 2. Content mapping by source section

| Source section | Website destination | Public website use | Status | Rewrite / approval treatment | Publication boundary |
| --- | --- | --- | --- | --- | --- |
| §1 Identity | Home; global shell; Biography | Name, approved portrait, and approved visual identity | `VERIFIED` for English name; `APPROVAL REQUIRED` for Arabic spelling, portrait, and logo | Use the English name already approved for current use. Rewrite/approve localized name handling and approve final visual assets. | No unapproved Arabic spelling, portrait, or proposed monogram as final brand asset. |
| §2 Professional titles | Home; Biography; metadata where approved | Professional title | `VERIFIED` from Project Brief/CV; `APPROVAL REQUIRED` before publication | Use as a candidate factual title, then obtain doctor confirmation in EN and AR. Do not add fellowships or post-nominals without approval. | No additional title or post-nominals from inference. |
| §3 Current positions and §3.1 CF1–CF4 | Biography; possibly Professional Activities | Current roles and affiliations | `NEEDS CURRENT VERIFICATION`; conflicts CF1–CF4 | Resolve every conflict and confirm current status before rewriting. | Do not publish unresolved current positions, present-tense roles, or an experience figure. |
| §4 Previous clinical positions | Biography / career history | Historical career timeline | `VERIFIED`; `READY FOR WEB COPY` after approval | Rewrite dates and roles into a concise timeline; confirm Royal London Hospital is historical under CF3. | Do not describe a past position as current. |
| §5 Previous non-clinical/academic positions | Biography; Professional Activities | Historical leadership and editorial activity | `VERIFIED`; some items `NEEDS CURRENT VERIFICATION` | Separate historical milestones from current positions; resolve journal/ESMINT/PAIRS currency. | Do not publish current-sounding roles without confirmation. |
| §6 Education and diplomas | Biography | Qualifications and training | `VERIFIED`; `READY FOR WEB COPY` after approval | Normalize presentation, not facts; doctor confirms the list and publication. | Do not add credentials, equivalencies, or post-nominals. |
| §7 Professional societies | Biography; Professional Activities | Approved society memberships | `VERIFIED`; `NEEDS CURRENT VERIFICATION` | Confirm that the list is complete and current, then rewrite as a concise list. | Do not imply current membership based only on a historical CV. |
| §8 Academic and teaching activity | Biography; Professional Activities; E-learning where directly relevant | Teaching, courses, organized meetings, invited activity | `VERIFIED`; mostly `NEEDS CURRENT VERIFICATION`; T3 items `APPROVAL REQUIRED` | Classify factual items under the approved IA categories; remove promotional phrasing and approve. | Company names and “Key Opinion Leader” claim remain excluded unless expressly approved. |
| §9 Research | Biography | Research fields, reviewing, scientific activity | `VERIFIED`; `NEEDS CURRENT VERIFICATION`; T3 claims require approval | Rewrite into a factual academic summary. Curate study names only if approved. | No separate research platform; no raw acronym list by default. |
| §10 Publications | Biography | Selected publications or external PubMed destination | PubMed link `VERIFIED` but not approved for publication; selected list `APPROVAL REQUIRED` | Doctor chooses whether to show a curated list, link only, or neither; rewrite titles/intro if used. | No uncurated publication list or implied publication claims. |
| §11 ESMINT detail | Biography; Professional Activities | Historical leadership, collaboration, award, guideline, and congress activity | `VERIFIED`; `NEEDS CURRENT VERIFICATION`; T3 details `APPROVAL REQUIRED` | Confirm roles and decide which factual milestones are useful. | Do not publish unresolved role status or promotional congress claims. |
| §12 PAIRS detail | Biography; Professional Activities | Historical/current PAIRS roles and regional teaching activity | `NEEDS CURRENT VERIFICATION` under CF2; claims require approval | Resolve the conflicting current title and rewrite only approved facts. | No “world-class” or similar superlative without explicit approval. |
| §13 Clinical expertise | Biography; six Conditions pages | Factual areas of clinical expertise supporting concise condition routes | `VERIFIED`; `READY FOR WEB COPY` after doctor approval | Group and rewrite clinically careful summaries; map only relevant facts to each condition. | Do not turn the list into guarantees, outcomes, or an exhaustive medical encyclopedia. |
| §14 Annual clinical activity | Biography only if explicitly approved | Optional activity figures | `NEEDS CURRENT VERIFICATION`; T3 | Doctor must confirm currentness and separately approve publication. | Do not publish any figures by default. |
| §15 Biography draft | Biography source material | Historical narrative to be restructured | `SOURCE ONLY`; `APPROVAL REQUIRED` | Rewrite into the Biography blueprint; update tense, positions, CF4, and every T3 claim. | Never publish the CV paragraph verbatim. |
| §16 Professional links | E-learning; Biography; Contact; footer only where approved | Approved external destinations | Links are `VERIFIED` or `APPROVAL REQUIRED` individually | Use destination links only. Confirm handles, URLs, and public relevance. | No feeds, follower counts, embedded activity, or invented social URLs. |
| §17 Claims requiring explicit approval | Biography / Professional Activities only if selected | Possible claims, figures, company names, and superlatives | `APPROVAL REQUIRED` | Doctor decides approve, soften, or drop each claim. | Default is not to publish. Prefer verifiable, restrained facts. |
| §18 Items not to publish | None | Internal guardrails | `NOT FOR PUBLICATION` | Use as exclusion rules during copywriting and QA. | No patient-identifying material, outcomes, guarantees, contact values not sourced, emergency numbers, or unapproved claims. |
| §19 Conditions | Conditions index and six detail pages | Six condition names and future approved explanations | Names are recorded; Arabic/French labels and explanations are `APPROVAL REQUIRED` | Rewrite concise medical copy after doctor review. | No seventh condition and no unsupported treatment advice. |
| §20 Professional Activities | Professional Activities | IA label and exactly three categories | Category structure `VERIFIED` and approved by D-027; items still require approval | Use the exact title `Professional Activities`; curate items from §§8, 9, and 12. | Do not add Media, Podcasts, Press, or a fourth category. |
| §21 Consultation information | Remote Consultation | Operational values and approved flow copy | Flow facts `VERIFIED` from project decisions; all operational values `APPROVAL REQUIRED` | Configure only after approval of fee, duration, locations, contacts, languages, consent, and wording. | Never imply appointment, payment, diagnosis, or emergency handling is confirmed at submission. |
| §22 Contact and legal | Contact; Legal / Privacy | Contact destinations and legal copy | `APPROVAL REQUIRED` except traceable links in §16 | Obtain exact values and approved legal text before publication. | No guessed email, number, address, legal wording, or emergency number. |
| §23 Brand and typography | Global shell; Home | Proposed logo and font direction | `PROPOSED`; visual approval required | Compare candidates and obtain visual approval before final font loading/brand replacement. | Do not present proposed assets as approved identity. |

## 3. Biography content architecture

Biography is the main professional authority page. The categories below are a
content blueprint, not final copy. Historical and current facts must remain
distinct.

| Biography category | Source sections | Facts to map into the category | Historical/current handling | Flags and status |
| --- | --- | --- | --- | --- |
| Professional Overview | §2, §13, §15 | Professional title; scope of interventional neuroradiology; source-listed neurovascular focus; approved concise overview | Title and scope need doctor confirmation; do not use the CV paragraph as final copy | CF4; Q1; `APPROVAL REQUIRED`; source text is `SOURCE ONLY` |
| Current Positions | §§3, 3.1, 11, 12, 16 | Consultant roles listed at St George’s University Hospitals and CHC MontLégia; lecturer role; relevant current affiliations if confirmed | Current only after currency confirmation; historical roles move to Career History | CF1, CF2, CF3; LinkedIn is verification only; `NEEDS CURRENT VERIFICATION` |
| Career History | §§4–5, 15 | Ain Shams, Reims, Lille, Saint Etienne, Royal London positions; dates and responsibilities recorded in the CV | Preserve dates and mark past roles as historical; confirm Royal London is not current | CF3; `VERIFIED`, then `APPROVAL REQUIRED` |
| Education & Qualifications | §6 | Bachelor of Surgery and Medicine; Master and M.D. of Radiodiagnosis; French Board; AFS/AFSA diplomas; Paris diplomas; ESNR diplomas/fellowships; EBNI fellowship | Historical qualifications; doctor confirms the full list and preferred presentation | `VERIFIED`; `READY FOR WEB COPY` after approval; no inferred equivalence |
| Professional Societies | §7, §§11–12 | SFNR, ESMINT, ESNR, PAIRS, UKNG memberships | Confirm complete/current list; separate membership from leadership | `NEEDS CURRENT VERIFICATION`; CF1/CF2 may affect role wording |
| Teaching & Education | §8, §15 | ECMINT/Oxford; UKNG courses; organized PAIRS INR, MoMo-MEA, ICE-DINR, Zagreb, and Technicians in INR activities; tutoring/training | Historical or ongoing status must be confirmed; map approved items to Professional Activities where appropriate | Industry tutoring is T3; “Key Opinion Leader” is T3; `APPROVAL REQUIRED` |
| Academic / Scientific Activity | §§9, 11, 12, 15 | Research fields; Hospices Civils de Lyon/CREATIS/Carmen work; journal reviewing/editorial activity; ESMINT collaborations/guidelines; PAIRS regional development | Identify historical work and current roles separately | T3 PI/advisory-board wording; `NEEDS CURRENT VERIFICATION` and `APPROVAL REQUIRED` |
| Selected Research / Publications | §10 and selected items in §9 | PubMed destination; approved curated publication/study selection | Use only an approved curated selection or approved external link | Selected list is `APPROVAL REQUIRED`; no separate research page (D-005) |
| Professional Leadership | §§3, 5, 11, 12 | ESMINT board/chair role; ESMINT congress roles; PAIRS board/co-chair/program/president roles; Foundation role | Do not merge former and current leadership; resolve CF1 and CF2 first | CF1, CF2; role wording is `NEEDS CURRENT VERIFICATION` |
| Professional Milestones | §§5, 11, 12 | ESMINT congress presidency/vice-presidency; award/guideline/collaboration milestones; historical PAIRS activity | Date and label historical milestones; omit promotional detail unless approved | ESMINT 2022 detail is T3; `APPROVAL REQUIRED` |
| Clinical Expertise | §13 and relevant items in §15 | Diagnosis/strategy/follow-up; angiography; aneurysm, AVM, fistula, subdural, venous sinus, stroke, stenosis, access, and paediatric procedure groups | Present as factual scope, not a promise or outcome claim | `READY FOR WEB COPY` after doctor approval; Q10 must be softened or approved |
| External Professional Links | §16 | LinkedIn, PubMed, approved official profiles, and approved YouTube destination | Links only; no feeds or counts | LinkedIn/PubMed are source-recorded but publication still follows approval; YouTube and other profiles require approval |

### Biography exclusions

- Do not publish the source CV biography verbatim.
- Do not publish unresolved current positions or the unresolved experience figure.
- Do not publish annual activity figures by default.
- Do not publish superlatives, company names, outcome claims, guarantees, or
  “world class” language without explicit approval.
- Do not create a separate Research page in V1.

## 4. Conditions mapping

The six pages are concise pathways to an appropriate next step. The source
contains condition names and relevant clinical-expertise items, but it does
not contain approved patient-facing descriptions for these pages.

Common page rules:

- Primary CTA: Remote Consultation.
- Secondary CTA: Conditions index, with Biography where context is useful.
- If a visitor may be experiencing an emergency, show only approved emergency
  guidance: this website is not an emergency service; contact local emergency
  services; attend the nearest hospital. Do not invent country-specific numbers.
- Emergency guidance must stop the normal consultation, booking, and payment
  flow.
- Do not include diagnosis, treatment recommendations, outcomes, guarantees,
  annual figures, or long encyclopedic explanations.
- All clinical descriptions and Arabic labels require doctor approval.

| Condition | Page purpose | Short approved/source description | Visitor needs to understand | Relevant §13 expertise | Do not include | Status / approval |
| --- | --- | --- | --- | --- | --- | --- |
| Brain Aneurysm | Route visitors seeking information or review of an aneurysm to an appropriate non-emergency consultation path. | No approved short description exists; only the approved condition name and source-listed aneurysm procedure group are available. | The page should orient the visitor to the topic and next step without diagnosing them. | Brain aneurysm endovascular treatment group: coiling, balloon/stent-assisted coiling, flow diverters, intrasaccular devices, LEA, vessel sacrifice. | Unapproved explanations, suitability claims, outcome rates, urgency decisions, or procedure recommendations. | Name `VERIFIED` in source; description and Arabic copy `APPROVAL REQUIRED`. |
| Stroke | Route visitors and referrers toward appropriate information while clearly separating emergencies from non-emergency consultation. | No approved short description exists; source includes acute stroke in §15 and mechanical thrombectomy in §13. | Emergency visitors must stop and use approved emergency guidance; non-emergency visitors may continue to consultation routing. | Mechanical thrombectomy; carotid stenting; source-listed stroke activity only as non-publishable T3 unless approved. | Any claim that the website provides emergency care, guarantees access, or publishes current activity figures by default. | Name `VERIFIED`; all copy and emergency wording `APPROVAL REQUIRED`. |
| AVM | Route visitors seeking information or review of an AVM to a concise consultation pathway. | No approved short description exists; source records endovascular treatment of bAVMs. | The page should explain the subject at a high level only after approval and present a clear next step. | Arterial/venous embolisation and liquid embolic agents for bAVMs; paediatric interventions including vein of Galen embolisation. | Unsupported clinical claims, patient-specific advice, outcomes, or procedure suitability. | Name `VERIFIED`; description and Arabic copy `APPROVAL REQUIRED`. |
| Carotid Stenosis | Route visitors and referrers to a concise, non-diagnostic next step. | No approved short description exists; source lists angioplasty/stenting for atherosclerotic disease and carotid stenting under thrombectomy. | The page should identify the topic and consultation route without acting as a treatment guide. | Angioplasty/stenting for extracranial/intracranial atherosclerotic disease; carotid stenting. | Risk claims, treatment recommendations, urgency decisions, and unsupported outcomes. | Name `VERIFIED`; description and Arabic copy `APPROVAL REQUIRED`. |
| Venous Sinus Disorders | Route visitors with relevant non-emergency questions to consultation. | No approved short description exists; source records venous sinus stenting for spontaneous intracranial hypertension and pulsatile tinnitus. | The page should explain the route at a high level, with emergency guidance where applicable. | Venous sinus stenting; source-listed spontaneous intracranial hypertension and pulsatile tinnitus context. | Diagnosing the visitor, promising symptom resolution, or presenting a procedure as suitable for everyone. | Name `VERIFIED`; description and Arabic copy `APPROVAL REQUIRED`. |
| Chronic Subdural Haematoma | Route visitors and referrers to a concise consultation pathway. | No approved short description exists; source records treatment of chronic subdural haematomas. | The page should orient visitors to an appropriate review path and avoid emergency-service implications. | Treatment of chronic subdural haematomas; related embolisation expertise only if approved and relevant. | Emergency advice beyond approved wording, patient-specific recommendations, outcomes, or guarantees. | Name `VERIFIED`; description and Arabic copy `APPROVAL REQUIRED`. |

## 5. Professional activity facts inside Biography

Professional Activities & Media was rejected by the doctor and is not a V1
website section. Conference, society, invited-talk, and professional activity
facts remain useful source material and may be presented inside Biography under
Teaching & Education, Academic / Scientific Activity, Professional Leadership,
and Professional Milestones.

There is no standalone route, navigation item, homepage section, breadcrumb,
metadata entry, or sitemap entry for Professional Activities. Media, Media
Appearances, Podcasts, Press, and any fourth category are not public V1 scope.

## 6. E-learning for Physicians

| Content need | Source / decision | Mapping status | Requirement before publication |
| --- | --- | --- | --- |
| Section purpose and introduction | Project Brief §2 and §5; D-004 | `READY FOR WEB COPY` as a strategic direction | Rewrite a concise physician-focused introduction and obtain approval. Do not claim specific content not recorded. |
| Primary destination | D-004; source §16 | `APPROVAL REQUIRED` | Obtain and record the official YouTube channel URL. Do not invent or infer it. |
| Playlists or featured lectures | Source §16; approval-pack G2 | `APPROVAL REQUIRED` | Doctor selects approved playlists/items; no embedded video platform is required. |
| Existing educational items | Source §§8, 15 | `SOURCE ONLY` until selected | Courses and teaching activity may inform the introduction or Biography/Professional Activities, but are not automatically YouTube content. |
| Other external links | Source §16 | `APPROVAL REQUIRED` individually | Confirm any official organisation or professional profile URL. |

The official YouTube URL is currently missing and must remain marked
`APPROVAL REQUIRED`.

## 7. Remote Consultation mapping

The consultation page must reflect the approved operational model. Submission
is a request, not an appointment or payment confirmation.

| Step / screen | Content needed | Source / traceability | Status and approval fields |
| --- | --- | --- | --- |
| Entry | Explain that the visitor is submitting a request for staff review; distinguish patient and physician pathways. | Project Brief §6; CONSULTATION_FLOW §§1, 12; D-007 | Flow structure `VERIFIED`; final introduction `APPROVAL REQUIRED`. |
| Requester type | Exactly one: `Patient / Consultation` or `Physician / Referral`. | CONSULTATION_FLOW §1; D-007 | `VERIFIED`; labels and Arabic copy require approval. |
| Urgency | Exactly one: `Emergency` or `Non-Emergency`. | CONSULTATION_FLOW §§2–3; D-008 | `VERIFIED`; final explanatory copy `APPROVAL REQUIRED`. |
| Emergency branch | State that the website is not an emergency service; tell the visitor to contact local emergency services and attend the nearest hospital; stop the normal flow. | CONSULTATION_FLOW §3; SECURITY_AND_PRIVACY “Emergency”; source §§21–22 | Principles `VERIFIED`; exact wording `APPROVAL REQUIRED`. No country-specific number. |
| Non-emergency service | Exactly one: `Online Consultation` or `Clinic Visit`. | CONSULTATION_FLOW §4; D-009 | `VERIFIED`; labels and descriptions `APPROVAL REQUIRED`. |
| Common fields | Full name, phone, WhatsApp number, email, country, preferred language, only as needed. | CONSULTATION_FLOW §5 | Field set is a proposal from the specification; doctor/operational owner must approve which fields are required. |
| Patient fields | Reason for consultation, short description, relevant context, preferred dates/times. | CONSULTATION_FLOW §5 | `APPROVAL REQUIRED`; minimize sensitive data. |
| Physician/referral fields | Physician name, specialty, institution, contact details, referral summary, preferred communication route. | CONSULTATION_FLOW §5 | `APPROVAL REQUIRED`; minimize sensitive data. |
| Preferred times | Up to three preferred times. | CONSULTATION_FLOW §6 | `VERIFIED`; exact labels and time-zone handling `APPROVAL REQUIRED`. Submission is not confirmation. |
| Attachments | Optional PDF, JPG, or PNG files; maximum three files. | Project Brief §6; CONSULTATION_FLOW §7; SECURITY_AND_PRIVACY; D-012 | File types/count `VERIFIED`; per-file/total size, secure provider, retention, consent, and transfer wording `APPROVAL REQUIRED`. |
| Consent | Approved privacy/consent wording before submission. | CONSULTATION_FLOW §8; SECURITY_AND_PRIVACY | `APPROVAL REQUIRED`; exact legal text must be recorded before implementation. |
| Review and submit | Clear summary, validation feedback, and a request submission action. | CONSULTATION_FLOW §§9, 13; QA_AND_ACCEPTANCE | Flow `VERIFIED`; final labels, errors, anti-spam wording, and consent copy `APPROVAL REQUIRED`. |
| Staff notification | Notify the operational person with minimal safe metadata and a reference identifier if used. | CONSULTATION_FLOW §§9, 12; INTEGRATIONS “Staff notification” | Operational requirement `VERIFIED`; recipient, channel, and exact message `APPROVAL REQUIRED`. |
| WhatsApp automation | Send receipt confirmation and tell the requester the team will review/respond. | CONSULTATION_FLOW §§10–11; INTEGRATIONS “WhatsApp confirmation”; D-011 | Minimum behavior `VERIFIED`; provider, number, message copy, and timing `APPROVAL REQUIRED`. |
| Human review | Doctor/secretary reviews; secretary may contact, coordinate appointment, and coordinate payment. | CONSULTATION_FLOW §12; D-010, D-020, D-021 | `VERIFIED`; operational contact details and response expectation `APPROVAL REQUIRED`. |
| Success state | Confirm request receipt only; do not imply appointment, payment, diagnosis, or clinical decision. | CONSULTATION_FLOW §10; source §21 | Suggested direction is recorded; final message `APPROVAL REQUIRED`. |
| Appointment and payment | Handled manually after staff review and appointment confirmation. | Project Brief §6; CONSULTATION_FLOW §§6, 12; D-010, D-020, D-021 | `VERIFIED`; fee, method, timing, and wording `APPROVAL REQUIRED`. No custom booking/payment workflow. |

### Consultation fields still requiring approval

- Required versus optional status for every common and conditional field.
- Final requester labels and Arabic translations.
- Emergency and non-emergency explanatory copy.
- Consultation fee, duration, clinic availability, and clinic locations.
- Consultation languages.
- WhatsApp number and operational recipient.
- Secretary contact and who receives requests.
- Preferred payment arrangement after confirmation.
- Consent/privacy wording.
- Attachment per-file and total-size limits, secure transfer mechanism, and
  retention/deletion policy.
- Success message and expected response-time wording.
- Anti-spam/rate-limit behavior and any user-facing fallback copy.

## 8. Contact

| Possible intent | Source support | Website mapping | Status |
| --- | --- | --- | --- |
| Patient / Consultation | Project Brief §6; CONSULTATION_FLOW §1; D-007 | Route to Remote Consultation rather than create a separate unsupported workflow. | `VERIFIED` flow; final routing copy `APPROVAL REQUIRED`. |
| Physician / Referral | Project Brief audiences; CONSULTATION_FLOW §1; D-007 | Route to the Physician / Referral branch of Remote Consultation. | `VERIFIED` flow; final routing copy `APPROVAL REQUIRED`. |
| General enquiry | Not explicitly recorded as an operational destination | Include only if the doctor approves it and supplies a destination. | `APPROVAL REQUIRED`; do not invent a channel. |
| Hospital / Organisation | Project Brief §2 lists this as a secondary audience | Include only if a supported enquiry route and recipient are approved. | `APPROVAL REQUIRED`; no address or recipient is currently recorded. |
| Other professional enquiry | Project Brief secondary audiences and source §16 links may support this generally | Include only where the source/doctor explicitly supports a destination. | `APPROVAL REQUIRED`. |

Currently missing contact data from source §22:

- Official email address(es).
- WhatsApp number.
- Physical address.
- Approved social/institution URLs beyond individually recorded links.
- Recipient and handling expectations for each approved enquiry type.

No unsupported phone number, email, address, social URL, or “contact us” claim
may be invented.

## 9. Legal and privacy mapping

| Legal/content item | Destination | Source | Status |
| --- | --- | --- | --- |
| Privacy policy | Legal / Privacy | SECURITY_AND_PRIVACY; source §22; approval-pack J1 | Wording published as the Privacy Notice part of `/legal` (EN + AR), a short notice with four client-supplied values shown as placeholders (D-034, shortened by D-035); still `APPROVAL REQUIRED` and not launch-ready while placeholders remain. |
| Medical disclaimer | Legal / Privacy; relevant condition/consultation entry points | SECURITY_AND_PRIVACY; source §22; approval-pack J2 | Wording published as the Medical Disclaimer part of `/legal`; `APPROVAL REQUIRED`, and not written as approved legal advice. |
| Emergency disclaimer/guidance | Remote Consultation and relevant condition entry points | CONSULTATION_FLOW §3; SECURITY_AND_PRIVACY “Emergency”; source §§21–22 | Principles are specified; exact wording `APPROVAL REQUIRED`. No invented emergency numbers. |
| Consultation wording | Remote Consultation; Contact | CONSULTATION_FLOW; source §§21–22; approval-pack J3 | `APPROVAL REQUIRED`; must not imply confirmed appointment/payment/diagnosis. |
| Consent wording | Remote Consultation | CONSULTATION_FLOW §8; SECURITY_AND_PRIVACY; approval-pack J1/J3 | `APPROVAL REQUIRED`. |
| Cookie/consent requirements | Legal / Privacy if applicable | No final cookie requirement recorded; SEO/analytics references are conditional | `APPROVAL REQUIRED` if analytics or non-essential cookies are approved. Do not add a banner requirement without a defined use case. |

## 10. SEO content mapping

This is a direction map, not keyword research or final metadata. Every indexable
page needs an intentional title, description, canonical, language metadata,
Open Graph data, and justified structured data under `SEO.md`.

French page variants remain non-indexable and excluded from the launch sitemap
until approved French content exists. `/en` and `/ar` are the launch SEO
variants.

| Public page | Primary search intent | Entity / topic | Suggested title direction | Suggested description direction | Main entity / subject | Internal-link opportunities | Structured data if justified | Content gaps |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Find the official professional identity and next step | Dr. Mohamed Aggour; interventional neuroradiology | Official name + approved professional title | Concise official identity, approved scope, and consultation pathway | Person / official professional website | Biography, Conditions, E-learning, Remote Consultation | `ProfilePage` / `Person` if requirements are met | Final title, statement, approved portrait/logo, approved localized copy |
| Biography | Evaluate professional background and expertise | Biography of Dr. Mohamed Aggour | Name + Biography + approved professional identity | Approved overview of career, qualifications, expertise, academic activity | Person | Home, Conditions, E-learning, Consultation | `ProfilePage`, `Person`, `BreadcrumbList` where justified | Approved biography, current positions, conflicts, selected research/publications |
| Conditions index | Find relevant condition topics and a next step | Six approved condition areas | Name + Conditions + approved professional identity | Concise orientation to six approved condition pathways | Condition topic collection / professional service | Each condition detail, Biography, Consultation | `BreadcrumbList`; page type only if justified | Approved index introduction and Arabic labels |
| Each condition detail | Learn about a named condition and decide whether to seek review | One approved condition | Condition name + approved professional identity | Concise, approved explanation and non-emergency consultation route | Named condition | Conditions index, Biography, Remote Consultation, emergency guidance where approved | `BreadcrumbList`; avoid unsupported medical schema | All descriptions, clinical wording, emergency copy, Arabic translations |
| E-learning for Physicians | Find official physician education content | Official physician education / YouTube destination | E-learning for Physicians + approved identity | Approved introduction and official YouTube destination | Professional education | Biography, YouTube destination | `BreadcrumbList`; no video schema until actual approved video data exists | Official YouTube URL, playlists/items, approved introduction |
| Remote Consultation | Start a consultation request | Non-emergency consultation request | Remote Consultation + approved identity | Explain request/review/coordination without promising confirmation | Consultation service | Home, Conditions, Biography, Contact, Legal/Privacy | `BreadcrumbList`; avoid unsupported medical/service claims | Fee, duration, locations, contacts, legal/consent wording, attachments/operations |
| Contact | Find an approved enquiry route | Official contact destinations | Contact + approved identity | Only approved enquiry channels and destinations | Official contact page | Consultation, Biography, Legal | `BreadcrumbList`; `ContactPage` only if content qualifies | Email, WhatsApp, address, recipients, approved channels |
| Legal / Privacy | Understand privacy, disclaimer, and consultation terms | Website privacy and legal information | Privacy / Legal + approved identity | Accurate approved legal summary | Legal information | Consultation, Contact, Home | `BreadcrumbList` if justified; no Person schema needed | All legal copy, consent and cookie decisions |

SEO exclusions and safeguards:

- Do not create keyword-stuffed titles or descriptions.
- Do not publish placeholder SEO copy as final metadata.
- Do not claim rankings, outcomes, superiority, or unsupported expertise.
- Do not put French in launch `hreflang` or sitemap until French content is
  approved, consistent with D-019 and the foundation decision.
- Use only approved official external links in `sameAs` or page content.

## 11. Content gaps

### A. Doctor approval required

- English professional title and Arabic title.
- Final Arabic name spelling.
- Portrait and logo/monogram direction.
- Final professional statement and biography copy.
- Current positions and affiliations.
- Resolution of CF1 (ESMINT board/committee status).
- Resolution of CF2 (PAIRS current title/status).
- Resolution of CF3 (Royal London Hospital historical status).
- Resolution of CF4 / Q1 (current years-of-experience wording).
- Which qualifications, societies, leadership roles, teaching activities, and
  academic items may be published.
- Whether selected research/publications are shown as a curated list, link only,
  or not shown.
- All T3 claims Q1–Q13, including figures, superlatives, company names, and
  “Key Opinion Leader” wording.
- Clinical expertise wording for the Biography and six condition pages.
- Arabic condition names and all Arabic page copy.
- Professional Activities item selection under the three approved categories.
- E-learning introduction, official YouTube URL, playlists, and featured items.
- Contact intents and all contact destination wording.
- Emergency, medical disclaimer, privacy, consultation, consent, and success
  wording.

### B. Current-status verification required

- Current St George’s and CHC MontLégia positions.
- Current ESMINT status and committee title.
- Current PAIRS role/title and whether the 2017–2024 role has ended.
- Royal London Hospital status.
- Current years of experience.
- Current society memberships and affiliations.
- Current editorial/reviewer roles.
- Currency of activity and leadership claims.
- Currency of all annual clinical figures, if they are ever considered for
  publication.
- Current status of any external professional profile links.

### C. Missing assets

- Approved high-resolution portrait with crop/usage guidance.
- Final approved logo and wordmark assets.
- Approved Arabic/English/French identity treatment where applicable.
- Official YouTube channel URL and approved thumbnails/playlists if needed.
- Approved official institution/social profile URLs.
- Final approved fonts and brand color direction.

### D. Missing legal content

- Privacy policy.
- Medical disclaimer.
- Consultation terms and non-confirmation wording.
- Emergency guidance wording.
- Consent wording for consultation and optional attachments.
- Cookie/analytics consent decision and wording, if applicable.
- Retention/deletion and transfer wording for medical attachments.

### E. Missing operational information

- Online consultation fee.
- Approximate consultation duration.
- Clinic availability and locations.
- Consultation languages.
- WhatsApp number and approved provider/operational setup.
- Staff recipient and secretary contact.
- Expected response-time wording.
- Payment arrangement after review and appointment confirmation.
- Attachment size limits and approved secure transfer/storage mechanism.
- Final anti-spam/rate-limit and failure-fallback decisions.

## 12. Source traceability matrix

| Mapped content group | Source-of-truth reference(s) | Supporting project/reference decision |
| --- | --- | --- |
| Identity and title | §§1–2 | PROJECT_BRIEF §1; D-001, D-003, D-027 |
| Current positions and conflicts | §§3, 3.1 | PROJECT_BRIEF §§2, 5; D-027 |
| Career history | §§4–5, 15 | PROJECT_BRIEF §5; D-027 |
| Education and societies | §§6–7 | PROJECT_BRIEF §5; D-027 |
| Teaching and Professional Activities | §§8, 11–12, 20 | PROJECT_BRIEF §5; D-027 |
| Research and publications | §§9–10 | PROJECT_BRIEF §5; D-005, D-027 |
| Clinical expertise and conditions | §§13, 19 | PROJECT_BRIEF §5; D-006 |
| Clinical activity figures and claims | §§14, 17–18 | D-027; QA_AND_ACCEPTANCE content QA |
| Biography narrative | §15 | PROJECT_BRIEF §5; D-003, D-005, D-027 |
| External professional links | §16 | SEO.md entity strategy; D-004, D-027 |
| Consultation journey | §21 | PROJECT_BRIEF §6; CONSULTATION_FLOW §§1–13; D-007–D-012 |
| Contact destinations | §§16, 22 | PROJECT_BRIEF §§2, 5; CONSULTATION_FLOW; D-027 |
| Legal and privacy | §§21–22 | SECURITY_AND_PRIVACY.md; CONSULTATION_FLOW §§3, 8; QA_AND_ACCEPTANCE |
| Brand and typography | §23 | DESIGN_SYSTEM.md; D-002, D-027 |

## 13. Contradictions and implementation notes

### Documented source conflicts

- **CF1:** ESMINT board/committee role appears as current in one CV section and
  as ending in 2023 in another.
- **CF2:** PAIRS appears as Program Director through 2024 and President from
  2018 to present.
- **CF3:** Royal London Hospital is dated 2020–2022 in the positions list, but
  the biography draft uses present-tense wording.
- **CF4:** The biography says “more than nineteen years’ experience”; the current
  figure has not been confirmed.

These conflicts are recorded in source §3.1 and must not be resolved by the
implementation team.

### IA rule that must be preserved

The documents consistently approve `Professional Activities` with exactly
three categories and reject a V1 `Media` section. Any existing prototype label
that includes “Media” is implementation drift to correct during a later page or
shell pass; this documentation phase intentionally does not modify application
code.

No new architectural decision is introduced by this map, so `DECISIONS.md` is
not modified.
