# AI PDF Assistant

Frontend restructuring pass for an AI PDF Assistant SaaS MVP.

This repository currently contains a Vite + React frontend shell that has been reorganized around the supplied PRD/TDD. The current scope is intentionally limited to interface structure, page composition, mock data, and engineering hygiene. No new backend, authentication, storage, or AI functionality is implemented in this pass.

## What changed

- Replaced the previous single-file demo with page-oriented components.
- Introduced shared TypeScript models and mock workspace data.
- Aligned the UI with the documented MVP routes:
  - landing
  - login
  - signup
  - dashboard
  - document detail
- Updated content to reflect the actual product scope and out-of-scope items from the PRD.

## Current structure

```text
src/
  components/
  data/
  types/
  App.tsx
  index.css
  main.tsx
```

## Local development

Prerequisite: Node.js

1. Install dependencies with `npm install`
2. Start the app with `npm run dev`
3. Run a type check with `npm run lint`

## Notes

- The PRD/TDD recommends a future Next.js + Supabase architecture. This repository has not been migrated yet.
- The current refactor is meant to prepare the frontend for incremental implementation in later steps.
