import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', inquiryType: 'Angel Investment', message: '', preferredDate: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const mailto = `mailto:${PORTFOLIO_INFO.email}?subject=Inquiry from ${formData.name}: ${formData.inquiryType}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\nPreferred Date: ${formData.preferredDate || 'Not specified'}\n\nMessage:\n${formData.message}`)}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(mailto, '_blank');
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', inquiryType: 'Angel Investment', message: '', preferredDate: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="max-w-3xl w-full p-6 sm:p-12 border border-[#32302f]/30 bg-[#fcfcfc] text-[#32302f] relative overflow-hidden my-auto shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#32302f]/60 hover:text-[#32302f] p-2 hover:bg-[#32302f]/5 transition-colors">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {!submitted ? (
              <div>
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-black text-[#b0342e] mb-2 block">INITIATE DIALOGUE</span>
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#32302f]">Connect with Hrishikesh.</h3>
                  <p className="text-[#32302f]/80 text-sm mt-2 font-medium">Whether you are seeking seed investment, technical advisory, or strategic growth partnership.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#32302f] mb-2 block">Your Full Name *</label>
                      <input type="text" required placeholder="e.g. Alex Morgan" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-3.5 bg-[#faf8f5] border border-[#32302f]/20 text-[#32302f] placeholder-[#32302f]/30 text-sm focus:outline-none focus:border-[#32302f] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#32302f] mb-2 block">Email Address *</label>
                      <input type="email" required placeholder="alex@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-3.5 bg-[#faf8f5] border border-[#32302f]/20 text-[#32302f] placeholder-[#32302f]/30 text-sm focus:outline-none focus:border-[#32302f] transition-colors" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#32302f] mb-2 block">Inquiry Type</label>
                      <select value={formData.inquiryType} onChange={e => setFormData({ ...formData, inquiryType: e.target.value })} className="w-full px-5 py-3.5 bg-[#faf8f5] border border-[#32302f]/20 text-[#32302f] text-sm focus:outline-none focus:border-[#32302f] transition-colors">
                        <option value="Angel Investment">Angel Investment / Pitch</option>
                        <option value="Business Strategy">Business Strategy & Growth</option>
                        <option value="Belvo Partnership">Belvo Partnership</option>
                        <option value="iOS & Technical Advisory">iOS & Technical Advisory</option>
                        <option value="General Conversation">General Conversation</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#32302f] mb-2 block">Preferred Date (Optional)</label>
                      <input type="date" value={formData.preferredDate} onChange={e => setFormData({ ...formData, preferredDate: e.target.value })} className="w-full px-5 py-3.5 bg-[#faf8f5] border border-[#32302f]/20 text-[#32302f] text-sm focus:outline-none focus:border-[#32302f] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#32302f] mb-2 block">Message / Venture Details *</label>
                    <textarea rows={4} required placeholder="Briefly describe your venture, traction, or project objectives..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-5 py-3.5 bg-[#faf8f5] border border-[#32302f]/20 text-[#32302f] placeholder-[#32302f]/30 text-sm focus:outline-none focus:border-[#32302f] transition-colors resize-none" />
                  </div>
                  <div className="p-4 bg-[#faf8f5] border border-[#32302f]/15 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[#32302f]/60 font-bold block">Direct Email:</span>
                      <a href={`mailto:${PORTFOLIO_INFO.email}`} className="text-[#b0342e] font-black hover:underline">{PORTFOLIO_INFO.email}</a>
                    </div>
                    <div>
                      <span className="text-[#32302f]/60 font-bold block">Secondary Email:</span>
                      <a href={`mailto:${PORTFOLIO_INFO.secondaryEmail}`} className="text-[#b0342e] font-black hover:underline">{PORTFOLIO_INFO.secondaryEmail}</a>
                    </div>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3.5 border border-[#32302f]/20 text-[#32302f] font-black text-xs uppercase tracking-widest hover:bg-[#32302f]/5 transition-colors">Cancel</button>
                    <button type="submit" disabled={loading} className="w-full sm:w-auto justify-center px-8 py-3.5 bg-[#b0342e] hover:bg-[#9a2b26] text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2">
                      {loading ? (
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm animate-spin">sync</span>Sending...</span>
                      ) : (
                        <><span>Submit Inquiry</span><span className="material-symbols-outlined text-sm">send</span></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#b0342e] text-white flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check</span>
                </div>
                <h3 className="font-display text-3xl font-black uppercase text-[#32302f] mb-2">Inquiry Received.</h3>
                <p className="text-[#32302f]/80 text-base max-w-md mx-auto mb-8 font-medium">
                  Thank you, <strong className="text-[#32302f]">{formData.name}</strong>. Your message regarding <strong className="text-[#b0342e]">{formData.inquiryType}</strong> has been transmitted. Hrishikesh's executive team will follow up shortly.
                </p>
                <button onClick={handleReset} className="px-8 py-3.5 bg-[#0c0c0d] text-white font-black text-xs uppercase tracking-widest hover:bg-[#b0342e] transition-all">Return to Site</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
