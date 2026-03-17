# Phase 6 Plan

## Goal

Phase 6 focused on real summary generation. The goal was to move uploaded documents from "stored file only" to "stored file with generated summary".

## Scope

1. Add the `process-document` Supabase Edge Function
2. Trigger processing from the frontend after upload
3. Reflect `uploaded / processing / complete / failed` in the UI
4. Update project documentation

## Non-Goals

- no real document chat yet
- no vector retrieval
- no router migration work in this phase

## Done Criteria

- uploaded documents enter a real processing pipeline
- completed summaries are written back to the database
- document detail prefers real summary data
- failed processing shows as a real failure state in the dashboard
- project documents match the code state
