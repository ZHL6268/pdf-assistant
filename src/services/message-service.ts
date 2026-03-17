import type { SupabaseClient } from '@supabase/supabase-js';
import { appEnv } from '../config/env';
import type { ChatMessageItem } from '../types/ui-state';

interface MessageRecord {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

function formatRelativeTime(createdAt: string) {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const diffInSeconds = Math.round((created - now) / 1000);
  const absoluteDiffInSeconds = Math.abs(diffInSeconds);

  if (absoluteDiffInSeconds < 10) {
    return 'Just now';
  }

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsPerUnit] of ranges) {
    if (absoluteDiffInSeconds >= secondsPerUnit || unit === 'second') {
      return formatter.format(Math.round(diffInSeconds / secondsPerUnit), unit);
    }
  }

  return 'Just now';
}

function mapMessageRecord(record: MessageRecord): ChatMessageItem {
  return {
    id: record.id,
    isAi: record.role === 'assistant',
    text: record.content,
    time: formatRelativeTime(record.created_at),
  };
}

export async function listDocumentMessages(
  supabase: SupabaseClient,
  documentId: string,
): Promise<ChatMessageItem[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('id, role, content, created_at')
    .eq('document_id', documentId)
    .order('created_at', { ascending: true })
    .returns<MessageRecord[]>();

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapMessageRecord);
}

export async function sendDocumentMessage(
  supabase: SupabaseClient,
  documentId: string,
  question: string,
): Promise<ChatMessageItem[]> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error(sessionError?.message ?? 'No active session is available for document chat.');
  }

  const response = await fetch(`${appEnv.supabaseUrl}/functions/v1/chat-document`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      apikey: appEnv.supabaseAnonKey,
    },
    body: JSON.stringify({
      documentId,
      question,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: string; messages?: MessageRecord[] }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error ?? `Document chat request failed with status ${response.status}.`);
  }

  return (payload?.messages ?? []).map(mapMessageRecord);
}
