# Dr. Aggour Website — Codex Project Constitution

## Role
Codex is the implementation team for this project.

These root reference files are the working specification. Read them before making architectural or UI changes.

## Required reading order
1. `AGENTS.md`
2. `PROJECT_BRIEF.md`
3. `ARCHITECTURE.md`
4. `DESIGN_SYSTEM.md`
5. `RESPONSIVE_DESIGN.md`
6. `SEO.md`
7. `CONSULTATION_FLOW.md`
8. `SECURITY_AND_PRIVACY.md`
9. `INTEGRATIONS.md`
10. `QA_AND_ACCEPTANCE.md`
11. `DECISIONS.md`

Do not scan the entire repository on every task. Start with these files, inspect only relevant source files, implement the smallest correct change, then run targeted validation.

## Source-of-truth hierarchy
1. New explicit user/client decision in the current task.
2. `DECISIONS.md`.
3. `PROJECT_BRIEF.md`.
4. Other reference files.
5. Existing code, only when it does not conflict with the current specification.

If existing code conflicts with these documents, do not silently preserve the old behavior. Flag the conflict and update the implementation to the current decision.

## Core product principle
Build a high-end professional medical website, NOT a patient portal and NOT a complex medical management platform.

Desired experience:
- Elegant
- Professional
- Calm
- Minimal
- Highly credible
- Fast
- Excellent on mobile
- SEO-first
- Simple to operate

Avoid feature inflation.

## Current V1 non-goals
Do NOT introduce these unless explicitly requested:
- Patient login/accounts
- Patient portal
- Custom appointment-management system
- Custom payment gateway
- Admin dashboard UI
- Full CMS
- Research management platform
- Full medical records system
- Public medical-file storage
- Heavy 3D/WebGL
- Animation-heavy interactions

## Current V1 consultation model
The website collects a request, routes the user, validates the request, optionally accepts up to 3 medical attachments, notifies the operational person, and triggers WhatsApp confirmation/automation.

Human staff handle review, final appointment coordination and payment.

The website must NOT imply that an appointment is confirmed before staff confirm it.

## Architecture principle
Prefer managed/serverless services and the simplest system that satisfies the real requirement.

V1 should NOT use a database while the client requires:
- no request history
- no admin request management
- no patient accounts
- no internal booking system
- no internal payment system

If a database becomes necessary, record the change in `DECISIONS.md` before implementing it.

## Coding rules
- TypeScript strict mode.
- Prefer small, composable components.
- Keep content/configuration separate from presentation.
- Validate all user input server-side.
- Never expose secrets to the client.
- Never log medical/personal form payloads.
- Avoid unnecessary dependencies.
- Avoid premature generalization.
- Do not use fixed desktop dimensions as the basis of layout.
- Use CSS logical properties for RTL/LTR compatibility.
- Use semantic HTML.
- Keep forms accessible.
- Preserve progressive enhancement where practical.

## Responsive requirement — NON-NEGOTIABLE
Responsive behavior is a release requirement, not a polish phase.

Minimum widths to verify:
320, 360, 375, 390, 412, 430, 480, 768, 834, 1024, 1280, 1440, 1920, 2560 CSS px.

No:
- horizontal page scrolling
- clipped headings
- overlapping hero content
- unreadable Arabic
- broken language controls
- buttons outside viewport
- fixed-height sections that cut content
- absolute-positioned content responsible for structural layout

See `RESPONSIVE_DESIGN.md`.

## SEO requirement — NON-NEGOTIABLE
SEO is part of architecture, not post-launch cleanup.

Every indexable page must have intentional:
- title
- description
- canonical
- language metadata
- Open Graph data
- structured data where relevant
- internal links
- indexability rules

Build the site as the official digital entity for Dr. Mohamed Aggour.

Do NOT claim guaranteed #1 rankings. The goal is the strongest technically sound and authoritative presence possible.

See `SEO.md`.

## Consultation implementation rule
Do not lock the WhatsApp provider or file-transfer provider into UI components.

Create an integration layer/adapter so provider details live outside presentation components.

Conceptual operations:
- `submitConsultation()`
- `sendWhatsAppNotification()`
- `sendStaffNotification()`
- `handleWhatsAppWebhook()`

## When a new requirement appears
Before coding:
1. Check whether it belongs to V1.
2. Check whether it changes architecture.
3. If architectural, update `DECISIONS.md`.
4. If it introduces data storage, privacy risk, a new third-party service, or a new user workflow, do not hide it inside a UI patch.

## Definition of done
A change is not done until:
- relevant tests pass
- lint/type checks pass
- responsive behavior is checked
- accessibility is checked
- SEO impact is checked
- no unnecessary dependency was added
- no project rule was violated

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
