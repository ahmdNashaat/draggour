# Design System

## Visual objective
The site should feel:
- Elegant
- Professional
- Calm
- High-end
- Editorial/institutional where appropriate
- Medical without looking like a generic hospital template

Authority should come from restraint.

## Current implementation (Source of Truth)
The visual system is implemented in `globals.css` using CSS custom properties.

**Colors**
* Primary Navy: `#0b2a44` (`--color-navy-950`)
* Accent Terracotta: `#c44e2f` (`--color-red-700`)
* Accent on Dark (muted rose): `#e5a4a8` (`--color-red-200`)
* Accent for Small Text (high contrast): `#6e252c` (`--color-red-900`)
* Background Surface: `#f7f5f0` (`--color-neutral-50` / `--color-surface`); Subtle surface: `#eeebe3` (`--color-surface-subtle`); Cool surface: `#dde5ec` (`--color-surface-cool`, reserved for physician-facing sections such as E-learning)
* Primary/Dark Text: `#18212b` (`--color-neutral-900`)
* Secondary Text: `#52606d` (`--color-neutral-600`)
* On Dark: `#f7f8fa` (`--color-on-dark`)
* Borders/Lines: `#d0c8bc` (`--color-line`), `#b5ab98` (`--color-line-strong`) — warm stone, darkened from the old cool `#d9e0e7`/`#b8c4cf` so boundaries read on warm surfaces (UI/UX C2/L1). The portrait placeholder keeps the literal cool `#b8c4cf` because it sits on a cool gradient.

**Typography**
* English Display: `Libre Baskerville` (Serif)
* English Body: `IBM Plex Sans` (Sans-serif)
* Arabic Display: `Noto Naskh Arabic` (Serif-style)
* Arabic Body: `IBM Plex Sans Arabic` (Sans-serif)

**Spacing Scale (px equivalent at 16px base)**
* `--space-1`: 6px (`0.375rem`)
* `--space-2`: 10px (`0.625rem`)
* `--space-3`: 14px (`0.875rem`)
* `--space-4`: 20px (`1.25rem`)
* `--space-5`: 28px (`1.75rem`)
* `--space-6`: 40px (`2.5rem`)
* `--space-7`: 56px (`3.5rem`)
* `--space-8`: 80px (`5rem`)

**Breakpoints (Desktop-first approach)**
* `59.999rem` (~960px): Tablet landscape / Nav collapse
* `47.999rem` (~768px): Tablet portrait / 2-col to 1-col grids
* `35.999rem` (~576px): Large mobile / Fine-grained grid collapse

## Typography
Use:
- Display/editorial type where approved for identity moments
- Clean sans-serif for body/interface

Requirements:
- Proper Arabic font selection and rendering
- Test long Arabic strings and mixed-direction content
- Do not fake unsupported weights/styles
- Use fluid type sizing where useful
- Never let typography require a fixed section height

Recommended pattern:
```css
font-size: clamp(min, preferred, max);
```

## Layout
- Mobile-first
- Centered containers with sensible max-widths
- CSS Grid/Flexbox for structure
- Absolute positioning only for decorative/intentional overlays
- Breathable spacing
- Consistent spacing tokens

## Buttons
- Strong visual hierarchy
- Visible focus state
- Comfortable touch target
- No tiny mobile text controls
- Primary CTA recognizable without overwhelming every section

### Levels (as implemented in `globals.css`)
1. **Solid primary** (`.button--primary`) — navy fill; header CTA, hero, in-page CTAs.
2. **Inverse solid** (`.button--light`) — for navy surfaces (consultation band); hover turns it into an outlined button.
3. **Outlined quiet** (`.button--quiet`) — surface fill, `--color-line-strong` border; fills navy on hover. Reserved: no V1 instance yet.
4. **Text / arrow link** (`.text-link`, `.arrow-link`) — underlined navy text for secondary actions.
5. **Nav / footer link** — small bold labels in header and footer.

CTA *wording* unification across header / hero / band is a client-copy decision and is still pending.

### States (UI/UX committee K6)

| State | Primary | Light (on navy) | Quiet (outlined) |
|---|---|---|---|
| Default | bg `#0b2a44`, text `#f7f8fa` (13.8:1) | bg `#f7f8fa`, text `#0b2a44` | surface bg, `#b5ab98` border, navy text |
| Hover / focus-visible | bg `#a8401f`, text `#ffffff` (6.1:1) | transparent bg, `on-dark` border + text | navy fill, `on-dark` text |
| Pressed | `transform: scale(0.98)` | same | same |
| Disabled | neutral grey `#52606d` fill, `on-dark` text, 50% opacity, `cursor: not-allowed`; hover/focus may not light it up (disabled contrast is WCAG-exempt) | same | same |

