import { useCallback, useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '../lib/supabase/client';
import { listDocumentMessages, sendDocumentMessage } from '../services/message-service';
import type { ChatMessageItem } from '../types/ui-state';
import { useAuthSession } from './use-auth-session';

const EMPTY_MESSAGES: ChatMessageItem[] = [];

export function useDocumentChat(documentId: string | null) {
  const { isAuthenticated, isAuthReady, isSupabaseReady } = useAuthSession();
  const [messages, setMessages] = useState<ChatMessageItem[]>(EMPTY_MESSAGES);
  const [chatError, setChatError] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!isAuthReady) {
      return;
    }

    if (!documentId || !isAuthenticated || !isSupabaseReady) {
      setMessages(EMPTY_MESSAGES);
      setChatError(null);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setChatError('Supabase is not configured for document chat.');
      return;
    }

    setIsChatLoading(true);

    try {
      const nextMessages = await listDocumentMessages(supabase, documentId);
      setMessages(nextMessages);
      setChatError(null);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'Document chat could not be loaded.');
    } finally {
      setIsChatLoading(false);
    }
  }, [documentId, isAuthReady, isAuthenticated, isSupabaseReady]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const submitQuestion = useCallback(
    async (question: string) => {
      const trimmedQuestion = question.trim();
      if (!documentId || !trimmedQuestion) {
        return false;
      }

      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setChatError('Supabase is not configured for document chat.');
        return false;
      }

      setIsSendingMessage(true);

      try {
        const nextMessages = await sendDocumentMessage(supabase, documentId, trimmedQuestion);
        setMessages(nextMessages);
        setChatError(null);
        return true;
      } catch (error) {
        setChatError(error instanceof Error ? error.message : 'Document chat failed.');
        return false;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [documentId],
  );

  return {
    messages,
    chatError,
    isChatLoading,
    isSendingMessage,
    submitQuestion,
  };
}
