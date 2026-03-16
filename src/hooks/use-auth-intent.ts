import { useEffect, useState } from 'react';
import { type AppScreen } from '../config/routes';

const AUTH_INTENT_STORAGE_KEY = 'ai-pdf-assistant.auth-intent';

function readStoredIntent(): AppScreen | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(AUTH_INTENT_STORAGE_KEY);
  if (!value) {
    return null;
  }

  if (value === 'dashboard' || value === 'detail') {
    return value;
  }

  window.localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
  return null;
}

export function useAuthIntent() {
  const [intentScreen, setIntentScreenState] = useState<AppScreen | null>(() => readStoredIntent());

  useEffect(() => {
    const handleStorage = () => {
      setIntentScreenState(readStoredIntent());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setIntentScreen = (screen: AppScreen | null) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (screen) {
      window.localStorage.setItem(AUTH_INTENT_STORAGE_KEY, screen);
      setIntentScreenState(screen);
      return;
    }

    window.localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
    setIntentScreenState(null);
  };

  return {
    intentScreen,
    setIntentScreen,
  };
}
