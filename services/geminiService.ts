
import { GoogleGenAI } from "@google/genai";
import type { Alert } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Smart Assistant will not function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIInsight = async (prompt: string, context: { alerts: Alert[] }): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Smart Assistant is offline. API_KEY is not configured.";
    }

    const model = 'gemini-2.5-flash';
    
    const fullPrompt = `
      You are an expert IT operations analyst integrated into an IT Automation Dashboard.
      Your task is to provide concise, insightful, and actionable advice based on the user's query and the current system data.
      
      CURRENT SYSTEM DATA:
      - Active Alerts: ${JSON.stringify(context.alerts.filter(a => a.status === 'New'), null, 2)}
      
      USER QUERY: "${prompt}"
      
      Based on the data and the query, provide a helpful response. If the query is a general greeting, respond politely.
      Be direct and focus on solutions or key observations. Format your response in simple markdown.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error while processing your request. Please check the console for details.";
    }
};
