import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Fuse from 'fuse.js';
import { knowledgeBase, defaultResponse } from '../data/knowledgeBase';

interface Message {
  text: string;
  isCommand?: boolean;
  isTyping?: boolean;
}

const quickQuestions = [
  { label: 'Who is Hrishikesh?', q: 'who is hrishikesh' },
  { label: 'Skills & Stack', q: 'what are his skills' },
  { label: 'Experience', q: 'career timeline' },
  { label: 'About Belvo', q: 'tell me about belvo' },
  { label: 'Contact', q: 'how to contact' },
];

const fuse = new Fuse(knowledgeBase, {
  keys: [
    { name: 'keywords', weight: 0.7 },
    { name: 'question', weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  distance: 100,
});

const findAnswer = (query: string): string => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return '';

  const greetingWords = ['hello', 'hi', 'hey', 'sup', 'yo', 'hii', 'heyy', 'hola', 'good morning', 'good evening'];
  if (greetingWords.some(w => trimmed === w || trimmed.startsWith(w + ' '))) {
    return knowledgeBase.find(k => k.id === 'greeting')?.answer ?? defaultResponse;
  }

  const thanksWords = ['thanks', 'thank you', 'ty', 'thx', 'appreciate', 'grateful'];
  if (thanksWords.some(w => trimmed.includes(w))) {
    return knowledgeBase.find(k => k.id === 'thanks')?.answer ?? defaultResponse;
  }

  if (trimmed === 'help') {
    return `I can answer natural language questions! Try asking:\n  • Who is Hrishikesh?\n  • What are his skills?\n  • Tell me about Belvo\n  • What services does Belvo offer?\n  • How to contact?\n  • What companies has he invested in?\n\nOr click one of the quick questions above.`;
  }

  if (trimmed === 'clear') return '__CLEAR__';

  const results = fuse.search(trimmed);
  if (results.length > 0 && results[0].score !== undefined && results[0].score < 0.6) {
    return results[0].item.answer;
  }

  return defaultResponse;
};

const typeText = (text: string, onChar: (t: string) => void, onDone: () => void) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      onChar(text.slice(0, index + 1));
      index++;
    } else {
      clearInterval(interval);
      onDone();
    }
  }, 12);
  return () => clearInterval(interval);
};

export const TerminalCLI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Welcome to Hrishikesh\'s AI terminal. Ask me anything in natural language.', isTyping: false },
    { text: '┄'.repeat(40), isTyping: false },
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    cleanupRef.current?.();
    const trimmed = cmd.trim();
    setMessages(prev => [...prev, { text: `$ ${trimmed}`, isCommand: true }]);

    if (!trimmed) return;

    const answer = findAnswer(trimmed);

    if (answer === '__CLEAR__') {
      setMessages([
        { text: 'Terminal cleared. Ask me anything!', isTyping: false },
        { text: '┄'.repeat(40), isTyping: false },
      ]);
      return;
    }

    setMessages(prev => [...prev, { text: '', isTyping: true }]);
    cleanupRef.current = typeText(
      answer,
      (t) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.text = t;
          updated[updated.length - 1] = last;
          return updated;
        });
      },
      () => {
        setMessages(prev => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.isTyping = false;
          updated[updated.length - 1] = last;
          return updated;
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-[180] w-14 h-14 bg-[#141414] text-[#f5f5f5] flex items-center justify-center shadow-xl hover:bg-red-600 transition-all cursor-pointer border border-white/10"
          style={{ borderRadius: '12px', bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
        >
          <span className="material-symbols-outlined text-2xl">terminal</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-[180] w-[420px] max-w-[calc(100vw-2rem)] bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden ${isMinimized ? 'h-12' : 'h-[500px] max-h-[calc(100dvh-5rem)]'}`}
            style={{ borderRadius: '12px', bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10 cursor-pointer select-none"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-white/60 ml-2 uppercase tracking-wider font-black">AI Terminal — Ctrl+K</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-white/40 hover:text-white text-sm p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {!isMinimized && (
              <div className="flex flex-col h-[calc(100%-44px)] font-mono text-sm">
                <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                  {messages.map((msg, i) => (
                    <div key={i} className="leading-relaxed">
                      {msg.isCommand ? (
                        <span className="text-emerald-400">
                          <span className="text-red-400">❯</span> {msg.text.slice(2)}
                        </span>
                      ) : (
                        <span className="text-white/80 whitespace-pre-wrap">
                          {msg.text}
                          {msg.isTyping && <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse" />}
                        </span>
                      )}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {quickQuestions.map(qq => (
                    <button
                      key={qq.label}
                      onClick={() => { handleCommand(qq.q); inputRef.current?.focus(); }}
                      className="px-2 py-1 text-[9px] font-black uppercase tracking-wider border border-white/15 text-white/50 hover:text-white hover:border-red-500/50 hover:bg-red-600/10 transition-all"
                    >
                      {qq.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2 border-t border-white/10 bg-[#050505]">
                  <span className="text-emerald-400 text-sm">❯</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder-white/30 font-mono"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
