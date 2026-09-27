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

## Current direction
- Strong typography
- Portrait-led identity
- Navy / neutral / restrained red family
- Clean layouts
- Minimal motion
- No animation-heavy presentation
- No heavy 3D requirement

Exact final colors should come from the approved design, not invented per component.

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
