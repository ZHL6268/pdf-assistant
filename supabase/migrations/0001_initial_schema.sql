create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  file_path text not null,
  extracted_text text,
  summary text,
  processing_status text not null default 'uploaded',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.messages enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id);

create policy "documents_select_own"
on public.documents
for select
using (auth.uid() = user_id);

create policy "documents_insert_own"
on public.documents
for insert
with check (auth.uid() = user_id);

create policy "documents_update_own"
on public.documents
for update
using (auth.uid() = user_id);

create policy "documents_delete_own"
on public.documents
for delete
using (auth.uid() = user_id);

create policy "messages_select_own"
on public.messages
for select
using (auth.uid() = user_id);

create policy "messages_insert_own"
on public.messages
for insert
with check (auth.uid() = user_id);

create policy "messages_update_own"
on public.messages
for update
using (auth.uid() = user_id);

create policy "messages_delete_own"
on public.messages
for delete
using (auth.uid() = user_id);
