import { GoogleGenAI } from "@google/genai";

// Initialize AI with the environment variable securely.
// In a deployed environment, ensure API_KEY is set in the hosting configuration.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProductivityInsight = async (tasks: any[]) => {
  const taskSummary = tasks.map(t => `${t.title} (${t.status}, ${t.priority})`).join(', ');
  const prompt = `Based on these tasks: ${taskSummary}, give me a 2-sentence productivity tip and suggest which task to focus on first.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Systems offline. Connection to Neural Link failed.";
  }
};

export const chatWithAssistant = async (message: string, context: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a high-performance productivity coach. Be concise, encouraging, and data-driven.',
    }
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};