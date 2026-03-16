import { useEffect, useMemo, useState } from 'react';
import type { AuthSession, LoginInput } from '../types/auth';
import { buildDemoSession } from '../services/demo-auth-service';
import { readStoredSession, writeStoredSession } from '../services/auth-session-storage';

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
    const nextSession = buildDemoSession(input);
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
