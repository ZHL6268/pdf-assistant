import type { SupabaseClient } from '@supabase/supabase-js';
import { DOCUMENTS_BUCKET_NAME, MAX_UPLOAD_SIZE_MB, SUPPORTED_FILE_TYPES } from '../constants/app';
import type { StoredDocument, UploadDocumentResult } from '../types/document';

interface DocumentRecord {
  id: string;
  title: string;
  file_path: string;
  processing_status: string;
  created_at: string;
}

function formatDocumentDate(uploadedAt: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(uploadedAt));
}

function mapProcessingStatus(processingStatus: string): StoredDocument['status'] {
  if (processingStatus === 'failed') {
    return 'Failed';
  }

  if (processingStatus === 'complete') {
    return 'Complete';
  }

  return 'Pending';
}

function mapDocumentRecord(record: DocumentRecord): StoredDocument {
  return {
    id: record.id,
    name: record.title,
    date: formatDocumentDate(record.created_at),
    status: mapProcessingStatus(record.processing_status),
    fileSize: null,
    mimeType: 'application/pdf',
    uploadedAt: record.created_at,
    filePath: record.file_path,
  };
}

function validateFile(file: File) {
  if (!SUPPORTED_FILE_TYPES.includes(file.type as (typeof SUPPORTED_FILE_TYPES)[number])) {
    return 'Only PDF files are supported.';
  }

  const maxSizeInBytes = MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return `File size must be ${MAX_UPLOAD_SIZE_MB}MB or smaller.`;
  }

  return null;
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function buildStoragePath(userId: string, documentId: string, fileName: string) {
  return `${userId}/${documentId}/${sanitizeFileName(fileName)}`;
}

function mapUploadErrorMessage(message: string) {
  if (message.toLowerCase().includes('bucket')) {
    return 'Storage bucket is not configured yet. Run the phase 5 storage migration in Supabase first.';
  }

  return message;
}

export async function listUserDocuments(supabase: SupabaseClient): Promise<StoredDocument[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('id, title, file_path, processing_status, created_at')
    .order('created_at', { ascending: false })
    .returns<DocumentRecord[]>();

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapDocumentRecord);
}

export async function uploadUserDocument(
  supabase: SupabaseClient,
  userId: string,
  file: File,
): Promise<UploadDocumentResult> {
  const validationError = validateFile(file);
  if (validationError) {
    return {
      document: null,
      error: validationError,
    };
  }

  const documentId = crypto.randomUUID();
  const filePath = buildStoragePath(userId, documentId, file.name);

  const { error: uploadError } = await supabase.storage.from(DOCUMENTS_BUCKET_NAME).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return {
      document: null,
      error: mapUploadErrorMessage(uploadError.message),
    };
  }

  const { data, error } = await supabase
    .from('documents')
    .insert({
      id: documentId,
      user_id: userId,
      title: file.name,
      file_path: filePath,
      processing_status: 'complete',
    })
    .select('id, title, file_path, processing_status, created_at')
    .single<DocumentRecord>();

  if (error || !data) {
    await supabase.storage.from(DOCUMENTS_BUCKET_NAME).remove([filePath]);
    return {
      document: null,
      error: error?.message ?? 'Document metadata could not be created.',
    };
  }

  return {
    document: mapDocumentRecord(data),
    error: null,
  };
}
