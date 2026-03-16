import { useAuthSession } from './use-auth-session';
import type { UserProfileViewModel } from '../types/user-profile';

function buildFallbackProfile(): UserProfileViewModel {
  return {
    displayName: 'Workspace User',
    email: null,
    planLabel: 'Premium Plan',
  };
}

export function useUserProfileViewModel(): UserProfileViewModel {
  const { user } = useAuthSession();

  if (!user) {
    return buildFallbackProfile();
  }

  return {
    displayName: user.fullName,
    email: user.email,
    planLabel: 'Premium Plan',
  };
}
