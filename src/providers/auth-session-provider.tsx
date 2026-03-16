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
import { fetchUserProfile } from '../services/profile-service';
import type { AuthSession, AuthUser, LoginInput } from '../types/auth';

interface AuthSessionContextValue {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  isSupabaseReady: boolean;
  authError: string | null;
  authNotice: string | null;
  user: AuthUser | null;
  signIn: (input: LoginInput) => Promise<{ success: boolean; hasSession: boolean }>;
  signUp: (input: LoginInput) => Promise<{ success: boolean; hasSession: boolean }>;
  logout: () => Promise<boolean>;
  clearAuthError: () => void;
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);
const AUTH_REQUEST_TIMEOUT_MS = 10000;

async function withTimeout<T>(promise: Promise<T>, timeoutMessage: string): Promise<T> {
  let timeoutId: number | null = null;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, AUTH_REQUEST_TIMEOUT_MS);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  }
}

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

async function hydrateAppSession(session: Session | null, supabase: ReturnType<typeof getSupabaseBrowserClient>) {
  if (!session || !supabase) {
    return null;
  }

  const mappedSession = mapSession(session);
  if (!mappedSession) {
    return null;
  }

  const profileBackedUser = await fetchUserProfile(supabase, mappedSession.user);
  return { user: profileBackedUser };
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
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

    withTimeout(supabase.auth.getSession(), 'Auth session check timed out. Refresh the page and try again.')
      .then(async ({ data, error }) => {
        if (!isMounted) {
          return;
        }

        if (error) {
          setAuthError(error.message);
          setSession(null);
        } else {
          setSession(await hydrateAppSession(data.session, supabase));
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

    const { data } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(await hydrateAppSession(nextSession, supabase));

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
      authNotice,
      user: session?.user ?? null,
      signIn: async (input) => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return { success: false, hasSession: false };
        }

        try {
          setAuthError(null);
          setAuthNotice(null);
          const { data, error } = await withTimeout(
            supabase.auth.signInWithPassword({
              email: input.email,
              password: input.password,
            }),
            'Login timed out. Check your network and Supabase configuration, then try again.',
          );

          if (error) {
            setAuthError(error.message);
            return { success: false, hasSession: false };
          }

          setSession(await hydrateAppSession(data.session, supabase));
          return { success: true, hasSession: Boolean(data.session) };
        } catch (error) {
          setAuthError(error instanceof Error ? error.message : 'Login failed.');
          return { success: false, hasSession: false };
        }
      },
      signUp: async (input) => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return { success: false, hasSession: false };
        }

        try {
          setAuthError(null);
          setAuthNotice(null);
          const { data, error } = await withTimeout(
            supabase.auth.signUp({
              email: input.email,
              password: input.password,
              options: {
                data: {
                  full_name: input.fullName?.trim() || input.email.split('@')[0] || 'Workspace User',
                },
              },
            }),
            'Signup timed out. Check your network and Supabase configuration, then try again.',
          );

          if (error) {
            setAuthError(error.message);
            return { success: false, hasSession: false };
          }

          setSession(await hydrateAppSession(data.session, supabase));
          if (!data.session) {
            setAuthNotice('Account created. If email confirmation is enabled, confirm your email before signing in.');
          }

          return { success: true, hasSession: Boolean(data.session) };
        } catch (error) {
          setAuthError(error instanceof Error ? error.message : 'Signup failed.');
          return { success: false, hasSession: false };
        }
      },
      logout: async () => {
        if (!supabase) {
          setAuthError('Supabase is not configured.');
          return false;
        }

        try {
          const { error } = await withTimeout(
            supabase.auth.signOut(),
            'Logout timed out. Check your network and try again.',
          );
          if (error) {
            setAuthError(error.message);
            return false;
          }

          setSession(null);
          setAuthNotice(null);
          return true;
        } catch (error) {
          setAuthError(error instanceof Error ? error.message : 'Logout failed.');
          return false;
        }
      },
      clearAuthError: () => setAuthError(null),
    }),
    [authError, authNotice, isAuthReady, isSupabaseReady, session, supabase],
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