| State | Text / arrow link | Header nav link | Footer link |
|---|---|---|---|
| Default | navy `#0b2a44`, underline `--link-underline-thickness` (2px) at `--link-underline-offset` (0.2em) | `#52606d` | `rgb(247 248 250 / 78%)` on ink |
| Hover / focus-visible | colour `#6e252c` (≈9:1); arrow icon nudges 0.25rem | `#6e252c` (≈9:1 on cream) | `#e5a4a8` (≈8.7:1 on `#061826`) |
| Active page | — | navy, coral underline | — |

Shared focus ring: 2px `#0b2a44` outline, 3px offset (global `:focus-visible`); `#f7f8fa` ring on navy surfaces. Directional arrows are logical glyphs: → in LTR, `scaleX(-1)` to ← in RTL. Hover never changes layout; all state transitions stay within `--duration-fast`/`--duration-standard`.

## Cards
Use cards only when they clarify content. Avoid turning every section into cards.

One family, one radius (`--radius-card`, 1rem), three variants (UI/UX committee K2):
- **Flat** — 1px `--color-line` border, no shadow: condition cards (hover fills navy).
- **Raised** — border + `--shadow-soft`: consultation panels, foundation card.
- **Dark** — navy fill: promoted learning card (hover coral).

Card arrows share the horizontal → glyph (mirrored ← in RTL) and the `--color-navy-950-a60` resting colour (4.02:1, above the 3:1 non-text minimum). The arrow follows its description (12px below, never pushed to the card floor) so short cards keep their text and arrow as one unit (S7 follow-up); the promoted dark card scales its arrow with the card (`clamp(1.125rem, 2vw, 1.5rem)`) to hold the family's optical weight beside its larger icon and title.

## External link rows
Contact rows (and any title-over-URL link row) keep one hierarchy: the title leads in display serif with the arrow on its own line; the URL is supporting metadata — body sans, `0.9375rem`, `--color-neutral-600` (5.9:1), no resting underline (the underline is a hover/focus affordance). Long URLs wrap at their separators (`<wbr>` after `-` and `/`, `overflow-wrap: break-word`) instead of splitting mid-word, and stay one bidi-isolated LTR run (`bdi`) in the RTL layout.

## Imagery
The doctor's portrait is a primary brand asset.
- Use high-resolution source for final launch
- Prevent layout shift with known dimensions/aspect ratio
- Optimize images
- Never stretch the face
- Use meaningful alt text when informative

## Motion
Default: none or very subtle.

Allowed:
- small state transitions
- hover/focus feedback
- modest opacity/transform transitions

Avoid:
- continuous large-scale animation
- particle fields
- heavy parallax
- WebGL/Three.js
- motion that interferes with reading

Honor `prefers-reduced-motion`.

## RTL/LTR
Use logical properties:
- `margin-inline-*`
- `padding-inline-*`
- `inset-inline-*`

Do not write structural CSS that assumes LTR.
Arabic must be a genuine RTL experience.

## Link underlines (UI/UX L4/T6)
Every underlined text link uses one underline language: `--link-underline-thickness` (2px) and `--link-underline-offset` (0.2em). This covers `.text-link`/`.arrow-link`, section-heading links, condition-index titles, conditions jump-index links, "other condition" links, the hub-row Read more/Show less toggle, and contact-URL hover underlines. In RTL, `text-decoration-skip-ink: none` lets the underline cross Arabic descenders instead of breaking around every letter with a bowl.

## Two-column grid token (UI/UX S5)
Title-in-column / content-in-column pages share one grid: `minmax(0, 0.85fr) minmax(0, 1.15fr)` with `gap: clamp(2rem, 8vw, 8rem)`. The content column therefore starts at ≈48% of the container on Home biography, the Home e-learning band, Conditions hub rows, Contact, E-learning and Legal pages alike, and the footer's primary-navigation column starts on the same line (footer uses `1.73fr 0.89fr 1fr` with its own gap; its Legal column sits on the 75% quarter line — v17 decision, D-058). The Remote Consultation card pair is exempt by design (two equal cards, not a title/content split). Conditions rows cap their reading column at 42rem. The committee's v17 ruling settled S3 against S5 on columns: the biography grid no longer overrides the gap to 64–80px, so S5 alignment wins across pages and S3's remaining scope is the typographic ramp (lead / rest / link) plus the ~25% tighter vertical padding.

