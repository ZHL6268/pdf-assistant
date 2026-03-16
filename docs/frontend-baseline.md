# Frontend Baseline

This document captures how the current frontend has been aligned to the supplied PRD/TDD without implementing new product functionality.

## Interpretation

- Keep the existing repository and tech stack intact for now.
- Use the documented MVP page map as the source of truth for UI structure.
- Avoid adding live integrations, API contracts, or backend behavior in this step.
- Reshape the frontend so later implementation can proceed page by page and module by module.

## Current UI baseline

- The active UI rendering currently lives in `src/App.tsx`
- This was intentionally restored to the original single-file layout to preserve the exact visual baseline
- Shared engineering foundations added in Phase 1 remain in separate modules for later incremental adoption

## Engineering adjustments

- Shared types moved into `src/types/app.ts`
- API boundary placeholders added under `src/types/api.ts`
- Route and environment conventions added under `src/config`
- App-wide constants added under `src/constants`
- `App.tsx` preserves the original Tailwind-driven layout while selectively consuming shared constants
- `src/index.css` remains minimal so the original Tailwind utility layout renders unchanged

## Explicit non-goals

- No real routing
- No Supabase integration
- No OpenAI integration
- No PDF parsing
- No API implementation
- No new business functionality

## Current phase

The project has now entered Phase 1 engineering setup:

- establish shared route definitions
- establish environment variable conventions
- define API request and response placeholders
- reduce key UI hardcoding for product constants and constraints without changing the original page layout
