import { ArrowRight, MessageSquareText, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import { AppLogo } from './app-logo';
import { appRoutes } from '../config/routes';
import { coreFeatures, userFlow } from '../data/mock-data';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export function LandingPage({ onOpenLogin, onOpenSignup }: LandingPageProps) {
  return (
    <div className="app-shell landing-shell">
      <header className="topbar">
        <AppLogo />
        <div className="topbar-actions">
          <button className="button button-secondary" onClick={onOpenLogin}>
            Log in
          </button>
          <button className="button button-primary" onClick={onOpenSignup}>
            Start MVP
          </button>
        </div>
      </header>

      <main className="page-content">
        <section className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">PRD-aligned SaaS shell</span>
            <h2>Bring the frontend in line with a production-style AI document assistant.</h2>
            <p>
              This interface now reflects the documented MVP routes such as {appRoutes.login.path},{' '}
              {appRoutes.signup.path}, {appRoutes.dashboard.path}, and {appRoutes.document.path}, while avoiding
              unsupported claims about live backend features.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={onOpenSignup}>
                Review signup flow
              </button>
              <button className="button button-secondary" onClick={onOpenLogin}>
                Open login
              </button>
            </div>
            <div className="hero-tags">
              <span>
                <ShieldCheck size={16} />
                Protected pages
              </span>
              <span>
                <UploadCloud size={16} />
                PDF-first workflow
              </span>
              <span>
                <MessageSquareText size={16} />
                Document-grounded chat
              </span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <div className="panel-card-header">
                <span className="status-dot" />
                Workspace architecture snapshot
              </div>
              <div className="stack-list">
                <div>
                  <strong>Pages</strong>
                  <p>
                    {appRoutes.landing.path}, {appRoutes.login.path}, {appRoutes.signup.path}, {appRoutes.dashboard.path},{' '}
                    {appRoutes.document.path}
                  </p>
                </div>
                <div>
                  <strong>Modules</strong>
                  <p>Auth, document management, summarization, document chat, shared UI</p>
                </div>
                <div>
                  <strong>Boundaries</strong>
                  <p>UI only for now. No live API, storage, auth provider, or parsing implemented yet.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="surface-card">
            <div className="section-heading">
              <span className="eyebrow">Core features</span>
              <h3>What the frontend now represents</h3>
            </div>
            <div className="feature-list">
              {coreFeatures.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card">
            <div className="section-heading">
              <span className="eyebrow">User flow</span>
              <h3>How the documented MVP moves</h3>
            </div>
            <div className="timeline-list">
              {userFlow.map((item, index) => (
                <div className="timeline-item" key={item.step}>
                  <div className="timeline-index">{index + 1}</div>
                  <div>
                    <h4>{item.step}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <span className="eyebrow">Current scope</span>
            <h3>Restructured for maintainability before implementing backend features.</h3>
          </div>
          <button className="button button-primary" onClick={onOpenLogin}>
            Enter workspace
            <ArrowRight size={16} />
          </button>
        </section>
      </main>
    </div>
  );
}
