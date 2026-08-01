import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

function AnimatedStat({ value, suffix, label, delay }: { value: string; suffix: string; label: string; delay: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numPart = parseInt(value.replace(/[^0-9]/g, ''));
          const prefix = value.replace(/[0-9]/g, '');
          const target = numPart || 100;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(`${prefix}${Math.floor(ease * target).toLocaleString()}`);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-6 border border-white/10 bg-[#1a1813] flex flex-col justify-between hover:border-[#b0342e] transition-all group last:col-span-2 md:last:col-span-1"
    >
      <div>
        <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#fcfcfc] tracking-tighter mb-2 group-hover:text-[#b0342e] transition-colors">
          {displayValue}
          <span className="text-[#b0342e]">{suffix}</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#fcfcfc]/60 leading-tight">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export const StatsCounters: React.FC = () => {
  return (
    <section className="py-16 relative vault-band premium-noise">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-[10px] font-mono text-[#b0342e]/80 mb-4 tracking-wider font-black uppercase"><span className="text-[#b0342e]">❯</span> ./metrics --live</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {PORTFOLIO_INFO.stats.map((stat, idx) => (
            <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
