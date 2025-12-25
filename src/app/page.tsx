import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/ui/atoms/button';
import { Card } from '@/ui/atoms/card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_30rem_at_10%_-10%,theme(colors.emerald.200/.35),transparent_60%),radial-gradient(60rem_25rem_at_100%_20%,theme(colors.cyan.200/.3),transparent_60%),radial-gradient(50rem_20rem_at_-10%_100%,theme(colors.indigo.200/.25),transparent_60%)]" />
        <div className="container mx-auto px-4 relative py-16 sm:py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">FinBoard</h1>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4 text-slate-900 dark:text-white">
                Visualize your financial data with clarity and precision.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
                Connect APIs, build widgets, and monitor your portfolio in real-time.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/workspace">
                  <Button size="lg" className="px-7">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <Card className="relative border-0 shadow-xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {/* Top Large Block → Line/Area Chart */}
                    <div className="col-span-2 h-40 sm:h-48 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3">
                      <div className="h-full w-full rounded-lg bg-gradient-to-b from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/10 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
                        <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full">
                          <defs>
                            <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <linearGradient id="gradFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b98122" />
                              <stop offset="100%" stopColor="#06b6d411" />
                            </linearGradient>
                          </defs>
                          <path d="M0,90 C50,70 80,95 120,80 C150,70 200,40 240,60 C280,78 320,55 360,65 L400,70 L400,120 L0,120 Z" fill="url(#gradFill)" />
                          <path d="M0,90 C50,70 80,95 120,80 C150,70 200,40 240,60 C280,78 320,55 360,65" stroke="url(#gradLine)" strokeWidth="3" fill="none" />
                          {Array.from({length:10}).map((_,i)=>{
                            const x = 20 + i*36; const y = 90 - Math.abs(Math.sin(i/2))*40 - (i%2?6:0);
                            return <circle key={i} cx={x} cy={y} r="2.3" fill="#10b981" opacity="0.9" />
                          })}
                        </svg>
                      </div>
                    </div>
                    {/* Top Small Block → Donut Chart */}
                    <div className="h-40 sm:h-48 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3 flex items-center justify-center">
                      <div className="relative size-28">
                        <svg viewBox="0 0 36 36" className="transform -rotate-90">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#34d399" strokeWidth="6" strokeDasharray="35 88" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="6" strokeDasharray="28 95" strokeDashoffset="-35" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#fbbf24" strokeWidth="6" strokeDasharray="18 105" strokeDashoffset="-63" />
                        </svg>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-600 dark:text-slate-300"></div>
                      </div>
                    </div>
                    {/* Bottom Left → Bar Chart */}
                    <div className="h-28 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3">
                      <div className="flex items-end h-full gap-2">
                        {[32,50,22,42,60,38].map((h,i)=> (
                          <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-emerald-300/70 to-emerald-500/80 dark:from-emerald-600/40 dark:to-emerald-400/70" style={{height: `${h}%`}} />
                        ))}
                      </div>
                    </div>
                    {/* Bottom Right → Mini Table */}
                    <div className="col-span-2 h-28 rounded-xl bg-white/80 dark:bg-slate-900/50 border border-white/50 dark:border-white/10 p-3">
                      <div className="grid grid-cols-3 text-xs text-slate-500 dark:text-slate-300">
                        <div>Ticker</div>
                        <div className="text-center">Price</div>
                        <div className="text-right">Change</div>
                      </div>
                      <div className="mt-2 space-y-1.5 text-sm">
                        {[['AAPL','$212.45','+1.2%'],['ETH','$3,280','-0.6%'],['TSLA','$248.10','+0.9%']].map((r,i)=> (
                          <div key={i} className="grid grid-cols-3 rounded-md px-2 py-1 bg-slate-50/70 dark:bg-slate-800/50">
                            <div className="font-medium text-slate-700 dark:text-white">{r[0]}</div>
                            <div className="text-center text-slate-700 dark:text-slate-200">{r[1]}</div>
                            <div className={`text-right ${r[2].startsWith('+')?'text-emerald-600':'text-rose-500'}`}>{r[2]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-14 sm:py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Features</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Built to scale your insights</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Real-time Data', emoji: '📈', desc: 'Stream market updates as they happen.' },
            { title: 'Customizable Charts', emoji: '📊', desc: 'Pick from multiple chart types.' },
            { title: 'Auto-refresh', emoji: '🔄', desc: 'Keep your data fresh automatically.' },
            { title: 'Secure API Integration', emoji: '🔒', desc: 'Your credentials stay safe.' },
          ].map((f) => (
            <Card key={f.title} className="p-5 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-2">{f.emoji}</div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{f.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 3-step guide */}
      <section className="container mx-auto px-4 py-14 sm:py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Get started in 3 steps</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Connect API', desc: 'Paste your endpoint and key.' },
            { step: '2', title: 'Pick chart type', desc: 'Choose line, bar, table, and more.' },
            { step: '3', title: 'Customize & Save', desc: 'Tune fields and styles, then save.' },
          ].map((s) => (
            <Card key={s.step} className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="mx-auto mb-3 h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                {s.step}
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{s.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer removed per request */}
    </div>
  );
}
