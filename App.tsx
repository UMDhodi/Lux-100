
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisionPage } from './components/VisionPage';
import { CraftPage } from './components/CraftPage';
import { ConciergePage } from './components/ConciergePage';
import { TechSpecs } from './components/TechSpecs';
import { Footer } from './components/Footer';
import { FeatureGrid } from './components/FeatureGrid';
import { CustomCursor } from './components/CustomCursor';

export type ViewState = 'home' | 'vision' | 'craft' | 'concierge';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isTechSpecsOpen, setIsTechSpecsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isLoading, currentView]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8 }}>
            <Hero onOpenTechSpecs={() => setIsTechSpecsOpen(true)} onExplore={() => setCurrentView('vision')} />
            <FeatureGrid />
          </motion.div>
        );
      case 'vision':
        return (
          <motion.div key="vision" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8 }}>
            <VisionPage onCraft={() => setCurrentView('craft')} />
          </motion.div>
        );
      case 'craft':
        return (
          <motion.div key="craft" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8 }}>
            <CraftPage />
          </motion.div>
        );
      case 'concierge':
        return (
          <motion.div key="concierge" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8 }}>
            <ConciergePage />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-inter bg-white overflow-x-hidden selection:bg-black selection:text-white">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen flex flex-col">
          <Navbar currentView={currentView} setView={setCurrentView} />
          
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </main>

          <Footer />
          <TechSpecs isOpen={isTechSpecsOpen} onClose={() => setIsTechSpecsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
