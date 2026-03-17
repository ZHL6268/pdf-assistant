export type DocumentProcessingStatus = 'Complete' | 'Pending' | 'Failed';

export interface StoredDocument {
  id: string;
  name: string;
  date: string;
  status: DocumentProcessingStatus;
  fileSize: number | null;
  mimeType: string | null;
  uploadedAt: string;
  filePath: string | null;
  extractedText: string | null;
  summary: string | null;
  processingError: string | null;
}

export interface UploadDocumentResult {
  document: StoredDocument | null;
  error: string | null;
}
