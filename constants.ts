import { NavigationItem, Collaborator, CollectionItem, HistoryEntry, SearchFilter } from './types';

export const NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'The Mesh', icon: 'grid_view', path: '/' },
  { id: 'collections', label: 'Collections', icon: 'folder_open', path: '/collections' },
  { id: 'docs', label: 'Reader', icon: 'article', path: '/reader' },
  { id: 'team', label: 'Collaborators', icon: 'group', path: '/team' },
  { id: 'history', label: 'Temporal Ledger', icon: 'history', path: '/history' },
];

export const SEARCH_FILTERS: SearchFilter[] = ['All', 'Documents', 'Nodes', 'People'];

export const MOCK_COLLABORATORS: Collaborator[] = [
  { id: '1', name: 'Elena R.', status: 'online', role: 'Lead Architect', avatar: 'https://picsum.photos/100/100' },
  { id: '2', name: 'Kai T.', status: 'flow', role: 'Neural Engineer', avatar: 'https://picsum.photos/101/101' },
  { id: '3', name: 'Sarah C.', status: 'offline', role: 'Data Steward', avatar: 'https://picsum.photos/102/102' },
];

export const MOCK_COLLECTIONS: CollectionItem[] = [
  { id: 'c1', title: 'Q3 Financial Synthesis', relevance: 98, type: 'document', updatedAt: '2h ago', stakeholders: ['1', '2'], coverImage: 'https://picsum.photos/800/400' },
  { id: 'c2', title: 'Project Titan - Core', relevance: 85, type: 'node', updatedAt: '5h ago', stakeholders: ['1'], coverImage: 'https://picsum.photos/800/401' },
  { id: 'c3', title: 'Competitor Landscape', relevance: 72, type: 'stream', updatedAt: '1d ago', stakeholders: ['3'], coverImage: 'https://picsum.photos/800/402' },
  { id: 'c4', title: 'Neural Ops Manual', relevance: 92, type: 'document', updatedAt: '3d ago', stakeholders: ['2', '3'], coverImage: 'https://picsum.photos/800/403' },
];

export const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: 'h1',
    timestamp: '10:42 AM',
    user: 'Elena R.',
    action: 'Modified architecture specs',
    diffs: [
      { type: 'keep', content: ' The system relies on a central node' },
      { type: 'remove', content: ' connected to legacy databases.' },
      { type: 'add', content: ' integrated with the neural mesh layer.' },
      { type: 'keep', content: ' This ensures real-time latency.' },
    ]
  },
  {
    id: 'h2',
    timestamp: '09:15 AM',
    user: 'Kai T.',
    action: 'Updated API endpoints',
    diffs: [
      { type: 'keep', content: 'Endpoint: /v1/neural/sync' },
      { type: 'add', content: 'Method: WEBSOCKET' },
      { type: 'remove', content: 'Method: POST' },
    ]
  }
];

export const ANIMATION_EASE = [0.16, 1, 0.3, 1]; // Exponential ease-out

export const SEARCH_PLACEHOLDERS = [
  "Search internal knowledge base...",
  "Query the intelligence mesh...",
  "Ask about Q3 financial projections...",
  "Find documents related to Project Titan...",
  "Analyze stakeholder sentiment...",
];

export const ASK_AI_PLACEHOLDERS = [
  "Draft a summary of the last meeting...",
  "Explain the implications of the new policy...",
  "Generate a provision node for the marketing team...",
  "Synthesize the Q3 report into key bullets...",
];