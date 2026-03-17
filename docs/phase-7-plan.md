# Phase 7 Plan

## Goal

Phase 7 focused on real document chat. The goal was to let users ask questions about a single PDF and persist the conversation in the `messages` table.

## Scope

1. Add the `chat-document` Supabase Edge Function
2. Verify document ownership before answering
3. Load and render real message history on the detail page
4. Persist both user and assistant messages
5. Add message indexes for the main document-chat query path
6. Update project documentation

## Non-Goals

- no vector retrieval
- no multi-document conversation
- no chat editing, deletion, or clearing

## Done Criteria

- users can ask grounded questions on the document detail page
- `messages` stores real user and assistant history
- refreshing the page preserves chat history
- chat failures show real error feedback
- project documents match the code state
