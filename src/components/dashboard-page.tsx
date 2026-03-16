import { Bell, FileText, LogOut, Plus, Search, Shield, Sparkles, UploadCloud } from 'lucide-react';
import { AppLogo } from './app-logo';
import { dashboardMetrics, documents } from '../data/mock-data';

interface DashboardPageProps {
  onOpenDocument: () => void;
  onLogout: () => void;
}

export function DashboardPage({ onOpenDocument, onLogout }: DashboardPageProps) {
  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <AppLogo compact />
        <nav className="sidebar-nav">
          <a className="nav-item is-active" href="#">
            <Sparkles size={18} />
            Dashboard
          </a>
          <a className="nav-item" href="#">
            <FileText size={18} />
            Documents
          </a>
          <a className="nav-item" href="#">
            <Shield size={18} />
            Access policy
          </a>
        </nav>

        <div className="sidebar-card">
          <span className="eyebrow">Upload standard</span>
          <p>PDF only, single file, server-side validation, storage and row ownership handled later.</p>
        </div>

        <button className="button button-secondary button-block" onClick={onLogout}>
          <LogOut size={16} />
          Return to landing
        </button>
      </aside>

      <div className="workspace-main">
        <header className="workspace-header">
          <div>
            <span className="eyebrow">Protected dashboard</span>
            <h2>Document management workspace</h2>
          </div>
          <div className="header-actions">
            <label className="search-box">
              <Search size={16} />
              <input placeholder="Search documents" type="search" />
            </label>
            <button className="icon-button" type="button">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main className="workspace-content">
          <section className="metric-grid">
            {dashboardMetrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </article>
            ))}
          </section>

          <section className="surface-card upload-card">
            <div>
              <span className="eyebrow">Document intake</span>
              <h3>Upload entry point</h3>
              <p>The UI is now framed around the documented PDF upload workflow and processing states.</p>
            </div>
            <div className="upload-actions">
              <div className="upload-icon">
                <UploadCloud size={24} />
              </div>
              <button className="button button-primary" type="button">
                <Plus size={16} />
                Select PDF
              </button>
            </div>
          </section>

          <section className="surface-card">
            <div className="section-heading section-heading-row">
              <div>
                <span className="eyebrow">Document table</span>
                <h3>User-owned documents</h3>
              </div>
              <p>Current front-end state uses static records to represent repository-backed data later.</p>
            </div>

            <div className="table-wrap">
              <table className="document-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Uploaded</th>
                    <th>Processing</th>
                    <th>Summary</th>
                    <th>Questions</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr key={document.id}>
                      <td>
                        <div className="document-title-cell">
                          <span className="document-icon">
                            <FileText size={16} />
                          </span>
                          <div>
                            <strong>{document.title}</strong>
                            <p>{document.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>{document.uploadedAt}</td>
                      <td>
                        <span className={`status-pill status-${document.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {document.status}
                        </span>
                      </td>
                      <td>{document.summaryState}</td>
                      <td>{document.questions}</td>
                      <td>
                        <button
                          className="button button-secondary"
                          disabled={document.status !== 'Ready'}
                          onClick={document.status === 'Ready' ? onOpenDocument : undefined}
                          type="button"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
