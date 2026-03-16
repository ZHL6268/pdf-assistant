import { MAX_UPLOAD_SIZE_MB, SUPPORTED_FILE_TYPES } from '../constants/app';
import type { StoredDocument, UploadDocumentResult } from '../types/document';

function formatDocumentDate(uploadedAt: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(uploadedAt);
}

export function createUploadedDocument(file: File): UploadDocumentResult {
  if (!SUPPORTED_FILE_TYPES.includes(file.type as (typeof SUPPORTED_FILE_TYPES)[number])) {
    return {
      document: null,
      error: 'Only PDF files are supported.',
    };
  }

  const maxSizeInBytes = MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      document: null,
      error: `File size must be ${MAX_UPLOAD_SIZE_MB}MB or smaller.`,
    };
  }

  const uploadedAt = new Date();
  const document: StoredDocument = {
    id: `local-document-${uploadedAt.getTime()}`,
    name: file.name,
    date: formatDocumentDate(uploadedAt),
    status: 'Complete',
    fileSize: file.size,
    mimeType: file.type,
    uploadedAt: uploadedAt.toISOString(),
  };

  return {
    document,
    error: null,
  };
}
