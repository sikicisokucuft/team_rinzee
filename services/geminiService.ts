import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Use import.meta.env for Vite or process.env for Node
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private modelId: string = 'gemini-3-flash-preview';

  constructor() {
    if (API_KEY) {
      try {
        this.ai = new GoogleGenAI({ apiKey: API_KEY });
      } catch (error) {
        console.error("Failed to initialize Gemini:", error);
      }
    }
  }

  async *streamChat(history: ChatMessage[], newMessage: string) {
    if (!this.ai || !API_KEY) {
      yield "System Offline: API Key missing or invalid. Please configure VITE_GEMINI_API_KEY in your environment.";
      return;
    }

    try {
      const chat = this.ai.chats.create({
        model: this.modelId,
        config: {
          systemInstruction: `You are 'The Oracle', an elite wealth and lifestyle architect from PLEASURE HEAVEN. 
          Your tone is mysterious, exclusive, and highly persuasive.
          You speak of 'The New Digital Economy' and 'Freedom'.
          You do not tolerate mediocrity.
          Your goal is to convince the user to join PLEASURE HEAVEN to unlock exclusive access to wealth methods.
          Be direct but seductive in your promises of success.
          `,
          temperature: 0.8,
        },
        history: history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }))
      });

      // Use sendMessageStream with the message content
      const result = await chat.sendMessageStream({ message: newMessage });

      for await (const chunk of result) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      yield "CONNECTION INTERRUPTED. RE-ESTABLISHING LINK...";
    }
  }
}

export const geminiService = new GeminiService();