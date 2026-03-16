import type {
  ChatRecord,
  DashboardMetric,
  DocumentRecord,
  FeatureItem,
  ProcessStep,
  SummaryHighlight,
} from '../types/app';

export const coreFeatures: FeatureItem[] = [
  {
    title: 'Secure document onboarding',
    description:
      'Prepare the upload experience for PDF validation, protected storage, and dashboard visibility.',
  },
  {
    title: 'Grounded summary workflow',
    description:
      'Reflect the MVP path where summaries are generated server-side and stored against a single document.',
  },
  {
    title: 'Single-document AI chat',
    description:
      'Keep the detail page oriented around one document, one summary panel, and persistent question history.',
  },
];

export const userFlow: ProcessStep[] = [
  {
    step: 'Authentication',
    detail: 'Users sign up or log in before reaching protected workspace pages.',
  },
  {
    step: 'Dashboard',
    detail: 'Uploaded PDFs appear with processing state, timestamps, and summary readiness.',
  },
  {
    step: 'Document workspace',
    detail: 'Each document exposes a summary section and a grounded Q&A thread.',
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'Documents tracked',
    value: '28',
    detail: 'User-owned records visible in the protected dashboard.',
  },
  {
    label: 'Summaries generated',
    value: '19',
    detail: 'Structured summaries already stored for review and reuse.',
  },
  {
    label: 'Questions answered',
    value: '142',
    detail: 'Document-specific chat history retained for future sessions.',
  },
];

export const documents: DocumentRecord[] = [
  {
    id: 'doc-001',
    title: 'Quarterly Strategy Review.pdf',
    uploadedAt: '2026-03-12 09:20',
    status: 'Ready',
    summaryState: 'Generated',
    questions: 18,
  },
  {
    id: 'doc-002',
    title: 'Customer Research Synthesis.pdf',
    uploadedAt: '2026-03-11 16:45',
    status: 'Processing',
    summaryState: 'Queued',
    questions: 0,
  },
  {
    id: 'doc-003',
    title: 'Vendor Security Checklist.pdf',
    uploadedAt: '2026-03-09 11:05',
    status: 'Ready',
    summaryState: 'Generated',
    questions: 7,
  },
  {
    id: 'doc-004',
    title: 'Board Planning Notes.pdf',
    uploadedAt: '2026-03-07 14:10',
    status: 'Needs review',
    summaryState: 'Missing',
    questions: 2,
  },
];

export const summaryHighlights: SummaryHighlight[] = [
  {
    title: 'Executive summary',
    description:
      'The document prioritizes AI-assisted search, upload reliability, and role-based access as the first product milestones.',
    tone: 'success',
  },
  {
    title: 'Delivery constraints',
    description:
      'OCR, multi-document retrieval, billing, and advanced prompt customization remain outside MVP scope.',
    tone: 'warning',
  },
  {
    title: 'Architecture direction',
    description:
      'Pages should stay thin while services, repositories, validators, and prompt templates hold reusable logic.',
    tone: 'neutral',
  },
];

export const chatHistory: ChatRecord[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content:
      'I have parsed the current document context. You can ask about the scope, system modules, or rollout phases.',
    timestamp: '09:41',
  },
  {
    id: 'msg-002',
    role: 'user',
    content: 'What does the MVP explicitly exclude?',
    timestamp: '09:43',
  },
  {
    id: 'msg-003',
    role: 'assistant',
    content:
      'The MVP excludes OCR, cross-document retrieval, billing, team collaboration, model switching, and highly optimized retrieval pipelines.',
    timestamp: '09:43',
  },
];
