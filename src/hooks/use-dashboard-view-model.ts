import { dashboardState } from '../state/demo-state';
import { useDocumentLibrary } from './use-document-library';

export interface DashboardViewModel {
  greeting: string;
  documents: ReturnType<typeof useDocumentLibrary>['documents'];
  uploadError: string | null;
  uploadSuccessMessage: string | null;
  uploadDocument: (file: File) => void;
  selectDocument: (documentId: string) => void;
}

export function useDashboardViewModel(): DashboardViewModel {
  const { documents, uploadError, uploadSuccessMessage, uploadDocument, selectDocument } = useDocumentLibrary();

  return {
    greeting: dashboardState.greeting,
    documents,
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  };
}
