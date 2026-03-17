# PRD

## Product Positioning

AI PDF Assistant is a lightweight AI SaaS application for users who need to understand PDF content quickly.

The goal is not to ship a one-off demo. The goal is to build a real MVP with a complete product loop:

- authentication
- PDF upload
- summary generation
- document-level chat
- history review

Primary target users:

- Students and researchers
  - need to digest papers, reports, and study material quickly
- Knowledge workers
  - need to extract key information from business documents, manuals, and internal files
- Founders and product operators
  - need a product that demonstrates practical AI value clearly

Core product value:

- reduce the time cost of reading long documents
- provide structured AI capabilities around a single document
- create a maintainable SaaS foundation that can evolve into a broader product

## Core Feature List

The MVP includes:

1. User authentication
   - sign up
   - sign in
   - sign out
   - session persistence
   - protected page access control

2. PDF upload
   - single-file upload
   - PDF type validation
   - file size limits

3. Document dashboard
   - list user documents
   - show upload time
   - show processing and summary status

4. AI summary generation
   - generate a structured summary from the uploaded document
   - persist the summary result

5. Document chat
   - ask contextual questions about a single document
   - return answers grounded in that document instead of general knowledge

6. History
   - persist summaries
   - persist chat history
   - allow users to revisit processed documents later

The MVP explicitly excludes:

- OCR for scanned PDFs
- multi-document retrieval
- team collaboration and multi-tenant workspaces
- payments, subscriptions, and billing
- advanced model switching and custom prompt builders
- complex retrieval augmentation and vector database optimization

## User Flow

Main user flow:

1. The user lands on the landing page
2. The user signs up or signs in
3. The user enters the protected dashboard
4. The user uploads a PDF
5. The system validates, stores, and processes the file
6. The document appears in the dashboard list
7. The user opens the document detail page
8. The user reviews the generated summary
9. The user asks document-specific questions
10. The system returns grounded answers and stores the conversation
11. The user can return later to review the same summary and message history

Current page map:

- `/`
  - landing page
- `/login`
  - login page
- `/signup`
  - signup page
- `/dashboard`
  - document dashboard
- `/documents/[id]`
  - document detail page with summary and chat
