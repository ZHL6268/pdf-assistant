import { dashboardState } from '../state/demo-state';
import type { StoredDocument } from '../types/document';

export function buildSeedDocuments(): StoredDocument[] {
  return dashboardState.documents.map((document, index) => ({
    id: `demo-document-${index + 1}`,
    name: document.name,
    date: document.date,
    status: document.status,
    fileSize: null,
    mimeType: 'application/pdf',
    uploadedAt: document.date,
  }));
}
