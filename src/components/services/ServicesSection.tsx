import React, { useState } from 'react';
import { 
  PhoneCall, 
  Camera, 
  Network, 
  ShieldCheck, 
  BellRing, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Calculator,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/telecomData';
import { ServiceDetailModal } from './ServiceDetailModal';
import { FadeInUp } from '../ui/FadeInUp';

interface ServicesSectionProps {
  onOpenCalculator: (serviceId?: string) => void;
  selectedServiceModalId: string | null;
  onCloseModal: () => void;
  onSelectServiceModal: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenCalculator,
  selectedServiceModalId,
  onCloseModal,
  onSelectServiceModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios' },
    { id: 'telefonia', label: 'Conmutadores & VoIP' },
    { id: 'seguridad', label: 'CCTV & Alarmas' },
    { id: 'redes', label: 'Cableado & Fibra' },
    { id: 'control', label: 'Control de Acceso' },
    { id: 'mantenimiento', label: 'Soporte & Reparación' },
  ];

  const filteredServices = activeCategory === 'todos' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'PhoneCall': return PhoneCall;
      case 'Camera': return Camera;
      case 'Network': return Network;
      case 'ShieldCheck': return ShieldCheck;
      case 'BellRing': return BellRing;
      case 'Wrench': return Wrench;
      default: return PhoneCall;
    }
  };

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceModalId) || null;

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-[#0c0d10] relative overflow-hidden text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInUp delay={0} distance={24}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Ingeniería en Telecomunicaciones y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Seguridad</span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-base leading-relaxed">
              Soluciones integrales de hardware, conmutadores IP, CCTV 4K, cableado estructurado certificado y pólizas de mantenimiento en Guadalajara, Jalisco y con cobertura técnica en toda la República Mexicana.
            </p>
          </div>
        </FadeInUp>

        {/* Category Filter Pills */}
        <FadeInUp delay={80} distance={20}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/30'
                    : 'bg-white dark:bg-[#14151a] text-slate-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Bespoke Modern Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const Icon = getIcon(service.iconName);
            const staggerDelay = (index % 3) * 100;
            
            const getCategoryTheme = (category: string) => {
              switch (category) {
                case 'telefonia': 
                  return {
                    iconBg: 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
                    borderHover: 'hover:border-blue-500/80 dark:hover:border-blue-500/60',
                    badge: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60'
                  };
                case 'seguridad': 
                  return {
                    iconBg: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60',
                    borderHover: 'hover:border-indigo-500/80 dark:hover:border-indigo-500/60',
                    badge: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60'
                  };
                case 'redes': 
                  return {
                    iconBg: 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/60',
                    borderHover: 'hover:border-cyan-500/80 dark:hover:border-cyan-500/60',
                    badge: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60'
                  };
                case 'control': 
                  return {
                    iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
                    borderHover: 'hover:border-emerald-500/80 dark:hover:border-emerald-500/60',
                    badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                  };
                case 'mantenimiento': 
                  return {
                    iconBg: 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
                    borderHover: 'hover:border-amber-500/80 dark:hover:border-amber-500/60',
                    badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                  };
                default: 
                  return {
                    iconBg: 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
                    borderHover: 'hover:border-blue-500/80 dark:hover:border-blue-500/60',
                    badge: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60'
                  };
              }
            };

            const theme = getCategoryTheme(service.category);

            return (
              <FadeInUp key={service.id} delay={staggerDelay} distance={28} className="h-full">
                <div
                  className={`group relative rounded-3xl bg-white dark:bg-[#14151a] border border-slate-200 dark:border-neutral-800/90 ${theme.borderHover} p-5 sm:p-6 lg:p-7 transition-all duration-300 ease-out shadow-sm hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between h-full backdrop-blur-xs overflow-hidden`}
                >
                  <div className="overflow-hidden">
                    {/* Top Badge & Icon */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform ${theme.iconBg}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider border text-right max-w-[65%] leading-tight break-words ${theme.badge}`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white mb-2 leading-snug break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-neutral-400 leading-relaxed mb-5 break-words">
                      {service.shortDescription}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2 mb-5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span className="leading-snug break-words">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Brand Badges */}
                    <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 mb-5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-2">
                        Marcas Especializadas:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.brands.slice(0, 4).map((brand, bIdx) => (
                          <span key={bIdx} className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[10px] font-medium text-slate-700 dark:text-neutral-300 whitespace-nowrap">
                            {brand}
                          </span>
                        ))}
                        {service.brands.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800 text-[10px] text-slate-500 dark:text-neutral-400 font-bold whitespace-nowrap">
                            +{service.brands.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Actions */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-neutral-800/80">
                    <button
                      type="button"
                      onClick={() => onSelectServiceModal(service.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>Ver Ficha Técnica</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenCalculator(service.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer group/btn text-center"
                    >
                      <Calculator className="w-3.5 h-3.5 shrink-0" />
                      <span>Cotizar Servicio</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>

                </div>
              </FadeInUp>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <FadeInUp delay={100} distance={24}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border border-neutral-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-black text-white">¿Tienes un proyecto especial con múltiples sucursales o naves industriales?</h4>
              <p className="text-xs sm:text-sm text-neutral-300">Diseñamos soluciones a la medida integrando voz IP, CCTV con IA y enlaces de fibra óptica en toda la República.</p>
            </div>
            <a
              href="#contacto"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold shrink-0 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <span>Consultar con un Ingeniero</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInUp>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={onCloseModal}
          onOpenCalculatorWithService={onOpenCalculator}
        />
      )}

    </section>
  );
};
