import React from 'react';
import { motion } from 'motion/react';
import { ThreeCrystal } from './ThreeCrystal';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#f5f5f5]">
      {/* Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none -z-10 opacity-[0.04]">
        <span className="font-display text-[16vw] font-black uppercase tracking-tighter text-[#141414] leading-none block whitespace-nowrap">
          HRISHIKESH
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-pill mb-8 w-fit border border-black/20 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#141414]">
              CO-FOUNDER • CEO • ANGEL INVESTOR
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[0.94] font-black uppercase tracking-tighter text-[#141414] mb-8">
            Building <span className="text-[#141414]">Businesses.</span> <br />
            <span className="font-serif-italic lowercase tracking-normal text-red-600 font-normal">engineering products.</span> <br />
            Investing in <span className="underline decoration-red-600 underline-offset-8">Founders.</span>
          </h1>

          {/* Paragraph */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#141414]/80 max-w-2xl mb-10 leading-relaxed font-medium">
            {PORTFOLIO_INFO.bioShort}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                document.querySelector('#expertise')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-[#141414] hover:bg-red-600 text-[#f5f5f5] font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-3 group"
            >
              <span>Explore Expertise</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={onOpenContact}
              className="px-8 py-4 sm:px-10 sm:py-5 border border-[#141414]/30 bg-white/70 text-[#141414] font-black text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-[#141414] hover:text-[#f5f5f5] flex items-center gap-2"
            >
              <span>Let's Build</span>
              <span className="material-symbols-outlined text-xl text-red-600">
                handshake
              </span>
            </button>
          </div>

          {/* Live Status Indicator */}
          <div className="mt-12 pt-8 border-t border-black/15 flex flex-wrap items-center gap-8 text-xs text-[#141414]/70 uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <span className="text-[#141414] font-black">Scaling</span>
              <span className="text-red-600">Belvo Open Finance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#141414] font-black">Mentoring</span>
              <span className="text-red-600">100+ Global Brands</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Crystal & Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[480px]"
        >
          {/* Interactive Three.js Crystal Background */}
          <div className="absolute inset-0 w-full h-full opacity-60 z-0">
            <ThreeCrystal />
          </div>

          {/* Executive Portrait Glass Overlay Card */}
          <div className="relative z-10 w-72 sm:w-80 glass-card p-3 shadow-2xl hover:scale-105 transition-all duration-700 group border border-black/20 rotate-1 hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
              <img
                src={PORTFOLIO_INFO.portraitUrl}
                alt="Hrishikesh Mishra Portrait"
                className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PORTFOLIO_INFO.hiringPortraitUrl;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70" />

              {/* Card Label */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 border border-black/20 backdrop-blur-md">
                <div className="text-xs font-black uppercase text-[#141414] tracking-wider">Hrishikesh Mishra</div>
                <div className="text-[10px] text-red-600 uppercase tracking-widest font-black">Co-Founder & CEO</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#141414]">Scroll</span>
        <span className="material-symbols-outlined text-[#141414] animate-bounce">expand_more</span>
      </div>
    </section>
  );
};
