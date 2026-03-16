export type AppScreen = 'landing' | 'login' | 'signup' | 'dashboard' | 'detail';

export interface AppRoute {
  path: string;
  screen: AppScreen;
  label: string;
  isProtected: boolean;
}

export const appRoutes = {
  landing: {
    path: '/',
    screen: 'landing',
    label: 'Landing',
    isProtected: false,
  },
  login: {
    path: '/login',
    screen: 'login',
    label: 'Login',
    isProtected: false,
  },
  signup: {
    path: '/signup',
    screen: 'signup',
    label: 'Sign Up',
    isProtected: false,
  },
  dashboard: {
    path: '/dashboard',
    screen: 'dashboard',
    label: 'Dashboard',
    isProtected: true,
  },
  detail: {
    path: '/documents/demo',
    screen: 'detail',
    label: 'Document Detail',
    isProtected: true,
  },
} satisfies Record<AppScreen, AppRoute>;

export function getPathForScreen(screen: AppScreen): string {
  return appRoutes[screen].path;
}

export function getScreenForPath(pathname: string): AppScreen {
  const matchedRoute = Object.values(appRoutes).find((route) => route.path === pathname);
  return matchedRoute?.screen ?? 'landing';
}
