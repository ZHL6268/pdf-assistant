import { ChevronLeft, Lock, Mail, UserRound } from 'lucide-react';
import { AppLogo } from './app-logo';
import type { AuthMode } from '../types/app';

interface AuthPageProps {
  mode: AuthMode;
  onBack: () => void;
  onSubmit: () => void;
  onSwitchMode: (mode: AuthMode) => void;
}

export function AuthPage({ mode, onBack, onSubmit, onSwitchMode }: AuthPageProps) {
  const isSignup = mode === 'signup';

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <button className="back-link" onClick={onBack}>
          <ChevronLeft size={16} />
          Back to landing
        </button>
        <AppLogo />
        <div className="auth-copy">
          <span className="eyebrow">{isSignup ? 'Signup route' : 'Login route'}</span>
          <h2>{isSignup ? 'Create a protected workspace account.' : 'Sign in to your document workspace.'}</h2>
          <p>
            This form structure reflects the PRD page map and keeps authentication separate from dashboard and
            document logic.
          </p>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-switch">
            <button
              className={mode === 'login' ? 'is-active' : ''}
              onClick={() => onSwitchMode('login')}
              type="button"
            >
              Log in
            </button>
            <button
              className={mode === 'signup' ? 'is-active' : ''}
              onClick={() => onSwitchMode('signup')}
              type="button"
            >
              Sign up
            </button>
          </div>

          <div className="section-heading">
            <h3>{isSignup ? 'Set up your account' : 'Welcome back'}</h3>
            <p>{isSignup ? 'Prepare auth scaffolding for Supabase integration.' : 'Use this page as the protected app entry point.'}</p>
          </div>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            {isSignup && (
              <label className="field">
                <span>Full name</span>
                <div className="field-input">
                  <UserRound size={16} />
                  <input placeholder="Alex Rivera" type="text" required />
                </div>
              </label>
            )}

            <label className="field">
              <span>Email</span>
              <div className="field-input">
                <Mail size={16} />
                <input placeholder="name@company.com" type="email" required />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="field-input">
                <Lock size={16} />
                <input placeholder={isSignup ? 'Create a password' : 'Enter your password'} type="password" required />
              </div>
            </label>

            <button className="button button-primary button-block" type="submit">
              {isSignup ? 'Create account' : 'Continue to dashboard'}
            </button>
          </form>

          <p className="auth-footnote">
            No live authentication is being added in this step. This is a front-end structure pass only.
          </p>
        </div>
      </main>
    </div>
  );
}
