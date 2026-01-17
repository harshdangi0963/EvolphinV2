export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
};

export type CollectionItem = {
  id: string;
  title: string;
  relevance: number; // 0-100
  type: 'node' | 'document' | 'stream';
  updatedAt: string;
  stakeholders: string[];
  coverImage?: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

export type Collaborator = {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy' | 'flow';
  avatar: string;
  role: string;
};

export enum ViewMode {
  SEARCH = 'SEARCH',
  ASK_AI = 'ASK_AI'
}

export type SearchFilter = 'All' | 'Documents' | 'Nodes' | 'People';

export type AIResponse = {
  type: 'answer' | 'results';
  content: string;
  query?: string; // Track the original query for chat UI
  followUps?: string[];
  data?: CollectionItem[];
};

export type ChatTurn = {
  id: string;
  query: string;
  response: AIResponse | null;
  timestamp: number;
};

export type HistoryEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  diffs: {
    type: 'add' | 'remove' | 'keep';
    content: string;
  }[];
};