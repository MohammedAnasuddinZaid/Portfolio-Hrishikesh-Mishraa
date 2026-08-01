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
    <section id="journey" className="py-20 sm:py-28 lg:py-32 relative bg-[#faf8f5] border-t border-[#32302f]/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="eyebrow mb-3 block"><span className="text-[#b0342e] font-mono mr-2">❯</span>03 // TRAJECTORY</span>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
            className="font-display text-4xl sm:text-6xl font-black uppercase text-[#32302f] tracking-tighter mb-6"
          >
            The Journey.
          </motion.h2>
          <p className="text-[#32302f]/80 text-base sm:text-lg font-medium">A decade of evolution from the terminal to executive leadership.</p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-[#32302f]/15 -translate-x-1/2" />
          <div className="absolute left-4 sm:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#b0342e] to-[#3a3525] -translate-x-1/2 transition-all duration-300" style={{ height: `${Math.min(progressHeight, 100)}%` }} />

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
                      step.isCurrent ? 'border-[#b0342e] bg-[#b0342e] shadow-md' : 'border-[#32302f]/30 bg-[#fcfcfc] group-hover:border-[#b0342e]'
                    }`}
                  >
                    <div className={`w-2 h-2 ${step.isCurrent ? 'bg-white animate-pulse' : isActive ? 'bg-[#b0342e]' : 'bg-[#32302f]'}`} />
                  </div>

                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pl-12 sm:text-left' : 'sm:pr-12 sm:text-right'} mb-4 sm:mb-0`}>
                    <span className={`inline-block px-4 py-1.5 border text-[10px] font-black uppercase tracking-widest ${step.isCurrent ? 'border-[#b0342e] bg-[#b0342e]/10 text-[#b0342e]' : 'border-[#32302f]/20 bg-[#fcfcfc] text-[#32302f]'}`}>
                      {step.period}
                    </span>
                  </div>

                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div
                      onClick={() => setActiveTab(step.id)}
                      className={`soft-card p-6 sm:p-8 border cursor-pointer ${
                        isActive ? 'border-[#32302f] bg-[#fcfcfc] shadow-xl' : 'border-[#32302f]/20 bg-[#fcfcfc]/70'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#b0342e]">
                        {step.organization}
                      </div>
                      <h3 className="font-display text-2xl font-black uppercase text-[#32302f] mb-3">{step.title}</h3>
                      <p className="text-[#32302f]/80 text-sm leading-relaxed mb-6 font-medium">{step.summary}</p>
                      <div className="space-y-2 mb-6">
                        {step.keyAchievements.map((a) => (
                          <div key={a} className="flex items-start gap-2 text-xs text-[#32302f] font-bold">
                            <span className="material-symbols-outlined text-[#b0342e] text-sm mt-0.5">arrow_right</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#32302f]/10">
                        {step.skillsUsed.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-[#0c0c0d] text-[#fcfcfc] text-[9px] font-black uppercase tracking-wider">{skill}</span>
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
