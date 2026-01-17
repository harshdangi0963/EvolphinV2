import { ViewMode, AIResponse } from "../types";
import { MOCK_COLLECTIONS } from "../constants";

// Mock Intelligence Engine
// Simulates a "Neural Mesh" responding to queries contextually.

const MOCK_ANSWERS: Record<string, { text: string; followUps: string[] }> = {
  finance: {
    text: "I've analyzed the Q3 Financial Synthesis streams. \n\nRevenue is tracking **12% above projection** due to the unexpected efficiency gains in the Titan Core module. However, the operational overhead in the legacy database sector remains a drag on net margins. \n\nI recommend reallocating resources from the legacy maintenance nodes to the new neural infrastructure.",
    followUps: ["View Q3 Budget Breakdown", "Draft email to Elena R.", "Compare with Q2 Data"]
  },
  titan: {
    text: "Project Titan is currently in **Phase 4 (Optimization)**. \n\nThe core neural mesh is stable, but we are detecting intermittent latency spikes in the western cluster. \n\nLead Architect Elena R. pushed a patch 2 hours ago that addresses the synchronization protocol, but full propagation is pending.",
    followUps: ["Show latency graphs", "Ping Elena R.", "Read Phase 4 Docs"]
  },
  team: {
    text: "The team is currently operating at **high velocity**. \n\n- **Elena R.** is online and editing architecture specs.\n- **Kai T.** is in a flow state (Do Not Disturb).\n- **Sarah C.** is currently offline.\n\nCollaboration density is highest around the 'Neural Ops Manual' node.",
    followUps: ["Schedule Standup", "View Team Velocity", "Message Kai T."]
  },
  default: {
    text: "I have scanned the Intelligence Mesh for relevant nodes. \n\nThe system is operating at nominal capacity. I found several connection points related to your query, mostly clustered around the Knowledge Base and recent architectural decisions. \n\nWould you like me to synthesize a specific document or drill down into a particular data stream?",
    followUps: ["Synthesize recent docs", "Find expert nodes", "Create new collection"]
  }
};

export const executeQuery = async (
  query: string,
  mode: ViewMode
): Promise<AIResponse> => {
  // Simulate network latency for a premium "thinking" feel
  // Random delay between 800ms and 1.5s
  const delay = Math.random() * (1500 - 800) + 800;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (mode === ViewMode.SEARCH) {
    // 1. Simulate Search
    const lowerQuery = query.toLowerCase();
    const results = MOCK_COLLECTIONS.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.type.toLowerCase().includes(lowerQuery)
    );

    const finalResults = results.length > 0 ? results : MOCK_COLLECTIONS.slice(0, 2);

    return {
      type: 'results',
      content: `Found ${finalResults.length} neural nodes relevant to "${query}".`,
      data: finalResults,
      query
    };
  } else {
    // 2. Simulate Chat / Ask AI
    const lowerQuery = query.toLowerCase();
    let responseKey = 'default';

    if (lowerQuery.includes('finance') || lowerQuery.includes('money') || lowerQuery.includes('q3')) {
        responseKey = 'finance';
    } else if (lowerQuery.includes('titan') || lowerQuery.includes('project')) {
        responseKey = 'titan';
    } else if (lowerQuery.includes('team') || lowerQuery.includes('who') || lowerQuery.includes('person')) {
        responseKey = 'team';
    }

    const mockResponse = MOCK_ANSWERS[responseKey];

    return {
      type: 'answer',
      content: mockResponse.text,
      followUps: mockResponse.followUps,
      query
    };
  }
};