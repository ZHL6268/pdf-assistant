import type { ReactNode } from 'react';
import { AlertTriangle, Cloud, TrendingUp, Wallet } from 'lucide-react';
import type { InsightCardItem } from '../types/ui-state';

function renderInsightIcon(color: InsightCardItem['color']): ReactNode {
  const icons: Record<InsightCardItem['color'], ReactNode> = {
    blue: <TrendingUp size={20} />,
    purple: <Wallet size={20} />,
    green: <Cloud size={20} />,
    amber: <AlertTriangle size={20} />,
  };

  return icons[color];
}

export function InsightItem({
  color,
  title,
  desc,
}: {
  color: InsightCardItem['color'];
  title: string;
  desc: string;
}) {
  const colorClasses: Record<InsightCardItem['color'], string> = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0d33f2]/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{renderInsightIcon(color)}</div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
          <p className="text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}
