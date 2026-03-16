import type { AuthSession, LoginInput } from '../types/auth';

export function buildDemoSession(input: LoginInput): AuthSession {
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
