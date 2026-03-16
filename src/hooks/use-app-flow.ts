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
  completeAuth: (mode: 'login' | 'signup', input: LoginInput) => Promise<void>;
  openDocumentDetail: () => void;
  returnToDashboard: () => void;
  logoutToLanding: () => Promise<void>;
}

export interface AppFlowState {
  screen: AppScreen;
  isAuthReady: boolean;
  authError: string | null;
  authNotice: string | null;
  isSupabaseReady: boolean;
  actions: AppFlowActions;
}

export function useAppFlow(): AppFlowState {
  const { screen, setScreen } = useAppScreen();
  const { isAuthenticated, isAuthReady, isSupabaseReady, authError, authNotice, signIn, signUp, logout, clearAuthError } =
    useAuthSession();
  const { intentScreen, setIntentScreen } = useAuthIntent();

  useDocumentTitle(screen);

  useEffect(() => {
    // Protected screens are still controlled from the shell until router migration lands.
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
    isAuthReady,
    authError,
    authNotice,
    isSupabaseReady,
    actions: {
      openLogin: () => {
        clearAuthError();
        setScreen('login');
      },
      openSignup: () => {
        clearAuthError();
        setScreen('signup');
      },
      switchAuthMode: (nextScreen) => {
        clearAuthError();
        setScreen(nextScreen);
      },
      completeAuth: async (mode, input) => {
        const result = mode === 'signup' ? await signUp(input) : await signIn(input);

        if (result.success && result.hasSession) {
          setScreen(intentScreen ?? 'dashboard');
          setIntentScreen(null);
        }
      },
      openDocumentDetail: () => setScreen('detail'),
      returnToDashboard: () => setScreen('dashboard'),
      logoutToLanding: async () => {
        const isSuccessful = await logout();
        if (isSuccessful) {
          clearAuthError();
          setIntentScreen(null);
          setScreen('landing');
        }
      },
    },
  };
}
