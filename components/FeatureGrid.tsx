
import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "100 UNITS ONLY",
    desc: "A globally restricted release. Each piece is laser-engraved with its unique production sequence 001-100.",
    img: "/100unit.png"
  },
  {
    title: "AEROSPACE GRADE",
    desc: "Forged from ultra-pure Titanium Grade 5, offering weightless durability that transcends traditional eyewear.",
    img: "/aerospace.png"
  },
  {
    title: "SAPPHIRE INFUSION",
    desc: "Our lenses are layered with synthetic sapphire, providing unmatched scratch resistance and optical clarity.",
    img: "/infusion.png"
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-slate-100 mb-8 rounded-lg">
                <img 
                  src={f.img} 
                  alt={f.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="font-syncopate text-xs tracking-[0.3em] font-bold mb-4">{f.title}</h3>
              <p className="font-space text-sm text-slate-500 leading-relaxed max-w-[90%]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
