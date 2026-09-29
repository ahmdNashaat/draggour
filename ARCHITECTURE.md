# Architecture

## 1. Preferred V1 architecture

```text
User
  |
  v
Next.js Website
  |
  +--> Static / server-rendered public pages
  |
  +--> Consultation Form
          |
          +--> server-side validation
          +--> staff notification
          +--> WhatsApp automation
          +--> secure file handling, only if approved
```

V1 intentionally has no application database.

## 2. Recommended stack
- Next.js App Router
- TypeScript
- React Server Components by default
- Client Components only for interactive UI
- Tailwind CSS if appropriate
- Vercel
- Route Handlers/server functions only where required
- Zod or equivalent for server-side validation
- No ORM in V1
- No database client in V1

Official references:
- https://nextjs.org/docs
- https://vercel.com/frameworks/nextjs
- https://vercel.com/kb/vercel-functions

## 3. Rendering strategy
Prefer static generation/cached server rendering for public pages.

Dynamic server logic should be limited to:
- consultation submission
- protected integrations
- webhook handling
- other explicitly justified server actions

Do not turn the whole site into a client-side application.

## 4. Target project structure

```text
/
├── AGENTS.md
├── README.md
├── PROJECT_BRIEF.md
├── ARCHITECTURE.md
├── DESIGN_SYSTEM.md
├── RESPONSIVE_DESIGN.md
├── SEO.md
├── CONSULTATION_FLOW.md
├── SECURITY_AND_PRIVACY.md
├── INTEGRATIONS.md
├── QA_AND_ACCEPTANCE.md
├── DECISIONS.md
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── biography/
│   │   ├── conditions/
│   │   ├── e-learning/
│   │   ├── remote-consultation/
│   │   ├── contact/
│   │   └── legal/
│   └── ...
├── components/
├── content/
├── lib/
│   ├── consultation/
│   ├── integrations/
│   ├── seo/
│   └── validation/
├── public/
└── ...
```

This is a target structure. Adapt to actual project needs without forcing duplicate folders.

## 5. Integration boundary
Keep third-party services behind adapters/interfaces.

Conceptual interfaces:

```ts
interface MessagingProvider {
  sendConfirmation(input: ConfirmationMessage): Promise<void>;
}

interface NotificationProvider {
  notifyStaff(input: StaffNotification): Promise<void>;
}

interface FileProvider {
  createUploadSession(input: UploadRequest): Promise<UploadSession>;
}
```

The UI must not know whether the provider is Meta, another WhatsApp provider, an email vendor, or a managed form service.

## 6. No-database rule
Do not add PostgreSQL/Supabase solely because it is available.

Add a database only if a confirmed requirement appears for persistent request history, admin request management, structured content editing at scale, authentication/roles, status tracking, or another durable application state.

Record the decision before implementation.

## 7. Future V2
Possible later architecture:

```text
Next.js
   |
API / Server Actions
   |
Supabase
   +-- PostgreSQL
   +-- private object storage
   +-- auth
   +-- server-side functions
```

This is intentionally deferred.

## 8. Deployment flow

```text
Local
  ↓
GitHub
  ↓
Vercel Preview
  ↓
Visual + QA approval
  ↓
Production domain
```

Never hard-code production hostnames into components.
