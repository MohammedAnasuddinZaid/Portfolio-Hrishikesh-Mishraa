import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Angel Investment',
    message: '',
    preferredDate: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      inquiryType: 'Angel Investment',
      message: '',
      preferredDate: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="max-w-3xl w-full p-8 sm:p-12 border border-black/30 bg-[#f5f5f5] text-[#141414] relative overflow-hidden my-8 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#141414]/60 hover:text-[#141414] p-2 hover:bg-black/5 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {!submitted ? (
            <div>
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-2 block">
                  INITIATE DIALOGUE
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#141414]">
                  Connect with Hrishikesh.
                </h3>
                <p className="text-[#141414]/80 text-sm mt-2 font-medium">
                  Whether you are seeking seed investment, technical advisory, or strategic growth partnership.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-2 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white border border-black/20 text-[#141414] placeholder-black/30 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white border border-black/20 text-[#141414] placeholder-black/30 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-2 block">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white border border-black/20 text-[#141414] text-sm focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Angel Investment">Angel Investment / Pitch</option>
                      <option value="Business Strategy">Business Strategy & Growth</option>
                      <option value="Belvo Partnership">Belvo Partnership</option>
                      <option value="iOS & Technical Advisory">iOS & Technical Advisory</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-2 block">
                      Preferred Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white border border-black/20 text-[#141414] text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#141414] mb-2 block">
                    Message / Venture Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your venture, traction, or project objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3.5 bg-white border border-black/20 text-[#141414] placeholder-black/30 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                {/* Direct Contacts Row */}
                <div className="p-4 bg-white border border-black/15 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[#141414]/60 font-bold block">Direct Email:</span>
                    <a href={`mailto:${PORTFOLIO_INFO.email}`} className="text-red-600 font-black hover:underline">
                      {PORTFOLIO_INFO.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#141414]/60 font-bold block">Secondary Email:</span>
                    <a href={`mailto:${PORTFOLIO_INFO.secondaryEmail}`} className="text-red-600 font-black hover:underline">
                      {PORTFOLIO_INFO.secondaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3.5 border border-black/20 text-[#141414] font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-600 text-white flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">check</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-[#141414] mb-2">
                Inquiry Received.
              </h3>
              <p className="text-[#141414]/80 text-base max-w-md mx-auto mb-8 font-medium">
                Thank you, <strong className="text-[#141414]">{formData.name}</strong>. Your message regarding <strong className="text-red-600">{formData.inquiryType}</strong> has been transmitted. Hrishikesh's executive team will follow up shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3.5 bg-[#141414] text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all"
              >
                Return to Site
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
