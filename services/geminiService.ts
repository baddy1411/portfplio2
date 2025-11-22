import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      client = new GoogleGenAI({ apiKey });
    }
  }
  return client;
};

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  const genAI = getClient();
  
  if (!genAI) {
    return "Configuration Error: API Key is missing. Please ensure process.env.API_KEY is set.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // We use a chat session to maintain history
    // Note: We map the custom history structure to the SDK's expected format if needed, 
    // but here we will simplify by creating a fresh chat with system instructions each time 
    // or maintaining the chat instance in the component. 
    // For stateless service calls, we can pass history.
    
    // Transforming history for the SDK
    const chatHistory = history.map(h => ({
      role: h.role,
      parts: h.parts
    }));

    const chat = genAI.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later.";
  }
};