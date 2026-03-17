import type { ChatMessageItem } from '../types/ui-state';

export function ChatMessage({ isAi, text, highlight, time }: Omit<ChatMessageItem, 'id'>) {
  return (
    <div className={`flex flex-col gap-2 max-w-[85%] ${isAi ? '' : 'ml-auto items-end'}`}>
      <div
        className={`p-3 rounded-xl ${
          isAi ? 'bg-slate-100 rounded-tl-none text-slate-800' : 'bg-[#0d33f2] text-white rounded-tr-none'
        }`}
        >
        <div className="text-sm leading-relaxed">
          {text}
          {highlight ? <> <strong className="text-[#0d33f2]">{highlight}</strong></> : null}
        </div>
      </div>
      <span className="text-[10px] text-slate-400">
        {isAi ? 'AI Assistant' : 'You'} • {time}
      </span>
    </div>
  );
}
