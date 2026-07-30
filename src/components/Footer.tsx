import React from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-16 bg-[#141414] text-[#f5f5f5] border-t border-black relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-block mb-4">
              <span className="font-display text-2xl font-black uppercase tracking-tighter text-white">
                Hrishikesh Mishra.
              </span>
            </a>
            <p className="text-sm text-[#f5f5f5]/70 max-w-sm mb-6 leading-relaxed font-medium">
              Co-Founder & CEO @ Belvo, Angel Investor, Software Engineer. Engineering high-scale digital infrastructure and backing first-principles technical founders.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-red-600 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f5f5f5]/70">
                Available for Strategic Advisory & Angel Investment
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs text-[#f5f5f5]/80 uppercase tracking-wider font-bold">
              <li><a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a></li>
              <li><a href="#journey" className="hover:text-red-500 transition-colors">Trajectory</a></li>
              <li><a href="#belvo" className="hover:text-red-500 transition-colors">Belvo Open Finance</a></li>
              <li><a href="#investments" className="hover:text-red-500 transition-colors">Angel Investments</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Advisory Services</a></li>
              <li><a href="#tech-stack" className="hover:text-red-500 transition-colors">Engineering Stack</a></li>
            </ul>
          </div>

          {/* Communication & Thought Leadership */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-6">
              Direct Channels
            </h4>
            <div className="space-y-4 text-xs text-[#f5f5f5]/80">
              <div>
                <span className="text-[#f5f5f5]/50 block mb-1 font-black text-[10px] uppercase">Executive Email:</span>
                <a href={`mailto:${PORTFOLIO_INFO.email}`} className="text-white font-bold text-sm hover:text-red-500 transition-colors">
                  {PORTFOLIO_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-[#f5f5f5]/50 block mb-1 font-black text-[10px] uppercase">Thought Leadership Blog:</span>
                <a
                  href={PORTFOLIO_INFO.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>{PORTFOLIO_INFO.blogUrl}</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="w-full py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-md"
                >
                  Schedule A Meeting
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f5f5f5]/60">
          <div className="font-medium">
            © {new Date().getFullYear()} Hrishikesh Mishra. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest font-black text-[10px]"
          >
            <span>Back to top</span>
            <span className="material-symbols-outlined text-sm">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
