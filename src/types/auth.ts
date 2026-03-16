export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

export interface AuthSession {
  user: AuthUser;
}

export interface LoginInput {
  email: string;
  password: string;
}
