import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthUser } from '../types/auth';

interface ProfileRecord {
  id: string;
  email: string;
  full_name: string | null;
}

const PROFILE_FETCH_TIMEOUT_MS = 5000;

export async function fetchUserProfile(
  supabase: SupabaseClient,
  fallbackUser: AuthUser,
): Promise<AuthUser> {
  let timeoutId: number | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error('Profile lookup timed out.'));
    }, PROFILE_FETCH_TIMEOUT_MS);
  });

  try {
    const { data, error } = await Promise.race([
      supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', fallbackUser.id)
        .maybeSingle<ProfileRecord>(),
      timeoutPromise,
    ]);

    if (error || !data) {
      return fallbackUser;
    }

    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name || fallbackUser.fullName,
    };
  } catch {
    return fallbackUser;
  } finally {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  }
}
