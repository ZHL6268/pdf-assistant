import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../lib/supabase/client';
import type { AuthSession, AuthUser, LoginInput } from '../types/auth';

interface AuthSessionContextValue {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  isSupabaseReady: boolean;
  authError: string | null;
  user: AuthUser | null;
  signIn: (input: LoginInput) => Promise<boolean>;
  signUp: (input: LoginInput) => Promise<boolean>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

function mapSupabaseUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? '',
    fullName:
      (typeof user.user_metadata.full_name === 'string' && user.user_metadata.full_name) ||
      (user.email?.split('@')[0] ?? 'Workspace User'),
  };
}

function mapSession(session: Session | null): AuthSession | null {
  if (!session?.user) {
    return null;
  }

  return {
    user: mapSupabaseUser(session.user),
  };
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const isSupabaseReady = isSupabaseConfigured();

  useEffect(() => {
    if (!supabase) {
      // Keep the app bootable when env vars are missing, but surface a hard auth blocker in the UI.
      setIsAuthReady(true);
      setAuthError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable real auth.');
      return;
    }

    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) {
          return;
        }

        if (error) {
          setAuthError(error.message);
          setSession(null);
        } else {
          setSession(mapSession(data.session));
        }

        setIsAuthReady(true);
      })
      .catch((error: Error) => {
        if (!isMounted) {
          return;
        }

        setAuthError(error.message);
        setIsAuthReady(true);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(mapSession(nextSession));
      setIsAuthReady(true);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      isAuthenticated: Boolean(session),
      isAuthReady,
      isSupabaseReady,
      authError,
      user: session?.user ?? null,
      signIn: async (input) => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return false;
        }

        setAuthError(null);
        const { error } = await supabase.auth.signInWithPassword({
          email: input.email,
          password: input.password,
        });

        if (error) {
          setAuthError(error.message);
          return false;
        }

        return true;
      },
      signUp: async (input) => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return false;
        }

        setAuthError(null);
        const { error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
          options: {
            data: {
              full_name: input.fullName?.trim() || input.email.split('@')[0] || 'Workspace User',
            },
          },
        });

        if (error) {
          setAuthError(error.message);
          return false;
        }

        return true;
      },
      logout: async () => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return;
        }

        const { error } = await supabase.auth.signOut();
        if (error) {
          setAuthError(error.message);
        }
      },
      clearAuthError: () => setAuthError(null),
    }),
    [authError, isAuthReady, isSupabaseReady, session, supabase],
  );

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider.');
  }

  return context;
}
