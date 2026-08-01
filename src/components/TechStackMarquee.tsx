import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_STACK } from '../data/portfolioData';

export const TechStackMarquee: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const categories = ['ALL', 'Mobile', 'Frontend', 'Backend', 'Database', 'DevOps & Cloud'];
  const filtered = selectedCategory === 'ALL' ? TECH_STACK : TECH_STACK.filter(t => t.category === selectedCategory);

  return (
    <section id="tech-stack" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#f5f5f5] border-t border-black/10 dot-grid">
      <div className="w-full py-6 bg-[#141414] border-y border-black mb-12 sm:mb-20 relative overflow-hidden premium-noise">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#141414] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#141414] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="flex items-center gap-3 px-6 py-2 border border-white/20 bg-white/5">
              <span className="material-symbols-outlined text-red-600 text-lg">{item.icon}</span>
              <span className="font-display font-black text-xs text-white tracking-widest uppercase">{item.name}</span>
              <span className="text-[9px] text-[#f5f5f5]/60 font-mono">{item.experience}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block"><span className="text-emerald-500 font-mono mr-2">❯</span>07 // TECHNICAL MATRIX</span>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
              className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter"
            >
              Engineering Stack.
            </motion.h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 border text-[10px] font-black uppercase tracking-wider transition-all ${selectedCategory === cat ? 'bg-[#141414] border-black text-white shadow-md' : 'bg-white border-black/15 text-[#141414]/70 hover:text-[#141414] hover:border-black'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tech, idx) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="glow-card p-6 premium-hairline bg-white group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#141414] text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <span className="material-symbols-outlined text-xl">{tech.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-black uppercase text-[#141414] group-hover:text-red-600 transition-colors">{tech.name}</h3>
                    <div className="text-[9px] text-red-600 uppercase tracking-widest font-black">{tech.category}</div>
                  </div>
                </div>
                <span className="px-3 py-1 border border-black/20 bg-[#f5f5f5] text-[9px] font-black uppercase text-[#141414]">{tech.experience}</span>
              </div>
              <p className="text-xs text-[#141414]/80 leading-relaxed font-medium">{tech.useCase}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
