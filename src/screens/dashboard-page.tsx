import { Fragment, useRef } from 'react';
import { Bell, CloudUpload, FileText, FolderOpen, LayoutDashboard, LogOut, Search, Settings } from 'lucide-react';
import { DocRow } from '../components/doc-row';
import { appRoutes } from '../config/routes';
import { MAX_UPLOAD_SIZE_MB } from '../constants/app';
import { useDashboardViewModel } from '../hooks/use-dashboard-view-model';
import { useUserProfileViewModel } from '../hooks/use-user-profile-view-model';

export function DashboardPage({
  onSelectDoc,
  onOpenFirstDocument,
  onLogout,
}: {
  onSelectDoc: (documentId: string) => void;
  onOpenFirstDocument: () => void;
  onLogout: () => void;
}) {
  const {
    greeting,
    documents,
    isLibraryLoading,
    isUploadingDocument,
    uploadError,
    uploadSuccessMessage,
    uploadDocument,
    selectDocument,
  } = useDashboardViewModel();
  const userProfile = useUserProfileViewModel();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6f8] text-slate-900 font-sans">
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-[#0d33f2] rounded-lg flex items-center justify-center text-white">
            <FileText size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">AI PDF</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-[#0d33f2] text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} type="button">
            <LayoutDashboard size={20} />
            {appRoutes.dashboard.label}
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" onClick={onOpenFirstDocument} type="button">
            <FolderOpen size={20} />
            My Documents
          </button>
          <span className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-400">
            <Settings size={20} />
            Settings
          </span>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4" type="button">
            <LogOut size={20} />
            Logout
          </button>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-[#0d33f2]/5 rounded-xl p-4 border border-[#0d33f2]/20">
            <p className="text-xs font-semibold text-[#0d33f2] uppercase tracking-wider mb-2">Storage</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-2">
              <div className="bg-[#0d33f2] h-1.5 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-slate-500">1.2 GB of 2 GB used</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-slate-400" placeholder="Search coming soon" type="text" readOnly aria-label="Search coming soon" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 rounded-full relative cursor-not-allowed" type="button" disabled>
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">{userProfile.displayName}</p>
                <p className="text-xs text-slate-500 mt-1">{userProfile.planLabel}</p>
              </div>
              <div className="size-10 rounded-full bg-[#0d33f2]/20 flex items-center justify-center overflow-hidden border-2 border-[#0d33f2]/10 group-hover:border-[#0d33f2]/40 transition-all">
                <img className="w-full h-full object-cover" src="https://picsum.photos/seed/alex/100/100" alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{appRoutes.dashboard.label}</h2>
              <p className="text-slate-500 mt-1">{greeting}</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d33f2] to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-white p-12 transition-all hover:border-[#0d33f2]/50">
                <div className="size-16 rounded-full bg-[#0d33f2]/10 flex items-center justify-center text-[#0d33f2] mb-4">
                  <CloudUpload size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Upload New PDF</h3>
                <p className="text-slate-500 mt-1 mb-6">Drag and drop your file here, or click to browse files</p>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  accept="application/pdf"
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      return;
                    }

                    void uploadDocument(file);
                    event.currentTarget.value = '';
                  }}
                />
                <button
                  className="bg-[#0d33f2] hover:bg-[#0d33f2]/90 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg shadow-[#0d33f2]/20"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  disabled={isUploadingDocument}
                >
                  {isUploadingDocument ? 'Uploading...' : 'Select File'}
                </button>
                <p className="text-xs text-slate-400 mt-4">Supports PDF up to {MAX_UPLOAD_SIZE_MB}MB</p>
                {uploadSuccessMessage ? (
                  <p className="text-xs text-green-600 mt-2">{uploadSuccessMessage}</p>
                ) : null}
                {uploadError ? <p className="text-xs text-red-600 mt-2">{uploadError}</p> : null}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Documents</h3>
                <span className="text-sm font-semibold text-slate-400">Newest first</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Upload Date</th>
                      <th className="px-6 py-4 font-semibold">Summary Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((document) => (
                      <Fragment key={document.id}>
                        <DocRow
                          {...document}
                          onOpen={(documentId) => {
                            selectDocument(documentId);
                            onSelectDoc(documentId);
                          }}
                        />
                      </Fragment>
                    ))}
                    {!isLibraryLoading && documents.length === 0 ? (
                      <tr>
                        <td className="px-6 py-8 text-sm text-slate-500" colSpan={4}>
                          No documents uploaded yet. Upload your first PDF to populate the workspace.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
                <p className="text-sm text-slate-500">
                  {isLibraryLoading
                    ? 'Loading documents...'
                    : `Showing ${documents.length} document${documents.length === 1 ? '' : 's'}`}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
