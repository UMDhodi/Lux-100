
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Plane, ShieldCheck, Globe } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ConciergePage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Our bespoke concierge is ready. How may I refine your visual presence today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    const aiResponse = await getStylingAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  const services = [
    { icon: <Plane />, title: "Private Delivery", desc: "Insured courier by private jet anywhere globally." },
    { icon: <ShieldCheck />, title: "Lifetime Vault", desc: "Access to private repair and restoration atelier." },
    { icon: <Globe />, title: "Event Priority", desc: "Front-row access to international fashion summits." }
  ];

  return (
    <div className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        
        <div className="flex-1 space-y-20">
          <header>
            <div className="font-syncopate text-[10px] tracking-[0.5em] text-slate-400 mb-6 uppercase">The Membership</div>
            <h2 className="font-syncopate text-5xl md:text-8xl font-bold tracking-tighter">BEYOND VISION</h2>
          </header>

          <div className="grid gap-12">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-8 p-8 border border-slate-50 rounded-3xl"
              >
                <div className="bg-black text-white p-4 rounded-full">{s.icon}</div>
                <div>
                  <h4 className="font-syncopate text-sm font-bold mb-2 uppercase tracking-widest">{s.title}</h4>
                  <p className="font-space text-slate-500">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col h-[700px] bg-slate-50 rounded-3xl overflow-hidden shadow-xl">
           <div className="p-10 border-b border-slate-100 bg-white flex justify-between items-center">
             <div>
               <div className="font-syncopate text-xs tracking-widest font-bold">AI STYLIST</div>
               <div className="text-[10px] text-slate-300 uppercase tracking-widest">Active • Series 3.0 Pro</div>
             </div>
             <Sparkles className="text-slate-200" />
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-8">
              {messages.map((m, i) => (
                <div key={i} className={`${m.role === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'} max-w-[80%]`}>
                  <div className={`p-6 font-space text-sm leading-relaxed ${m.role === 'user' ? 'bg-black text-white rounded-2xl' : 'text-slate-800 bg-white shadow-sm italic rounded-2xl'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && <Loader2 className="animate-spin text-slate-200 mx-auto" />}
           </div>

           <div className="p-10 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="CONSULT YOUR CONCIERGE..."
                  className="w-full bg-slate-50 py-6 px-8 rounded-full font-space text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                />
                <button onClick={handleSend} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                  <Send size={20} />
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
