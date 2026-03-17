import { dashboardState } from '../state/demo-state';
import { useDocumentLibrary } from './use-document-library';

export interface DashboardViewModel {
  greeting: string;
  documents: ReturnType<typeof useDocumentLibrary>['documents'];
  isLibraryLoading: boolean;
  isUploadingDocument: boolean;
  uploadError: string | null;
  uploadSuccessMessage: string | null;
  uploadDocument: (file: File) => Promise<void>;
  selectDocument: (documentId: string) => void;
}

export function useDashboardViewModel(): DashboardViewModel {
  const {
    documents,
    isLibraryLoading,
    isUploadingDocument,
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  } = useDocumentLibrary();

  return {
    greeting: dashboardState.greeting,
    documents,
    isLibraryLoading,
    isUploadingDocument,
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  };
}
