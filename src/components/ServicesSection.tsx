import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_LIST } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [companyStage, setCompanyStage] = useState('Seed');
  const [selectedServices, setSelectedServices] = useState([SERVICES_LIST[0].title]);
  const toggleService = (title: string) => setSelectedServices(prev => prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]);

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block"><span className="text-emerald-500 font-mono mr-2">❯</span>06 // ENGAGEMENT</span>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
            className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter mb-6"
          >
            Services & Strategic Growth.
          </motion.h2>
          <p className="text-[#141414]/80 text-base sm:text-lg font-medium">High-impact strategic consulting tailored for high-potential ventures.</p>
        </div>

        <div className="focus-group grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {SERVICES_LIST.map((service, idx) => (
            <div className="focus-item">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glow-card p-7 sm:p-12 premium-hairline bg-white flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 bg-[#141414] text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#141414] border border-black/20 bg-[#f5f5f5] px-4 py-1.5">{service.subtitle}</span>
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-[#141414] mb-4">{service.title}</h3>
                <p className="text-[#141414]/80 text-base leading-relaxed mb-8 font-medium">{service.description}</p>
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-red-600">Key Deliverables:</div>
                  {service.deliverables.map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#141414] font-bold">
                      <span className="material-symbols-outlined text-red-600 text-lg">check_circle</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-black/10 flex items-center justify-between">
                <span className="text-xs text-[#141414]/70 italic font-medium">Ideal for: {service.idealFor}</span>
                <button onClick={onOpenContact} className="px-6 py-2.5 bg-[#141414] text-[#f5f5f5] font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all">Inquire</button>
              </div>
            </motion.div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 lg:p-14 premium-hairline bg-white">
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2 block">INTERACTIVE SCOPE CALCULATOR</span>
            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-[#141414] mb-4">Configure Your Custom Engagement Scope.</h3>
            <p className="text-[#141414]/80 text-sm sm:text-base font-medium">Select your required capabilities and venture stage to tailor a dedicated strategic roadmapping session.</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-3 block">1. Select Venture Stage</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Pre-Seed', 'Seed', 'Series A+'].map(stage => (
                    <button key={stage} onClick={() => setCompanyStage(stage)} className={`py-3 px-4 border text-[10px] font-black uppercase tracking-wider transition-all ${companyStage === stage ? 'bg-[#141414] border-black text-white' : 'bg-[#f5f5f5] border-black/15 text-[#141414]/70 hover:text-[#141414]'}`}>{stage}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-3 block">2. Select Capability Focus</label>
                <div className="space-y-3">
                  {SERVICES_LIST.map(srv => {
                    const isSelected = selectedServices.includes(srv.title);
                    return (
                      <div key={srv.id} onClick={() => toggleService(srv.title)} className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'border-black bg-[#141414] text-white' : 'border-black/15 bg-[#f5f5f5] text-[#141414]/80 hover:border-black'}`}>
                        <span className="text-xs font-black uppercase">{srv.title}</span>
                        <span className="material-symbols-outlined text-lg">{isSelected ? 'check_box' : 'checkbox_outline_blank'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="animated-dark-border lg:col-span-6 p-8 bg-[#141414] text-[#f5f5f5] flex flex-col justify-between min-h-[320px] premium-noise">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4">ESTIMATED ADVISORY BLUEPRINT</div>
                <div className="space-y-3 text-sm text-[#f5f5f5]/80 mb-8">
                  <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-[#f5f5f5]/60 font-medium">Target Stage:</span><span className="font-black text-white uppercase">{companyStage}</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-[#f5f5f5]/60 font-medium">Selected Capabilities:</span><span className="font-black text-white uppercase">{selectedServices.length} modules</span></div>
                  <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-[#f5f5f5]/60 font-medium">Primary Executive:</span><span className="font-black text-red-500 uppercase">Hrishikesh Mishra</span></div>
                  <div className="flex justify-between pt-2"><span className="text-[#f5f5f5]/60 font-medium">Estimated Response:</span><span className="font-black text-emerald-400 uppercase">{'<'} 24 hours</span></div>
                </div>
              </div>
              <button onClick={onOpenContact} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-xl">
                <span>Schedule Strategic Audit</span>
                <span className="material-symbols-outlined text-lg">calendar_month</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
