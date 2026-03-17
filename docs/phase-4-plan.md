# Phase 4 Plan

## Goal

Phase 4 focused on real authentication and the database baseline. The goal was to replace fake auth with Supabase Auth and introduce the minimum viable schema and permission model.

## Scope

1. Add the Supabase browser client boundary
2. Replace fake auth with real Supabase auth calls
3. Create database and RLS baseline
4. Add configuration and explicit error states
5. Automatically sync user profiles

## Non-Goals

- no real document upload yet
- no real PDF parsing yet
- no real summary generation yet
- no real chat persistence yet

## Done Criteria

- `@supabase/supabase-js` is integrated
- sign in, sign up, and sign out use Supabase Auth
- missing Supabase configuration is surfaced clearly in the UI
- the repository contains executable schema and RLS baseline files
- `profiles` is populated automatically after signup
- project documents match the code state
