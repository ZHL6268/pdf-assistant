import { ACTIVE_DOCUMENT_STORAGE_KEY, DOCUMENT_LIBRARY_STORAGE_KEY } from '../constants/app';
import type { StoredDocument } from '../types/document';

export function readStoredDocuments(): StoredDocument[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const rawValue = window.localStorage.getItem(DOCUMENT_LIBRARY_STORAGE_KEY);
  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as StoredDocument[];
  } catch {
    window.localStorage.removeItem(DOCUMENT_LIBRARY_STORAGE_KEY);
    return [];
  }
}

export function writeStoredDocuments(documents: StoredDocument[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(DOCUMENT_LIBRARY_STORAGE_KEY, JSON.stringify(documents));
}

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
