# Manual Screen-Reader Checklist — NVDA & VoiceOver

> Companion to `tests/a11y.axe.spec.ts` (automated). Axe covers structure, names,
> contrast and ARIA validity; it cannot hear what a screen reader actually
> announces. This checklist covers that gap, per the UI/UX committee decision of
> 2026-10-21 (A2 follow-up).
>
> Run once per release candidate, on both locales (`/en`, `/ar`).

## Test matrix

| # | Platform | Screen reader | Browser | Locale coverage |
|---|----------|---------------|---------|-----------------|
| 1 | Windows 10/11 | NVDA (latest) | Chrome | EN + AR |
| 2 | Windows 10/11 | NVDA (latest) | Firefox | EN (smoke) |
| 3 | macOS | VoiceOver (latest) | Safari | EN + AR |
| 4 | iOS | VoiceOver | Safari | EN + AR (spot check) |
| 5 | Android | TalkBack | Chrome | EN + AR (spot check) |

Report each finding as: route + viewport + SR/browser + expected vs actual
announcement. Log results in the release issue; do not "fix" by guessing —
capture the exact announcement string.

---

## 1. Global chrome (every page, both locales)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 1.1 | Load page, press `Tab` once | "Skip to content" link (first stop) | ☐ |
| 1.2 | Activate skip link | Focus moves to `<main>`; next `Tab` reaches header nav, not skipped content | ☐ |
| 1.3 | `Tab` through header | Each nav link announces its visible name only; no duplicate arrows (→/← are `aria-hidden`) | ☐ |
| 1.4 | Language switcher (EN page) | Announces "عربي, Switch to Arabic, link" — visible word «عربي» is inside the accessible name (WCAG 2.5.3, the axe finding) | ☐ |
| 1.5 | Language switcher (AR page) | Announces "English, Switch to English, link"; SR voice switches to Arabic on page load (`lang="ar"` honoured, no letter-by-letter reading) | ☐ |
| 1.6 | Landmark tour (`D` in NVDA, VO rotor landmarks) | banner → navigation → main → contentinfo; exactly one `main` | ☐ |
| 1.7 | Heading outline (`H` / VO rotor headings) | One `h1` per page; no skipped levels; order matches visual order | ☐ |

## 2. Home page (`/`, `/ar`)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 2.1 | Read hero (`Read from here`) | Eyebrow, `h1`, supporting text in visual order; consultation CTA announces as link/button with full visible label | ☐ |
| 2.2 | Enter condition cards list | Announced as list, "list of 10 items"; each card is ONE link whose name = title + description text (P0-K3: description must be inside the link name, read fully, no truncation markers) | ☐ |
| 2.3 | Activate a card | Opens condition detail in same tab; focus lands at top of new page | ☐ |
| 2.4 | Biography section | Heading → paragraphs → "Read the full biography" link name intact | ☐ |
| 2.5 | Learning section | E-learning link announces title + description + "opens in a new tab" hint (sr-only); no stray "↗" characters | ☐ |
| 2.6 | Footer | Address/legal links readable; no bare URLs read character-by-character unless user switches to character mode | ☐ |

## 3. Contact page (`/contact`, `/ar/contact`)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 3.1 | Contact rows | Each row is ONE link: title, → (silent), URL, "opens in a new tab" hint — in that order, single utterance per segment | ☐ |
| 3.2 | URL pronunciation (NVDA) | URL reads as words/abbreviations (e.g. "https colon slash slash linkedin dot com…"), NOT letter-by-letter; `<wbr>` insertions do NOT cause pauses or spell-out mode | ☐ |
| 3.3 | URL in AR locale | `<bdi dir="ltr">` keeps URL as one LTR run; SR does not announce the trailing slash separately or reverse reading order | ☐ |
| 3.4 | Activate row | New tab opens; returning to original tab, focus is where it was | ☐ |

## 4. Conditions hub + detail (`/conditions`, `/conditions/[slug]`)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 4.1 | Hub list | Same single-link-per-card rule as home (title + full description in name) | ☐ |
| 4.2 | Detail page | `h1` condition name; "Medically reviewed by Dr. Mohamed Aggour" review line reads as text, not as a link | ☐ |
| 4.3 | Consultation CTA on detail | Full label; activating it goes to WhatsApp/consultation route; SR announces departure (external link hint if `target="_blank"`) | ☐ |

## 5. Professional pages (`/professional`, `/e-learning`)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 5.1 | E-learning groups | Group headings then links; each link = title + description + new-tab hint | ☐ |
| 5.2 | Primary (dark) e-learning card | Same name structure as secondary cards; rose arrow silent; nothing announced as "promoted" or decorative | ☐ |

## 6. Menu at mobile widths (< 48rem, both locales)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 6.1 | Focus hamburger, `Enter` | Button announces expanded state ("expanded" / "not expanded"); icon swap to ✕ changes nothing in the name | ☐ |
| 6.2 | `Tab` inside open menu | Focus cycles THROUGH header contents only (trap): toggle → nav links → language switcher → back to toggle; never escapes into the page behind | ☐ |
| 6.3 | `Shift+Tab` | Reverse cycle works, wraps to last item | ☐ |
| 6.4 | `Escape` | Menu closes; focus returns to the toggle button; SR announces collapsed state | ☐ |
| 6.5 | Activate link in menu | Menu closes, navigation happens, focus moves with the new page | ☐ |

## 7. Locale-specific pronunciation spot checks

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 7.1 | AR pages, headings | Arabic headings read with Arabic voice; mixed Latin terms (e.g. "e-learning", URLs) read in Latin voice without breaking the sentence | ☐ |
| 7.2 | EN page, «عربي» button | Arabic word pronounced by switching voice, not spelled | ☐ |
| 7.3 | AR page dir=rtl | Reading order follows visual RTL order; punctuation (، . :) attaches to the correct side | ☐ |

## 8. Zoom & reflow (low-vision overlap, 200% and 400%)

| Step | Action | Expected announcement | Done |
|------|--------|----------------------|------|
| 8.1 | 200% text zoom, all core routes | No clipped/overlapping text; all content reachable; SR order unchanged | ☐ |
| 8.2 | 400% zoom (1280px window ≈ 320px layout) | Single-column reflow, no horizontal scroll, menu becomes hamburger and still traps focus | ☐ |

---

## Sign-off rule

A release is screen-reader-clean when: all P1 rows (1.1–1.7, 2.2, 3.1–3.2,
6.1–6.4) pass on matrix rows 1 and 3 (NVDA/Chrome and VoiceOver/Safari, both
locales), and remaining rows pass or have filed issues with severity.

Known limitations to keep in mind while testing:

- Axe already scans 8 routes × 2 locales + open menu on every run; do not
  re-test what it covers (names, roles, landmarks validity, contrast).
- Cold-compile timeouts on first route load are environmental; retry warm.
- The K3 interim summaries read fully today; once permanent summaries are
  written, re-run 2.2/4.1 to confirm the link names still carry full text.
