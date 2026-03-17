# Deployment Checklist

## Local Setup

1. Install dependencies with `npm install`
2. Create `.env.local`
3. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - optional `VITE_SUPABASE_PROJECT_ID`

## Supabase Database

Run these migrations in order from the SQL Editor:

1. [`supabase/migrations/0001_initial_schema.sql`](../supabase/migrations/0001_initial_schema.sql)
2. [`supabase/migrations/0002_document_storage.sql`](../supabase/migrations/0002_document_storage.sql)
3. [`supabase/migrations/0003_document_processing_error.sql`](../supabase/migrations/0003_document_processing_error.sql)
4. [`supabase/migrations/0004_message_indexes.sql`](../supabase/migrations/0004_message_indexes.sql)

## Supabase Functions

Deploy these Edge Functions:

1. [`supabase/functions/process-document/index.ts`](../supabase/functions/process-document/index.ts)
2. [`supabase/functions/chat-document/index.ts`](../supabase/functions/chat-document/index.ts)

## Secrets

Add these Supabase secrets:

- `OPENAI_API_KEY`
- optional `OPENAI_MODEL`

## Verification

1. Sign up and sign in successfully
2. Upload a PDF and confirm `documents` gets a new row
3. Wait for summary generation and confirm `documents.summary` is populated
4. Open the document detail page and ask a question
5. Confirm `messages` receives both `user` and `assistant` records
