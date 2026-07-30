import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BELVO_INFO } from '../data/portfolioData';
import { BelvoServiceItem } from '../types';

interface QAEntry {
  question: string;
  answer: string;
  isTyping?: boolean;
}

const quickQuestions = [
  { label: 'What services?', q: 'What services does Belvo offer?' },
  { label: 'How to contact?', q: 'How can I contact Belvo?' },
  { label: 'Where located?', q: 'Where is Belvo located?' },
  { label: 'Tell me about Belvo', q: 'Tell me about Belvo' },
];

const answers: Record<string, string> = {
  'what services does belvo offer': `Belvo offers ${BELVO_INFO.services.length} service verticals:\n${BELVO_INFO.services.map(s => `  ▸ ${s.name} — ${s.description}`).join('\n')}`,
  'how can i contact belvo': `You can reach Belvo through:\n  Email: ${BELVO_INFO.email}\n  Alt: ${BELVO_INFO.secondaryEmail}\n  Careers: ${BELVO_INFO.careerEmail}\n  Phone: ${BELVO_INFO.phone[0]} / ${BELVO_INFO.phone[1]}\n  Response time: Within ${BELVO_INFO.responseTime}`,
  'where is belvo located': `Belvo is based in ${BELVO_INFO.location}.\n  Instagram: @belvo_official\n  LinkedIn: belvo.buzz`,
  'tell me about belvo': `${BELVO_INFO.name} — ${BELVO_INFO.tagline}. ${BELVO_INFO.description}\n\n  Contact: ${BELVO_INFO.email}\n  Phone: ${BELVO_INFO.phone.join(', ')}\n  Location: ${BELVO_INFO.location}\n  Services: ${BELVO_INFO.services.length} service verticals\n  Response: Within ${BELVO_INFO.responseTime}`,
};

