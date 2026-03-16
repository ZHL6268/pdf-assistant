import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthUser } from '../types/auth';

interface ProfileRecord {
  id: string;
  email: string;
  full_name: string | null;
}

export async function fetchUserProfile(
  supabase: SupabaseClient,
  fallbackUser: AuthUser,
): Promise<AuthUser> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('id', fallbackUser.id)
    .single<ProfileRecord>();

  if (error || !data) {
    return fallbackUser;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name || fallbackUser.fullName,
  };
}
