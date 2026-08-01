import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { testimonials } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0, rotateY: d > 0 ? 15 : -15 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0, rotateY: d > 0 ? -15 : 15 }),
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#faf8f5]">
      <div className="dot-grid pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl md:text-5xl font-black mb-4 text-[#32302f]"
        >
          <span className="text-[#b0342e]">❯</span> Testimonials
        </motion.h2>
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          className="text-lg text-[#32302f]/60 mb-12 sm:mb-16 font-mono"
        >
          Social proof from founders and executives I've worked with.
        </motion.p>

        <div className="relative perspective-container" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="soft-card bg-[#fcfcfc] p-6 sm:p-10 md:p-12 premium-hairline"
              style={{ borderRadius: '8px' }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < t.rating ? 'text-[#b0342e]' : 'text-[#32302f]/20'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed text-[#32302f]/80 mb-8 font-mono">
                "{t.text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b0342e] to-[#3a3525] flex items-center justify-center text-white font-black text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-[#32302f]">{t.name}</div>
                  <div className="text-sm text-[#32302f]/50 font-mono">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-[#b0342e] w-6' : 'bg-[#32302f]/20 hover:bg-[#32302f]/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-9 h-9 md:w-10 md:h-10 bg-[#fcfcfc] shadow-lg flex items-center justify-center hover:bg-[#b0342e] hover:text-white transition-all text-[#32302f]"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-9 h-9 md:w-10 md:h-10 bg-[#fcfcfc] shadow-lg flex items-center justify-center hover:bg-[#b0342e] hover:text-white transition-all text-[#32302f]"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};
