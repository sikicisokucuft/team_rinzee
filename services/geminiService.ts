import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI;
  private modelId: string = 'gemini-3-flash-preview';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async *streamChat(history: ChatMessage[], newMessage: string) {
    if (!API_KEY) {
      yield "ERROR: NO_API_KEY_DETECTED. SYSTEM OFFLINE.";
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