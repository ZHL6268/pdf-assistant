import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { appRoutes, getDocumentDetailPath } from './config/routes';
import { useAuthSession } from './hooks/use-auth-session';
import { useDocumentLibrary } from './hooks/use-document-library';
import { AuthPage } from './screens/auth-page';
import { DashboardPage } from './screens/dashboard-page';
import { DocumentDetailPage } from './screens/document-detail-page';
import { LandingPage } from './screens/landing-page';
import type { LoginInput } from './types/auth';

function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={routeKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

function LandingRoute() {
  const navigate = useNavigate();

  return (
    <PageTransition routeKey="landing">
      <PageTitle title={appRoutes.landing.title} />
      <LandingPage
        onGetStarted={() => navigate(appRoutes.login.path)}
        onOpenSignup={() => navigate(appRoutes.signup.path)}
      />
    </PageTransition>
  );
}

function AuthRoute({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAuthReady, authError, authNotice, isSupabaseReady, signIn, signUp, clearAuthError } =
    useAuthSession();

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) {
      return;
    }

    const nextPath =
      typeof location.state === 'object' &&
      location.state &&
      'from' in location.state &&
      typeof location.state.from === 'string'
        ? location.state.from
        : appRoutes.dashboard.path;

    navigate(nextPath, { replace: true });
  }, [isAuthReady, isAuthenticated, location.state, navigate]);

  const handleAuthenticate = async (authMode: 'login' | 'signup', input: LoginInput) => {
    const result = authMode === 'signup' ? await signUp(input) : await signIn(input);

    if (result.success && result.hasSession) {
      const nextPath =
        typeof location.state === 'object' &&
        location.state &&
        'from' in location.state &&
        typeof location.state.from === 'string'
          ? location.state.from
          : appRoutes.dashboard.path;

      navigate(nextPath, { replace: true });
    }
  };

  return (
    <PageTransition routeKey={mode}>
      <PageTitle title={appRoutes[mode].title} />
      <AuthPage
        mode={mode}
        authError={authError}
        authNotice={authNotice}
        isAuthReady={isAuthReady}
        isSupabaseReady={isSupabaseReady}
        onAuthenticate={handleAuthenticate}
        onSwitchMode={(screen) => {
          clearAuthError();
          navigate(screen === 'login' ? appRoutes.login.path : appRoutes.signup.path, {
            state: location.state,
          });
        }}
      />
    </PageTransition>
  );
}

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isAuthReady } = useAuthSession();

  if (!isAuthReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate replace to={appRoutes.login.path} state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

function DashboardRoute() {
  const navigate = useNavigate();
  const { documents } = useDocumentLibrary();
  const { logout, clearAuthError } = useAuthSession();

  return (
    <PageTransition routeKey="dashboard">
      <PageTitle title={appRoutes.dashboard.title} />
      <DashboardPage
        onSelectDoc={(documentId) => navigate(getDocumentDetailPath(documentId))}
        onOpenFirstDocument={() => {
          if (documents[0]) {
            navigate(getDocumentDetailPath(documents[0].id));
          }
        }}
        onLogout={() => {
          void (async () => {
            const isSuccessful = await logout();
            if (isSuccessful) {
              clearAuthError();
              navigate(appRoutes.landing.path, { replace: true });
            }
          })();
        }}
      />
    </PageTransition>
  );
}

function DocumentDetailRoute() {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const { documents, hasLoadedDocuments, isLibraryLoading, selectDocument } = useDocumentLibrary();

  const currentDocument = documentId
    ? documents.find((document) => document.id === documentId) ?? null
    : null;

  useEffect(() => {
    if (documentId) {
      selectDocument(documentId);
    }
  }, [documentId, selectDocument]);

  useEffect(() => {
    if (!documentId || isLibraryLoading || !hasLoadedDocuments) {
      return;
    }

    const hasDocument = documents.some((document) => document.id === documentId);
    if (!hasDocument) {
      navigate(appRoutes.dashboard.path, { replace: true });
    }
  }, [documentId, documents, hasLoadedDocuments, isLibraryLoading, navigate]);

  return (
    <PageTransition routeKey={`document-${documentId ?? 'unknown'}`}>
      <DocumentDetailPage document={currentDocument} onBack={() => navigate(appRoutes.dashboard.path)} />
    </PageTransition>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={appRoutes.landing.path} element={<LandingRoute />} />
      <Route path={appRoutes.login.path} element={<AuthRoute mode="login" />} />
      <Route path={appRoutes.signup.path} element={<AuthRoute mode="signup" />} />
      <Route element={<ProtectedRoute />}>
        <Route path={appRoutes.dashboard.path} element={<DashboardRoute />} />
        <Route path={appRoutes.documentDetail.path} element={<DocumentDetailRoute />} />
      </Route>
      <Route path="*" element={<Navigate replace to={appRoutes.landing.path} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
