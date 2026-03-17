import { useCallback, useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '../lib/supabase/client';
import { useAuthSession } from './use-auth-session';
import { listUserDocuments, processUserDocument, uploadUserDocument } from '../services/document-service';
import { readActiveDocumentId, writeActiveDocumentId } from '../services/document-storage';
import type { StoredDocument } from '../types/document';

export function useDocumentLibrary() {
  const { isAuthenticated, isAuthReady, isSupabaseReady, user } = useAuthSession();
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  // The active document id stays in local storage only for screen-to-screen UX continuity.
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(() => readActiveDocumentId());
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isLibraryLoading, setIsLibraryLoading] = useState(false);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);
  const [hasLoadedDocuments, setHasLoadedDocuments] = useState(false);

  const syncActiveDocumentId = useCallback((nextDocuments: StoredDocument[]) => {
    const storedActiveDocumentId = readActiveDocumentId();
    const nextActiveDocumentId =
      (storedActiveDocumentId &&
      nextDocuments.some((document) => document.id === storedActiveDocumentId)
        ? storedActiveDocumentId
        : nextDocuments[0]?.id) ?? null;

    writeActiveDocumentId(nextActiveDocumentId);
    setActiveDocumentId(nextActiveDocumentId);
  }, []);

  const loadDocuments = useCallback(async () => {
    if (!isAuthReady) {
      return;
    }

    if (!isAuthenticated || !isSupabaseReady) {
      setDocuments([]);
      writeActiveDocumentId(null);
      setActiveDocumentId(null);
      setHasLoadedDocuments(true);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setUploadError('Supabase is not configured for document access.');
      return;
    }

    setIsLibraryLoading(true);

    try {
      const nextDocuments = await listUserDocuments(supabase);
      setDocuments(nextDocuments);
      syncActiveDocumentId(nextDocuments);
      setUploadError(null);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Documents could not be loaded.');
    } finally {
      setHasLoadedDocuments(true);
      setIsLibraryLoading(false);
    }
  }, [isAuthReady, isAuthenticated, isSupabaseReady, syncActiveDocumentId]);

  useEffect(() => {
    const handleStorage = () => {
      setActiveDocumentId(readActiveDocumentId());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    void loadDocuments();
  }, [loadDocuments]);

  const uploadDocument = async (file: File) => {
    if (!user) {
      setUploadError('Sign in again before uploading a document.');
      setUploadSuccessMessage(null);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setUploadError('Supabase is not configured for document uploads.');
      setUploadSuccessMessage(null);
      return;
    }

    setIsUploadingDocument(true);

    try {
      const result = await uploadUserDocument(supabase, user.id, file);

      if (!result.document) {
        setUploadError(result.error);
        setUploadSuccessMessage(null);
        return;
      }

      setDocuments((currentDocuments) => [
        result.document,
        ...currentDocuments.filter((document) => document.id !== result.document.id),
      ]);
      writeActiveDocumentId(result.document.id);
      setActiveDocumentId(result.document.id);
      setUploadError(null);
      setUploadSuccessMessage(`${result.document.name} uploaded successfully. Summary generation has started.`);

      const processingResult = await processUserDocument(supabase, result.document.id);
      const nextDocuments = await listUserDocuments(supabase);
      setDocuments(nextDocuments);
      syncActiveDocumentId(nextDocuments);

      if (!processingResult.success) {
        setUploadError(processingResult.error ?? 'Document processing failed.');
        setUploadSuccessMessage(null);
        return;
      }

      setUploadSuccessMessage(`${result.document.name} uploaded and summarized successfully.`);
    } finally {
      setIsUploadingDocument(false);
    }
  };

  const selectDocument = (documentId: string) => {
    writeActiveDocumentId(documentId);
    setActiveDocumentId(documentId);
  };

  const activeDocument =
    documents.find((document) => document.id === activeDocumentId) ??
    documents[0] ??
    null;

  return {
    documents,
    activeDocument,
    hasLoadedDocuments,
    isLibraryLoading,
    isUploadingDocument,
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  };
}
