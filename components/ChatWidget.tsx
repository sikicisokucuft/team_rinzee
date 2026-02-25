import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Terminal, Cpu } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Access Restricted. You are currently viewing the public interface. Do you wish to apply for membership?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let fullResponse = "";
    const modelMsg: ChatMessage = { role: 'model', text: "" };
    
    // Add placeholder for streaming
    setMessages(prev => [...prev, modelMsg]);

    const stream = geminiService.streamChat(messages.concat(userMsg), userMsg.text);

    for await (const chunk of stream) {
      fullResponse += chunk;
      setMessages(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
        return newArr;
      });
    }

    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[400px] bg-white border border-violet-200 shadow-2xl shadow-violet-900/10 rounded-lg overflow-hidden flex flex-col animate-fade-in-up">
          {/* Header */}
          <div className="bg-violet-600 border-b border-violet-500 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-violet-100" />
              <span className="font-display text-sm tracking-wider text-white">PLEASURE HEAVEN // AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-violet-200 hover:text-white transition">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 bg-slate-50 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-md text-sm font-mono leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20' 
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
                }`}>
                  {msg.role === 'model' && <Cpu size={14} className="inline-block mr-2 mb-1 text-violet-500" />}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about membership..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-violet-400 font-mono placeholder:text-slate-400"
            />
            <button 
              type="submit" 
              disabled={isTyping}
              className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:scale-105 transition-transform duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:animate-ping"></span>
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>
    </div>
  );
};

export default ChatWidget;