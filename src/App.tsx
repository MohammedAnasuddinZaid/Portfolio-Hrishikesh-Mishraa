import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ShaderBackground } from './components/ShaderBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { StatsCounters } from './components/StatsCounters';
import { ExpertiseSection } from './components/ExpertiseSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { BelvoShowcase } from './components/BelvoShowcase';
import { InvestmentsSection } from './components/InvestmentsSection';
import { ServicesSection } from './components/ServicesSection';
import { TechStackMarquee } from './components/TechStackMarquee';
import { QuoteSection } from './components/QuoteSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e1e1ee] selection:bg-[#0f62fe] selection:text-white font-body">
      {/* Interactive Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Interactive WebGL Liquid Organic Noise Background */}
      <ShaderBackground />

      {/* Fixed Glass Navigation Bar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <AboutPhilosophy />
        <StatsCounters />
        <ExpertiseSection onOpenContact={() => setIsContactOpen(true)} />
        <JourneyTimeline />
        <BelvoShowcase onOpenContact={() => setIsContactOpen(true)} />
        <InvestmentsSection onOpenContact={() => setIsContactOpen(true)} />
        <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
        <TechStackMarquee />
        <QuoteSection />
      </main>

      {/* Executive Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Consultation & Pitch Modal Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
