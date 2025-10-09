
import React, { useState, useRef, useEffect } from 'react';
import { getAIInsight } from '../services/geminiService';
import { MOCK_ALERTS } from '../constants';
import { CloseIcon, SendIcon, AssistantIcon, UserIcon } from './Icon';

interface SmartAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const SmartAssistant: React.FC<SmartAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIInsight(input, { alerts: MOCK_ALERTS });
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full bg-secondary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-md flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-accent">
        <div className="flex items-center">
            <AssistantIcon className="w-8 h-8 text-cyan-accent" />
            <h3 className="text-xl font-bold ml-3 text-light">Smart Assistant</h3>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-accent">
          <CloseIcon className="w-6 h-6 text-highlight" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <AssistantIcon className="w-8 h-8 text-cyan-accent flex-shrink-0 mt-1" />}
            <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-cyan-accent text-primary' : 'bg-accent text-light'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <UserIcon className="w-8 h-8 text-highlight flex-shrink-0 mt-1" />}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <AssistantIcon className="w-8 h-8 text-cyan-accent flex-shrink-0 mt-1" />
                 <div className="max-w-xs md:max-w-sm rounded-lg px-4 py-2 bg-accent text-light">
                     <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-highlight rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-highlight rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-highlight rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-accent">
        <div className="flex items-center bg-primary rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about alerts, risks..."
            className="flex-1 bg-transparent p-3 text-light placeholder-accent focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 text-highlight hover:text-cyan-accent disabled:text-accent disabled:cursor-not-allowed">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
