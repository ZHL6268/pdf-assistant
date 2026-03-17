import { FileText } from 'lucide-react';
import type { DocumentRowItem } from '../types/ui-state';

export function DocRow({
  id,
  name,
  date,
  status,
  onOpen,
}: DocumentRowItem & { id?: string; onOpen: (documentId: string) => void }) {
  const statusClassName =
    status === 'Complete'
      ? 'bg-green-100 text-green-700'
      : status === 'Failed'
        ? 'bg-red-100 text-red-700'
        : 'bg-amber-100 text-amber-700';

  const statusDotClassName =
    status === 'Complete'
      ? 'bg-green-500'
      : status === 'Failed'
        ? 'bg-red-500'
        : 'bg-amber-500 animate-pulse';

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-red-500" />
          <span className="font-medium text-slate-900">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClassName}`}>
          <span className={`size-1.5 rounded-full ${statusDotClassName}`}></span>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onOpen(id ?? name)}
          className={`${
            status === 'Failed'
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-[#0d33f2] hover:bg-[#0d33f2]/10'
          } px-4 py-1.5 rounded-lg text-sm font-bold transition-colors`}
          type="button"
          disabled={status === 'Failed'}
        >
          Open
        </button>
      </td>
    </tr>
  );
}
