import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const AboutPhilosophy: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-[#f5f5f5] border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Quote Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <span className="material-symbols-outlined text-red-600 text-5xl sm:text-6xl mb-6">
            format_quote
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight text-[#141414] tracking-tight mb-8">
            "Precision is not just a technical requirement; it's a{' '}
            <span className="font-serif-italic lowercase text-red-600 font-normal">moral obligation</span> when building at scale."
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-[1px] bg-red-600" />
            <span className="text-xs uppercase tracking-[0.3em] font-black text-[#141414]">
              — HRISHIKESH MISHRA
            </span>
          </div>
        </motion.div>

        {/* Story Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-4">
              01 // THE PHILOSOPHY
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#141414] leading-tight mb-8 tracking-tighter">
              Technology meets Entrepreneurship.
            </h3>

            <div className="space-y-6 text-[#141414]/80 text-base sm:text-lg leading-relaxed font-medium">
              <p>
                My career has been defined by the intersection of rigorous software engineering and aggressive business scaling.
                I believe that code is the ultimate leverage, but execution is the true competitive edge.
              </p>
              <p>
                As the Co-Founder & CEO of <strong className="text-[#141414] font-black underline decoration-red-600">Belvo</strong>, I lead a full-scale organization dedicated to redefining digital infrastructure, brand strategy, and financial connectivity. We help startups and enterprises transform ambitious visions into resilient, high-margin realities.
              </p>
              <p>
                Instead of simply launching companies, I believe in building organizations that people genuinely remember. Whether architecting Swift iOS applications, deploying distributed microservices, or mentoring founders, my focus remains on long-term value creation.
              </p>
            </div>

            {/* Core Values / Pillars */}
            <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-black/15">
              <div>
                <div className="text-[#141414] font-black text-base uppercase mb-1">First Principles</div>
                <div className="text-xs text-[#141414]/70 font-medium">Deconstructing problems to fundamental truths.</div>
              </div>
              <div>
                <div className="text-[#141414] font-black text-base uppercase mb-1">Architectural Rigor</div>
                <div className="text-xs text-[#141414]/70 font-medium">Designing for 99.99% fault tolerance.</div>
              </div>
              <div>
                <div className="text-[#141414] font-black text-base uppercase mb-1">Relentless Execution</div>
                <div className="text-xs text-[#141414]/70 font-medium">Turning strategy into measurable scale.</div>
              </div>
            </div>
          </motion.div>

          {/* Visual Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card p-4 border border-black/20 relative z-10 shadow-xl bg-white">
              <div className="aspect-[4/5] overflow-hidden relative bg-[#141414]">
                <img
                  src={PORTFOLIO_INFO.hiringPortraitUrl}
                  alt="Hrishikesh Mishra Executive"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 brightness-95 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PORTFOLIO_INFO.portraitUrl;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 border border-black/20 backdrop-blur-xl">
                  <div className="text-xs font-black uppercase text-[#141414]">Universal AI University</div>
                  <div className="text-[10px] text-red-600 uppercase tracking-widest font-black">Business Administration & Systems</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
