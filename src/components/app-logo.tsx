import { FileText } from 'lucide-react';

export function AppLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_16px_30px_-18px_rgba(27,69,227,0.9)]">
        <FileText size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Enterprise MVP
        </p>
        <h1 className={`font-semibold tracking-tight text-[var(--color-ink)] ${compact ? 'text-lg' : 'text-xl'}`}>
          AI PDF Assistant
        </h1>
      </div>
    </div>
  );
}
