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
* Accent for Small Text (high contrast): `#7b2a31` (`--color-red-900`)
* Background Surface: `#f7f5f0` (`--color-neutral-50` / `--color-surface`); Subtle surface: `#eeebe3` (`--color-surface-subtle`); Cool surface: `#dde5ec` (`--color-surface-cool`, reserved for physician-facing sections such as E-learning)
* Primary/Dark Text: `#18212b` (`--color-neutral-900`)
* Secondary Text: `#52606d` (`--color-neutral-600`)
* On Dark: `#f7f8fa` (`--color-on-dark`)
* Borders/Lines: `#d9e0e7` (`--color-line`), `#b8c4cf` (`--color-line-strong`)

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

## Cards
Use cards only when they clarify content. Avoid turning every section into cards.

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
