export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: string;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  userId: string;
  userRole: 'admin' | 'operator' | 'supporter';
  currentModule?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ChatbotAnalytics {
  totalSessions: number;
  activeSessions: number;
  totalMessages: number;
  totalQueries: number;
  averageResponseTime: number;
  satisfactionRate: number;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  dailyStats: Array<{
    date: string;
    sessions: number;
    messages: number;
  }>;
}

export interface ChatbotConfig {
  maxMessagesPerSession: number;
  responseDelay: number;
  enableAnalytics: boolean;
  enableVoiceInput: boolean;
  enableFileUpload: boolean;
  supportedLanguages: string[];
}

// Mock data for development
export const mockSessions: ChatSession[] = [
  {
    id: '1',
    userId: 'admin-1',
    userRole: 'admin',
    currentModule: 'dashboard',
    messages: [
      {
        id: '1',
        content: 'Hello! How can I help you with your campaign today?',
        type: 'bot',
        timestamp: new Date('2024-01-15T10:00:00Z'),
        category: 'greeting',
        confidence: 0.95,
      },
    ],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isActive: true,
  },
];

export const mockAnalytics: ChatbotAnalytics = {
  totalSessions: 1247,
  activeSessions: 89,
  totalMessages: 5634,
  totalQueries: 5634,
  averageResponseTime: 2.3,
  satisfactionRate: 94.2,
  topCategories: [
    { category: 'voter_registration', count: 456, percentage: 32.1 },
    { category: 'election_info', count: 234, percentage: 16.5 },
    { category: 'transport', count: 189, percentage: 13.3 },
    { category: 'funds', count: 156, percentage: 11.0 },
    { category: 'general', count: 212, percentage: 14.9 },
  ],
  dailyStats: [
    { date: '2024-01-15', sessions: 45, messages: 234 },
    { date: '2024-01-14', sessions: 52, messages: 287 },
    { date: '2024-01-13', sessions: 38, messages: 198 },
    { date: '2024-01-12', sessions: 41, messages: 215 },
    { date: '2024-01-11', sessions: 47, messages: 256 },
  ],
};

export const defaultConfig: ChatbotConfig = {
  maxMessagesPerSession: 100,
  responseDelay: 1000,
  enableAnalytics: true,
  enableVoiceInput: true,
  enableFileUpload: false,
  supportedLanguages: ['en', 'so'],
};

