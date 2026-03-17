import { documentDetailState } from '../state/demo-state';
import type { StoredDocument } from '../types/document';

export interface DocumentDetailViewModel {
  fileName: string;
  summary: string;
  summaryStatus: 'Complete' | 'Pending' | 'Failed';
  insights: typeof documentDetailState.insights;
  chatMessages: typeof documentDetailState.chatMessages;
  suggestions: typeof documentDetailState.suggestions;
}

export function useDocumentDetailViewModel(activeDocument: StoredDocument | null): DocumentDetailViewModel {
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
    chatMessages: documentDetailState.chatMessages,
    suggestions: documentDetailState.suggestions,
  };
}
