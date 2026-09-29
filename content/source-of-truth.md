# Content Source of Truth

Single source for everything the website is allowed to say about
Dr. Mohamed Aggour. Nothing reaches a page (`messages/*.json`, `content/*`,
Biography, Conditions, consultation copy, metadata) unless it is recorded here
first.

- CV extracted: **2026-09-28** (client-supplied, full CV).
- Authority over all content: `AGENTS.md` → `DECISIONS.md` (see **D-027**).
- Client-facing review document: `content/approval-pack.md` (references this
  file; it does not duplicate it).

## Working rules

1. **No invention.** If a fact is not in a source below, it does not exist for
   this website.
2. **The CV is a source of facts, not website copy.** We take the fact, rewrite
   it as web copy, then get approval. CV phrasing is never published verbatim
   as final copy.
3. **Missing information is marked, never guessed:** `[APPROVAL REQUIRED]`.
4. **Only `APPROVED` content may ship.** Verification alone is a working state.
5. **LinkedIn is a verification layer**, never a source of record and never
   on-site content (no follower counts, no feed).
6. **The doctor confirms and approves** — he is never asked to rewrite what the
   CV already contains.

## Source hierarchy

| Rank | Source                                                         | Used for                                                                                                 | Not used for                                    |
| ---- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 1    | **CV** (primary)                                               | Education, career, positions, diplomas, societies, teaching, research, publications, conferences, awards | Final wording; anything marked "needs currency" |
| 2    | **LinkedIn** (public profile)                                  | Current public identity, recent activity, official links, spotting CV gaps                               | Fixing a formal claim on its own                |
| 3    | **Official organisations** (ESMINT, ESNR, PAIRS, institutions) | Confirming sensitive claims                                                                              | Inventing detail                                |
| 4    | **The doctor**                                                 | Currency, correction, publish/no-publish, final wording                                                  | —                                               |

## Status labels (row metadata)

Every row carries four fields:

| Field       | Values                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| **Source**  | `CV` · `LinkedIn` · `Official org` · `Project Brief` · `Doctor` · `Not in any source`                 |
| **Status**  | `VERIFIED FROM CV` · `VERIFIED (LINKEDIN)` · `CONFLICT — needs resolution` · `NOT IN CV` · `PROPOSED` |
| **Current** | `NEEDS DOCTOR CONFIRMATION` · `NEEDS CURRENCY CHECK` · `NOT APPLICABLE`                               |
| **Publish** | `NO — awaiting approval` → `YES` only after the doctor approves                                       |

**Default for every CV row** (repeated here instead of per row):

> `Source: CV` · `Status: VERIFIED FROM CV` · `Current: NEEDS DOCTOR
CONFIRMATION` · `Publish: NO — awaiting approval`

A deviation is always marked inline.

## Publication tiers

| Tier                                       | Meaning                                       | Examples from this CV                                                                                      |
| ------------------------------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **T1 — usable from the CV**                | Historical / documented facts, no extra risk  | Education, diplomas, previous positions, societies, publications list                                      |
| **T2 — must be confirmed as current**      | Anything time-sensitive                       | Current positions, leadership roles, "(present)" items, years of experience, current affiliations          |
| **T3 — doctor decides whether to publish** | Claims, superlatives, numbers, industry names | Annual activity figures, "largest", "world class", "most prestigious", "Key Opinion Leader", company names |

T3 items are never published because they are impressive; only because the
doctor says yes.

---

# Part A — CV-derived content master

Sections 1–18 below use the default row metadata in _Status labels_ unless
marked.

## 1. Identity

| Item                               | Source                                                                           | Status                            | Current | Publish                                  |
| ---------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- | ------- | ---------------------------------------- |
| English name: `Dr. Mohamed Aggour` | CV + Project Brief                                                               | VERIFIED                          | N/A     | `YES` — already in use                   |
| Arabic name: `د. محمد عجور`        | Client correction 2026-09-28 (was `د. محمد عجور`); in build (`messages/ar.json`) | APPROVED — client spelling        | N/A     | `YES` — client decision                   |
| French name                        | —                                                                                | NOT IN CV                         | N/A     | `NO` — French copy not activated (D-019) |
| Portrait                           | Client asset `public/images/doctor/dr-mohamed-aggour.png` (received 2026-09-28; transparent cutout, 1024×1536) | ASSET RECEIVED — not approved     | N/A     | `NO` — doctor approval required          |
| Logo                               | Raster assets in `public/brand/` + `app/icon.png` (see §23)                      | PROTOTYPE RASTER — not approved   | N/A     | `NO` — visual approval + SVG master      |

