
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center font-syncopate">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl tracking-[0.5em] mb-8"
      >
        LUX-100
      </motion.div>
      <div className="w-64 h-[1px] bg-slate-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ ease: "linear" }}
        />
      </div>
      <motion.div 
        className="mt-4 text-[10px] tracking-widest text-slate-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        CALIBRATING OPTICS {progress}%
      </motion.div>
      <div className="absolute bottom-12 text-[8px] uppercase tracking-[0.4em] text-slate-300">
        Limited Edition 001/100 • Series Alpha
      </div>
    </div>
  );
};
