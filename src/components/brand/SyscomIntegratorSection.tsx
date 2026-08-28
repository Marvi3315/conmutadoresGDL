import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  CheckCircle2, 
  Boxes, 
  ArrowUpRight, 
  Sparkles,
  LayoutGrid,
  Repeat,
  Headphones,
  Zap,
  Check
} from 'lucide-react';
import { SYSCOM_PARTNER_INFO, COMPANY_INFO } from '../../data/telecomData';
import { FadeInUp } from '../ui/FadeInUp';

export const SyscomIntegratorSection: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const brandLogos = [
    { 
      name: 'PANDUIT', 
      category: 'Cableado Estructurado', 
      role: 'Cat6/6A, Jacks, Patch Panels & Canalización', 
      accentColor: 'from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/5 border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-500 text-emerald-700 dark:text-emerald-400',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
    },
    { 
      name: 'Panasonic', 
      category: 'Telefonía Conmutada', 
      role: 'Conmutadores PBX, Tarjetas & Teléfonos Propietarios', 
      accentColor: 'from-blue-500/10 to-indigo-500/5 dark:from-blue-500/20 dark:to-indigo-500/5 border-blue-300 dark:border-blue-500/30 hover:border-blue-500 text-blue-700 dark:text-blue-400',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800/60'
    },
    { 
      name: 'GRANDSTREAM', 
      category: 'VoIP & Comunicaciones', 
      role: 'Conmutadores IP UCM, Teléfonos SIP & Gateways', 
      accentColor: 'from-cyan-500/10 to-blue-500/5 dark:from-cyan-500/20 dark:to-blue-500/5 border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-500 text-cyan-700 dark:text-cyan-400',
      badgeColor: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800/60'
    },
    { 
      name: 'HIKVISION', 
      category: 'Videovigilancia 4K & IA', 
      role: 'Cámaras ColorVu, NVR AcuSense & Control Térmico', 
      accentColor: 'from-rose-500/10 to-red-500/5 dark:from-rose-500/20 dark:to-red-500/5 border-rose-300 dark:border-rose-500/30 hover:border-rose-500 text-rose-700 dark:text-rose-400',
      badgeColor: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
    },
    { 
      name: 'UBIQUITI', 
      category: 'Redes UniFi & Enlaces', 
      role: 'Access Points Wi-Fi 6, Gateways Dream Machine & Switches', 
      accentColor: 'from-sky-500/10 to-cyan-500/5 dark:from-sky-500/20 dark:to-cyan-500/5 border-sky-300 dark:border-sky-500/30 hover:border-sky-500 text-sky-700 dark:text-sky-400',
      badgeColor: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800/60'
    },
    { 
      name: 'dahua', 
      category: 'Seguridad Electrónica', 
      role: 'CCTV TiOC con disuasión activa, Domos PTZ & Alarmas', 
      accentColor: 'from-amber-500/10 to-orange-500/5 dark:from-amber-500/20 dark:to-orange-500/5 border-amber-300 dark:border-amber-500/30 hover:border-amber-500 text-amber-700 dark:text-amber-400',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
    },
    { 
      name: 'CISCO', 
      category: 'Networking Empresarial', 
      role: 'Switches Catalyst, Routers & Seguridad de Red', 
      accentColor: 'from-blue-600/10 to-indigo-600/5 dark:from-blue-600/20 dark:to-indigo-600/5 border-blue-300 dark:border-blue-600/30 hover:border-blue-500 text-blue-700 dark:text-blue-300',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800/60'
    },
    { 
      name: 'BELDEN', 
      category: 'Cables de Alta Gama', 
      role: 'Cableado Industrial, Audio/Video y Fibra Óptica', 
      accentColor: 'from-violet-500/10 to-purple-500/5 dark:from-violet-500/20 dark:to-purple-500/5 border-violet-300 dark:border-violet-500/30 hover:border-violet-500 text-violet-700 dark:text-violet-400',
      badgeColor: 'bg-violet-100 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border-violet-300 dark:border-violet-800/60'
    },
    { 
      name: 'ZKTECO', 
      category: 'Biometría & Control', 
      role: 'Reconocimiento Facial, Huella Digital y Chapas Magnéticas', 
      accentColor: 'from-teal-500/10 to-emerald-500/5 dark:from-teal-500/20 dark:to-emerald-500/5 border-teal-300 dark:border-teal-500/30 hover:border-teal-500 text-teal-700 dark:text-teal-400',
      badgeColor: 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800/60'
    },
    { 
      name: 'CHAROFIL', 
      category: 'Canalización Profesional', 
      role: 'Charola Tipo Malla, Ductos y Accesorios de Fijación', 
      accentColor: 'from-amber-500/10 to-yellow-500/5 dark:from-amber-500/20 dark:to-yellow-500/5 border-amber-300 dark:border-amber-500/30 hover:border-amber-500 text-amber-700 dark:text-amber-400',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
    },
    { 
      name: 'Fanvil', 
      category: 'Telefonía & Intercoms', 
      role: 'Teléfonos Ejecutivos SIP, Videoporteros IP & Bocinas', 
      accentColor: 'from-fuchsia-500/10 to-pink-500/5 dark:from-fuchsia-500/20 dark:to-pink-500/5 border-fuchsia-300 dark:border-fuchsia-500/30 hover:border-fuchsia-500 text-fuchsia-700 dark:text-fuchsia-400',
      badgeColor: 'bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-800/60'
    },
    { 
      name: 'Honeywell', 
      category: 'Detección & Alarmas', 
      role: 'Sensores Fotoeléctricos, Paneles Vista y Notificadores', 
      accentColor: 'from-red-600/10 to-rose-600/5 dark:from-red-600/20 dark:to-rose-600/5 border-red-300 dark:border-red-600/30 hover:border-red-500 text-red-700 dark:text-red-400',
      badgeColor: 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800/60'
    },
  ];

  return (
    <section id="syscom" className="py-16 sm:py-24 bg-slate-100/70 dark:bg-[#0a0b0e] border-t border-slate-200 dark:border-neutral-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Integrator Hero Bento Box */}
        <FadeInUp delay={0} distance={20}>
          <div className="rounded-3xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800/90 p-6 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden mb-16 backdrop-blur-md">
            
            {/* Top Tag & National Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{SYSCOM_PARTNER_INFO.badge}</span>
              </div>
              
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-950/80 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
                <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Envíos directos a toda la República Mexicana</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
                  Integrador Oficial Autorizado <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">SYSCOM</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-300 font-semibold leading-relaxed">
                  {SYSCOM_PARTNER_INFO.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  {SYSCOM_PARTNER_INFO.description}
                </p>

                {/* Guarantee checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                  {SYSCOM_PARTNER_INFO.guarantees.map((guarantee, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{guarantee}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20solicito%20cotización%20de%20material/equipo%20de%20catálogo%20SYSCOM.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Cotizar Lista de Materiales SYSCOM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#materiales"
                    className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Ver Catálogo Panduit & Panasonic</span>
                  </a>
                </div>
              </div>

              {/* Right Column: High-Tech Card with stats */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950/90 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 space-y-4 shadow-md dark:shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Boxes className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Beneficios con Integrador</span>
                    </div>
                    <span className="text-[10px] uppercase font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/60">
                      Garantizado
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800/80 hover:border-blue-400 dark:hover:border-neutral-700 transition-colors shadow-xs">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">Garantía Directa Nacional</div>
                        <div className="text-slate-600 dark:text-neutral-400 text-[11px] mt-0.5">Soporte directo de fábrica, refacciones 100% originales y reposición expedita.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800/80 hover:border-blue-400 dark:hover:border-neutral-700 transition-colors shadow-xs">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">Almacenes en Todo México</div>
                        <div className="text-slate-600 dark:text-neutral-400 text-[11px] mt-0.5">Stock local en Guadalajara y CEDIS en CDMX, Monterrey, Chihuahua y Mérida.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800/80 hover:border-blue-400 dark:hover:border-neutral-700 transition-colors shadow-xs">
                      <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40 shrink-0">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">Asesoría de Ingeniería Certificada</div>
                        <div className="text-slate-600 dark:text-neutral-400 text-[11px] mt-0.5">Validación de compatibilidad de tarjetas, módulos, fuentes y especificaciones.</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-500 dark:text-neutral-500 border-t border-slate-200 dark:border-neutral-800/60">
                    {SYSCOM_PARTNER_INFO.warehouseCoverage}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeInUp>

        {/* Brands Section Header & View Mode Switch */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-950 dark:text-white">
                Marcas Líderes Respaldadas por SYSCOM y Conmutadores GDL
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400">
                Venta de artículos de línea, consumibles, refacciones originales y proyectos llave en mano
              </p>
            </div>

            {/* View Mode Switch (Carrusel Continuo / Cuadrícula) */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-bold text-slate-800 dark:text-neutral-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                title={viewMode === 'carousel' ? 'Cambiar a vista de cuadrícula' : 'Cambiar a carrusel continuo'}
              >
                {viewMode === 'carousel' ? (
                  <>
                    <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Ver en Cuadrícula</span>
                  </>
                ) : (
                  <>
                    <Repeat className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Ver Carrusel Continuo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: CONTINUOUS SEAMLESS MARQUEE (NO PAUSE/PLAY BUTTONS) */}
          {viewMode === 'carousel' ? (
            <div className="relative overflow-hidden py-4">
              {/* Fade gradient edges for sleek modern infinity look */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-100/90 dark:from-[#0a0b0e] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-100/90 dark:from-[#0a0b0e] to-transparent z-10 pointer-events-none" />

              {/* Continuous Infinite Flowing Track */}
              <div className="animate-marquee-continuous gap-4">
                {/* 2 Sets of Brands for seamless continuous marquee */}
                {[...brandLogos, ...brandLogos].map((b, idx) => (
                  <div
                    key={idx}
                    className={`shrink-0 w-64 sm:w-72 p-5 rounded-2xl bg-white dark:bg-neutral-900/90 bg-gradient-to-b ${b.accentColor} border backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:scale-105 shadow-md dark:shadow-lg cursor-pointer group`}
                    onClick={() => {
                      const el = document.getElementById('materiales');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${b.badgeColor}`}>
                          {b.category}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />
                      </div>
                      
                      <h4 className="font-black text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {b.name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10">
                      <p className="text-xs text-slate-600 dark:text-neutral-300 font-medium leading-snug">
                        {b.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-3">
                <span className="text-[11px] text-slate-500 dark:text-neutral-500">
                  * Pasa el cursor sobre cualquier marca para pausar y explorar detalles
                </span>
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: REFINED FULL HIGH-TECH GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
              {brandLogos.map((b, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl bg-white dark:bg-neutral-900/90 bg-gradient-to-b ${b.accentColor} border backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] shadow-md dark:shadow-xl cursor-pointer group`}
                  onClick={() => {
                    const el = document.getElementById('materiales');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${b.badgeColor}`}>
                        {b.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-black text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {b.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-white/10">
                    <p className="text-xs text-slate-600 dark:text-neutral-300 font-medium leading-snug">
                      {b.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
