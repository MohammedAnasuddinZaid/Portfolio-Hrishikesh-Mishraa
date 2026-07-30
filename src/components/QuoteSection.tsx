import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const QuoteSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#141414] text-[#f5f5f5] border-y border-black premium-noise">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="animated-dark-border max-w-4xl mx-auto p-12 sm:p-20 bg-black/50 shadow-2xl relative"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="material-symbols-outlined text-5xl text-red-600 mb-8"
          >format_quote</motion.span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight mb-8 tracking-tighter">
            "The best businesses are built by solving real problems with{' '}
            <span className="font-serif-italic text-red-600 font-normal lowercase">relentless execution</span>."
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-red-500">08 // HRISHIKESH MISHRA &bull; CEO OF BELVO</div>
            <a
              href={PORTFOLIO_INFO.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 bg-white/10 hover:bg-red-600 hover:border-red-600 text-white font-black text-xs uppercase tracking-widest transition-all"
            >
              <span>Read Thought Leadership Blog</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
