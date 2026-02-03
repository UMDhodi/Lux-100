
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap, Layers, Ruler } from 'lucide-react';

interface TechSpecsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ isOpen, onClose }) => {
  const specItems = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Chassis Material",
      value: "Monoblock Grade 5 Aerospace Titanium",
      detail: "Forged under 400 tons of pressure for structural purity."
    },
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Optical Array",
      value: "Zeiss Sapphire Crystal Lenses",
      detail: "12-layer vacuum-deposited anti-reflective coating."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "Hardware",
      value: "18K White Gold Micro-Rivets",
      detail: "Solid gold internal components for corrosion-zero lifespan."
    },
    {
      icon: <Ruler className="w-5 h-5" />,
      label: "Dimensions",
      value: "52 [ ] 18 — 145",
      detail: "Lens width, bridge size, and temple length in millimeters."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/40 backdrop-blur-sm z-[70] cursor-pointer"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.03)] z-[80] overflow-y-auto"
          >
            <div className="p-12">
              <div className="flex justify-between items-center mb-16">
                <div className="font-syncopate text-xs tracking-[0.4em] font-bold">TECHNICAL LOG</div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-12">
                <div className="border-b border-slate-100 pb-8">
                  <h2 className="font-syncopate text-3xl font-bold tracking-tighter mb-4">AETHELGARD SPEC-A</h2>
                  <p className="font-space text-slate-400 text-sm tracking-widest uppercase">Series Alpha • Configuration 0.1</p>
                </div>

                <div className="grid gap-10">
                  {specItems.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                    >
                      <div className="flex items-center space-x-4 mb-3 text-slate-300">
                        {item.icon}
                        <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase">{item.label}</span>
                      </div>
                      <div className="font-space text-lg font-medium text-black mb-1">{item.value}</div>
                      <div className="font-space text-xs text-slate-400 leading-relaxed">{item.detail}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 bg-slate-50 p-8 rounded-2xl">
                  <div className="font-syncopate text-[8px] tracking-[0.4em] text-slate-400 mb-4 uppercase">Advanced Integration</div>
                  <div className="font-space text-sm text-slate-600 leading-relaxed">
                    The Aethelgard features our proprietary <span className="text-black font-bold">Zero-Gravity Hinge™</span> system, eliminating mechanical friction for a lifetime of fluid movement.
                  </div>
                </div>
              </div>

              <div className="mt-20 flex flex-col items-center">
                <div className="w-full h-[1px] bg-slate-100 mb-8" />
                <button 
                  onClick={onClose}
                  className="font-syncopate text-[10px] tracking-widest text-slate-300 hover:text-black transition-colors uppercase"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
