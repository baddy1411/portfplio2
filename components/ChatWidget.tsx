
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Badrish's AI assistant. I can tell you about his work, skills, or experience. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(history, userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slide-up ring-1 ring-black/5 dark:ring-white/5">
          {/* Header */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-teal-500 blur-sm opacity-50"></div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-200">Badrish AI</h3>
                <p className="text-[10px] text-neutral-500 leading-none">Powered by Gemini</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
            >
              <Icons.X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 rounded-2xl rounded-tr-sm' 
                      : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700/50 rounded-2xl rounded-tl-sm'
                  } ${msg.isError ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 border-red-200 dark:border-red-900/50' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 px-4 py-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-1.5 text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Icons.Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group p-3.5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 ${
          isOpen 
            ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white rotate-90' 
            : 'bg-teal-600 text-white'
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <Icons.X size={24} /> : <Icons.MessageSquare size={24} />}
      </button>
    </div>
  );
};
