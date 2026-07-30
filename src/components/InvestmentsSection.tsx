import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INVESTMENTS } from '../data/portfolioData';

interface InvestmentsSectionProps {
  onOpenContact: () => void;
}

export const InvestmentsSection: React.FC<InvestmentsSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Fintech', 'AI/ML', 'Cybersecurity', 'Infrastructure', 'SaaS'];

  const filteredInvestments = activeCategory === 'ALL'
    ? PORTFOLIO_INVESTMENTS
    : PORTFOLIO_INVESTMENTS.filter((item) => item.category === activeCategory);

  return (
    <section id="investments" className="py-24 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block">
              05 // CAPITAL & CONVICTION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter">
              Backing Great Founders.
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 border text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#141414] border-black text-white shadow-md'
                    : 'bg-white border-black/15 text-[#141414]/70 hover:text-[#141414] hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Investment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredInvestments.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 border border-black/15 bg-white flex flex-col justify-between hover:border-black transition-all group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-[#141414] text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <span className="px-3 py-1 border border-black/20 bg-[#f5f5f5] text-[9px] font-black uppercase tracking-widest text-[#141414]">
                    {item.stage}
                  </span>
                </div>

                <div className="text-[10px] uppercase tracking-widest font-black text-red-600 mb-1">
                  {item.category}
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-[#141414] mb-2 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h3>
                <div className="text-xs font-bold text-[#141414] mb-4">
                  {item.tagline}
                </div>
                <p className="text-[#141414]/80 text-sm leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#141414]/70">
                <span className="font-black uppercase text-[#141414]">{item.metrics}</span>
                <span className="material-symbols-outlined text-lg text-red-600 group-hover:translate-x-1 transition-transform">
                  north_east
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investment Thesis Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 border border-black/20 bg-[#141414] text-[#f5f5f5] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2 block">
              INVESTMENT THESIS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-4">
              Building the Foundations of Tomorrow.
            </h3>
            <p className="text-[#f5f5f5]/80 text-sm sm:text-base leading-relaxed font-medium">
              I partner with founders who demonstrate relentless execution, technical obsession, and deep domain conviction. Beyond capital, portfolio companies receive direct advisory on infrastructure scaling, brand authority, and executive recruitment.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-4 bg-red-600 text-white hover:bg-red-700 font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-xl"
          >
            Pitch Your Venture
          </button>
        </motion.div>
      </div>
    </section>
  );
};
