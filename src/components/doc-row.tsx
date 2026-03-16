import { FileText } from 'lucide-react';
import type { DocumentRowItem } from '../types/ui-state';

export function DocRow({
  name,
  date,
  status,
  onOpen,
}: DocumentRowItem & { onOpen: () => void }) {
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
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              status === 'Complete' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
            }`}
          ></span>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={status === 'Complete' ? onOpen : undefined}
          className={`${
            status === 'Complete'
              ? 'text-[#0d33f2] hover:bg-[#0d33f2]/10'
              : 'text-slate-400 cursor-not-allowed'
          } px-4 py-1.5 rounded-lg text-sm font-bold transition-colors`}
          type="button"
        >
          Open
        </button>
      </td>
    </tr>
  );
}
