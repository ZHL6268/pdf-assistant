import type { DashboardState, DocumentDetailState } from '../types/ui-state';

export const dashboardState: DashboardState = {
  greeting: "Good morning, Alex. Here's what's happening with your documents.",
  documents: [
    { name: 'Quarterly_Report_Q3.pdf', date: 'Oct 24, 2023', status: 'Complete' },
    { name: 'Product_Roadmap_2024.pdf', date: 'Oct 23, 2023', status: 'Pending' },
    { name: 'Legal_Contract_V2.pdf', date: 'Oct 21, 2023', status: 'Complete' },
    { name: 'Market_Analysis_Global.pdf', date: 'Oct 19, 2023', status: 'Complete' },
  ],
};

export const documentDetailState: DocumentDetailState = {
  fileName: 'Q4 Strategic Growth Plan.pdf',
  summary:
    'This document outlines the strategic initiatives for Q4 2024, focusing on aggressive AI integration across all product lines and expanding cloud scalability. It details the budget allocations of $2.4M and defines key performance indicators (KPIs) for evaluating the return on investment (ROI) of these upcoming technological pivots.',
  insights: [
    {
      color: 'blue',
      title: 'Growth Targets',
      description: 'Projected 15% increase in user acquisition through AI-driven personalization features.',
    },
    {
      color: 'purple',
      title: 'Budget Allocation',
      description: '$1.2M earmarked for infrastructure, $800k for talent acquisition, and $400k for marketing.',
    },
    {
      color: 'green',
      title: 'Cloud Scalability',
      description: 'Migration to serverless architecture expected to reduce operational costs by 22% annually.',
    },
    {
      color: 'amber',
      title: 'Risk Factors',
      description: 'Potential delays in GPU procurement and regulatory compliance shifts in the EU market.',
    },
  ],
  chatMessages: [
    {
      id: 'chat-1',
      isAi: true,
      text: "Hello! I've analyzed your document. How can I help you today?",
      time: 'Just now',
    },
    {
      id: 'chat-2',
      text: 'What is the total budget for Q4 initiatives?',
      time: '2 min ago',
    },
    {
      id: 'chat-3',
      isAi: true,
      text: 'The total budget allocation for Q4 is',
      highlight: '$2.4 million',
      time: '1 min ago',
    },
  ],
  suggestions: [
    { label: 'Summarize findings' },
    { label: 'List all KPIs' },
    { label: 'Extract contact info' },
  ],
};
