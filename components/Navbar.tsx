
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { ViewState } from '../App';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold is set to nearly the full height of the viewport (Hero section)
      const threshold = window.innerHeight * 0.9;
      if (window.scrollY > threshold) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize on mount/view change
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks: { name: string; view: ViewState }[] = [
    { name: 'Home', view: 'home' },
    { name: 'Vision', view: 'vision' },
    { name: 'Craft', view: 'craft' },
    { name: 'Concierge', view: 'concierge' },
  ];

  const handleNav = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic for sticky behavior:
  // On home: sticky (fixed) only after scrolling past hero.
  // On other views: always fixed.
  const isFixed = currentView !== 'home' || isScrolledPastHero;

  return (
    <>
      <nav 
        className={`
          left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-8 transition-all duration-700
          ${isFixed 
            ? 'fixed top-0 bg-white/80 backdrop-blur-md border-b border-slate-50' 
            : 'absolute top-0 bg-transparent border-transparent'
          }
        `}
      >
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-900 z-[110]"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </AnimatePresence>
          </button>

          <div className="hidden md:flex space-x-10 text-[10px] font-syncopate tracking-[0.4em] uppercase font-bold">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNav(link.view)}
                className={`transition-colors relative group ${currentView === link.view ? 'text-black' : 'text-slate-300'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-300 ${currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          className="text-xl md:text-2xl font-syncopate font-bold tracking-[0.3em] absolute left-1/2 -translate-x-1/2 pointer-events-none"
        >
          LUX-100
        </motion.div>

        <div className="flex items-center space-x-6">
          <button className="hidden md:block text-slate-900"><User size={20} /></button>
          <button className="text-slate-900 flex items-center group relative">
            <ShoppingBag size={20} />
            <span className="ml-2 text-[9px] font-space font-bold bg-black text-white px-2 py-0.5 rounded-full group-hover:scale-110 transition-transform">0</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.view)}
                  className={`font-syncopate text-2xl tracking-[0.5em] uppercase font-bold transition-colors ${currentView === link.view ? 'text-black' : 'text-slate-300'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
