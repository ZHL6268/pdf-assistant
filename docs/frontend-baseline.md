# Frontend Baseline

This document explains how the frontend has been aligned to the supplied PRD/TDD while fake workflows were progressively replaced by real Supabase-backed infrastructure.

## Interpretation

- Keep the existing repository and stack intact during the MVP build-out
- Use the documented MVP page map as the source of truth
- Preserve the original visual baseline while moving real behavior behind clear service boundaries
- Reshape the frontend so future work can continue page by page and module by module

## Current UI Baseline

- The active UI still preserves the original visual language
- `src/App.tsx` now acts as an application shell instead of owning all business logic
- Real auth, document services, summaries, and document chat now sit behind dedicated provider, hook, and service layers

## Engineering Adjustments

- shared route and environment conventions live under `src/config`
- app-wide constants live under `src/constants`
- real auth runs through Supabase via `src/providers/auth-session-provider.tsx`
- real document upload and listing run through `src/services/document-service.ts`
- real message history and document chat run through `src/services/message-service.ts`
- `src/index.css` remains minimal so the original Tailwind utility layout renders unchanged

## Explicit Non-Goals

- no vector retrieval yet
- no multi-document search yet
- no collaborative workspace features yet

## Phase Status

### Phase 2 Complete

- removed the temporary custom navigation layer
- moved route protection and post-auth redirect handling into `react-router-dom`
- moved page templates and reusable display blocks out of `App.tsx`
- centralized state and view-model boundaries for dashboard, detail, and user profile display

### Phase 3 Complete

- dashboard upload opens a real local file picker
- file type and file size validation are enforced in the UI
- active document continuity exists between dashboard and detail

### Phase 4 Complete

- local fake auth was replaced with Supabase Auth session handling
- auth state is centralized in a shared provider
- the project now includes baseline schema and RLS for `profiles`, `documents`, and `messages`

### Phase 5 Complete

- the local document library was replaced with real `documents` table reads
- PDF uploads now go to Supabase Storage
- dashboard reads and uploads use real backend data

### Phase 6 Complete

- a Supabase Edge Function owns summary generation
- uploads move through real `uploaded / processing / complete / failed` states
- document detail prefers real `summary` data from the database

### Phase 7 Complete

- document detail chat loads real `messages` history per document
- a dedicated Edge Function answers grounded single-document questions
- question and answer pairs are persisted to `messages`

### Phase 8 In Progress

- non-functional CTA surfaces are being converted into explicit read-only states
- auth form demo defaults have been removed to reduce testing noise
- remaining demo scaffolding is being trimmed where it no longer helps maintenance
