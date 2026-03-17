# AI PDF Assistant

AI PDF Assistant is an AI SaaS MVP focused on helping users upload PDFs, generate summaries, and ask grounded questions about a single document.

This repository has been progressively refactored from a single-file demo into a more maintainable production-style codebase with real auth, storage, summaries, document chat, and synchronized project documentation.

More project documentation:

- [PRD](./docs/prd.md)
- [Architecture](./docs/architecture.md)
- [Deployment Checklist](./docs/deployment-checklist.md)
- [Frontend Baseline](./docs/frontend-baseline.md)
- [Phase 1 Plan](./docs/phase-1-plan.md)
- [Phase 2 Plan](./docs/phase-2-plan.md)
- [Phase 3 Plan](./docs/phase-3-plan.md)
- [Phase 4 Plan](./docs/phase-4-plan.md)
- [Phase 5 Plan](./docs/phase-5-plan.md)
- [Phase 6 Plan](./docs/phase-6-plan.md)
- [Phase 7 Plan](./docs/phase-7-plan.md)
- [Phase 8 Plan](./docs/phase-8-plan.md)

## Project Overview

The project is designed as a production-style AI PDF Assistant MVP. The core product value is:

- users authenticate into a protected workspace
- users upload PDFs and track document processing state
- users review AI-generated summaries on the document detail page
- users ask grounded questions about a single document and revisit chat history later

Current implementation status:

- Phase 1 completed: engineering baseline
- Phase 2 completed: app shell and router cleanup
- Phase 3 completed: local document-management MVP
- Phase 4 completed: real Supabase auth and database baseline
- Phase 5 completed: real document upload and dashboard data
- Phase 6 completed: real PDF summary generation
- Phase 7 completed: real single-document chat
- Phase 8 in progress: hardening, cleanup, and delivery readiness

## Running Locally

Requirements:

- Node.js 18+
- npm

Commands:

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Supabase Setup

Before testing the real backend flows, complete the following:

1. Create `.env.local`
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run these migrations in Supabase SQL Editor:
   - [`supabase/migrations/0001_initial_schema.sql`](./supabase/migrations/0001_initial_schema.sql)
   - [`supabase/migrations/0002_document_storage.sql`](./supabase/migrations/0002_document_storage.sql)
   - [`supabase/migrations/0003_document_processing_error.sql`](./supabase/migrations/0003_document_processing_error.sql)
   - [`supabase/migrations/0004_message_indexes.sql`](./supabase/migrations/0004_message_indexes.sql)
4. Deploy these Edge Functions:
   - `process-document`
   - `chat-document`
5. Configure Supabase secrets:
   - `OPENAI_API_KEY`
   - optional `OPENAI_MODEL`

For the exact step-by-step setup order, use the [Deployment Checklist](./docs/deployment-checklist.md).

## Tech Stack

Current stack:

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Lucide React
- Motion
- Supabase Auth / Database / Storage / Functions
- OpenAI API via Supabase Edge Functions

Planned long-term target stack:

- Next.js
- Supabase Auth / Database / Storage
- Supabase Edge Functions
- OpenAI API
- Vercel
