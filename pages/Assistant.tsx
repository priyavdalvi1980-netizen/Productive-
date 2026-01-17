import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore.ts';
import { chatWithAssistant } from '../services/geminiService.ts';
import { Send, User, Sparkles, BrainCircuit, Lightbulb, TrendingUp, Cpu } from 'lucide-react';
import { ChatMessage } from '../types.ts';

const Assistant: React.FC = () => {
  const { tasks } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Systems online. I'm your Neural Productivity Coach. How can I help you optimize your high-performance cycles today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = tasks.map(t => `${t.title} (${t.status}, ${t.priority})`);
    try {
        const response = await chatWithAssistant(input, context);
        setMessages(prev => [...prev, { role: 'model', text: response, timestamp: Date.now() }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'model', text: "Connection latency detected. Please retry your query.", timestamp: Date.now() }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto h-[calc(100vh-18rem)] flex flex-col animate-fade-in px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-gradient">Neural Coach</h2>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Synthetic Strategy Engine</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Online</span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[2.5rem] md:rounded-[3rem] border-white/10 flex flex-col overflow-hidden shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] md:max-w-[70%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' ? 'bg-white/5 border-white/10' : 'bg-gradient-primary border-transparent shadow-lg'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white/40" /> : <Sparkles className="w-5 h-5 text-white" />}
                </div>
                <div className={`p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] text-sm md:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white rounded-tr-none border border-white/10' 
                    : 'bg-black/40 text-white/90 rounded-tl-none border border-white/5 shadow-inner'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex gap-2 bg-white/5 px-6 py-4 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10 border-t border-white/5 bg-black/20 backdrop-blur-3xl">
          <div className="relative flex items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Consult the strategy engine..."
                className="w-full h-14 md:h-20 bg-black/40 border border-white/10 rounded-2xl md:rounded-[2rem] px-8 md:px-10 text-sm md:text-xl font-medium focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden">
                 <Lightbulb className="w-4 h-4 text-white/20" />
              </div>
            </div>
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-14 h-14 md:w-20 md:h-20 bg-white text-black rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all group shrink-0"
            >
              <Send className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="flex justify-center gap-8 mt-6">
             <button onClick={() => setInput("How should I prioritize today's tasks?")} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors flex items-center gap-2"><Lightbulb className="w-3.5 h-3.5" /> Priority Logic</button>
             <button onClick={() => setInput("Give me a deep work challenge for my next focus session.")} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors flex items-center gap-2"><BrainCircuit className="w-3.5 h-3.5" /> Deep Work Prompt</button>
             <button onClick={() => setInput("Analyze my performance history.")} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Trend Analysis</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;