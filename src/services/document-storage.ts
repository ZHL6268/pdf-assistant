import { ACTIVE_DOCUMENT_STORAGE_KEY } from '../constants/app';

export function readActiveDocumentId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ACTIVE_DOCUMENT_STORAGE_KEY);
}

export function writeActiveDocumentId(documentId: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (documentId) {
    window.localStorage.setItem(ACTIVE_DOCUMENT_STORAGE_KEY, documentId);
    return;
  }

  window.localStorage.removeItem(ACTIVE_DOCUMENT_STORAGE_KEY);
}
