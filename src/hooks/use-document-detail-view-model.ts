import { documentDetailState } from '../state/demo-state';

export interface DocumentDetailViewModel {
  fileName: string;
  summary: string;
  insights: typeof documentDetailState.insights;
  chatMessages: typeof documentDetailState.chatMessages;
  suggestions: typeof documentDetailState.suggestions;
}

export function useDocumentDetailViewModel(): DocumentDetailViewModel {
  return {
    fileName: documentDetailState.fileName,
    summary: documentDetailState.summary,
    insights: documentDetailState.insights,
    chatMessages: documentDetailState.chatMessages,
    suggestions: documentDetailState.suggestions,
  };
}
