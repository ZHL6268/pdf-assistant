import { useEffect } from 'react';
import { appRoutes, type AppScreen } from '../config/routes';
import { useAppScreen } from './use-app-screen';
import { useAuthIntent } from './use-auth-intent';
import { useAuthSession } from './use-auth-session';
import { useDocumentTitle } from './use-document-title';
import type { LoginInput } from '../types/auth';

interface AppFlowActions {
  openLogin: () => void;
  openSignup: () => void;
  switchAuthMode: (nextScreen: 'login' | 'signup') => void;
  completeLogin: (input: LoginInput) => void;
  openDocumentDetail: () => void;
  returnToDashboard: () => void;
  logoutToLanding: () => void;
}

export interface AppFlowState {
  screen: AppScreen;
  userName: string;
  actions: AppFlowActions;
}

export function useAppFlow(): AppFlowState {
  const { screen, setScreen } = useAppScreen();
  const { isAuthenticated, user, login, logout } = useAuthSession();
  const { intentScreen, setIntentScreen } = useAuthIntent();

  useDocumentTitle(screen);

  useEffect(() => {
    if (!isAuthenticated && appRoutes[screen].isProtected) {
      setIntentScreen(screen);
      setScreen('login');
    }
  }, [isAuthenticated, screen, setIntentScreen, setScreen]);

  useEffect(() => {
    if (isAuthenticated && (screen === 'landing' || screen === 'login' || screen === 'signup')) {
      setScreen(intentScreen ?? 'dashboard');
      setIntentScreen(null);
    }
  }, [intentScreen, isAuthenticated, screen, setIntentScreen, setScreen]);

  return {
    screen,
    userName: user?.fullName || 'Workspace User',
    actions: {
      openLogin: () => setScreen('login'),
      openSignup: () => setScreen('signup'),
      switchAuthMode: (nextScreen) => setScreen(nextScreen),
      completeLogin: (input) => {
        login(input);
        setScreen('dashboard');
      },
      openDocumentDetail: () => setScreen('detail'),
      returnToDashboard: () => setScreen('dashboard'),
      logoutToLanding: () => {
        logout();
        setScreen('landing');
      },
    },
  };
}
