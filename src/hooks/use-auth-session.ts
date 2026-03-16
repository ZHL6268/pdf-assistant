import { useEffect, useMemo, useState } from 'react';
import { AUTH_SESSION_STORAGE_KEY } from '../constants/app';
import type { AuthSession, LoginInput } from '../types/auth';

function readStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
}

function writeStoredSession(session: AuthSession | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (session) {
    window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

function buildMockSession(input: LoginInput): AuthSession {
  const displayName = input.email.split('@')[0] || 'Workspace User';

  return {
    user: {
      id: 'local-demo-user',
      email: input.email,
      fullName: displayName
        .split(/[._-]/)
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' '),
    },
  };
}

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession());

  useEffect(() => {
    const handleStorage = () => {
      setSession(readStoredSession());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const authState = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      user: session?.user ?? null,
    }),
    [session],
  );

  const login = (input: LoginInput) => {
    const nextSession = buildMockSession(input);
    writeStoredSession(nextSession);
    setSession(nextSession);
  };

  const logout = () => {
    writeStoredSession(null);
    setSession(null);
  };

  return {
    ...authState,
    login,
    logout,
  };
}
