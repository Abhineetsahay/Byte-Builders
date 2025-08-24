import { NextRequest, NextResponse } from 'next/server';
import { geminiChat, ChatMessage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API called');
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { message, history } = await request.json();
    console.log('Received message:', message);

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let response: string;

    if (history && history.length > 0) {
      // Use history for context
      const messages: ChatMessage[] = [
        ...history,
        { role: 'user', content: message, timestamp: new Date() }
      ];
      response = await geminiChat.sendMessageWithHistory(messages);
    } else {
      // Single message
      response = await geminiChat.sendMessage(message);
    }

    console.log('AI Response:', response);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
