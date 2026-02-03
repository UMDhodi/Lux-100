
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-slate-50 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-12 md:mb-0">
          <div className="font-syncopate text-2xl tracking-[0.4em] font-bold mb-4">LUX-100</div>
          <p className="font-space text-[10px] tracking-[0.2em] text-slate-400 uppercase">A Private Collective of Visionaries.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div>
            <h4 className="font-syncopate text-[10px] tracking-widest font-bold mb-6 text-slate-300">EXPLORE</h4>
            <ul className="space-y-4 font-space text-[12px] uppercase tracking-widest">
              <li><a href="#" className="hover:text-slate-400 transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-slate-400 transition-colors">Archives</a></li>
              <li><a href="#" className="hover:text-slate-400 transition-colors">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syncopate text-[10px] tracking-widest font-bold mb-6 text-slate-300">SUPPORT</h4>
            <ul className="space-y-4 font-space text-[12px] uppercase tracking-widest">
              <li><a href="#" className="hover:text-slate-400 transition-colors">Concierge</a></li>
              <li><a href="#" className="hover:text-slate-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-slate-400 transition-colors">Ethics</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between text-[8px] font-syncopate tracking-[0.3em] text-slate-300 uppercase">
        <div>© 2024 LUX-100 INTERNATIONAL AG. ALL RIGHTS RESERVED.</div>
        <div className="mt-4 md:mt-0">DESIGNED IN SWITZERLAND • ASSEMBLED IN THE FUTURE</div>
      </div>
    </footer>
  );
};
