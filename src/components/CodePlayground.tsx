import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface CodeSample {
  lang: string;
  label: string;
  code: string;
}

const samples: CodeSample[] = [
  {
    lang: 'swift',
    label: 'SwiftUI • Fintech Dashboard',
    code: `struct PortfolioDashboard: View {
    @State private var metrics = Metrics()

    var body: some View {
        VStack(spacing: 20) {
            HStack {
                MetricCard(title: "Revenue",
                    value: metrics.revenue, trend: .up)
                MetricCard(title: "Users",
                    value: metrics.users, trend: .up)
            }

            ChartView(data: metrics.history)
                .frame(height: 200)
                .chartStyle(.interactive)

            TransactionList(transactions:
                metrics.recentTxs)
        }
        .task { await metrics.refresh() }
    }
}`,
  },
  {
    lang: 'typescript',
    label: 'TypeScript • API Gateway',
    code: `class APIGateway {
  private cache = new Map<string, CacheEntry>()
  private rateLimiter = new TokenBucket(1000, 60_000)

  async route(req: Request): Promise<Response> {
    if (!this.rateLimiter.consume(req.ip)) {
      return new Response('429', { status: 429 })
    }

    const cached = this.cache.get(req.url)
    if (cached && Date.now() - cached.ts < 30_000) {
      return cached.data.clone()
    }

    const response = await this.fetchOrigin(req)
    this.cache.set(req.url, {
      data: response.clone(), ts: Date.now()
    })
    return response
  }
}`,
  },
  {
    lang: 'python',
    label: 'Python • ML Inference Pipeline',
    code: `class InferencePipeline:
    def __init__(self, model_path: str):
        self.model = self._load_model(model_path)
        self.preprocessor = TextPreprocessor()
        self.batch_size = 32

    async def predict_batch(
        self, texts: List[str]
    ) -> List[Dict]:
        processed = [
            self.preprocessor(t) for t in texts
        ]
        results = []
        for i in range(0, len(processed),
                       self.batch_size):
            batch = processed[i:i + self.batch_size]
            preds = await self.model.predict(batch)
            results.extend(preds)
        return results

    def _load_model(self, path):
        return torch.jit.load(path).eval()`,
  },
  {
    lang: 'rust',
    label: 'Rust • High-Performance Ledger',
    code: `#[derive(Debug)]
pub struct Ledger {
    transactions: Vec<Transaction>,
    merkle_root: Hash,
    shard_id: u16,
}

impl Ledger {
    pub fn new(shard_id: u16) -> Self {
        Self {
            transactions: Vec::with_capacity(1_000),
            merkle_root: Hash::default(),
            shard_id,
        }
    }

    pub fn commit(
        &mut self, tx: Transaction
    ) -> Result<CommitReceipt, LedgerError> {
        tx.validate()?;
        self.transactions.push(tx);
        self.recompute_merkle_root();
        Ok(CommitReceipt::new(
            self.shard_id,
            self.transactions.len() as u64,
        ))
    }
}`,
  },
];

const typeCode = (
  code: string,
  onChar: (t: string) => void,
  onDone: () => void,
  speed = 8
) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < code.length) {
      onChar(code.slice(0, index + 1));
      index++;
    } else {
      clearInterval(interval);
      onDone();
    }
  }, speed);
  return () => clearInterval(interval);
};

const langColors: Record<string, string> = {
  swift: '#F05138',
  typescript: '#3178C6',
  python: '#3776AB',
  rust: '#DEA584',
};

export const CodePlayground: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  const active = samples[activeIdx];

  const startTyping = useCallback((code: string) => {
    setIsTyping(true);
    setDisplayedCode('');
    const cleanup = typeCode(code, setDisplayedCode, () => setIsTyping(false), 6);
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = startTyping(active.code);
    return () => cleanup?.();
  }, [activeIdx, active.code, startTyping]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrev = () => setActiveIdx(prev => (prev - 1 + samples.length) % samples.length);
  const handleNext = () => setActiveIdx(prev => (prev + 1) % samples.length);

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#141414]">
      <div className="dot-grid pointer-events-none opacity-20" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl md:text-5xl font-black mb-4 text-[#f5f5f5]"
        >
          <span className="text-red-600">❯</span> Code Playground
        </motion.h2>
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          className="text-lg text-[#f5f5f5]/60 mb-16 font-mono"
        >
          Live code samples from production systems I've architected.
        </motion.p>

        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 -mx-1 px-1">
            {samples.map((s, i) => (
              <button
                key={s.lang}
                onClick={() => setActiveIdx(i)}
                className={`text-left px-4 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 border shrink-0 md:shrink whitespace-nowrap md:whitespace-normal ${
                  i === activeIdx
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                <span className="block text-[9px] opacity-60 mb-0.5" style={{ color: langColors[s.lang] }}>
                  [{s.lang.toUpperCase()}]
                </span>
                {s.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-red-600/20 via-transparent to-red-600/10 rounded-none pointer-events-none" />

            <div className="relative bg-[#0a0a0a] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {active.label}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="text-white/30 hover:text-white text-sm p-1"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <span className="text-[10px] font-mono text-white/30 self-center">
                    {activeIdx + 1}/{samples.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="text-white/30 hover:text-white text-sm p-1"
                  >
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="text-white/30 hover:text-emerald-400 text-sm p-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              <pre className="p-5 overflow-x-auto font-mono text-sm leading-relaxed custom-scrollbar min-h-[280px]">
                <code className="text-white/90 whitespace-pre">
                  {displayedCode}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse" />
                  )}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
