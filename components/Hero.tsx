
import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenTechSpecs: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTechSpecs, onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const circleInnerRef = useRef<HTMLDivElement>(null);
  const circleOuterRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Delay GSAP floating to start after the Framer Motion entrance
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -30,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, 1500);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5);
      const yNorm = (clientY / window.innerHeight - 0.5);
      
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          rotateY: xNorm * 35,
          rotateX: -yNorm * 35,
          duration: 1.5,
          ease: "power2.out"
        });
      }

      // Layered Parallax for Background
      gsap.to(bgGridRef.current, {
        x: -xNorm * 40,
        y: -yNorm * 40,
        duration: 2.5,
        ease: "power1.out"
      });

      gsap.to(circleInnerRef.current, {
        x: -xNorm * 70,
        y: -yNorm * 70,
        duration: 2,
        ease: "power2.out"
      });

      gsap.to(circleOuterRef.current, {
        x: -xNorm * 100,
        y: -yNorm * 100,
        duration: 1.8,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const handleImageHover = (isHovering: boolean) => {
    const scale = isHovering ? 1.03 : 1;
    const opacity = isHovering ? 0.08 : 0.03;

    gsap.to([circleInnerRef.current, circleOuterRef.current], {
      scale: scale,
      duration: 1.2,
      ease: "expo.out"
    });

    gsap.to(bgGridRef.current, {
      opacity: opacity,
      scale: scale,
      duration: 1.2,
      ease: "expo.out"
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-white overflow-hidden pt-56 md:pt-64 pb-20"
    >
      {/* Layered Background Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div ref={bgGridRef} className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="w-[180vw] h-[180vw]"
            style={{ 
              backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 0)', 
              backgroundSize: '100px 100px' 
            }} 
          />
        </div>
        
        <div 
          ref={circleOuterRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vw] h-[130vw] border-[0.5px] border-slate-100 rounded-full opacity-40" 
        />
        
        <div 
          ref={circleInnerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] border-[0.5px] border-slate-100 rounded-full opacity-20" 
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_90%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center max-w-7xl w-full flex flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="font-syncopate text-[9px] md:text-[11px] text-slate-400 mb-6 tracking-[1.2em] uppercase"
        >
          PRIVATE ACCESS • LIMITED TO 100 PIECES
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="font-syncopate text-6xl md:text-[12rem] font-bold tracking-tighter leading-[0.75] mb-12 md:mb-16 select-none"
        >
          LUX-100
        </motion.h1>

        {/* The Product Image Section */}
        <motion.div 
          variants={imageVariants}
          onMouseEnter={() => handleImageHover(true)}
          onMouseLeave={() => handleImageHover(false)}
          className="relative group perspective-[3000px] mb-20 md:mb-28 px-4 w-full flex justify-center cursor-crosshair"
        >
          <motion.img
            ref={imageRef}
            src="./hero.png"
            alt="The LUX-100 masterwork"
            className="w-full max-w-3xl drop-shadow-[0_85px_120px_rgba(0,0,0,0.12)] grayscale transition-all duration-1000 group-hover:grayscale-0 will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          />
          
          <motion.div 
            initial={{ top: '-10%', opacity: 0 }}
            animate={{ top: '110%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none blur-sm"
          />
        </motion.div>

        {/* Call to Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full md:w-auto"
        >
          <button 
            onClick={onExplore}
            className="w-full md:w-auto px-20 py-7 bg-black text-white font-syncopate text-[10px] tracking-[0.5em] uppercase hover:bg-slate-900 transition-all flex items-center justify-center group shadow-2xl shadow-black/10"
          >
            Enter The Vision
            <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
          <button 
            onClick={onOpenTechSpecs}
            className="w-full md:w-auto px-14 py-7 border border-slate-100 font-syncopate text-[10px] tracking-[0.5em] uppercase hover:bg-slate-50 transition-all text-slate-600"
          >
            Technical Specification
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center space-x-6 z-10"
      >
        <div className="w-12 md:w-24 h-[1px] bg-slate-200" />
        <div className="font-space text-[9px] tracking-[0.5em] text-slate-300 uppercase">Series 0.1 • Geneva Workshop • 001/100</div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-200 to-transparent" />
      </motion.div>
    </section>
  );
};
