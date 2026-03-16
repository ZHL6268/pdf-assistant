import { ArrowLeft, FileText, MessageSquareText, PanelLeftClose, Send, Sparkles } from 'lucide-react';
import { appRoutes } from '../config/routes';
import { chatHistory, summaryHighlights } from '../data/mock-data';

export function DocumentDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-shell">
      <header className="detail-header">
        <div className="detail-heading">
          <button className="back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            {appRoutes.dashboard.label}
          </button>
          <div>
            <span className="eyebrow">Document workspace</span>
            <h2>Quarterly Strategy Review.pdf</h2>
          </div>
        </div>

        <button className="button button-secondary" type="button">
          <PanelLeftClose size={16} />
          Preview panel
        </button>
      </header>

      <main className="detail-main">
        <section className="detail-content">
          <article className="surface-card summary-card">
            <div className="section-heading">
              <span className="eyebrow">Summary module</span>
              <h3>Stored document summary</h3>
              <p>
                The page now reflects a dedicated summary surface instead of mixing unrelated dashboard content into
                the detail view.
              </p>
            </div>

            <div className="summary-body">
              <div className="summary-intro">
                <span className="summary-icon">
                  <Sparkles size={18} />
                </span>
                <p>
                  This document describes a phased SaaS MVP for uploading PDFs, generating concise summaries, and
                  supporting grounded question answering while keeping future backend layers cleanly separated.
                </p>
              </div>

              <div className="highlight-grid">
                {summaryHighlights.map((item) => (
                  <article className={`highlight-card tone-${item.tone}`} key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="surface-card preview-card">
            <div className="section-heading section-heading-row">
              <div>
                <span className="eyebrow">Preview placeholder</span>
                <h3>Document rendering area</h3>
              </div>
              <FileText size={18} />
            </div>
            <div className="preview-frame">
              <p>Reserved for the future PDF preview implementation. No viewer logic is introduced in this step.</p>
            </div>
          </article>
        </section>

        <aside className="chat-panel">
          <div className="chat-header">
            <div>
              <span className="eyebrow">Chat module</span>
              <h3>Grounded conversation</h3>
            </div>
            <MessageSquareText size={18} />
          </div>

          <div className="chat-history">
            {chatHistory.map((message) => (
              <article
                className={`chat-bubble ${message.role === 'assistant' ? 'is-assistant' : 'is-user'}`}
                key={message.id}
              >
                <p>{message.content}</p>
                <span>{message.role} • {message.timestamp}</span>
              </article>
            ))}
          </div>

          <form className="chat-composer">
            <textarea placeholder="Ask a question about this document" rows={4} />
            <button className="button button-primary button-block" type="button">
              <Send size={16} />
              Send question
            </button>
          </form>
        </aside>
      </main>
    </div>
  );
}
