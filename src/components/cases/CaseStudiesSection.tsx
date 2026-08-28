import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  Star, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CASE_STUDIES, TESTIMONIALS } from '../../data/telecomData';

export const CaseStudiesSection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  return (
    <section id="casos" className="py-20 bg-slate-50/60 dark:bg-[#0c0d10] border-t border-slate-200 dark:border-neutral-800/80 relative text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Casos de Éxito en Jalisco</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Resultados Reales en Empresas de Occidente
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base">
            Conoce cómo hemos ayudado a empresas e industrias en la Zona Metropolitana de Guadalajara a optimizar costos, mejorar su atención telefónica y proteger sus instalaciones.
          </p>
        </div>

        {/* Case Studies Tabs & Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {CASE_STUDIES.map((c, idx) => {
              const active = activeCaseIndex === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCaseIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-950 dark:text-blue-200 font-bold shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-white dark:bg-[#131418] border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-bold mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{c.location}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                    {c.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-1">
                    {c.clientType}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Spotlight Card (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Header inside Case */}
              <div className="pb-4 border-b border-slate-100 dark:border-neutral-800/80 space-y-1">
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>{activeCase.clientType} — {activeCase.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                  {activeCase.title}
                </h3>
              </div>

              {/* Challenge vs Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 space-y-1.5">
                  <div className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
                    El Reto Inicial:
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    {activeCase.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                    La Solución Implementada:
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    {activeCase.solution}
                  </p>
                </div>
              </div>

              {/* Quantifiable Results */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                  Impacto y Resultados Medibles:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCase.results.map((r, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-neutral-200 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-800 flex items-start gap-3">
                <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1 opacity-70" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 italic">
                    "{activeCase.quote}"
                  </p>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeCase.author}
                  </div>
                </div>
              </div>

            </div>

            {/* Technologies Used */}
            <div className="pt-4 border-t border-slate-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-neutral-400 font-bold">Tecnologías aplicadas:</span>
              {activeCase.servicesUsed.map((s, sIdx) => (
                <span key={sIdx} className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-[11px] font-mono font-semibold border border-slate-200 dark:border-neutral-700">
                  {s}
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* Client Testimonials Strip */}
        <div className="pt-10 border-t border-slate-200 dark:border-neutral-800">
          <h3 className="text-center text-lg font-bold text-slate-900 dark:text-white mb-8">
            Lo que opinan nuestros clientes en Guadalajara
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">{t.role} — {t.company}</div>
                  <div className="text-[10px] text-slate-400 dark:text-neutral-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