// Utility functions
export function createChatSession(
  userId: string,
  userRole: 'admin' | 'operator' | 'supporter',
  currentModule?: string
): ChatSession {
  return {
    id: Date.now().toString(),
    userId,
    userRole,
    currentModule,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
}

export function addMessageToSession(
  session: ChatSession,
  content: string,
  type: 'user' | 'bot',
  category?: string,
  confidence?: number
): ChatMessage {
  const message: ChatMessage = {
    id: Date.now().toString(),
    content,
    type,
    timestamp: new Date(),
    category,
    confidence,
  };

  session.messages.push(message);
  session.updatedAt = new Date();

  return message;
}

export function classifyMessage(content: string): {
  category: string;
  confidence: number;
} {
  const lowerContent = content.toLowerCase();

  // Voter registration keywords
  if (lowerContent.includes('register') || lowerContent.includes('registration') || lowerContent.includes('voter')) {
    return { category: 'voter_registration', confidence: 0.9 };
  }

  // Election information keywords
  if (lowerContent.includes('election') || lowerContent.includes('vote') || lowerContent.includes('polling')) {
    return { category: 'election_info', confidence: 0.85 };
  }

  // Transport keywords
  if (lowerContent.includes('bus') || lowerContent.includes('transport') || lowerContent.includes('route')) {
    return { category: 'transport', confidence: 0.8 };
  }

  // Funds keywords
  if (lowerContent.includes('fund') || lowerContent.includes('money') || lowerContent.includes('donation')) {
    return { category: 'funds', confidence: 0.8 };
  }

  // Communication keywords
  if (lowerContent.includes('message') || lowerContent.includes('communication') || lowerContent.includes('broadcast')) {
    return { category: 'communication', confidence: 0.8 };
  }

  // Default to general
  return { category: 'general', confidence: 0.6 };
}

export function generateBotResponse(
  userMessage: string,
  userRole: 'admin' | 'operator' | 'supporter',
  currentModule?: string
): string {
  const classification = classifyMessage(userMessage);
  const lowerMessage = userMessage.toLowerCase();

  // Role-specific responses
  if (userRole === 'admin') {
    if (lowerMessage.includes('fraud') || lowerMessage.includes('alert')) {
      return "I've detected potential fraud patterns in the system. Here are the current alerts:\n\n• 3 duplicate ID registrations in Hargeisa\n• 1 suspicious voting pattern in Berbera\n• 2 unusual communication spikes\n\nWould you like me to investigate any of these further?";
    }
    
    if (lowerMessage.includes('analytics') || lowerMessage.includes('report')) {
      return "Here's your current campaign analytics:\n\n• Total Supporters: 456 (+23 this week)\n• Active Operators: 24\n• Funds Raised: $45,678\n• Bus Utilization: 78%\n• Message Delivery Rate: 94.2%\n\nWould you like detailed reports for any specific area?";
    }
  }

  if (userRole === 'operator') {
    if (lowerMessage.includes('task') || lowerMessage.includes('assignment')) {
      return "Here are your current tasks:\n\n• Visit 15 supporters in Hargeisa district\n• Collect 8 voter registration forms\n• Distribute campaign materials to 3 locations\n• Report back by 6 PM today\n\nWould you like me to help you plan your route?";
    }
  }

  if (userRole === 'supporter') {
    if (lowerMessage.includes('register') || lowerMessage.includes('voter')) {
      return "To register as a voter, you'll need:\n\n• Valid ID (passport, driver's license, or national ID)\n• Proof of residence (utility bill or rental agreement)\n• Visit your nearest registration center\n\nI can help you find the closest registration center. What's your location?";
    }
  }

  // Module-specific responses
  if (currentModule === 'buses') {
    if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      return "Here are the current bus schedules:\n\n• Hargeisa-Berbera: 8:00 AM, 2:00 PM\n• Hargeisa-Burao: 10:00 AM, 4:00 PM\n• Hargeisa-Borama: 9:00 AM, 3:00 PM\n\nAll buses are currently on schedule. Would you like real-time tracking?";
    }
  }

  if (currentModule === 'funds') {
    if (lowerMessage.includes('donation') || lowerMessage.includes('contribute')) {
      return "Thank you for your interest in contributing! Here are the ways to donate:\n\n• Mobile Money: +252-61-XXX-XXXX\n• Bank Transfer: Account details available\n• Cash: Visit campaign office\n\nAll donations are tracked and reported transparently.";
    }
  }

  if (currentModule === 'communication') {
    if (lowerMessage.includes('message') || lowerMessage.includes('broadcast')) {
      return "I can help you with communication tasks:\n\n• Send bulk messages to supporters\n• Schedule campaign announcements\n• Track message delivery status\n• Create message templates\n\nWhat type of communication do you need help with?";
    }
  }

  // General responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! I'm your AI campaign assistant. I can help you with voter registration, election information, transport schedules, and more. What would you like to know?`;
  }

  if (lowerMessage.includes('help')) {
    return "I can help you with:\n\n• Voter registration information\n• Election dates and procedures\n• Transport and bus schedules\n• Campaign updates and news\n• General questions about the election\n\nWhat specific information do you need?";
  }

  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with regarding the campaign?";
  }

  // Default response
  return "I understand you're asking about the campaign. Could you provide more specific details so I can give you the most accurate information? I can help with voter registration, election procedures, transport, and other campaign-related topics.";
}

export function calculateSessionMetrics(session: ChatSession): {
  messageCount: number;
  averageResponseTime: number;
  satisfactionScore: number;
} {
  const messageCount = session.messages.length;
  
  // Mock calculation for response time
  const averageResponseTime = 2.3;
  
  // Mock satisfaction score based on message count and session duration
  const sessionDuration = session.updatedAt.getTime() - session.createdAt.getTime();
  const satisfactionScore = Math.min(95, 70 + (messageCount * 2) + (sessionDuration / 60000) * 0.1);
  
  return {
    messageCount,
    averageResponseTime,
    satisfactionScore: Math.round(satisfactionScore),
  };
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    voter_registration: 'bg-blue-100 text-blue-800',
    election_info: 'bg-green-100 text-green-800',
    transport: 'bg-yellow-100 text-yellow-800',
    funds: 'bg-purple-100 text-purple-800',
    communication: 'bg-pink-100 text-pink-800',
    general: 'bg-gray-100 text-gray-800',
  };
  
  return colors[category] || colors.general;
}

export function formatTimestamp(timestamp: Date): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function validateMessage(content: string): {
  isValid: boolean;
  error?: string;
} {
  if (!content.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (content.length > 1000) {
    return { isValid: false, error: 'Message is too long (max 1000 characters)' };
  }
  
  return { isValid: true };
}
