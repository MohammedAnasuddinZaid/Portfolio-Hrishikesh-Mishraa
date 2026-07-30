import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { ShaderBackground } from './components/ShaderBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { StatsCounters } from './components/StatsCounters';
import { ExpertiseSection } from './components/ExpertiseSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { BelvoQA } from './components/BelvoQA';
import { InvestmentsSection } from './components/InvestmentsSection';
import { ServicesSection } from './components/ServicesSection';
import { TechStackMarquee } from './components/TechStackMarquee';
import { QuoteSection } from './components/QuoteSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { TerminalCLI } from './components/TerminalCLI';

const TestimonialsSection = lazy(() => import('./components/Testimonials').then(m => ({ default: m.TestimonialsSection })));
const CodePlayground = lazy(() => import('./components/CodePlayground').then(m => ({ default: m.CodePlayground })));

const SectionFallback = () => (
  <div className="h-64 flex items-center justify-center">
    <div className="conic-loader" />
  </div>
);

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2400;
    const raf = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setLoadProgress(pct);
      if (pct < 1) requestAnimationFrame(raf);
      else {
        setTimeout(() => setLoaded(true), 200);
      }
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(window.scrollY / totalHeight, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#141414] selection:bg-[#141414] selection:text-white font-body">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[9999] bg-[#141414] flex flex-col items-center justify-center premium-noise"
            exit={{ scaleY: 0, originY: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center px-6"
            >
              <motion.div
                className="text-xs font-mono text-red-500/70 uppercase tracking-[0.3em] mb-4 font-black"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                INITIALIZING
              </motion.div>

              <motion.h1
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.77, 0, 0.18, 1] }}
                className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tighter mb-3"
              >
                Hrishikesh Mishra
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-[10px] uppercase tracking-[0.3em] font-black text-red-500/80 mb-10"
              >
                CEO &bull; Angel Investor &bull; Engineer
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="w-48 sm:w-64 mx-auto"
              >
                <div className="h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-red-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadProgress * 100}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>
                <div className="mt-2 text-[9px] font-mono text-white/40 tracking-wider">
                  {Math.round(loadProgress * 100)}%
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-red-500 via-[#141414] to-red-500 z-[200] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <CustomCursor />
      <ShaderBackground />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="relative z-10">
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <AboutPhilosophy />
        <StatsCounters />
        <ExpertiseSection onOpenContact={() => setIsContactOpen(true)} />
        <JourneyTimeline />
        <BelvoQA onOpenContact={() => setIsContactOpen(true)} />
        <InvestmentsSection onOpenContact={() => setIsContactOpen(true)} />
        <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
        <TechStackMarquee />
        <QuoteSection />
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CodePlayground />
        </Suspense>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <TerminalCLI />
    </div>
  );
}