## Sticky title columns (UI/UX S4)
At ≥64rem the title column of a title/content split holds under the sticky header (`position: sticky; top: 6rem`): home biography heading, `.content-section__inner` first column (Contact, E-learning, Legal), and each Conditions-hub condition title above its own paragraph. Below 64rem nothing is sticky.

## Section separators (UI/UX L2)
One separator means per boundary: where two adjacent sections have different backgrounds, the background change is the separator and no hairline is drawn (home hero → biography → conditions → learning; content-hero → body sections on E-learning, Legal, Conditions, condition detail). Where the backgrounds are the same, a hairline is the separator (content-hero → `content-section--surface` on Contact, Biography, condition detail; chained same-surface sections on Legal; rows inside the Conditions index). The site breadcrumb band keeps its bottom hairline because the hero below it shares the same surface.

## Closing rhythm before the footer (UI/UX S6)
Two tiers, each matching the page's opening rhythm: editorial pages (Home, E-learning, Contact) close at `--space-section`; compact pages (Biography overview, Conditions hub disclaimer, Remote Consultation shell) close at `--space-section-compact`. No page closes on an ad-hoc value.

## Breadcrumbs (UI/UX K9/A4)
One rule: every internal page shows the `.site-breadcrumb` band (Home → page title) above its hero; the Home page itself shows none. Breadcrumb links are touch targets of at least 44px (`min-block-size: 2.75rem` on inline-flex) without changing the visible 13px type size.

## Portrait treatment (UI/UX K10/M1/S2, P0 fix in v17)
Two intentional variants of the same approved cut-out PNG:
- **Home hero** — the *container* carries the enlargement, never the image: the layout cell keeps the exact `2/3` footprint (`.home-hero__portrait`), and the clip box (`.home-hero__portrait-frame`) grows around it (`inset-inline: -6%`, bottom anchored, `aspect-ratio: 2/3` → +12% upward) with a 1px padding inset. The PNG renders untransformed and fills that enlarged box, so its transparent margins stay between the subject and every clip edge — no hairline or sleeve is ever severed (P0 regression guard: opaque bounds ≥0.5px inside the frame at 360/390/1024/1440/1920 in both locales, verified by alpha scan). `.home-hero { overflow-x: clip }` keeps the phone-width spill from becoming page scroll; the visible link → head gap on phones stays in the committee's 70–80px band via the content column's `padding-block-end`.
- **Biography page** — the unframed PNG inside the hero grid with the soft card shadow (`.content-hero__portrait`).

Never stretch the face; both variants preserve the source aspect ratio.

## Arabic heading weight (UI/UX T3)
Noto Naskh Arabic ships 400/500/600/700. English display headings run at 400; Arabic display headings — the home H1, content/consultation H1s, section H2s and the foundation title — run at **500**, which keeps the Naskh forms clear at ≥40px without the heavy 600 texture. Smaller Arabic UI text (card titles, footer/nav links, eyebrows) keeps `--font-weight-heading` (600). Confirmed by an A/B render of all three display styles at 500 vs 600 (`screenshots/uiux-closure-2026-10-22/t3-A|B-*`): 500 keeps the counters of ع/و/ي open and the joins crisp where 600 crowds them.

## Footer grid (UI/UX K8/S5, v17)
`.site-footer__main` is `minmax(0, 1.73fr) minmax(0, 0.89fr) minmax(0, 1fr)`: the identity column holds the shared ≈48% line (nav starts at 48.0% at 1440) and the Legal column starts on the **75% quarter line** (74.8–75% at 1440, ≈74.7% at 1024–1280) — the committee's v17 answer to the previously open sub-point, without moving the nav column. The nav column keeps two link columns down to the smallest phone (identity spans the full row below 48rem); only the three-column card grids collapse to one column under 36rem.

## Conditions hub controls (UI/UX M2/M3)
- **Chips index (M2)** — below 60rem the jump chips stay a single scroll-snapped line with `scrollbar-width: none` + `::-webkit-scrollbar { display: none }` and a direction-aware inline-end fade (`mask-image: linear-gradient(to right|left, … 3rem)`, mirrored by `[dir="rtl"]`), so the row reads as a peeking carousel instead of a cut-off list with browser chrome. At ≥60rem the list becomes the numbered two-column jump list and the fade steps aside (`mask-image: none`).
- **Row collapse toggle (M3)** — "Read more / Show less" wears the site's text-link face: navy underlined text (L4 tokens, weight 700) plus the `arrow-link` chevron (`aria-hidden` SVG mirrored in RTL via `--icon-mirror`), no border, no fill, `min-height: 2.75rem` so the touch target stays ≥44px. It remains a `<button>` with `aria-expanded`/`aria-controls`; the accessible name is the label text only.
