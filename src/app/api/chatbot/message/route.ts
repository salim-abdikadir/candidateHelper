import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, content, type, category, confidence } = body;

    if (!sessionId || !content || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, this would save to database
    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      messageId: Date.now().toString() 
    });
  } catch (error) {
    console.error('Error saving chatbot message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
