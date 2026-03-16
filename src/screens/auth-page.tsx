import { Eye, FileText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { PlaceholderButton } from '../components/placeholder-button';
import { APP_NAME } from '../constants/app';
import type { LoginInput } from '../types/auth';

export function AuthPage({
  mode,
  authError,
  authNotice,
  isAuthReady,
  isSupabaseReady,
  onAuthenticate,
  onSwitchMode,
}: {
  mode: 'login' | 'signup';
  authError: string | null;
  authNotice: string | null;
  isAuthReady: boolean;
  isSupabaseReady: boolean;
  onAuthenticate: (mode: 'login' | 'signup', input: LoginInput) => Promise<void>;
  onSwitchMode: (screen: 'login' | 'signup') => void;
}) {
  const isSignup = mode === 'signup';
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900 font-sans flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 lg:px-10 py-3 bg-white">
        <div className="flex items-center gap-3 text-[#0d33f2]">
          <FileText size={32} />
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">{APP_NAME}</h2>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#0d33f2]/10 text-[#0d33f2] text-sm font-bold hover:bg-[#0d33f2]/20 transition-colors" type="button">
          <span>Help</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200"
        >
          <div className="text-center space-y-2">
            <h1 className="text-slate-900 text-3xl font-bold tracking-tight">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 text-base">
              {isSignup ? 'Set up your workspace access' : 'Log in to manage your smart documents'}
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-all" type="button">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-slate-700 font-medium">{isSignup ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                setIsSubmitting(true);
                try {
                  await onAuthenticate(mode, {
                    email: String(formData.get('email') ?? ''),
                    password: String(formData.get('password') ?? ''),
                    fullName: String(formData.get('fullName') ?? ''),
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email address</label>
                <input className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#0d33f2]/20 focus:border-[#0d33f2] transition-all outline-none" placeholder="name@company.com" type="email" name="email" defaultValue="alex@company.com" required />
              </div>
              {isSignup ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full name</label>
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#0d33f2]/20 focus:border-[#0d33f2] transition-all outline-none" placeholder="Alex Rivera" type="text" name="fullName" defaultValue="Alex Rivera" required />
                </div>
              ) : null}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <PlaceholderButton className="text-xs font-semibold text-[#0d33f2] hover:underline">Forgot password?</PlaceholderButton>
                </div>
                <div className="relative">
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#0d33f2]/20 focus:border-[#0d33f2] transition-all outline-none" placeholder="Enter your password" type="password" name="password" defaultValue="demo-password" required />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" type="button">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              <button
                className="w-full py-3 px-4 bg-[#0d33f2] text-white rounded-lg font-bold text-sm tracking-wide hover:bg-[#0d33f2]/90 transition-all shadow-lg shadow-[#0d33f2]/20 disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Working...' : isSignup ? 'Create Account' : 'Log In'}
              </button>
              {!isAuthReady ? <p className="text-xs text-slate-500">Checking authentication state...</p> : null}
              {!isSupabaseReady ? (
                <p className="text-xs text-amber-600">
                  Supabase credentials are missing. Add environment variables before testing real auth.
                </p>
              ) : null}
              {authNotice ? <p className="text-xs text-green-600">{authNotice}</p> : null}
              {authError ? <p className="text-xs text-red-600">{authError}</p> : null}
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button className="text-[#0d33f2] font-bold hover:underline ml-1" onClick={() => onSwitchMode(isSignup ? 'login' : 'signup')} type="button">
                {isSignup ? 'Log in' : 'Create an account'}
              </button>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 px-10 text-center">
        <p className="text-slate-400 text-xs">
          © 2024 {APP_NAME}. All rights reserved.
          <span className="mx-2">|</span>
          <PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Privacy Policy</PlaceholderButton>
          <span className="mx-2">|</span>
          <PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Terms of Service</PlaceholderButton>
        </p>
      </footer>
    </div>
  );
}