## 2. Professional titles

| Item                                              | Source                                         | Status            | Current                   | Publish                  |
| ------------------------------------------------- | ---------------------------------------------- | ----------------- | ------------------------- | ------------------------ |
| `Consultant Interventional Neuroradiologist` (EN) | Project Brief §1, consistent with CV positions | VERIFIED FROM CV  | NEEDS DOCTOR CONFIRMATION | `NO` — awaiting approval |
| `استشاري الأشعة التداخلية العصبية` (AR)           | In build                                       | Translation by us | NEEDS DOCTOR CONFIRMATION | `NO` — awaiting approval |
| Any additional title / fellowship post-nominals   | CV, Degrees section                            | VERIFIED FROM CV  | NEEDS DOCTOR CONFIRMATION | `NO` — awaiting approval |

## 3. Current positions

| Item                                                                                        | Source                                | Status                                     | Current                   | Publish |
| ------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------ | ------------------------- | ------- |
| Consultant INR — St George's University Hospitals, London, UK                               | CV                                    | VERIFIED FROM CV                           | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Consultant INR — CHC MontLégia, Liège, Belgium                                              | CV                                    | VERIFIED FROM CV                           | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Board member and Committee chair, ESMINT                                                    | CV                                    | **CONFLICT — needs resolution** (see §3.1) | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Lecturer, Oxford University — ECMINT Course                                                 | CV                                    | VERIFIED FROM CV                           | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Ex. Board Member, Co-Chair INR — PAIRS Neuro MEA                                            | CV (CV itself says "Ex.")             | VERIFIED FROM CV                           | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Président, Fondation Brain Safe de l'AVC (Brain Safe Foundation for Cerebrovascular Stroke) | CV                                    | VERIFIED FROM CV                           | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Program Director, PAIRS Neuro Congress (2017–2024), Dubai                                   | CV                                    | **CONFLICT — needs resolution** (see §3.1) | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Current affiliations detected on LinkedIn (St George's, ESNR)                               | LinkedIn (client-supplied 2026-09-28) | VERIFIED (LINKEDIN)                        | NEEDS DOCTOR CONFIRMATION | `NO`    |

### 3.1 Conflicts and currency checks (must be resolved before any page)

| #   | Conflict              | CV says                                                                                                                              | Question for the doctor                                              |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| CF1 | ESMINT board status   | Positions: "Board member and Committee chair" · Non-clinical: "Board Member (2017–2023)", "Chairman, Publication Ex.Com (2017–2023)" | Is the ESMINT board/committee role **current** or completed in 2023? |
| CF2 | PAIRS role            | "Program Director PAIRS Neuro Congress (2017–2024)" vs "President PAIRS Neuro MEA Annual Congress, Dubai (2018 – present)"           | Which title is current today, and with what wording?                 |
| CF3 | Royal London Hospital | Position listed as 2020–2022, but the CV biography still says "he moved to The Royal London Hospital" (present tense)                | Confirm RLH is a **past** position.                                  |
| CF4 | Years of experience   | Biography: "more than nineteen years' experience"                                                                                    | Exact figure to publish today? (T2)                                  |

## 4. Previous clinical positions

| Item                                                                                                                 | Source | Status           | Current          | Publish                  |
| -------------------------------------------------------------------------------------------------------------------- | ------ | ---------------- | ---------------- | ------------------------ |
| Assistant Fellow, Radiology Department, Ain Shams University, Cairo, Egypt (2002–2006)                               | CV     | VERIFIED FROM CV | N/A (historical) | `NO` — awaiting approval |
| Fellow, Radiology Department, Reims University, Reims, France (2006–2009)                                            | CV     | VERIFIED FROM CV | N/A              | `NO`                     |
| Head of INR, Department of Neuroradiology, Lille University Hospitals, Lille, France (2009–2012)                     | CV     | VERIFIED FROM CV | N/A              | `NO`                     |
| Head of INR unit and regional Lead Consultant, Saint Etienne University Hospitals, Saint Etienne, France (2012–2019) | CV     | VERIFIED FROM CV | N/A              | `NO`                     |
| INR Consultant, Training & Education Lead, The Royal London Hospital, London, UK (2020–2022)                         | CV     | VERIFIED FROM CV | see CF3          | `NO`                     |

## 5. Previous non-clinical / academic positions

| Item                                                                  | Source | Status           | Current                                                                | Publish |
| --------------------------------------------------------------------- | ------ | ---------------- | ---------------------------------------------------------------------- | ------- |
| Associate Editor, Journal of Neuroradiology, SFNR (6 years)           | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION (also listed as ongoing since 2009 — see §9) | `NO`    |
| President, ESMINT Annual Congress, Nice, 2022                         | CV     | VERIFIED FROM CV | N/A                                                                    | `NO`    |
| Vice President, ESMINT Annual Congress, Marseille, 2023               | CV     | VERIFIED FROM CV | N/A                                                                    | `NO`    |
| Chairman, Publication Executive Committee, ESMINT (2017–2023)         | CV     | VERIFIED FROM CV | N/A                                                                    | `NO`    |
| Board Member, ESMINT (2017–2023)                                      | CV     | VERIFIED FROM CV | conflicts with §3 — see CF1                                            | `NO`    |
| President, PAIRS Neuro MEA Annual Congress, Dubai, UAE (2018–present) | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION — see CF2                                    | `NO`    |

## 6. Education & diplomas

| Item                                                                                                              | Source | Status           | Current | Publish                  |
| ----------------------------------------------------------------------------------------------------------------- | ------ | ---------------- | ------- | ------------------------ |
| Bachelor of Surgery and Medicine, Ain Shams University, Cairo, Egypt                                              | CV     | VERIFIED FROM CV | N/A     | `NO` — awaiting approval |
| Master of Radiodiagnosis, Ain Shams University, Cairo, Egypt                                                      | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| M.D. of Radiodiagnosis, Egypt                                                                                     | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| French Board of Imaging & Diagnostic Radiology (PAE)                                                              | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| AFS Diploma & Clinical Training, Radiology / Neuroradiology, Reims University Hospitals, Reims, France            | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| AFSA Diploma & Clinical Training, Interventional Neuroradiology, Lille University Hospitals, Lille, France        | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| Diploma of Diagnostic and Therapeutic Neurovascular Diseases, Université Paris Descartes (Paris V), Paris, France | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| Diploma of Neuroradiology, Université Pierre et Marie Curie (Sorbonne – Paris VI), Paris, France                  | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| European Diploma of Neuroradiology, European Society of Neuroradiology (ESNR)                                     | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| European Diploma of Higher Qualification in Interventional Neuroradiology, ESNR                                   | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| European Fellow in Interventional Neuroradiology (ESNR)                                                           | CV     | VERIFIED FROM CV | N/A     | `NO`                     |
| Fellow of EBNI (European Board of Neurointerventionists)                                                          | CV     | VERIFIED FROM CV | N/A     | `NO`                     |

Extraction note: obvious CV typos are normalised (`Neuroradioloy` → Neuroradiology,
`Kingdo;` → Kingdom, `edovascular` → endovascular). Meaning is unchanged.

## 7. Professional societies (CV "Member of")

| Item                                                                   | Source            | Status           | Current                   | Publish |
| ---------------------------------------------------------------------- | ----------------- | ---------------- | ------------------------- | ------- |
| French Society of Neuroradiology (SFNR)                                | CV                | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| European Society of Minimally Invasive Neurological Therapies (ESMINT) | CV + official org | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| European Society of Neuroradiology (ESNR)                              | CV + LinkedIn     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Pan-Arab Interventional Radiology Society (PAIRS)                      | CV                | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| United Kingdom Neuroradiology Group (UKNG)                             | CV                | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |

Membership may be displayed only after the doctor confirms the list is complete
and current.

## 8. Academic & teaching activity

| Item                                                                                                                                             | Source | Status           | Current                   | Publish        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------- | ------------------------- | -------------- |
| ECMINT course, Oxford (ESMINT course)                                                                                                            | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`           |
| UKNG (United Kingdom Neuroradiology Group) courses                                                                                               | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`           |
| Organised meetings/courses: PAIRS INR, MoMo-MEA (Dubai), ICE-DINR (Egypt), Zagreb Course (Croatia), Technicians in INR day (Francophone, France) | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`           |
| PAIRS Neuro Annual Congress — programme and workshops                                                                                            | CV     | VERIFIED FROM CV | see CF2                   | `NO`           |
| Tutor / trainer for senior and junior colleagues and technicians, in France and worldwide                                                        | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`           |
| Industry workshop tutoring (Medtronic, Cerenovus, Microvention, Balt)                                                                            | CV     | VERIFIED FROM CV | **T3**                    | `NO` — see §17 |
| "International Key Opinion Leader in INR"                                                                                                        | CV     | VERIFIED FROM CV | **T3**                    | `NO` — see §17 |

## 9. Research

| Item                                                                                                                                                                             | Source | Status           | Current                   | Publish                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------- | ------------------------- | ----------------------------------------------------------------- |
| Reviewer for high-ranked European/American neuroradiology journals (JNIS, JNR, others)                                                                                           | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`                                                              |
| Associate Editor, Member of the scientific committee and reviewer, Journal of Neuroradiology (since 2009); European Journal of Radiology; Journal of Neurointerventional Surgery | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`                                                              |
| Research fields: perfusion endovascular studies, clot models, cerebral ischaemia, neuroprotection                                                                                | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`                                                              |
| Research with Hospices Civils de Lyon, CREATIS & Carmen — endovascular, reversible stroke model in non-human primates mimicking stroke and mechanical thrombectomy               | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`                                                              |
| Study participation: ESAT, ARETA, TRAIL, THRACE, VOLCAN, DIVERSION, EVIDENCE, REACT, SAFE, HENRI, CHOICE, TENSION, INSPIRE, SWIFT DIRECT, IN EXTRMIS, ACET, Minor-Stroke         | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO` — publish only as an approved curated list, not raw acronyms |
| "PI in various multicentric studies and advisory boards"                                                                                                                         | CV     | VERIFIED FROM CV | **T3**                    | `NO` — see §17                                                    |

## 10. Publications

| Item                                                                                 | Source | Status                       | Current                   | Publish                          |
| ------------------------------------------------------------------------------------ | ------ | ---------------------------- | ------------------------- | -------------------------------- |
| PubMed listing: `https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584` | CV     | VERIFIED FROM CV             | NEEDS DOCTOR CONFIRMATION | `NO` — external destination only |
| Selected publications to feature on-site                                             | —      | NOT IN CV (list not curated) | —                         | `NO` — `[APPROVAL REQUIRED]`     |

Selected research/publications are presented **inside Biography** only (D-005).
No research platform.

## 11. ESMINT (CV detail)

| Item                                                                                                                                  | Source | Status           | Current                             | Publish                   |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------- | ----------------------------------- | ------------------------- |
| Elected Board Member and Chair of the Publication Executive Committee (2017)                                                          | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION — see CF1 | `NO`                      |
| Developed collaboration between ESMINT and SNIS / JNIS                                                                                | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION           | `NO`                      |
| Established the Best European Publication in JNIS award                                                                               | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION           | `NO`                      |
| Wrote ESMINT guidelines for neuro-interventional procedures during the Covid-19 epidemic                                              | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION           | `NO`                      |
| ESMINT 2022 congress milestones (live translation incl. Mandarin, Start-Up Alley, R&D interactive sessions, morning run / beach yoga) | CV     | VERIFIED FROM CV | Historical                          | `NO` — T3 detail, see §17 |

## 12. PAIRS (CV detail)

| Item                                                                                 | Source | Status           | Current                   | Publish        |
| ------------------------------------------------------------------------------------ | ------ | ---------------- | ------------------------- | -------------- |
| Ex. Board Member, Co-Chair INR — PAIRS Neuro MEA                                     | CV     | VERIFIED FROM CV | see CF2                   | `NO`           |
| Program Director, PAIRS Neuro Congress, Dubai (2017–2024)                            | CV     | VERIFIED FROM CV | see CF2                   | `NO`           |
| President, PAIRS Neuro MEA Annual Congress, Dubai (2018–present)                     | CV     | VERIFIED FROM CV | see CF2                   | `NO`           |
| PAIRS Neuro annual meeting described as a renowned world-class international meeting | CV     | VERIFIED FROM CV | **T3**                    | `NO` — see §17 |
| Developing INR in Africa and the Middle East through PAIRS                           | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`           |

## 13. Clinical expertise (CV procedure list)

Grouped exactly as the CV lists them; wording to be rewritten for the web, not
copied verbatim.

| Item                                                                                                                                             | Source | Status           | Current                   | Publish |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------- | ------------------------- | ------- |
| Diagnosis, decision-making, therapeutic strategy and follow-up for all neurovascular diseases                                                    | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Multidisciplinary decision-making (neurosurgery, neurology, radiosurgery, intensive care, anaesthetics, emergency)                               | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Cerebral and spinal angiography                                                                                                                  | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Brain aneurysms: coiling, balloon-assisted coiling, stent-assisted coiling, flow diverters, intrasaccular flow disruptors, LEA, vessel sacrifice | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Endovascular treatment of bAVMs (arterial/venous embolisation, liquid embolic agents)                                                            | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Microparticle embolisation: epistaxis, tumour embolisation, trauma                                                                               | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Embolisation of brain and spinal fistulas (dural, carotid-cavernous, traumatic)                                                                  | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Treatment of chronic subdural haematomas                                                                                                         | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Treatment of spontaneous intracranial hypertension and pulsatile tinnitus via venous sinus stenting                                              | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Mechanical thrombectomy (stent retrievers, aspiration, carotid stenting)                                                                         | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Angioplasty and stenting for extracranial/intracranial atherosclerotic disease                                                                   | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Arterial and venous access including radial and direct neck punctures                                                                            | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |
| Paediatric interventions including vein of Galen embolisation                                                                                    | CV     | VERIFIED FROM CV | NEEDS DOCTOR CONFIRMATION | `NO`    |

Clinical expertise maps onto the six approved condition destinations (§19) —
it does not create new condition pages.

## 14. Clinical activity (annual figures — **T3, do not publish by default**)

| Item                                             | Value from CV  | Status                              | Publish |
| ------------------------------------------------ | -------------- | ----------------------------------- | ------- |
| Endovascular treatment of intracranial aneurysms | 150–200 / year | VERIFIED FROM CV · currency unknown | `NO`    |
| Endovascular treatment of brain and spinal AVMs  | 40–50 / year   | VERIFIED FROM CV · currency unknown | `NO`    |
| Mechanical thrombectomy for stroke               | 90–150 / year  | VERIFIED FROM CV · currency unknown | `NO`    |
| Other intracranial embolisations                 | 20–30 / year   | VERIFIED FROM CV · currency unknown | `NO`    |
| Paediatric embolisations                         | 5–8 / year     | VERIFIED FROM CV · currency unknown | `NO`    |
| Diagnostic cerebral angiographies                | 250–350 / year | VERIFIED FROM CV · currency unknown | `NO`    |
| Consultations                                    | 200–250 / year | VERIFIED FROM CV · currency unknown | `NO`    |
| Follow-up MRI for treated patients               | 250–350 / year | VERIFIED FROM CV · currency unknown | `NO`    |

These numbers are strong content **if** the doctor confirms they are current
**and** wants them public. Both conditions are required.

## 15. Biography draft (source text — **not final website copy**)

> Source: CV. Status: VERIFIED FROM CV. Current: NEEDS DOCTOR CONFIRMATION.
> Publish: NO — rewrite into web copy, then approve.
>
> With more than nineteen years' experience in the field of minimally invasive
> endovascular neuroradiology, Dr. Aggour is engaged in the treatment and
> management of brain and spinal vascular diseases. Procedures include
> treatment of cerebral aneurysms, brain and spinal arteriovenous
> malformations, intracranial stenosis and acute stroke.
>
> After being responsible for the activity of INR in Saint Etienne University
> Hospitals for nine years and Lille University Hospitals, France, for three
> years he moved to The Royal London Hospital – Barts NHS Trust developing with
> the existing team, the INR activity in Barts NHS Trust serving Londoners and
> beyond.
>
> The new 24/7 stroke mechanical thrombectomy service serves actively more
> than 250 patients per year from London and around. With his experience in
> organizing regional and national management of subarachnoid hemorrhage and
> stroke networks in France, he is taking every chance to actively develop with
> the INR team at RLH this service in the UK, to optimize patients' care and
> management.
>
> He is promoting medical education and training in INR with other national and
> international universities and organs. His field of research includes
> perfusion endovascular studies, clot models, cerebral ischemia and
> neuroprotection. He is also an active member of the French Society of
> Neuroradiology and British groups.
>
> Dr. Aggour is also keen to develop the INR in Africa and the Middle East
> through his position in the board of the PAIRS society and being the Chair of
> INR and Director of INR annual meeting and teaching activities. PAIRS Neuro
> annual meeting, held annually in Dubai, is considered since few years as a
> renowned world class scientific international meeting. Attendees are from
> beyond the Middle East region extending to the Far East, Africa and Eastern
> Europe.
>
> He is also interested in new INR devices' innovation and development and in
> close collaboration with R&D engineers to develop the most advanced INR tools
> to help develop the specialty and deliver optimal innovative care to patients.
>
> Dr. Aggour is a regular invited speaker, Faculty and lecturer in most
> international INR meetings and events, PI in various multicentric studies and
> advisory boards.

Rewrite requirements before publication: update tense/positions (see §3.1),
resolve "nineteen years" (CF4), remove or approve every superlative (§17), and
split into the approved Biography structure (Project Brief §5).

## 16. Professional links

| Item                                   | Value                                                                | Source | Status           | Publish                                       |
| -------------------------------------- | -------------------------------------------------------------------- | ------ | ---------------- | --------------------------------------------- |
| LinkedIn                               | `https://www.linkedin.com/in/mohamed-aggour-1414a941`                | CV     | VERIFIED FROM CV | `NO` — destination link only, no counts/feed  |
| Twitter / X                            | `@Aggour` (URL to be confirmed)                                      | CV     | VERIFIED FROM CV | `NO` — `[APPROVAL REQUIRED]` for handle + URL |
| PubMed                                 | `https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584` | CV     | VERIFIED FROM CV | `NO`                                          |
| ESMINT / official organisation profile | —                                                                    | —      | NOT IN CV        | `NO` — `[APPROVAL REQUIRED]`                  |
| Institutional profile(s)               | —                                                                    | —      | NOT IN CV        | `NO` — `[APPROVAL REQUIRED]`                  |
| YouTube (official channel)             | —                                                                    | —      | NOT IN CV        | `NO` — `[APPROVAL REQUIRED]` (D-004)          |
| Other social                           | —                                                                    | —      | NOT IN CV        | `NO` — footer shows placeholder               |

Destination links only: no follower counts, no embedded activity.

## 17. Statements / claims requiring explicit approval (T3)

Present in the CV, **not** publishable until the doctor approves each one.

| #   | Claim (CV wording)                                                                 | Question                               |
| --- | ---------------------------------------------------------------------------------- | -------------------------------------- |
| Q1  | "more than nineteen years' experience"                                             | What figure should be published today? |
| Q2  | "largest Neurovascular Society and Congress in the MEA region"                     | Approve superlative, soften, or drop?  |
| Q3  | "renowned world class scientific international meeting"                            | Approve / drop?                        |
| Q4  | "most prestigious international congresses"                                        | Approve / drop?                        |
| Q5  | "The prestigious course of the ESMINT society" (ECMINT)                            | Approve / drop?                        |
| Q6  | "International Key Opinion Leader in INR"                                          | Approve / drop?                        |
| Q7  | Industry tutoring: Medtronic, Cerenovus, Microvention, Balt                        | Approve naming companies publicly?     |
| Q8  | Annual clinical activity figures (§14)                                             | Still current **and** publish?         |
| Q9  | "24/7 stroke mechanical thrombectomy service … more than 250 patients per year"    | Still current? Publish?                |
| Q10 | "masters all neurointerventional vascular procedures … in adults and pediatrics"   | Soften to a factual list?              |
| Q11 | "proctor and tutor for complex cases … worldwide"                                  | Approve / drop?                        |
| Q12 | "PI in various multicentric studies and advisory boards"                           | Approve / drop?                        |
| Q13 | ESMINT 2022 congress features (live translation, Start-Up Alley, morning run/yoga) | Include as activity detail?            |

Recommended default: **drop the superlatives**, publish verifiable facts, keep
tone calm and credible (`AGENTS.md` — elegant, professional, minimal).

## 18. Items not to publish by default

- Anything absent from the CV and other sources.
- Clinical activity numbers (§14) until explicitly approved.
- Every claim in §17 until explicitly approved.
- Company/industry names (§17 Q7) until approved.
- Follower counts, LinkedIn activity, or any social feed.
- Clinic addresses/locations, fees, phone numbers, e-mail — none exist in any
  source → `[APPROVAL REQUIRED]`.
- Country-specific emergency numbers (`CONSULTATION_FLOW.md` §3).
- Any patient-identifying material (none present in the CV).
- Statements of outcome, cure or guarantee.

---

# Part B — Site content not covered by the CV

## 19. Conditions (six — D-006, Project Brief §5)

| #   | English                    | Arabic (in build)               | French                | Status                           |
| --- | -------------------------- | ------------------------------- | --------------------- | -------------------------------- |
| 1   | Brain Aneurysm             | تمدد الأوعية الدموية الدماغية   | `[APPROVAL REQUIRED]` | EN approved (brief) · AR pending |
| 2   | Stroke                     | السكتة الدماغية                 | `[APPROVAL REQUIRED]` | same                             |
| 3   | AVM                        | التشوه الشرياني الوريدي         | `[APPROVAL REQUIRED]` | same                             |
| 4   | Carotid Stenosis           | تضيق الشريان السباتي            | `[APPROVAL REQUIRED]` | same                             |
| 5   | Venous Sinus Disorders     | اضطرابات الجيوب الوريدية        | `[APPROVAL REQUIRED]` | same                             |
| 6   | Chronic Subdural Haematoma | الورم الدموي المزمن تحت الجافية | `[APPROVAL REQUIRED]` | same                             |

No seventh condition. Clinical explanatory copy per condition: APPROVAL
REQUIRED. Section 13 (clinical expertise) supports these pages; it does not add
pages.

## 20. Professional Activities (client-approved name, 2026-09-28)

Categories: **Conferences · Professional Societies · Invited Talks** — exactly
three; no fourth. Title EN `Professional Activities`, AR `الأنشطة المهنية`.
Content for each category: extract from §§8, 9 and 12 above, then approve.
"Media" was not approved and must not reappear.

## 21. Consultation information (no source — all `[APPROVAL REQUIRED]`)

| Field                   | Value                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Online consultation fee | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Approximate duration    | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Clinic availability     | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Clinic locations        | `[APPROVAL REQUIRED]` — never list cities guessed from the CV                                                                                                        |
| WhatsApp number         | `[APPROVAL REQUIRED]` (runtime `WHATSAPP_*` env)                                                                                                                     |
| Consultation languages  | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Who receives requests   | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Secretary contact       | `[APPROVAL REQUIRED]`                                                                                                                                                |
| Payment arrangement     | `[APPROVAL REQUIRED]` (payment only after staff review — D-010)                                                                                                      |
| Emergency wording       | Principles approved (`CONSULTATION_FLOW.md` §3): not an emergency service · contact local emergency services · no invented numbers. Final copy `[APPROVAL REQUIRED]` |
| Success message         | Spec wording in `CONSULTATION_FLOW.md` §10 — doctor sign-off pending                                                                                                 |

Approved flow facts: requester types (D-007), emergency split (D-008),
online/clinic (D-009), WhatsApp confirmation (D-011), max 3 attachments
PDF/JPG/PNG (D-012).

## 22. Contact & legal

| Field                                              | Value                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| Official e-mail(s)                                 | `[APPROVAL REQUIRED]`                                        |
| WhatsApp number                                    | `[APPROVAL REQUIRED]`                                        |
| Social / institution URLs                          | see §16                                                      |
| Physical address                                   | `[APPROVAL REQUIRED]`                                        |
| Privacy policy / disclaimer / consultation wording | `[APPROVAL REQUIRED]` — must match `SECURITY_AND_PRIVACY.md` |
| Approved emergency message                         | principles approved (§21); wording `[APPROVAL REQUIRED]`     |

## 23. Brand & typography (`PROPOSED` — approval is visual)

- **Logo direction:** `MA` monogram with a restrained vascular/catheter feel in
  the negative space; wordmark `MOHAMED AGGOUR`; flat, no gradients; must work
  in the header, favicon, business card, certificate, conference slide, social
  profile and black-and-white. Rejected: brain icon, caduceus, red cross,
  stethoscope, ECG, DNA.
- **Typography candidates:** Libre Baskerville + IBM Plex Sans (EN/FR);
  Noto Serif Arabic + IBM Plex Sans Arabic (AR); loaded via `next/font`.
  Not approved until compared visually. Current build still uses the
  placeholder font.

### Asset inventory (received 2026-09-28 — prototype raster, not approved)

| Asset                                        | Path                                          | Dimensions           | Status                                             |
| -------------------------------------------- | --------------------------------------------- | -------------------- | -------------------------------------------------- |
| Primary logo (monogram + wordmark + tagline) | `public/brand/logo-primary.png`               | 880×438              | `PROTOTYPE RASTER` — `NO` until approved           |
| Monogram, wide (MA only, navy on light)      | `public/brand/logo-monogram.png`              | 581×259              | `PROTOTYPE RASTER` — `NO` until approved           |
| Favicon / app icon (MA on navy tile)         | `app/icon.png`                                | 512×512              | `PROTOTYPE RASTER` — `NO` until approved           |
| Doctor portrait                              | `public/images/doctor/dr-mohamed-aggour.png` | 1024×1536, RGBA cutout (transparent) | `PROTOTYPE` — `NO` until approved                  |
| Source originals (PNG + WebP)                | `dr-aggour-brand-assets/` (outside `public/`) | —                    | source folder, keep high-resolution originals here (`dr-mohamed-aggour.png` = current portrait master) |

Outstanding before production:

- **No SVG masters exist yet:** `public/brand/logo-primary.svg`,
  `public/brand/logo-monogram.svg`, `public/brand/logo-monochrome.svg`,
  `app/icon.svg`. Raster-only means the logo will soften when scaled; extract
  clean vectors from the direction before launch.
- No `dr-mohamed-aggour-profile.webp` crop yet (needed for Biography).
- No `app/apple-icon.png` yet.
- Brand presentation boards are reference material only and are never placed in
  `public/` or used as a logo.
- Every asset above still requires doctor approval; none is final.

---

## 24. Update procedure

1. Record or change the row here first, with `Source / Status / Current /
Publish`.
2. Promote `Publish` to `YES` only on explicit doctor approval.
3. Then move the approved wording into `messages/en.json` / `messages/ar.json`
   (`fr` when D-019 opens).
4. Never edit page copy before this file is updated.
5. Never ask the doctor to rewrite content that already exists here — only to
   confirm, correct or refuse.

## Phase 4.5 information-architecture decision

Professional Activities & Media was rejected by the doctor and is not a V1
website section. Conference, society, invited-talk, and professional activity
facts may remain inside Biography where appropriate, but no standalone
Professional Activities page or section exists in V1. Section §20 remains the
historical source record for those facts and is not a public route decision.
