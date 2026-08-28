import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Wrench, 
  Clock, 
  Zap, 
  Sparkles, 
  Headphones,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { MAINTENANCE_PLANS, COMPANY_INFO } from '../../data/telecomData';

export const MaintenancePolicies: React.FC<{ onOpenQuote: (serviceId?: string) => void }> = ({ onOpenQuote }) => {
  return (
    <section id="polizas" className="py-20 md:py-28 bg-slate-50/60 dark:bg-[#0c0d10] border-t border-slate-200 dark:border-neutral-800/80 relative overflow-hidden text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Continuidad Operativa Garantizada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Pólizas de Mantenimiento & Soporte Técnico 24/7
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Protege la inversión tecnológica de tu empresa. Cero pérdidas por conmutadores apagados o cámaras sin señal con nuestros planes de mantenimiento en Guadalajara y Jalisco.
          </p>
        </div>

        {/* 3 Pricing / Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MAINTENANCE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlighted
                  ? 'bg-white dark:bg-[#14151b] border-2 border-blue-600 dark:border-blue-500 shadow-xl md:-translate-y-2'
                  : 'bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  {!plan.highlighted && (
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 text-xs font-bold border border-slate-200 dark:border-neutral-700 mb-2">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed min-h-[36px]">{plan.description}</p>
                  
                  <div className="mt-4 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Ideal: {plan.recommendedFor}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-neutral-800/80 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      {feat.included ? (
                        <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800/60">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="p-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-400 dark:text-neutral-600 shrink-0 mt-0.5 border border-slate-200 dark:border-neutral-700">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                      <span className={feat.included ? 'text-slate-700 dark:text-neutral-200 font-medium' : 'text-slate-400 dark:text-neutral-500'}>
                        {feat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenQuote('polizas-soporte-mantenimiento')}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700'
                  }`}
                >
                  <span>Cotizar {plan.name.split(' ')[1]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Hot-Swap Guarantee Feature Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shrink-0">
              <Zap className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">Garantía de Respaldo Inmediato (Hot Swap)</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
                Si tu conmutador o grabador sufre una avería crítica, instalamos inmediatamente un equipo de reemplazo temporal de nuestro stock propio en Guadalajara mientras reparamos el tuyo.
              </p>
            </div>
          </div>
          
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20deseo%20información%20sobre%20las%20pólizas%20de%20mantenimiento%20para%20mi%20empresa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar Póliza por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
