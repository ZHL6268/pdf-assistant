import { AnimatePresence, motion } from 'motion/react';
import { useAppFlow } from './hooks/use-app-flow';
import { AuthPage } from './screens/auth-page';
import { DashboardPage } from './screens/dashboard-page';
import { DocumentDetailPage } from './screens/document-detail-page';
import { LandingPage } from './screens/landing-page';

export default function App() {
  const { screen, actions } = useAppFlow();

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' ? (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LandingPage onGetStarted={actions.openLogin} onOpenSignup={actions.openSignup} />
        </motion.div>
      ) : null}

      {screen === 'login' || screen === 'signup' ? (
        <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AuthPage mode={screen} onLogin={actions.completeLogin} onSwitchMode={actions.switchAuthMode} />
        </motion.div>
      ) : null}

      {screen === 'dashboard' ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DashboardPage onSelectDoc={actions.openDocumentDetail} onLogout={actions.logoutToLanding} />
        </motion.div>
      ) : null}

      {screen === 'detail' ? (
        <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DocumentDetailPage onBack={actions.returnToDashboard} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
