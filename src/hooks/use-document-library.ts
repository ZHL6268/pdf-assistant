import { useEffect, useState } from 'react';
import { buildSeedDocuments } from '../services/demo-document-service';
import { createUploadedDocument } from '../services/document-upload-service';
import {
  readActiveDocumentId,
  readStoredDocuments,
  writeActiveDocumentId,
  writeStoredDocuments,
} from '../services/document-storage';
import type { StoredDocument } from '../types/document';

interface InitialDocumentLibraryState {
  documents: StoredDocument[];
  activeDocumentId: string | null;
}

function readInitialDocuments(): StoredDocument[] {
  const storedDocuments = readStoredDocuments();
  if (storedDocuments.length > 0) {
    return storedDocuments;
  }

  const seedDocuments = buildSeedDocuments();
  writeStoredDocuments(seedDocuments);
  return seedDocuments;
}

function readInitialActiveDocumentId(documents: StoredDocument[]): string | null {
  const storedActiveDocumentId = readActiveDocumentId();
  if (storedActiveDocumentId && documents.some((document) => document.id === storedActiveDocumentId)) {
    return storedActiveDocumentId;
  }

  const fallbackDocumentId = documents[0]?.id ?? null;
  writeActiveDocumentId(fallbackDocumentId);
  return fallbackDocumentId;
}

function readInitialDocumentLibraryState(): InitialDocumentLibraryState {
  const documents = readInitialDocuments();

  return {
    documents,
    activeDocumentId: readInitialActiveDocumentId(documents),
  };
}

export function useDocumentLibrary() {
  const [initialState] = useState<InitialDocumentLibraryState>(() => readInitialDocumentLibraryState());
  const [documents, setDocuments] = useState<StoredDocument[]>(initialState.documents);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(initialState.activeDocumentId);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleStorage = () => {
      const nextDocuments = readInitialDocuments();
      setDocuments(nextDocuments);
      setActiveDocumentId(readInitialActiveDocumentId(nextDocuments));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const uploadDocument = (file: File) => {
    const result = createUploadedDocument(file);

    if (!result.document) {
      setUploadError(result.error);
      setUploadSuccessMessage(null);
      return;
    }

    const nextDocuments = [result.document, ...documents];
    writeStoredDocuments(nextDocuments);
    writeActiveDocumentId(result.document.id);
    setDocuments(nextDocuments);
    setActiveDocumentId(result.document.id);
    setUploadError(null);
    setUploadSuccessMessage(`${result.document.name} uploaded successfully.`);
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
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  };
}
