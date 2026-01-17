
import { GoogleGenAI } from "@google/genai";
import { ViewMode, AIResponse } from "../types";
import { MOCK_COLLECTIONS } from "../constants";

export const executeQuery = async (
  query: string,
  mode: ViewMode
): Promise<AIResponse> => {
  if (mode === ViewMode.SEARCH) {
    // Neural search simulated for "internal" database feeling
    const delay = Math.random() * (1000 - 600) + 600;
    await new Promise((resolve) => setTimeout(resolve, delay));
    
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
    // Real Intelligence Mesh Integration via Gemini
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: "You are the Nexus OS 4.0 Neural Assistant. Your tone is professional, futuristic, and highly concise. You are integrated into a high-performance knowledge management system. Provide insights, summaries, and synthesis. Format your output with clean markdown. Keep responses brief and high-density.",
        }
      });

      const text = response.text || "Neural mesh timed out. No response received.";
      
      // Heuristic follow-ups based on content
      const followUps = [
        "Synthesize related nodes",
        "Generate executive summary",
        "Analyze stakeholder impact"
      ];

      return {
        type: 'answer',
        content: text,
        followUps: followUps,
        query
      };
    } catch (error) {
      console.error("Neural Mesh Error:", error);
      return {
        type: 'answer',
        content: "Neural link failure. Please verify your system credentials (API Key) and try again.",
        query
      };
    }
  }
};
