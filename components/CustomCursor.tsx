
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth trailing effect
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Disable on touch devices
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Geometric Frame */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-black/30 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 45 : 0,
          borderColor: isHovered ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Corner Marks for a more technical look */}
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-black" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-black" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-black" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-black" />
      </motion.div>

      {/* Central Precision Point */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-black"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
      
      {/* Decorative text tracker (very subtle luxury feel) */}
      <motion.div
        className="fixed top-0 left-0 ml-6 mt-6 font-syncopate text-[6px] tracking-[0.3em] uppercase text-black/20"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible && isHovered ? 0.8 : 0,
        }}
      >
        SYSTEM.ACTIVE
      </motion.div>
    </div>
  );
};
