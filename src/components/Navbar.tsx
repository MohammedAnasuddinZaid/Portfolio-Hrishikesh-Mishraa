import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Journey', href: '#journey' },
    { name: 'Belvo', href: '#belvo' },
    { name: 'Investments', href: '#investments' },
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled
            ? 'h-20 bg-[#f5f5f5]/90 backdrop-blur-xl border-black/15 shadow-sm'
            : 'h-24 bg-transparent border-black/10'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex flex-col justify-center"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-display text-xl sm:text-2xl font-black tracking-tighter text-[#141414] uppercase group-hover:text-red-600 transition-colors">
              Hrishikesh Mishra.
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#141414]/60 font-black -mt-1">
              CEO & Angel Investor
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#141414]/70 hover:text-[#141414] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#141414] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 bg-[#141414] text-[#f5f5f5] font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all duration-300 active:scale-95 shadow-md"
            >
              Invest With Me
            </button>
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 border border-[#141414]/30 bg-white/60 text-[#141414] font-black text-xs uppercase tracking-widest hover:bg-[#141414] hover:text-[#f5f5f5] transition-all duration-300"
            >
              Connect
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#141414] p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-[90] bg-[#f5f5f5]/98 backdrop-blur-3xl lg:hidden flex flex-col justify-between p-8 border-b border-black/15 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-2xl font-display font-black uppercase text-[#141414] hover:text-red-600 transition-colors py-2 border-b border-black/10 flex items-center justify-between"
                >
                  {link.name}
                  <span className="material-symbols-outlined text-red-600">arrow_forward</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 bg-[#141414] text-[#f5f5f5] font-black text-center tracking-widest uppercase text-xs"
              >
                Start A Dialogue
              </button>
              <div className="text-center text-xs text-[#141414]/60 tracking-widest uppercase font-bold">
                hello@hrishikesh.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
