# Phase 1 Plan

## Goal

Phase 1 focused on the engineering baseline only. It did not implement real business capability. The objective was to create sustainable project constraints and keep documentation, code structure, shared types, and git workflow aligned.

## Scope

1. Establish shared engineering foundations
   - route definitions
   - environment variable conventions
   - app constants
   - API placeholder types
   - common error shape conventions

2. Reduce page-level hardcoding
   - move key values out of page components
   - leave clear boundaries for future routing and service integration

3. Keep documents in sync
   - README reflects current project state
   - PRD reflects product goals
   - Architecture reflects current and target structure
   - this phase document records the implementation boundary

## Deliverables

- `src/config/routes.ts`
- `src/config/env.ts`
- `src/constants/app.ts`
- `src/types/api.ts`
- the original UI wired to key shared constants
- `.env.example` updated to match current conventions

## Current Status Note

The shared baseline was completed in Phase 1. Some experimental UI modules and utility files were removed later during cleanup so the repository would not keep accumulating dead code.

## Non-Goals

- no Supabase integration
- no OpenAI integration
- no real file upload
- no real API implementation
- no Next.js migration

## Done Criteria

- the UI no longer hardcodes key product labels, upload constraints, and core paths
- environment variable naming matches the future architecture direction
- API boundaries have a shared placeholder typing layer
- project documentation matches the actual code state
