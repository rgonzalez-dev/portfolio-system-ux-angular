import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  getMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }

  sendMessage(content: string): Observable<ChatMessage> {
    return new Observable(observer => {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: content,
        sender: 'user',
        timestamp: new Date()
      };

      const messages = [...this.messagesSubject.value, userMessage];
      this.messagesSubject.next(messages);

      // Simulate bot response after delay
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: this.generateBotResponse(content),
          sender: 'bot',
          timestamp: new Date()
        };
        
        const updatedMessages = [...this.messagesSubject.value, botResponse];
        this.messagesSubject.next(updatedMessages);
        observer.next(botResponse);
        observer.complete();
      }, 800);
    });
  }

  private generateBotResponse(userMessage: string): string {
    const responses: { [key: string]: string } = {
      'hello': 'Hello! How can I assist you today?',
      'help': 'I can help you with dashboard questions, project management, financial reporting, customer information, and more. What would you like to know?',
      'dashboard': 'The dashboard shows your key metrics and recent activities. Would you like to see specific information?',
      'projects': 'You have 5 active projects. Would you like more details about any of them?',
      'finances': 'Financial reports are available in the Finances section. What specific information do you need?',
      'customers': 'You have 45 active customers. Would you like to search or filter them?',
      'reports': 'Various reports are available. Which type of report are you interested in?',
      'default': 'That\'s interesting! Can you provide more details?'
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return responses['default'];
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}
