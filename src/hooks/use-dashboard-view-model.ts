import { dashboardState } from '../state/demo-state';

export interface DashboardViewModel {
  greeting: string;
  documents: typeof dashboardState.documents;
}

export function useDashboardViewModel(): DashboardViewModel {
  return {
    greeting: dashboardState.greeting,
    documents: dashboardState.documents,
  };
}
