
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  series: string;
  desc: string;
  img: string;
}

const categories: Category[] = [
  {
    id: 'aethelgard',
    name: 'AETHELGARD',
    series: 'Series Alpha',
    desc: 'The monolith of modern eyewear. Grade 5 Titanium chassis with sapphire optics.',
    img: './aethelgard.png'
  },
  {
    id: 'obsidian',
    name: 'OBSIDIAN',
    series: 'Series Beta',
    desc: 'Pure darkness captured. Hand-polished onyx composite with polarized obsidian lenses.',
    img: './obsidian.png'
  },
  {
    id: 'aurora',
    name: 'AURORA',
    series: 'Series Gamma',
    desc: 'Liquid gold for the eyes. 18K white gold frame with iridescent atmospheric filters.',
    img: './aurora.png'
  }
];

const ParallaxItem: React.FC<{ cat: Category; index: number; onCraft: () => void }> = ({ cat, index, onCraft }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the main image - subtle vertical shift
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const smoothYImage = useSpring(yImage, { stiffness: 100, damping: 30 });

  // Parallax for the background floating text
  const yBgText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const smoothYBgText = useSpring(yBgText, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center">
      {/* Background Floating Text */}
      <motion.div 
        style={{ y: smoothYBgText }}
        className="absolute -z-10 top-0 left-0 w-full flex justify-center pointer-events-none select-none opacity-[0.03]"
      >
        <span className="font-syncopate text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap">
          {cat.name}
        </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center w-full`}
      >
        {/* Parallax Image Container */}
        <div className="flex-1 w-full overflow-hidden rounded-3xl aspect-[4/5] relative">
          <motion.img 
            style={{ y: smoothYImage, scale: 1.2 }}
            src={cat.img} 
            alt={cat.name} 
            className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-space text-xs tracking-widest text-slate-400 uppercase mb-4">{cat.series}</div>
            <h3 className="font-syncopate text-4xl md:text-6xl font-bold tracking-tight mb-6">{cat.name}</h3>
            <p className="font-space text-lg md:text-xl text-slate-500 leading-relaxed mb-10">{cat.desc}</p>
            <button 
              onClick={onCraft}
              className="flex items-center space-x-6 font-syncopate text-[10px] tracking-widest uppercase group"
            >
              <span className="relative">
                Begin Configuration
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
              <div className="p-3 border border-slate-100 rounded-full group-hover:bg-black group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const VisionPage: React.FC<{ onCraft: () => void }> = ({ onCraft }) => {
  return (
    <div className="pt-40 pb-40 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-48 relative">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="font-syncopate text-[10px] tracking-[0.5em] text-slate-400 mb-6 uppercase"
          >
            The Catalog
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-syncopate text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
          >
            COLLECTIONS
          </motion.h2>
          
          {/* Subtle background element for header */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border border-slate-50 rounded-full pointer-events-none opacity-50" />
        </header>

        <div className="space-y-40 md:space-y-80">
          {categories.map((cat, i) => (
            <ParallaxItem key={cat.id} cat={cat} index={i} onCraft={onCraft} />
          ))}
        </div>
      </div>
    </div>
  );
};
