# Architecture

## 1. Technology Choices and Rationale

### Current Stack

- React 19
  - The app already runs on React and benefits from a component-driven UI structure.
- TypeScript
  - Enforces clearer boundaries across services, hooks, and shared models.
- Vite
  - Keeps local iteration and production builds fast.
- Tailwind CSS v4
  - Preserves the current visual baseline while keeping styling changes lightweight.
- React Router
  - Handles real routing, protected pages, and post-auth redirects.
- Supabase Auth / Database / Storage / Functions
  - Powers authentication, persistence, file storage, and backend workflows.
- OpenAI API
  - Used through Supabase Edge Functions for summaries and single-document chat.
- Lucide React and Motion
  - Support icons and lightweight transitions without large custom UI overhead.

### Target Stack Direction

- Next.js
  - Better long-term home for frontend and backend boundaries if the project grows.
- Supabase Auth / Database / Storage
  - Remains the primary backend platform for MVP operations.
- Supabase Edge Functions
  - Continues to host document-processing and chat workflows.
- OpenAI API
  - Continues to power document-level intelligence.
- Vercel
  - Natural deployment target if the app later moves to Next.js.

### Why the Project Has Not Migrated Yet

The current strategy has been to stabilize the MVP in place first:

- Phase 1 established engineering conventions
- Phase 2 stabilized routing and app-shell boundaries
- Phase 3 made document management interactive
- Phase 4 introduced real auth and schema
- Phase 5 connected real upload and document storage
- Phase 6 introduced real summary generation
- Phase 7 introduced real document chat
- Phase 8 is reducing placeholder interactions and tightening delivery readiness

That sequence reduced rework while the product moved from demo behavior to real backend-backed capability.

## 2. Project Structure

### Current Repository Structure

```text
ai-pdf-assistant/
├── docs/
│   ├── architecture.md
│   ├── deployment-checklist.md
│   ├── frontend-baseline.md
│   ├── phase-1-plan.md
│   ├── phase-2-plan.md
│   ├── phase-3-plan.md
│   ├── phase-4-plan.md
│   ├── phase-5-plan.md
│   ├── phase-6-plan.md
│   ├── phase-7-plan.md
│   ├── phase-8-plan.md
│   └── prd.md
├── src/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── screens/
│   ├── services/
│   ├── state/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   ├── chat-document/
│   │   └── process-document/
│   └── migrations/
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Target Structure Direction

```text
ai-pdf-assistant/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   ├── repositories/
│   ├── prompts/
│   ├── types/
│   └── utils/
├── supabase/
│   ├── functions/
│   └── migrations/
├── docs/
└── README.md
```

The current repository is intentionally still simple. The important point is that the project now has clear boundaries rather than a single-file demo architecture.

## 3. Core Modules

### Authentication

Responsibilities:

- sign up
- sign in
- sign out
- session hydration
- protected route access

Current implementation:

- provider: `src/providers/auth-session-provider.tsx`
- hook surface: `src/hooks/use-auth-session.ts`
- auth redirects handled at the router layer

### Document Management

Responsibilities:

- PDF upload
- validation
- dashboard listing
- active document continuity between dashboard and detail

Current implementation:

- `src/services/document-service.ts`
- `src/hooks/use-document-library.ts`
- files stored in Supabase Storage
- metadata stored in `documents`

### Summary Processing

Responsibilities:

- trigger document processing
- generate a summary
- persist result and status

Current implementation:

- `supabase/functions/process-document/index.ts`
- PDF is uploaded to OpenAI Files API
- summary is generated through Responses API
- results are stored in `documents.summary`

### Document Chat

Responsibilities:

- load message history
- send a question for one document
- return a grounded answer
- persist both user and assistant messages

Current implementation:

- frontend service: `src/services/message-service.ts`
- frontend hook: `src/hooks/use-document-chat.ts`
- backend function: `supabase/functions/chat-document/index.ts`
- history stored in `messages`

### UI Layer

Responsibilities:

- compose screens
- keep styling consistent with the original baseline
- avoid putting backend logic directly in presentational components

Current implementation:

- pages live in `src/screens`
- shared display blocks live in `src/components`

## 4. Data Model Design

### profiles

Purpose:

- stores user profile information associated with auth users

Current fields:

- `id`
- `email`
- `full_name`
- `created_at`

### documents

Purpose:

- stores uploaded document metadata, summary output, and processing state

Current fields:

- `id`
- `user_id`
- `title`
- `file_path`
- `extracted_text`
- `summary`
- `processing_status`
- `processing_error`
- `created_at`

### messages

Purpose:

- stores document-specific chat history

Current fields:

- `id`
- `document_id`
- `user_id`
- `role`
- `content`
- `created_at`

### Relationships

- one `profile` owns many `documents`
- one `profile` owns many `messages`
- one `document` owns many `messages`

### Access Control

- Row Level Security is enabled
- users can only access their own `profiles`, `documents`, and `messages`
- Edge Functions still validate document ownership explicitly before acting

## 5. Code Standards

- Keep page components focused on composition, not data plumbing
- Keep backend and service logic out of presentational components
- Prefer shared route, config, and type definitions over hardcoded values
- Add comments only where they explain a non-obvious boundary or decision
- Keep git changes small and documentation synchronized with code
- Remove dead code instead of leaving abandoned experimental paths in place
