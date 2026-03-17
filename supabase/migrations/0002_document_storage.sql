insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', false, 52428800, array['application/pdf'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "documents_storage_select_own" on storage.objects;
create policy "documents_storage_select_own"
on storage.objects
for select
using (
  bucket_id = 'documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "documents_storage_insert_own" on storage.objects;
create policy "documents_storage_insert_own"
on storage.objects
for insert
with check (
  bucket_id = 'documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "documents_storage_update_own" on storage.objects;
create policy "documents_storage_update_own"
on storage.objects
for update
using (
  bucket_id = 'documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "documents_storage_delete_own" on storage.objects;
create policy "documents_storage_delete_own"
on storage.objects
for delete
using (
  bucket_id = 'documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);
