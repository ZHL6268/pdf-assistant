export type AppScreen = 'landing' | 'login' | 'signup' | 'dashboard' | 'detail';

export interface AppRoute {
  path: string;
  screen: AppScreen;
  label: string;
  title: string;
  isProtected: boolean;
}

export const appRoutes = {
  landing: {
    path: '/',
    screen: 'landing',
    label: 'Landing',
    title: 'AI PDF Assistant',
    isProtected: false,
  },
  login: {
    path: '/login',
    screen: 'login',
    label: 'Login',
    title: 'Login | AI PDF Assistant',
    isProtected: false,
  },
  signup: {
    path: '/signup',
    screen: 'signup',
    label: 'Sign Up',
    title: 'Sign Up | AI PDF Assistant',
    isProtected: false,
  },
  dashboard: {
    path: '/dashboard',
    screen: 'dashboard',
    label: 'Dashboard',
    title: 'Dashboard | AI PDF Assistant',
    isProtected: true,
  },
  detail: {
    path: '/documents/demo',
    screen: 'detail',
    label: 'Document Detail',
    title: 'Document Detail | AI PDF Assistant',
    isProtected: true,
  },
} satisfies Record<AppScreen, AppRoute>;

export function getRouteForPath(pathname: string): AppRoute | null {
  return Object.values(appRoutes).find((route) => route.path === pathname) ?? null;
}

export function getPathForScreen(screen: AppScreen): string {
  return appRoutes[screen].path;
}

export function getScreenForPath(pathname: string): AppScreen {
  const matchedRoute = getRouteForPath(pathname);
  return matchedRoute?.screen ?? 'landing';
}
