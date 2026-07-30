import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const StatsCounters: React.FC = () => {
  return (
    <section className="py-16 relative bg-[#141414] text-[#f5f5f5] border-y border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {PORTFOLIO_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 border border-white/10 bg-[#1c1c1c] flex flex-col justify-between hover:border-red-600 transition-all group"
            >
              <div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#f5f5f5] tracking-tighter mb-2 group-hover:text-red-500 transition-colors">
                  {stat.value}
                  <span className="text-red-600">{stat.suffix}</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#f5f5f5]/60 leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
