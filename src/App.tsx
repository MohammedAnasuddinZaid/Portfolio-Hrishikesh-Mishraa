import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { ShaderBackground } from './components/ShaderBackground';
import { SignatureLoader } from './components/SignatureLoader';
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
import { useLenis } from './hooks/useLenis';

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

  useLenis(loaded);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(window.scrollY / totalHeight, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fcfcfc] text-[#32302f] selection:bg-[#b0342e] selection:text-white font-body">
      <AnimatePresence>
        {!loaded && <SignatureLoader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#3a3525] via-[#b0342e] to-[#3a3525] z-[200] transition-all duration-150"
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
