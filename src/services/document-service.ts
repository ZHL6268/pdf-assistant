import type { SupabaseClient } from '@supabase/supabase-js';
import { appEnv } from '../config/env';
import { DOCUMENTS_BUCKET_NAME, MAX_UPLOAD_SIZE_MB, SUPPORTED_FILE_TYPES } from '../constants/app';
import type { StoredDocument, UploadDocumentResult } from '../types/document';

interface DocumentRecord {
  id: string;
  title: string;
  file_path: string;
  extracted_text: string | null;
  summary: string | null;
  processing_status: string;
  processing_error: string | null;
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
    extractedText: record.extracted_text,
    summary: record.summary,
    processingError: record.processing_error,
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
  // Path scoping by user and document id keeps storage ownership checks straightforward.
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
    .select('id, title, file_path, extracted_text, summary, processing_status, processing_error, created_at')
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
      processing_status: 'uploaded',
      processing_error: null,
    })
    .select('id, title, file_path, extracted_text, summary, processing_status, processing_error, created_at')
    .single<DocumentRecord>();

  if (error || !data) {
    // Roll back the uploaded file if metadata creation fails so storage and database do not drift apart.
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

export async function processUserDocument(
  supabase: SupabaseClient,
  documentId: string,
): Promise<{ success: boolean; error: string | null }> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return {
      success: false,
      error: sessionError?.message ?? 'No active session is available for document processing.',
    };
  }

  const response = await fetch(`${appEnv.supabaseUrl}/functions/v1/process-document`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      apikey: appEnv.supabaseAnonKey,
    },
    body: JSON.stringify({
      documentId,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    return {
      success: false,
      error: payload?.error ?? `Document processing request failed with status ${response.status}.`,
    };
  }

  return {
    success: true,
    error: null,
  };
}
