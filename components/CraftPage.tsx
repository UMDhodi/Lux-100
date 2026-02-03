
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Shield, Droplets, Target, Wind, PenLine } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  series: string;
  img: string;
}

const categories: Category[] = [
  {
    id: 'aethelgard',
    name: 'AETHELGARD',
    series: 'Series Alpha',
    img: '/aethelgard.png'
  },
  {
    id: 'obsidian',
    name: 'OBSIDIAN',
    series: 'Series Beta',
    img: '/obsidian.png'
  },
  {
    id: 'aurora',
    name: 'AURORA',
    series: 'Series Gamma',
    img: '/aurora.png'
  }
];

export const CraftPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedSize, setSelectedSize] = useState('145mm');
  const [selectedFrame, setSelectedFrame] = useState('Brushed Titanium');
  const [selectedLens, setSelectedLens] = useState('Sapphire Blue');
  const [customName, setCustomName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const sizes = [
    { label: 'SLIM', value: '135mm', desc: 'Precision fit.' },
    { label: 'SIGNATURE', value: '145mm', desc: 'The gold standard.' },
    { label: 'BOLD', value: '155mm', desc: 'Maximum presence.' }
  ];

  const frames = [
    { name: 'Brushed Titanium', color: '#B4B4B4' },
    { name: 'Polished Onyx', color: '#1A1A1A' },
    { name: '18K White Gold', color: '#E8E8E8' }
  ];

  const lenses = [
    { name: 'Sapphire Blue', color: '#1E3A8A' },
    { name: 'Obsidian Grey', color: '#374151' },
    { name: 'Rose Gold Flash', color: '#F87171' }
  ];

  const handleEngravingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length <= 15) {
      setCustomName(val);
      if (val.length > 0) {
        setShowConfirmation(true);
      }
    }
  };

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => setShowConfirmation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  return (
    <div className="pt-40 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        <div className="lg:sticky lg:top-40 h-fit">
           <header className="mb-12">
            <div className="font-syncopate text-[10px] tracking-[0.5em] text-slate-400 mb-4 uppercase">The Studio</div>
            <h2 className="font-syncopate text-5xl font-bold tracking-tighter">CRAFT YOUR LEGACY</h2>
          </header>

          <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden relative group shadow-2xl shadow-slate-200">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedCategory.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                src={selectedCategory.img} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </AnimatePresence>
            
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full">
              <span className="font-syncopate text-[8px] tracking-widest font-bold uppercase">{selectedCategory.series}</span>
            </div>

            <AnimatePresence>
              {customName && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute bottom-8 left-8 font-syncopate text-[8px] tracking-[0.5em] text-slate-400 bg-white/80 backdrop-blur-sm px-4 py-2 uppercase"
                >
                  Engraving: {customName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-20">
          {/* Section 0: Category / Archetype */}
          <section>
            <h3 className="font-syncopate text-xs tracking-widest font-bold mb-10">0. SELECT ARCHETYPE</h3>
            <div className="grid grid-cols-3 gap-4">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex flex-col items-center p-4 border rounded-2xl transition-all ${selectedCategory.id === cat.id ? 'border-black bg-black text-white shadow-xl' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <div className="w-full aspect-video mb-3 overflow-hidden rounded-lg bg-slate-100">
                    <img src={cat.img} alt={cat.name} className={`w-full h-full object-cover transition-all ${selectedCategory.id === cat.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} />
                  </div>
                  <div className="font-syncopate text-[8px] tracking-widest font-bold uppercase text-center">{cat.name}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-syncopate text-xs tracking-widest font-bold">1. CALIBER</h3>
              <button className="text-[10px] font-space text-slate-400 flex items-center"><Info size={12} className="mr-2"/> SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sizes.map(s => (
                <button 
                  key={s.value} 
                  onClick={() => setSelectedSize(s.value)}
                  className={`p-6 border text-left rounded-2xl transition-all ${selectedSize === s.value ? 'border-black bg-black text-white' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="font-syncopate text-[10px] mb-1">{s.label}</div>
                  <div className="font-space text-lg">{s.value}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-syncopate text-xs tracking-widest font-bold mb-10">2. FINISH & TINT</h3>
            <div className="space-y-12">
              <div className="flex flex-wrap gap-6">
                {frames.map(f => (
                  <button key={f.name} onClick={() => setSelectedFrame(f.name)} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full border-2 mb-3 ${selectedFrame === f.name ? 'border-black scale-110' : 'border-transparent'}`} style={{ backgroundColor: f.color }} />
                    <span className="text-[9px] font-space uppercase text-slate-400">{f.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-6">
                {lenses.map(l => (
                  <button key={l.name} onClick={() => setSelectedLens(l.name)} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full border-2 mb-3 overflow-hidden ${selectedLens === l.name ? 'border-black scale-110' : 'border-transparent'}`}>
                      <div className="w-full h-full opacity-60" style={{ backgroundColor: l.color }} />
                    </div>
                    <span className="text-[9px] font-space uppercase text-slate-400">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-syncopate text-xs tracking-widest font-bold">3. PERSONALIZATION</h3>
              <AnimatePresence>
                {showConfirmation && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center space-x-2 text-slate-400 font-syncopate text-[8px] tracking-widest uppercase"
                  >
                    <Check size={10} className="text-black" />
                    <span>Pattern Accepted</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <input 
                type="text" 
                maxLength={15}
                placeholder="LASER ENGRAVING"
                value={customName}
                onChange={handleEngravingChange}
                className="w-full bg-slate-50 border-b border-slate-200 py-8 px-6 font-syncopate text-sm tracking-[0.4em] outline-none focus:border-black transition-colors"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 font-space text-[10px] text-slate-300">{customName.length}/15</div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
             <button className="w-full py-8 bg-black text-white font-syncopate text-[10px] tracking-[0.4em] uppercase hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]">Secure Acquisition</button>
             <p className="text-center font-space text-[10px] text-slate-300 uppercase tracking-widest">Handcrafted in Switzerland. Delivery in 14 days via Global Concierge.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
