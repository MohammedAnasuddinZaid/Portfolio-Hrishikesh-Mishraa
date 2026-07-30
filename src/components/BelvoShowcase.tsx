import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BELVO_METRICS } from '../data/portfolioData';

interface BelvoShowcaseProps {
  onOpenContact: () => void;
}

export const BelvoShowcase: React.FC<BelvoShowcaseProps> = ({ onOpenContact }) => {
  const [activeRegion, setActiveRegion] = useState<'GLOBAL' | 'LATAM' | 'NORTH_AMERICA' | 'EUROPE'>('GLOBAL');
  const [simulatedLatency, setSimulatedLatency] = useState(12);
  const [isPinging, setIsPinging] = useState(false);

  // Ping test simulator
  const handlePingTest = () => {
    setIsPinging(true);
    setTimeout(() => {
      setSimulatedLatency(Math.floor(Math.random() * 8) + 8);
      setIsPinging(false);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedLatency((prev) => Math.max(8, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="belvo" className="py-24 lg:py-32 relative overflow-hidden bg-[#f5f5f5] border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="border border-black/20 bg-white shadow-2xl overflow-hidden relative">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-black/20 bg-[#f5f5f5] mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#141414]">
                    04 // FEATURED VENTURE
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#141414] leading-tight mb-6 tracking-tighter">
                  Belvo: The <span className="font-serif-italic lowercase text-red-600 font-normal">Nervous System</span> of Modern Finance.
                </h2>

                <p className="text-[#141414]/80 text-base sm:text-lg leading-relaxed mb-10 font-medium">
                  Belvo is the definitive open finance API platform and digital transformation engine. As CEO, I lead our team in engineering the infrastructure upon which next-generation financial products and digital brands run.
                </p>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-[#f5f5f5] border border-black/15">
                  <div>
                    <div className="font-display text-3xl font-black text-[#141414] mb-1">
                      {BELVO_METRICS.apiRequests}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-red-600">
                      Monthly API Calls
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-black text-[#141414] mb-1">
                      {BELVO_METRICS.capitalRaised}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-red-600">
                      Capital Raised / Series B
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="px-8 py-4 bg-[#141414] text-[#f5f5f5] font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2 shadow-xl"
                >
                  <span>Explore Partnership</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Right Side: Interactive API Monitor Widget */}
            <div className="lg:col-span-6 p-8 sm:p-12 bg-[#141414] text-[#f5f5f5] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
              <div>
                {/* Header Widget */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600 text-2xl">dns</span>
                    <span className="font-display text-xs font-black text-white tracking-widest uppercase">
                      BELVO API TELEMETRY
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SYSTEMS 99.99% OK
                  </div>
                </div>

                {/* Region Selector */}
                <div className="mb-8">
                  <div className="text-[10px] uppercase tracking-widest font-black text-[#f5f5f5]/60 mb-3">
                    Active Routing Nodes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['GLOBAL', 'LATAM', 'NORTH_AMERICA', 'EUROPE'] as const).map((region) => (
                      <button
                        key={region}
                        onClick={() => setActiveRegion(region)}
                        className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all border ${
                          activeRegion === region
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-white/5 border-white/15 text-[#f5f5f5]/70 hover:text-white'
                        }`}
                      >
                        {region.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Telemetry Display */}
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/60 font-black">Average Edge Latency</div>
                      <div className="text-xl font-display font-black text-white">
                        {simulatedLatency} ms
                      </div>
                    </div>
                    <button
                      onClick={handlePingTest}
                      disabled={isPinging}
                      className="px-4 py-2 bg-white/10 hover:bg-red-600 text-white text-[10px] font-black tracking-wider uppercase transition-all flex items-center gap-1.5"
                    >
                      <span className={`material-symbols-outlined text-sm ${isPinging ? 'animate-spin' : ''}`}>
                        sync
                      </span>
                      {isPinging ? 'Pinging...' : 'Ping Node'}
                    </button>
                  </div>

                  {/* Endpoint Status Rows */}
                  <div className="p-4 bg-white/5 border border-white/10 space-y-3 text-xs">
                    <div className="flex justify-between items-center text-[#f5f5f5]/80">
                      <span className="font-mono text-white text-[11px]">POST /v2/transactions/parse</span>
                      <span className="text-emerald-400 font-bold">200 OK (9ms)</span>
                    </div>
                    <div className="flex justify-between items-center text-[#f5f5f5]/80">
                      <span className="font-mono text-white text-[11px]">GET /v2/auth/verify_vault</span>
                      <span className="text-emerald-400 font-bold">200 OK (11ms)</span>
                    </div>
                    <div className="flex justify-between items-center text-[#f5f5f5]/80">
                      <span className="font-mono text-white text-[11px]">POST /v2/analytics/stream</span>
                      <span className="text-emerald-400 font-bold">200 OK (14ms)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-[#f5f5f5]/60">
                <span>Encryption: AES-256-GCM / TLS 1.3</span>
                <span>Uptime: 99.99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
