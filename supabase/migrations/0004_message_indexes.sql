create index if not exists messages_document_id_created_at_idx
on public.messages (document_id, created_at);

create index if not exists messages_user_id_document_id_idx
on public.messages (user_id, document_id);
