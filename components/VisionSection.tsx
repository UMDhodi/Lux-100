
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Shield, Droplets, Target, Wind, PenLine } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('145mm');
  const [selectedFrame, setSelectedFrame] = useState('Brushed Titanium');
  const [selectedLens, setSelectedLens] = useState('Sapphire Blue');
  const [customName, setCustomName] = useState('');

  const sizes = [
    { label: 'SLIM', value: '135mm', desc: 'Narrow fit for sharp features.' },
    { label: 'SIGNATURE', value: '145mm', desc: 'The universal gold standard.' },
    { label: 'BOLD', value: '155mm', desc: 'Over-sized presence.' }
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

  const specs = [
    { icon: <Shield className="w-4 h-4" />, title: "Ballistic Grade", detail: "ANSI Z87.1+ Impact protection" },
    { icon: <Target className="w-4 h-4" />, title: "Zeiss Optics", detail: "Polarized Sapphire infusion" },
    { icon: <Wind className="w-4 h-4" />, title: "Feather-weight", detail: "Total weight 22.4g" },
    { icon: <Droplets className="w-4 h-4" />, title: "Hydrophobic", detail: "Self-cleaning lens nano-coating" }
  ];

  return (
    <section id="vision" className="min-h-screen py-32 px-6 md:px-12 bg-white flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Sticky Image Column */}
        <div className="lg:sticky lg:top-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-slate-50 rounded-3xl overflow-hidden group relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1511499767390-a73350266627?q=80&w=2000&auto=format&fit=crop" 
              alt="LUX-100 Aethelgard"
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full font-syncopate text-[8px] tracking-[0.2em] font-bold">
              EDITION 001-100
            </div>
            
            {/* Live Customization Preview Overlay */}
            <AnimatePresence>
              {customName && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 right-6 font-syncopate text-[7px] tracking-[0.5em] text-slate-400 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-sm uppercase"
                >
                  Engraved: {customName}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {specs.map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-3 p-4 border border-slate-50 rounded-xl"
              >
                <div className="text-slate-400 mt-1">{spec.icon}</div>
                <div>
                  <div className="font-syncopate text-[8px] tracking-widest font-bold uppercase mb-1">{spec.title}</div>
                  <div className="font-space text-[10px] text-slate-400">{spec.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div id="craft" className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-syncopate text-[10px] tracking-[0.5em] text-slate-400 mb-4 uppercase">The Craftsmenship</div>
            <h2 className="font-syncopate text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              LUX-100 <br /> <span className="text-slate-200">AETHELGARD</span>
            </h2>
            <div className="flex items-baseline space-x-4 mb-10">
              <span className="font-syncopate text-2xl font-bold">$12,400</span>
              <span className="font-space text-xs text-slate-400 tracking-widest uppercase">Includes Private Jet Courier</span>
            </div>

            {/* Customization Options */}
            <div className="space-y-12">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-syncopate text-[10px] tracking-[0.3em] font-bold uppercase">1. Selection of Caliber (Size)</span>
                  <button className="flex items-center text-[10px] font-space tracking-widest text-slate-400 hover:text-black transition-colors">
                    <Info className="w-3 h-3 mr-2" /> SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`p-6 border text-left transition-all rounded-2xl group ${
                        selectedSize === size.value 
                        ? 'border-black bg-black text-white' 
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-syncopate text-[10px] tracking-widest font-bold mb-2">{size.label}</div>
                      <div className={`font-space text-[12px] mb-4 ${selectedSize === size.value ? 'text-slate-400' : 'text-slate-500'}`}>
                        {size.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Finish */}
              <div>
                <span className="block font-syncopate text-[10px] tracking-[0.3em] font-bold uppercase mb-6">2. Frame Finish</span>
                <div className="flex space-x-6">
                  {frames.map((frame) => (
                    <button
                      key={frame.name}
                      onClick={() => setSelectedFrame(frame.name)}
                      className="flex flex-col items-center group"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full mb-3 border-2 transition-all ${
                          selectedFrame === frame.name ? 'border-black scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: frame.color }}
                      />
                      <span className={`font-space text-[10px] tracking-tighter ${selectedFrame === frame.name ? 'text-black font-bold' : 'text-slate-400'}`}>
                        {frame.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens Tint */}
              <div>
                <span className="block font-syncopate text-[10px] tracking-[0.3em] font-bold uppercase mb-6">3. Optical Tint</span>
                <div className="flex space-x-6">
                  {lenses.map((lens) => (
                    <button
                      key={lens.name}
                      onClick={() => setSelectedLens(lens.name)}
                      className="flex flex-col items-center group"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full mb-3 border-2 overflow-hidden transition-all ${
                          selectedLens === lens.name ? 'border-black scale-110' : 'border-transparent'
                        }`}
                      >
                        <div className="w-full h-full opacity-60" style={{ backgroundColor: lens.color }} />
                      </div>
                      <span className={`font-space text-[10px] tracking-tighter ${selectedLens === lens.name ? 'text-black font-bold' : 'text-slate-400'}`}>
                        {lens.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalized Engraving */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-syncopate text-[10px] tracking-[0.3em] font-bold uppercase">4. Private Engraving</span>
                  <PenLine className="w-4 h-4 text-slate-300" />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    maxLength={15}
                    placeholder="ENTER NAME OR MONOGRAM"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border-b border-slate-200 py-6 px-4 font-syncopate text-xs tracking-[0.4em] outline-none focus:border-black transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-space text-[10px] text-slate-300">
                    {customName.length}/15
                  </div>
                </div>
                <p className="mt-4 font-space text-[10px] text-slate-400 uppercase tracking-widest">
                  Engraved using high-frequency laser on the inner left temple.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 mt-16">
              <button className="flex-1 py-6 bg-black text-white font-syncopate text-[10px] tracking-[0.3em] uppercase hover:bg-slate-800 transition-all flex items-center justify-center group">
                Add to Vault (Bag)
                <motion.div 
                  initial={{ x: 0 }} 
                  whileHover={{ x: 5 }} 
                  className="ml-3"
                >
                  →
                </motion.div>
              </button>
              <button className="flex-1 py-6 border border-black text-black font-syncopate text-[10px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all">
                Instant Acquisition
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start space-x-6 text-[8px] font-syncopate tracking-widest text-slate-300 uppercase">
              <div className="flex items-center"><Check className="w-3 h-3 mr-2" /> Insured Delivery</div>
              <div className="flex items-center"><Check className="w-3 h-3 mr-2" /> Lifetime Warranty</div>
              <div className="flex items-center"><Check className="w-3 h-3 mr-2" /> Concierge Setup</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
