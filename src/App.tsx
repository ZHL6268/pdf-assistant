import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthPage } from './components/auth-page';
import { DashboardPage } from './components/dashboard-page';
import { DocumentDetailPage } from './components/document-detail-page';
import { LandingPage } from './components/landing-page';
import { getAuthScreen } from './config/routes';
import type { AppScreen, AuthMode } from './types/app';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24 }}
        >
          <LandingPage
            onOpenLogin={() => {
              setAuthMode('login');
              setScreen(getAuthScreen('login'));
            }}
            onOpenSignup={() => {
              setAuthMode('signup');
              setScreen(getAuthScreen('signup'));
            }}
          />
        </motion.div>
      )}

      {(screen === 'login' || screen === 'signup') && (
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24 }}
        >
          <AuthPage
            mode={authMode}
            onBack={() => setScreen('landing')}
            onSubmit={() => setScreen('dashboard')}
            onSwitchMode={(mode) => {
              setAuthMode(mode);
              setScreen(getAuthScreen(mode));
            }}
          />
        </motion.div>
      )}

      {screen === 'dashboard' && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24 }}
        >
          <DashboardPage
            onLogout={() => setScreen('landing')}
            onOpenDocument={() => setScreen('document')}
          />
        </motion.div>
      )}

      {screen === 'document' && (
        <motion.div
          key="document"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24 }}
        >
          <DocumentDetailPage onBack={() => setScreen('dashboard')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
