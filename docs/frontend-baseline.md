# Frontend Baseline

This document captures how the current frontend has been aligned to the supplied PRD/TDD without implementing new product functionality.

## Interpretation

- Keep the existing repository and tech stack intact for now.
- Use the documented MVP page map as the source of truth for UI structure.
- Avoid adding live integrations, API contracts, or backend behavior in this step.
- Reshape the frontend so later implementation can proceed page by page and module by module.

## Resulting UI modules

- `landing-page.tsx`
  - Product positioning
  - Core MVP features
  - High-level user flow
- `auth-page.tsx`
  - Login and signup states
  - Frontend-only auth scaffolding
- `dashboard-page.tsx`
  - Protected workspace framing
  - Upload entry area
  - Document list with processing and summary states
- `document-detail-page.tsx`
  - Stored summary area
  - Preview placeholder
  - Grounded chat history layout

## Engineering adjustments

- Shared types moved into `src/types/app.ts`
- Static UI content moved into `src/data/mock-data.ts`
- Monolithic `App.tsx` reduced to screen orchestration only
- Styling consolidated into `src/index.css` with reusable design tokens and layout classes

## Explicit non-goals

- No real routing
- No Supabase integration
- No OpenAI integration
- No PDF parsing
- No API implementation
- No new business functionality
