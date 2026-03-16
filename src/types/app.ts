export type AppScreen = 'landing' | 'login' | 'signup' | 'dashboard' | 'document';

export type AuthMode = 'login' | 'signup';

export type StatusTone = 'success' | 'warning' | 'neutral';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  detail: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  detail: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  uploadedAt: string;
  status: 'Ready' | 'Processing' | 'Needs review';
  summaryState: 'Generated' | 'Queued' | 'Missing';
  questions: number;
}

export interface SummaryHighlight {
  title: string;
  description: string;
  tone: StatusTone;
}

export interface ChatRecord {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}
