import type { StoredDocument } from './document';

export interface DocumentRowItem {
  name: string;
  date: string;
  status: 'Complete' | 'Pending';
}

export interface DashboardDocumentItem extends DocumentRowItem {
  id: string;
}

export interface InsightCardItem {
  color: 'blue' | 'purple' | 'green' | 'amber';
  title: string;
  description: string;
}

export interface SuggestionChip {
  label: string;
}

export interface ChatMessageItem {
  id: string;
  isAi?: boolean;
  time: string;
  text: string;
  highlight?: string;
}

export interface DocumentDetailState {
  fileName: string;
  summary: string;
  insights: InsightCardItem[];
  chatMessages: ChatMessageItem[];
  suggestions: SuggestionChip[];
}

export interface DashboardState {
  greeting: string;
  documents: DashboardDocumentItem[];
}
