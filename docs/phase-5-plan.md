# Phase 5 Plan

## Goal

Phase 5 focused on real document upload and real dashboard data. The goal was to replace the local document library from Phase 3 with a real document flow powered by Supabase Storage and the `documents` table.

## Scope

1. Switch the dashboard to real document storage
2. Upload PDFs to Supabase Storage
3. Add storage bucket and policy baseline
4. Keep display boundaries clear
5. Update project documentation

## Non-Goals

- no real PDF text extraction yet
- no real summary generation yet
- no real document chat yet

## Done Criteria

- dashboard documents come from the `documents` table
- PDFs are uploaded to Supabase Storage
- successful uploads create real backend document records
- refreshing the page reloads documents from the backend
- different users only see their own documents
- project documents match the code state

## Current Status

Phase 5 is complete.

- document listing now reads from `documents`
- uploads now write to Supabase Storage and `documents`
- storage setup is defined in [`supabase/migrations/0002_document_storage.sql`](../supabase/migrations/0002_document_storage.sql)
