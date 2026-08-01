import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Journey', href: '#journey' },
    { name: 'Belvo', href: '#belvo' },
    { name: 'Investments', href: '#investments' },
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech-stack' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(link => ({
        id: link.href.slice(1),
        element: document.getElementById(link.href.slice(1)),
      }));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s.element && s.element.offsetTop <= scrollPos) {
          setActiveSection(s.id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#fcfcfc]/90 backdrop-blur-xl border-[#32302f]/15 shadow-[0_1px_0_rgba(50,48,47,0.06)]'
            : 'bg-transparent border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div
          className={`max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-16 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-14 sm:h-20' : 'h-16 sm:h-24'
          }`}
        >
          <a
            href="#"
            className="group flex flex-col justify-center min-w-0"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="font-display text-lg md:text-xl xl:text-2xl font-black tracking-tighter text-[#32302f] uppercase group-hover:text-[#b0342e] transition-colors truncate">
              Hrishikesh Mishra.
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#32302f]/60 font-black -mt-1 truncate">
              CEO & Angel Investor
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-1 whitespace-nowrap ${
                    isActive ? 'text-[#32302f]' : 'text-[#32302f]/60 hover:text-[#32302f]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#b0342e] to-[#3a3525] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="pill pill-crimson"
            >
              Invest With Me
            </button>
            <button
              onClick={onOpenContact}
              className="hidden xl:inline-flex pill pill-light"
            >
              Connect
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#32302f] p-2 -mr-2 focus:outline-none border border-[#32302f]/20 bg-[#fcfcfc]/70"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#fcfcfc]/98 backdrop-blur-3xl lg:hidden flex flex-col justify-between px-5 sm:px-8 border-b border-[#32302f]/15 overflow-y-auto"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', paddingTop: 'calc(6rem + env(safe-area-inset-top))' }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-xl sm:text-2xl font-display font-black uppercase text-[#32302f] hover:text-[#b0342e] transition-colors py-2.5 border-b border-[#32302f]/10 flex items-center justify-between"
                >
                  {link.name}
                  <span className="material-symbols-outlined text-[#b0342e]">arrow_forward</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
                className="w-full py-4 bg-[#b0342e] text-[#fcfcfc] font-black text-center tracking-widest uppercase text-xs"
              >
                Start A Dialogue
              </button>
              <div className="text-center text-xs text-[#32302f]/60 tracking-widest uppercase font-bold">
                hello@hrishikesh.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
