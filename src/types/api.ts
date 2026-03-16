export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'UNKNOWN_ERROR';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface UploadDocumentRequest {
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface UploadDocumentResponse {
  documentId: string;
  status: 'queued' | 'uploaded';
}

export interface GenerateSummaryRequest {
  documentId: string;
}

export interface GenerateSummaryResponse {
  documentId: string;
  summary: string;
}

export interface SendChatMessageRequest {
  documentId: string;
  question: string;
}

export interface SendChatMessageResponse {
  answer: string;
  messageId: string;
}
