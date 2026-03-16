import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { appRoutes } from './config/routes';
import { useAppScreen } from './hooks/use-app-screen';
import { useAuthIntent } from './hooks/use-auth-intent';
import { useAuthSession } from './hooks/use-auth-session';
import { useDocumentTitle } from './hooks/use-document-title';
import { AuthPage } from './screens/auth-page';
import { DashboardPage } from './screens/dashboard-page';
import { DocumentDetailPage } from './screens/document-detail-page';
import { LandingPage } from './screens/landing-page';

export default function App() {
  const { screen, setScreen } = useAppScreen();
  const { isAuthenticated, user, login, logout } = useAuthSession();
  const { intentScreen, setIntentScreen } = useAuthIntent();

  useDocumentTitle(screen);

  useEffect(() => {
    if (!isAuthenticated && appRoutes[screen].isProtected) {
      setIntentScreen(screen);
      setScreen('login');
    }
  }, [isAuthenticated, screen, setIntentScreen, setScreen]);

  useEffect(() => {
    if (isAuthenticated && (screen === 'landing' || screen === 'login' || screen === 'signup')) {
      setScreen(intentScreen ?? 'dashboard');
      setIntentScreen(null);
    }
  }, [intentScreen, isAuthenticated, screen, setIntentScreen, setScreen]);

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' ? (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LandingPage onGetStarted={() => setScreen('login')} onOpenSignup={() => setScreen('signup')} />
        </motion.div>
      ) : null}

      {screen === 'login' || screen === 'signup' ? (
        <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AuthPage
            mode={screen}
            onLogin={(input) => {
              login(input);
              setScreen('dashboard');
            }}
            onSwitchMode={(nextScreen) => setScreen(nextScreen)}
          />
        </motion.div>
      ) : null}

      {screen === 'dashboard' ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DashboardPage
            onSelectDoc={() => setScreen('detail')}
            onLogout={() => {
              logout();
              setScreen('landing');
            }}
            userName={user?.fullName || 'Workspace User'}
          />
        </motion.div>
      ) : null}

      {screen === 'detail' ? (
        <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DocumentDetailPage onBack={() => setScreen('dashboard')} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
