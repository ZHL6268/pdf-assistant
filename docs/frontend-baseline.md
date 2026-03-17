# Frontend Baseline

This document captures how the current frontend has been aligned to the supplied PRD/TDD while the project gradually replaces fake frontend workflows with real Supabase-backed infrastructure.

## Interpretation

- Keep the existing repository and tech stack intact for now.
- Use the documented MVP page map as the source of truth for UI structure.
- Preserve the original visual baseline while moving real integrations behind clear service boundaries.
- Reshape the frontend so later implementation can proceed page by page and module by module.

## Current UI baseline

- The active UI shell still preserves the original visual baseline
- `src/App.tsx` now acts as an application shell instead of owning all business logic
- Real auth and document services now sit behind dedicated provider, hook, and service layers

## Engineering adjustments

- API boundary placeholders added under `src/types/api.ts`
- Route and environment conventions added under `src/config`
- App-wide constants added under `src/constants`
- Formal routing now runs through `react-router-dom`
- Real auth now runs through Supabase via `src/providers/auth-session-provider.tsx`
- Real document upload/listing now runs through `src/services/document-service.ts`
- `src/index.css` remains minimal so the original Tailwind utility layout renders unchanged

## Explicit non-goals

- No real document chat yet
- No vector retrieval yet

## Phase 2 Completion

Phase 2 app-shell cleanup is complete:

- preserve the original single-file visual baseline
- keep shared engineering foundations in separate modules
- remove dead UI modules left over from earlier refactors
- drive page transitions from shared route configuration
- avoid dead-end placeholder `#` navigation in the live shell
- keep browser document titles aligned with the active screen
- add local auth session state and protected-page guards without changing the layout
- support both login and signup entry points with post-auth redirect intent
- move dashboard/detail demo content into dedicated state modules
- split page templates and reusable display blocks out of `App.tsx` while preserving the same UI
- centralize screen flow, auth redirect, and shell actions into a dedicated app-flow hook
- expose dashboard/detail display data through dedicated view-model hooks instead of direct state imports
- expose user-facing profile text through a dedicated profile view-model instead of passing raw auth user data through the shell
- move demo auth-session persistence and session construction behind dedicated service modules

Router cleanup completed after Phase 6:

- the temporary custom `history + screen` navigation layer has been removed
- route protection and auth redirect intent now live in `react-router-dom`
- document detail now uses a dynamic route segment instead of a hard-coded demo path

## Phase 3 Completion

Phase 3 document-management frontend MVP is complete:

- make the dashboard upload CTA open a real local file picker
- validate selected files against PDF type and file-size limits
- persist uploaded document metadata into a local document library
- synchronize the active document between dashboard and detail page
- keep the browser title aligned with the active document while on detail
- keep the existing visual baseline unchanged while making the workflow testable

## Current Phase Status

Phase 4 is complete:

- local fake auth has been replaced by Supabase Auth session handling
- auth state is centralized in a shared provider
- the project now includes a first database migration for `profiles`, `documents`, and `messages`
- missing-environment and auth failure states are surfaced clearly in the UI

Phase 5 is complete:

- the local document library has been replaced by real `documents` table reads
- PDF uploads are routed to Supabase Storage
- a second migration now provisions the `documents` storage bucket and policies
- dashboard reads and uploads now use real backend data

Phase 6 is in progress:

- a Supabase Edge Function now owns PDF text extraction and summary generation
- uploads move through real `uploaded / processing / complete / failed` states
- document detail now prefers real `summary` data from the database
- insight cards and chat remain demo content until the next phase
