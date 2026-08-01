import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeCrystal } from './ThreeCrystal';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

const lineReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (i: number) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.9,
      delay: 0.4 + i * 0.25,
      ease: [0.77, 0, 0.18, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [revealDone, setRevealDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const bgX = (mousePos.x - 0.5) * 8;
  const bgY = (mousePos.y - 0.5) * 8;

  return (
    <section ref={sectionRef} className="relative min-h-svh pt-24 sm:pt-32 pb-16 sm:pb-20 flex items-center bg-white perspective-container">
      <AnimatePresence>
        {!revealDone && (
          <>
            <motion.div
              key="panel-left"
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.77, 0, 0.18, 1] }}
              onAnimationComplete={() => setRevealDone(true)}
              className="fixed inset-y-0 left-0 w-1/2 z-[9998] bg-[#141414] flex items-center justify-end pr-12"
            >
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-right"
              >
                <div className="text-[10px] font-mono text-red-500/70 uppercase tracking-[0.3em] mb-2 font-black">
                  INITIALIZING
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter font-display">
                  Hrishikesh
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              key="panel-right"
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.77, 0, 0.18, 1] }}
              className="fixed inset-y-0 right-0 w-1/2 z-[9998] bg-[#141414] flex items-center pl-12"
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="font-display text-3xl sm:text-4xl font-black text-red-600 uppercase tracking-tighter">
                  Mishra
                </div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mt-2 font-black">
                  CEO &bull; Angel Investor &bull; Engineer
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              key="panel-center-line"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.77, 0, 0.18, 1] }}
              className="fixed top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-[9999] bg-red-600/50 origin-top"
            />
          </>
        )}
      </AnimatePresence>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none -z-10"
        style={{
          transform: `translate(calc(-50% + ${bgX * 0.5}px), calc(-50% + ${scrollY * 0.15}px + ${bgY * 0.5}px))`,
        }}
      >
        <span className="font-display text-[16vw] font-black uppercase tracking-tighter text-stroke-subtle leading-none block whitespace-nowrap">
          HRISHIKESH
        </span>
      </div>

      <div className="absolute top-40 left-10 w-3 h-3 bg-red-500/30 animate-float pointer-events-none" style={{ borderRadius: '50%' }} />
      <div className="absolute bottom-40 right-20 w-2 h-2 bg-[#141414]/20 animate-float pointer-events-none" style={{ borderRadius: '50%', animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500/10 animate-float pointer-events-none" style={{ borderRadius: '50%', animationDelay: '4s' }} />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 w-full grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center relative z-20 overflow-visible"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 glass-pill mb-8 w-fit border border-black/20 shadow-xs flex-wrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#141414]">
              CO-FOUNDER &bull; CEO &bull; ANGEL INVESTOR
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[0.94] font-black uppercase tracking-tighter text-[#141414] mb-8 overflow-visible">
            <motion.span
              custom={0}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block overflow-visible"
            >
              Building <span className="text-[#141414]">Businesses.</span>
            </motion.span>
            <motion.span
              custom={1}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block mt-2 overflow-visible"
            >
              <span className="font-serif-italic lowercase tracking-normal text-red-600 font-normal">engineering products.</span>
            </motion.span>
            <motion.span
              custom={2}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block mt-2 overflow-visible"
            >
              Investing in{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Founders.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-red-600/20 -z-10 animate-scale-pulse" style={{ transformOrigin: 'left' }} />
              </span>
            </motion.span>
          </h1>

          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-sans text-base sm:text-lg lg:text-xl text-[#141414]/80 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            {PORTFOLIO_INFO.bioShort}
          </motion.p>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#expertise')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-[#141414] hover:bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span>Explore Expertise</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenContact}
              className="px-8 py-4 sm:px-10 sm:py-5 border border-[#141414]/30 bg-white/70 text-[#141414] font-black text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-[#141414] hover:text-white flex items-center justify-center gap-2"
            >
              <span>Let's Build</span>
              <span className="material-symbols-outlined text-xl text-red-600">handshake</span>
            </motion.button>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/15 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-[#141414]/70 uppercase tracking-widest font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse live-dot" />
              <span className="text-[#141414] font-black">Scaling</span>
              <span className="text-red-600">Belvo Open Finance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse live-dot" />
              <span className="text-[#141414] font-black">Mentoring</span>
              <span className="text-red-600">100+ Global Brands</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[480px] mt-8 lg:mt-0"
          style={{
            transform: `perspective(1200px) rotateY(${(mousePos.x - 0.5) * 3}deg) rotateX(${(mousePos.y - 0.5) * -3}deg) translateY(${-scrollY * 0.08}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div className="absolute inset-0 w-full h-full opacity-60 z-0 parallax-layer" style={{ transform: `translateY(${scrollY * 0.04}px)` }}>
            <ThreeCrystal />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 w-64 sm:w-80 glass-card p-3 shadow-2xl group border border-black/20 -rotate-1 hover:rotate-0 gradient-border-card corner-brackets"
            whileHover={{ y: -8 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#141414] mask-reveal">
              <img
                src={PORTFOLIO_INFO.portraitUrl}
                alt="Hrishikesh Mishra Portrait"
                className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                onError={(e) => { (e.target as HTMLImageElement).src = PORTFOLIO_INFO.hiringPortraitUrl; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 border border-black/20 backdrop-blur-md glass-hover"
              >
                <div className="text-xs font-black uppercase text-[#141414] tracking-wider">Hrishikesh Mishra</div>
                <div className="text-[10px] text-red-600 uppercase tracking-widest font-black">Co-Founder & CEO</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 hover:opacity-100 transition-opacity cursor-pointer"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#141414]">Scroll</span>
        <span className="material-symbols-outlined text-[#141414] animate-bounce">expand_more</span>
      </motion.div>
    </section>
  );
};
