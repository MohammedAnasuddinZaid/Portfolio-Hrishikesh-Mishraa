import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERTISE_LIST } from '../data/portfolioData';
import { ExpertiseItem } from '../types';

interface ExpertiseSectionProps {
  onOpenContact: () => void;
}

function TiltCard({ item, index, onClick }: { item: ExpertiseItem; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="glow-card p-7 sm:p-10 cursor-pointer flex flex-col justify-between group premium-hairline bg-white"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div>
        <div className="w-16 h-16 bg-[#141414] border border-black flex items-center justify-center mb-8 group-hover:bg-red-600 transition-colors duration-500">
          <span className="material-symbols-outlined text-white text-3xl">{item.icon}</span>
        </div>
        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">0{index + 1} / {item.category}</div>
        <h3 className="font-display text-2xl font-black uppercase text-[#141414] mb-4 group-hover:text-red-600 transition-colors">{item.title}</h3>
        <p className="text-[#141414]/80 text-sm leading-relaxed mb-6 font-medium">{item.description}</p>
      </div>
      <div className="pt-6 border-t border-black/10 flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#141414] group-hover:text-red-600 transition-colors">
        <span>View Methodology</span>
        <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
      </div>
    </motion.div>
  );
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onOpenContact }) => {
  const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseItem | null>(null);

  return (
    <section id="expertise" className="py-20 sm:py-28 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block cool-chip"><span className="text-emerald-500 font-mono mr-2">❯</span>02 // CAPABILITIES</span>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
              className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter"
            >
              Mastery of Craft.
            </motion.h2>
          </div>
          <p className="text-[#141414]/80 max-w-md text-base sm:text-lg font-medium">A multidisciplinary approach to building the future.</p>
        </div>

        <div className="focus-group grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERTISE_LIST.map((item, index) => (
            <div className="focus-item"><TiltCard key={item.id} item={item} index={index} onClick={() => setSelectedExpertise(item)} /></div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="animated-dark-border mt-12 sm:mt-16 p-8 sm:p-12 bg-[#141414] text-[#f5f5f5] flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left shadow-xl premium-noise"
        >
          <div>
            <div className="font-display text-2xl sm:text-3xl font-black uppercase mb-2">"Innovation is the result of relentless focus."</div>
            <div className="text-sm text-[#f5f5f5]/70 font-medium">Looking to architect scalable systems or accelerate business growth?</div>
          </div>
          <button onClick={onOpenContact} className="px-8 py-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all hover:scale-105 whitespace-nowrap shadow-md">Hire the Expert</button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedExpertise && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md" onClick={() => setSelectedExpertise(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f5f5f5] max-w-2xl w-full pt-16 sm:pt-10 p-8 sm:p-10 border border-black/30 relative overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button onClick={() => setSelectedExpertise(null)} className="absolute top-6 right-6 text-[#141414] hover:text-red-600 p-2">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#141414] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{selectedExpertise.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-red-600">{selectedExpertise.category}</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#141414]">{selectedExpertise.title}</h3>
                </div>
              </div>
              <p className="text-[#141414]/80 text-base leading-relaxed mb-8 font-medium">{selectedExpertise.fullDetails}</p>
              <div className="mb-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#141414] mb-4">Core Architectural Highlights</h4>
                <div className="space-y-3">
                  {selectedExpertise.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-sm text-[#141414] font-bold">
                      <span className="material-symbols-outlined text-red-600 text-lg">check_circle</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-black/15">
                <button onClick={() => setSelectedExpertise(null)} className="w-full sm:w-auto px-6 py-3 border border-black/30 text-[#141414] font-black text-xs uppercase tracking-widest hover:bg-black/10">Close</button>
                <button onClick={() => { setSelectedExpertise(null); onOpenContact(); }} className="w-full sm:w-auto px-6 py-3 bg-[#141414] text-[#f5f5f5] font-black text-xs uppercase tracking-widest hover:bg-red-600">Discuss Project</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