function ServiceCard({ service, index }: { service: BelvoServiceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-4 sm:p-5 border border-black/10 bg-white hover:bg-white hover:border-red-500/40 transition-all duration-300 group cursor-default shadow-xs"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors duration-300">
          <span className="material-symbols-outlined text-[#141414] text-lg group-hover:text-white group-hover:scale-110 transition-transform">
            {service.icon}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="text-[11px] font-black uppercase text-[#141414] tracking-wider mb-1">{service.name}</h4>
          <p className="text-[11px] text-[#141414]/60 leading-relaxed font-medium">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

const getAnswer = (query: string): string | null => {
  const lower = query.toLowerCase().trim();
  for (const [key, val] of Object.entries(answers)) {
    if (lower.includes(key) || key.includes(lower)) return val;
  }
  const contactWords = ['contact', 'email', 'phone', 'reach', 'call'];
  const locationWords = ['locate', 'address', 'where', 'mumbai', 'goregaon'];
  const serviceWords = ['service', 'offer', 'provide', 'do', 'vertical', 'list'];
  if (contactWords.some(w => lower.includes(w))) return answers['how can i contact belvo'];
  if (locationWords.some(w => lower.includes(w))) return answers['where is belvo located'];
  if (serviceWords.some(w => lower.includes(w))) return answers['what services does belvo offer'];
  return null;
};

interface BelvoQAProps {
  onOpenContact: () => void;
}

export const BelvoQA: React.FC<BelvoQAProps> = ({ onOpenContact }) => {
  const [entries, setEntries] = useState<QAEntry[]>([]);
  const [input, setInput] = useState('');
  const [showServices, setShowServices] = useState(false);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [entries]);

  const typeAnswer = (answer: string) => {
    setEntries(prev => [...prev, { question: '', answer: '', isTyping: true }]);
    let index = 0;
    const interval = setInterval(() => {
      if (index < answer.length) {
        setEntries(prev => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.answer = answer.slice(0, index + 1);
          updated[updated.length - 1] = last;
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
        setEntries(prev => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.isTyping = false;
          updated[updated.length - 1] = last;
          return updated;
        });
      }
    }, 12);
  };

  const ask = (q: string) => {
    const answer = getAnswer(q) || `I can tell you about Belvo's services, contact info, location, and more. Try one of the quick questions above!`;
    setEntries(prev => [...prev, { question: q, answer: '', isTyping: false }]);
    setTimeout(() => typeAnswer(answer), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    ask(input);
    setInput('');
  };

  return (
    <section id="belvo" className="py-24 lg:py-32 relative bg-[#f5f5f5] border-t border-black/10 dot-grid">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-red-600 mb-3 block"><span className="text-emerald-500 font-mono mr-2">❯</span>04 // FEATURED VENTURE</span>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.77, 0, 0.18, 1] as const }}
            className="font-display text-4xl sm:text-6xl font-black uppercase text-[#141414] tracking-tighter mb-6"
          >
            Belvo: <span className="text-red-600">Full-Stack</span> Digital Services.
          </motion.h2>
          <p className="text-[#141414]/80 text-base sm:text-lg font-medium">{BELVO_INFO.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto border border-black/15 shadow-xl"
        >
          <div className="flex items-center justify-between px-5 py-3 bg-[#141414] border-b border-black/10 premium-noise">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono text-white/60 ml-2 uppercase tracking-wider font-black">Belvo Terminal</span>
            </div>
          </div>

          <div
            ref={terminalScrollRef}
            className="p-5 sm:p-6 font-mono text-sm space-y-1.5 min-h-[200px] max-h-[360px] overflow-y-auto custom-scrollbar bg-[#eaeaea]"
          >
            {entries.length === 0 ? (
              <div className="text-[#141414]/50 text-xs leading-relaxed">
                <p className="mb-2"><span className="text-emerald-600">❯</span> Belvo Terminal ready.</p>
                <p>Ask about Belvo's services, contact info, or location. Click a quick question below or type your own.</p>
                <p className="text-[#141414]/20 mt-1">{'─'.repeat(40)}</p>
              </div>
            ) : (
              entries.map((entry, i) => (
                <div key={i}>
                  {entry.question && (
                    <p className="text-emerald-700"><span className="text-red-500">❯</span> {entry.question}</p>
                  )}
                  <p className="text-[#141414]/80 whitespace-pre-wrap">
                    {entry.answer}
                    {entry.isTyping && <span className="inline-block w-2 h-4 bg-emerald-500 ml-0.5 animate-pulse" />}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-2 bg-[#eaeaea]">
            {quickQuestions.map(qq => (
              <button
                key={qq.label}
                onClick={() => { ask(qq.q); inputRef.current?.focus(); }}
                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border border-black/20 text-[#141414]/60 hover:text-[#141414] hover:border-red-500/60 hover:bg-red-600/10 transition-all"
              >
                {qq.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 sm:px-6 pb-5 bg-[#eaeaea]">
            <span className="text-emerald-600 text-sm font-mono">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Belvo..."
              className="flex-1 bg-transparent text-[#141414]/80 text-sm outline-none placeholder-[#141414]/30 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-8 text-center"
        >
          <button
            onClick={() => setShowServices(!showServices)}
            className="px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-black/20 text-[#141414]/60 hover:text-[#141414] hover:border-black/40 transition-all"
          >
            {showServices ? '▴ Hide All Services' : '▾ View All 16 Services'}
          </button>
        </motion.div>

        <AnimatePresence>
          {showServices && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-8"
            >
              <div className="text-center mb-6">
                <span className="text-xs text-[#141414]/50 font-mono">16 Service Verticals • 24hr Response • Mumbai</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {BELVO_INFO.services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={onOpenContact}
            className="px-10 py-4 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all inline-flex items-center gap-3 shadow-xl hover:scale-105"
          >
            <span>Start Your Project</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          <p className="text-[#141414]/50 text-xs mt-4 font-medium">Expect a reply within {BELVO_INFO.responseTime}</p>
        </motion.div>
      </div>
    </section>
  );
};
