import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INVESTMENTS } from '../data/portfolioData';

interface InvestmentsSectionProps {
  onOpenContact: () => void;
}

export const InvestmentsSection: React.FC<InvestmentsSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'Fintech', 'AI/ML', 'Cybersecurity', 'Infrastructure', 'SaaS'];
  const filtered = activeCategory === 'ALL' ? PORTFOLIO_INVESTMENTS : PORTFOLIO_INVESTMENTS.filter(i => i.category === activeCategory);

  return (
    <section id="investments" className="py-20 sm:py-28 lg:py-32 relative bg-[#fcfcfc] border-t border-[#32302f]/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 gap-8">
          <div>
            <span className="eyebrow mb-3 block"><span className="text-[#b0342e] font-mono mr-2">❯</span>05 // CAPITAL & CONVICTION</span>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
              className="font-display text-4xl sm:text-6xl font-black uppercase text-[#32302f] tracking-tighter"
            >
              Backing Great Founders.
            </motion.h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 border text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeCategory === cat ? 'bg-[#0c0c0d] border-[#32302f] text-[#fcfcfc] shadow-md' : 'bg-[#fcfcfc] border-[#32302f]/15 text-[#32302f]/70 hover:text-[#32302f] hover:border-[#32302f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="focus-group grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {filtered.map((item, idx) => (
            <div className="focus-item">
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="soft-card bg-[#fcfcfc] p-7 sm:p-8 premium-hairline flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-[#0c0c0d] text-white flex items-center justify-center group-hover:bg-[#b0342e] transition-colors">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <span className="px-3 py-1 border border-[#32302f]/20 bg-[#faf8f5] text-[9px] font-black uppercase tracking-widest text-[#32302f]">{item.stage}</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black text-[#b0342e] mb-1">{item.category}</div>
                <h3 className="font-display text-2xl font-black uppercase text-[#32302f] mb-2 group-hover:text-[#b0342e] transition-colors">{item.name}</h3>
                <div className="text-xs font-bold text-[#32302f] mb-4">{item.tagline}</div>
                <p className="text-[#32302f]/80 text-sm leading-relaxed mb-6 font-medium">{item.description}</p>
              </div>
              <div className="pt-4 border-t border-[#32302f]/10 flex items-center justify-between text-xs text-[#32302f]/70">
                <span className="font-black uppercase text-[#32302f]">{item.metrics}</span>
                <span className="material-symbols-outlined text-lg text-[#b0342e] group-hover:translate-x-1 transition-transform">north_east</span>
              </div>
            </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 vault-band flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl premium-noise"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#b0342e] mb-2 block">INVESTMENT THESIS</span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-4">Building the Foundations of Tomorrow.</h3>
            <p className="text-[#fcfcfc]/80 text-sm sm:text-base leading-relaxed font-medium">
              I partner with founders who demonstrate relentless execution, technical obsession, and deep domain conviction.
            </p>
          </div>
          <button onClick={onOpenContact} className="pill pill-on-dark whitespace-nowrap">Pitch Your Venture</button>
        </motion.div>
      </div>
    </section>
  );
};
