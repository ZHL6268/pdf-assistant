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

- API boundary placeholders added under `src/types/api.ts`
- Route and environment conventions added under `src/config`
- App-wide constants added under `src/constants`
- Page state and browser path syncing added under `src/hooks/use-app-screen.ts`
- `App.tsx` preserves the original Tailwind-driven layout while selectively consuming shared constants
- `src/index.css` remains minimal so the original Tailwind utility layout renders unchanged

## Explicit non-goals

- No third-party router integration
- No Supabase integration
- No OpenAI integration
- No PDF parsing
- No API implementation
- No new business functionality

## Current phase

The project has now entered Phase 2 app-shell cleanup:

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
