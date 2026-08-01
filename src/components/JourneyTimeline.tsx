import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_LIST } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TIMELINE_LIST[TIMELINE_LIST.length - 1].id);
  const [progressHeight, setProgressHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const scrolled = window.innerHeight - rect.top;
      setProgressHeight(Math.max(0, Math.min(scrolled / totalHeight, 1)) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="journey" className="py-20 sm:py-28 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block"><span className="text-emerald-500 font-mono mr-2">❯</span>03 // TRAJECTORY</span>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
            className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter mb-6"
          >
            The Journey.
          </motion.h2>
          <p className="text-[#141414]/80 text-base sm:text-lg font-medium">A decade of evolution from the terminal to executive leadership.</p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-black/20 -translate-x-1/2" />
          <div className="absolute left-4 sm:left-1/2 top-0 w-[2px] bg-gradient-to-b from-red-500 to-[#141414] -translate-x-1/2 transition-all duration-300" style={{ height: `${Math.min(progressHeight, 100)}%` }} />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE_LIST.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeTab === step.id;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:flex-row-reverse' : ''} group`}
                >
                  <div
                    onClick={() => setActiveTab(step.id)}
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 border-2 transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
                      step.isCurrent ? 'border-red-600 bg-red-600 shadow-md' : 'border-black bg-white group-hover:border-red-600'
                    }`}
                  >
                    <div className={`w-2 h-2 ${step.isCurrent ? 'bg-white animate-pulse' : isActive ? 'bg-red-600' : 'bg-black'}`} />
                  </div>

                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pl-12 sm:text-left' : 'sm:pr-12 sm:text-right'} mb-4 sm:mb-0`}>
                    <span className={`inline-block px-4 py-1.5 border text-[10px] font-black uppercase tracking-widest ${step.isCurrent ? 'border-red-600 bg-red-600/10 text-red-600' : 'border-black/20 bg-white text-[#141414]'}`}>
                      {step.period}
                    </span>
                  </div>

                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div
                      onClick={() => setActiveTab(step.id)}
                      className={`glow-card p-6 sm:p-8 border cursor-pointer ${
                        isActive ? 'border-black bg-white shadow-xl' : 'border-black/20 bg-white/70'
                      }`}
                    >
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.isCurrent ? 'text-red-600' : 'text-red-600'}`}>
                        {step.organization}
                      </div>
                      <h3 className="font-display text-2xl font-black uppercase text-[#141414] mb-3">{step.title}</h3>
                      <p className="text-[#141414]/80 text-sm leading-relaxed mb-6 font-medium">{step.summary}</p>
                      <div className="space-y-2 mb-6">
                        {step.keyAchievements.map((a) => (
                          <div key={a} className="flex items-start gap-2 text-xs text-[#141414] font-bold">
                            <span className="material-symbols-outlined text-red-600 text-sm mt-0.5">arrow_right</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                        {step.skillsUsed.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-[#141414] text-[#f5f5f5] text-[9px] font-black uppercase tracking-wider">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
