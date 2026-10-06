# Section 5 copy — approval list

Every string below is **pending Dr. Aggour's approval**. None of it is live.

- **Staged in:** `messages/pending/en.json`, `messages/pending/ar.json`, and
  `content/pending-copy.ts`.
- **Preview:** run `SHOW_PENDING_COPY=1 pnpm dev` and open the page. The flag
  is ignored when `NODE_ENV=production`, so a production build can never
  publish unapproved wording.
- **Approve:** copy the string into `messages/en.json` + `messages/ar.json`
  (or the content file named below), delete it from the pending file, and
  commit. Approval is a copy-only commit — no component changes.
- **Reject:** delete the string from the pending file.

English and Arabic pending files must stay key-for-key identical.

| # | Item | Lives in | Status |
| --- | --- | --- | --- |
| 1 | Hero plain line (home) | `home.hero.plainLine` | Awaiting approval |
| 2 | Six condition summaries (home list + conditions index cards) | — (removed) | Superseded — home cards and the `/conditions` list now show the approved document's own lead paragraph, and no `home.conditions.items` keys remain |
| 3 | EN procedure labels: `LEA` → *Liquid embolic agents (LEA)*, `Vessel sacrifice` → *Closing the affected vessel when appropriate* | — (removed) | Superseded — the CV-based condition module (`content/conditions.ts`) was deleted; procedures now come from the approved document |
| 4 | Biography preview paragraph (home) | `home.biography.body` | Awaiting approval |
| 5 | Biography overview paragraph (biography page) | `content/pending-copy.ts` → `pendingBiographyIntro` | Awaiting approval |
| 6 | Emergency notice body | `content.conditions.emergencyBody` | Awaiting approval |

## Exact wording under review

**1. Hero plain line**

- EN: Treating brain and spine blood-vessel conditions through a small catheter,
  and without open surgery where suitable.
- AR: علاج أمراض أوعية المخ والعمود الفقري بالقسطرة، وبدون جراحة مفتوحة في الحالات المناسبة.

**2. Condition summaries (EN | AR)**

Superseded: the home cards and the `/conditions` list now read
`getConditionListing()` from `content/patient-conditions.ts`, which shows each
condition's approved lead paragraph verbatim. No short-summary keys exist.

**3. Procedure labels (EN only)**

Superseded: the CV-based condition module that carried these labels was removed,
and the approved document is the only condition source now.

**4 / 5. Biography**

- AR: الدكتور محمد عجور استشاري الأشعة العصبية التداخلية، بخبرة تزيد على تسعة عشر عامًا في علاج أمراض الأوعية الدموية الدماغية والشوكية بالقسطرة وبدون جراحة مفتوحة.
- EN: the approved opening ("Dr. Mohamed Aggour is a Consultant Interventional
  Neuroradiologist with") plus the proposed tail: *more than nineteen years of
  experience treating brain and spine blood-vessel diseases through
  catheter-based, minimally invasive procedures.* The spec quoted the tail with
  an ellipsis, so the opening above is inferred from the approved sentence —
  confirm it before approving.

**6. Emergency notice body**

- EN: If symptoms appear suddenly (weakness, face drooping, trouble speaking,
  or a severe sudden headache), call your local emergency number immediately.
  Remote consultation is not for emergencies.
- AR: إذا ظهرت الأعراض فجأة، مثل ضعف في أحد الأطراف أو ميل في الوجه أو صعوبة في
  الكلام أو صداع شديد مفاجئ، اتصل برقم الطوارئ المحلي فورًا. الاستشارة عن بُعد
  غير مخصّصة للحالات الطارئة.

> **Before approving #6:** `tests/medical.content.spec.ts` asserts that
> `.condition-emergency` contains the currently approved wording ("not an
> emergency service", "local emergency services", "nearest hospital",
> "Do not wait" and their Arabic equivalents). The proposed wording does not.
> Approving it therefore requires a matching test update, which is deliberately
> not made here. Ask first.
