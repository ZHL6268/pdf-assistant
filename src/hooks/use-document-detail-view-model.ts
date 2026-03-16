import { documentDetailState } from '../state/demo-state';
import { useDocumentLibrary } from './use-document-library';

export interface DocumentDetailViewModel {
  fileName: string;
  summary: string;
  insights: typeof documentDetailState.insights;
  chatMessages: typeof documentDetailState.chatMessages;
  suggestions: typeof documentDetailState.suggestions;
}

export function useDocumentDetailViewModel(): DocumentDetailViewModel {
  const { activeDocument } = useDocumentLibrary();

  return {
    fileName: activeDocument?.name ?? documentDetailState.fileName,
    summary: documentDetailState.summary,
    insights: documentDetailState.insights,
    chatMessages: documentDetailState.chatMessages,
    suggestions: documentDetailState.suggestions,
  };
}
