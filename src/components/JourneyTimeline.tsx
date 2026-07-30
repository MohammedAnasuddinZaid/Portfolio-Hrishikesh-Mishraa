import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_LIST } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TIMELINE_LIST[TIMELINE_LIST.length - 1].id);

  return (
    <section id="journey" className="py-24 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block">
            03 // TRAJECTORY
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter mb-6">
            The Journey.
          </h2>
          <p className="text-[#141414]/80 text-base sm:text-lg font-medium">
            A decade of evolution from the terminal to executive leadership. Tracking the path of a builder dedicated to relentless execution.
          </p>
        </div>

        {/* Timeline Desktop/Mobile */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Architectural Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-black/20 -translate-x-1/2" />

          <div className="space-y-16">
            {TIMELINE_LIST.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeTab === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Center Node */}
                  <div
                    onClick={() => setActiveTab(step.id)}
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-none border-2 transition-all duration-300 z-10 flex items-center justify-center cursor-pointer ${
                      step.isCurrent
                        ? 'border-red-600 bg-red-600 shadow-md'
                        : 'border-black bg-white group-hover:border-red-600'
                    }`}
                  >
                    <div className="w-2 h-2 bg-[#141414]" />
                  </div>

                  {/* Date Column */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pl-12 sm:text-left' : 'sm:pr-12 sm:text-right'} mb-4 sm:mb-0`}>
                    <span className="inline-block px-4 py-1.5 border border-black/20 bg-white text-[10px] font-black uppercase tracking-widest text-[#141414]">
                      {step.period}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div
                      onClick={() => setActiveTab(step.id)}
                      className={`p-6 sm:p-8 border transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'border-black bg-white shadow-xl'
                          : 'border-black/15 bg-white/70 hover:border-black'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">
                        {step.organization}
                      </div>
                      <h3 className="font-display text-2xl font-black uppercase text-[#141414] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[#141414]/80 text-sm leading-relaxed mb-6 font-medium">
                        {step.summary}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2 mb-6">
                        {step.keyAchievements.map((achievement) => (
                          <div key={achievement} className="flex items-start gap-2 text-xs text-[#141414] font-bold">
                            <span className="material-symbols-outlined text-red-600 text-sm mt-0.5">
                              arrow_right
                            </span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                        {step.skillsUsed.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-[#141414] text-[#f5f5f5] text-[9px] font-black uppercase tracking-wider"
                          >
                            {skill}
                          </span>
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
