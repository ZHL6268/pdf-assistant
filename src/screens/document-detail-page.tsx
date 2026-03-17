import { Fragment, useEffect, useState } from 'react';
import {
  Download,
  Eye,
  FileSearch,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Send,
  Settings,
  Share2,
  Zap,
} from 'lucide-react';
import { ChatMessage } from '../components/chat-message';
import { InsightItem } from '../components/insight-item';
import { appRoutes } from '../config/routes';
import { APP_NAME } from '../constants/app';
import { useDocumentDetailViewModel } from '../hooks/use-document-detail-view-model';
import type { StoredDocument } from '../types/document';

export function DocumentDetailPage({
  document: activeDocument,
  onBack,
}: {
  document: StoredDocument | null;
  onBack: () => void;
}) {
  const [draftQuestion, setDraftQuestion] = useState('');
  const {
    fileName,
    summary,
    summaryStatus,
    insights,
    chatMessages,
    suggestions,
    chatError,
    isChatLoading,
    isSendingMessage,
    submitQuestion,
  } =
    useDocumentDetailViewModel(activeDocument);

  useEffect(() => {
    document.title = `${fileName} | AI PDF Assistant`;
  }, [fileName]);

  const handleSubmitQuestion = async () => {
    const isSubmitted = await submitQuestion(draftQuestion);
    if (isSubmitted) {
      setDraftQuestion('');
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#f5f6f8] text-slate-900 font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 z-10">
        <div className="flex items-center gap-4 text-[#0d33f2]">
          <div className="size-8 flex items-center justify-center bg-[#0d33f2]/10 rounded-lg">
            <Zap size={20} />
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">{APP_NAME}</h2>
        </div>
        <div className="flex flex-1 justify-end gap-3 items-center">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-400 cursor-not-allowed" type="button" disabled>
              <Download size={20} />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-400 cursor-not-allowed" type="button" disabled>
              <Share2 size={20} />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-400 cursor-not-allowed" type="button" disabled>
              <Settings size={20} />
            </button>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <div className="size-10 rounded-full bg-slate-200 border border-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/alex/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={onBack} className="text-slate-500 hover:text-[#0d33f2] flex items-center gap-1 transition-colors" type="button">
              <LayoutDashboard size={14} />
              {appRoutes.dashboard.label}
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{fileName}</span>
          </nav>

          <div className="flex border-b border-slate-200">
            <button className="px-6 py-3 text-sm font-semibold border-b-2 border-[#0d33f2] text-[#0d33f2] flex items-center gap-2" type="button">
              <FileSearch size={16} />
              Key Insights
            </button>
            <button className="px-6 py-3 text-sm font-medium text-slate-400 flex items-center gap-2 cursor-not-allowed" type="button" disabled>
              <Eye size={16} />
              PDF Preview
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#0d33f2]" />
                <h3 className="text-lg font-bold text-slate-900">Overall Summary</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    summaryStatus === 'Complete'
                      ? 'bg-green-100 text-green-700'
                      : summaryStatus === 'Failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {summaryStatus}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight) => (
                <Fragment key={insight.title}>
                  <InsightItem color={insight.color} title={insight.title} desc={insight.description} />
                </Fragment>
              ))}
            </div>

            <div className="relative bg-slate-200 rounded-xl h-[400px] overflow-hidden flex items-center justify-center group border border-slate-300">
              <div className="absolute inset-0 opacity-10 bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/pdf-bg/1200/800')" }}></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <FileText size={64} className="text-slate-400" />
                <span className="bg-white text-slate-500 px-6 py-2.5 rounded-lg font-bold text-sm shadow-xl">
                  Preview Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-[400px] border-l border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} className="text-[#0d33f2]" />
              <h3 className="font-bold text-slate-900">Chat Assistant</h3>
            </div>
            <span className="text-xs font-bold text-[#0d33f2] bg-[#0d33f2]/10 px-3 py-1 rounded-full">
              History Saved
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isChatLoading ? (
              <p className="text-xs text-slate-500">Loading conversation...</p>
            ) : null}

            {chatMessages.map((message) => (
              <Fragment key={message.id}>
                <ChatMessage isAi={message.isAi} text={message.text} highlight={message.highlight} time={message.time} />
              </Fragment>
            ))}

            <div className="pt-4 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  className="text-xs border border-slate-200 px-3 py-1.5 rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
                  onClick={() => setDraftQuestion(suggestion.label)}
                  type="button"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col gap-3">
              {chatError ? <p className="text-xs text-red-600">{chatError}</p> : null}
              <div className="relative">
                <textarea
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#0d33f2] focus:border-transparent outline-none resize-none placeholder:text-slate-400"
                  placeholder="Ask a question about this document..."
                  rows={3}
                  value={draftQuestion}
                  onChange={(event) => setDraftQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && draftQuestion.trim() && !isSendingMessage) {
                      event.preventDefault();
                      void handleSubmitQuestion();
                    }
                  }}
                ></textarea>
                <button
                  className="absolute bottom-3 right-3 bg-[#0d33f2] text-white p-2 rounded-lg hover:bg-[#0d33f2]/90 transition-colors flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => void handleSubmitQuestion()}
                  type="button"
                  disabled={isSendingMessage || !draftQuestion.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
              {isSendingMessage ? <p className="text-xs text-slate-500">Generating answer...</p> : null}
              <button className="w-full bg-slate-900/60 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed" type="button" disabled>
                <FileSearch size={16} />
                Detailed Report Coming Soon
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
