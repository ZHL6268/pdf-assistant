import { documentDetailState } from '../state/demo-state';
import type { StoredDocument } from '../types/document';
import { useDocumentChat } from './use-document-chat';

export interface DocumentDetailViewModel {
  fileName: string;
  summary: string;
  summaryStatus: 'Complete' | 'Pending' | 'Failed';
  insights: typeof documentDetailState.insights;
  chatMessages: typeof documentDetailState.chatMessages;
  suggestions: typeof documentDetailState.suggestions;
  chatError: string | null;
  isChatLoading: boolean;
  isSendingMessage: boolean;
  submitQuestion: (question: string) => Promise<boolean>;
}

export function useDocumentDetailViewModel(activeDocument: StoredDocument | null): DocumentDetailViewModel {
  const { messages, chatError, isChatLoading, isSendingMessage, submitQuestion } = useDocumentChat(
    activeDocument?.id ?? null,
  );
  const summary =
    activeDocument?.summary ||
    (activeDocument?.status === 'Pending'
      ? 'This document is still being processed. Refresh in a moment to see the generated summary.'
      : activeDocument?.status === 'Failed'
        ? activeDocument.processingError ||
          'Summary generation failed for this document. Re-upload the file after checking the PDF contents and backend configuration.'
        : documentDetailState.summary);

  return {
    fileName: activeDocument?.name ?? documentDetailState.fileName,
    summary,
    summaryStatus: activeDocument?.status ?? 'Complete',
    insights: documentDetailState.insights,
    chatMessages:
      messages.length > 0
        ? messages
        : [
            {
              id: 'chat-empty-state',
              isAi: true,
              text: 'Ask a question about this document to start a real conversation. Your answers will be saved to this document history.',
              time: 'Just now',
            },
          ],
    suggestions: documentDetailState.suggestions,
    chatError,
    isChatLoading,
    isSendingMessage,
    submitQuestion,
  };
}
