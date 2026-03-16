import type { AppScreen, AuthMode } from '../types/app';

export interface AppRoute {
  id: AppScreen;
  path: string;
  label: string;
  isProtected: boolean;
}

export const appRoutes: Record<AppScreen, AppRoute> = {
  landing: { id: 'landing', path: '/', label: 'Landing', isProtected: false },
  login: { id: 'login', path: '/login', label: 'Login', isProtected: false },
  signup: { id: 'signup', path: '/signup', label: 'Sign up', isProtected: false },
  dashboard: { id: 'dashboard', path: '/dashboard', label: 'Dashboard', isProtected: true },
  document: { id: 'document', path: '/documents/[id]', label: 'Document detail', isProtected: true },
};

export function getAuthScreen(mode: AuthMode): AppScreen {
  return mode;
}
