import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { PlaceholderButton } from './placeholder-button';

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col gap-6 p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-2xl hover:shadow-[#0d33f2]/5 transition-all hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-[#0d33f2]/10 text-[#0d33f2] flex items-center justify-center group-hover:bg-[#0d33f2] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-bold text-slate-900 leading-tight">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4">
        <PlaceholderButton className="text-[#0d33f2] font-bold text-sm inline-flex items-center gap-1 group/link">
          Learn more
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </PlaceholderButton>
      </div>
    </div>
  );
}
