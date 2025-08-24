import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiChat {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  private chat: any;

  constructor() {
    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a helpful AI assistant for a sustainable cities platform. You help users with environmental issues, city services, and sustainability questions. Be friendly, informative, and provide practical advice.' }],
        },
        {
          role: 'assistant',
          parts: [{ text: 'Hello! I\'m your AI assistant for sustainable cities. I can help you with environmental issues, city services, sustainability questions, and more. How can I assist you today?' }],
        },
      ],
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  async sendMessageWithHistory(messages: ChatMessage[]): Promise<string> {
    try {
      // Convert messages to Gemini format
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const currentMessage = messages[messages.length - 1];
      
      // Start a new chat with history
      const chat = this.model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(currentMessage.content);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message with history to Gemini:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }
}

export const geminiChat = new GeminiChat();
