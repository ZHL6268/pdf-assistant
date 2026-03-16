export type DocumentProcessingStatus = 'Complete' | 'Pending';

export interface StoredDocument {
  id: string;
  name: string;
  date: string;
  status: DocumentProcessingStatus;
  fileSize: number | null;
  mimeType: string | null;
  uploadedAt: string;
}

export interface UploadDocumentResult {
  document: StoredDocument | null;
  error: string | null;
}
