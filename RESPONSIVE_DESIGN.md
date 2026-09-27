# Responsive Design — Non-Negotiable

Responsive quality is one of the highest-priority requirements.

## 1. Mobile-first
Build from the smallest practical viewport upward.

Never:
- build desktop first and shrink it later
- use fixed desktop hero dimensions
- assume one phone width

## 2. Required viewport matrix
Test at minimum:

320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560 CSS px.

Also test:
- portrait
- mobile landscape
- Arabic RTL
- English LTR
- browser zoom at 200%

## 3. Layout rules
Prefer:
- fluid widths
- `min()`, `max()`, `clamp()`, `minmax()`
- Grid/Flexbox
- container max-widths
- intrinsic sizing

Avoid:
- hard-coded widths for structural layout
- fixed heights for text sections
- structural `left: 50%` positioning when Grid/Flex can solve it
- overflow hidden that hides real content
- viewport math that causes horizontal scrolling

## 4. Viewport height
Avoid relying on `100vh` for mobile full-screen layouts.
Prefer `min-height: 100svh` or flexible height strategies.

## 5. Safe areas
Use safe-area insets when controls can reach device edges.

## 6. Typography
Use fluid sizing where useful:
```css
font-size: clamp(min, preferred, max);
```

Large decorative text such as `AGGOUR` must never control structural layout.
It may shrink or disappear at narrow widths.

## 7. Hero
At narrow widths:
- stack content naturally
- keep the portrait visible
- keep the professional title readable
- keep the CTA visible
- reduce/remove decorative background text when needed
- never let decorative layers hide critical content

## 8. Media
Use `aspect-ratio`, responsive `sizes`, width/height metadata and deliberate object-fit behavior.
Never allow media loading to cause layout shift.

## 9. Navigation
Mobile navigation must fit the viewport, support keyboard access, use large targets and support RTL correctly.

## 10. Forms
At mobile widths:
- one-column by default
- visible labels
- full-width usable inputs
- naturally wrapping error messages
- file controls that do not overflow
- comfortable buttons
- no hover-only critical information

## 11. Breakpoints
Use a small set of content-driven breakpoints. Do not create a breakpoint for every device model.

## 12. No horizontal overflow
Before release, verify that the page does not produce horizontal scrolling.

## 13. Accessibility under responsive changes
Never allow critical content to disappear or become unusable on smaller screens.

## 14. Acceptance
A page passes only when it remains readable, reachable, non-overlapping, visually intentional, RTL-correct and stable while media loads across the required matrix.
