# Phase 2 Plan

## Goal

Phase 2 focused on the frontend application shell. The goal was to move page navigation and flow control from temporary local state toward a more realistic product navigation model without breaking the original visual baseline.

## Scope

1. Clean dead code and unused dependencies
2. Establish navigation foundations
3. Establish the frontend auth boundary
4. Keep project documents synchronized
5. Move page-level display state out of `App.tsx`
6. Split page templates and display components
7. Centralize app flow control
8. Introduce page-level view-model boundaries
9. Introduce a profile view-model boundary
10. Move auth persistence details behind service boundaries

## Non-Goals

- no backend auth integration yet
- no real document detail loading yet
- no visual redesign

## Done Criteria

- page navigation is driven by shared route configuration
- browser location reflects current page state
- protected routes and post-auth redirects work
- `App.tsx` is reduced to an application shell
- page components no longer depend directly on raw demo-state sources
- project documents match the repository state

## Current Status

Phase 2 is complete. The repository now has a stable application shell, page boundaries, auth-shell behavior, and view-model boundaries that supported the later migration to real routing and backend integrations.
