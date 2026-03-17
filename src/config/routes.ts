export interface AppRoute {
  path: string;
  label: string;
  title: string;
  isProtected: boolean;
}

export const appRoutes = {
  landing: {
    path: '/',
    label: 'Landing',
    title: 'AI PDF Assistant',
    isProtected: false,
  },
  login: {
    path: '/login',
    label: 'Login',
    title: 'Login | AI PDF Assistant',
    isProtected: false,
  },
  signup: {
    path: '/signup',
    label: 'Sign Up',
    title: 'Sign Up | AI PDF Assistant',
    isProtected: false,
  },
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    title: 'Dashboard | AI PDF Assistant',
    isProtected: true,
  },
  documentDetail: {
    path: '/documents/:documentId',
    label: 'Document Detail',
    title: 'Document Detail | AI PDF Assistant',
    isProtected: true,
  },
} satisfies Record<'landing' | 'login' | 'signup' | 'dashboard' | 'documentDetail', AppRoute>;

export function getDocumentDetailPath(documentId: string) {
  return `/documents/${documentId}`;
}
