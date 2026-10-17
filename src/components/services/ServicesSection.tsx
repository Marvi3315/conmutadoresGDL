import React, { useState } from 'react';
import { 
  PhoneCall, 
  Camera, 
  Network, 
  ShieldCheck, 
  BellRing, 
  Wrench, 
  Wifi, 
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
    { id: 'seguridad', label: 'CCTV & Videovigilancia' },
    { id: 'redes', label: 'Redes, WiFi & Cableado' },
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
      case 'Wifi': return Wifi;
      default: return PhoneCall;
    }
  };

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceModalId) || null;

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-[#0c0d10] relative overflow-hidden text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInUp delay={0} distance={24}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Ingeniería en Telecomunicaciones y Seguridad
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-base leading-relaxed">
              Soluciones integrales de hardware, conmutadores IP, CCTV 4K, cableado estructurado y pólizas de mantenimiento en Guadalajara, Jalisco y con cobertura técnica en toda la República Mexicana.
            </p>
          </div>
        </FadeInUp>

        {/* Category Filter Pills */}
        <FadeInUp delay={80} distance={20}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-1 py-1.5 mx-2 text-xs sm:text-sm whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold'
                    : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Servicios: cuadrícula plana con líneas compartidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <FadeInUp key={service.id} delay={(index % 3) * 100} distance={28} className="h-full">
            <article
              className="group h-full flex flex-col bg-white dark:bg-[#131418] border border-slate-300 dark:border-neutral-700 rounded-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-slate-900 dark:hover:border-neutral-300 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-40 overflow-hidden bg-slate-200 dark:bg-neutral-800 border-b border-slate-300 dark:border-neutral-700">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              <div className="flex flex-col flex-1 p-6 sm:p-7">
              <h3 className="text-xl font-bold leading-snug text-slate-950 dark:text-white break-words">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                {service.shortDescription}
              </p>

              <ul className="mt-5 space-y-1.5 text-[13px] text-slate-700 dark:text-neutral-300 leading-snug">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span aria-hidden className="text-slate-400 dark:text-neutral-600">–</span>
                    <span className="break-words">{feat}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 pt-3 border-t border-slate-200 dark:border-neutral-800 text-xs">
                <dt className="text-slate-500 dark:text-neutral-500 mb-1">Marcas</dt>
                <dd className="text-slate-800 dark:text-neutral-200 font-medium leading-relaxed">
                  {service.brands.slice(0, 5).join(' · ')}
                  {service.brands.length > 5 && <span className="text-slate-400"> · +{service.brands.length - 5}</span>}
                </dd>
              </dl>

              <div className="mt-auto pt-6 flex items-center justify-between gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => onSelectServiceModal(service.id)}
                  className="font-medium text-slate-600 dark:text-neutral-400 underline underline-offset-4 decoration-slate-300 dark:decoration-neutral-700 hover:text-slate-950 dark:hover:text-white hover:decoration-current transition-colors cursor-pointer"
                >
                  Ver ficha técnica
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCalculator(service.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-bold hover:bg-blue-700 dark:hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  <span>Cotizar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              </div>
            </article>
            </FadeInUp>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <FadeInUp delay={100} distance={24}>
          <div className="mt-14 p-6 sm:p-8 rounded-md bg-slate-900 dark:bg-neutral-900 text-white border border-slate-800 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-black text-white">¿Tienes un proyecto especial con múltiples sucursales o naves industriales?</h4>
              <p className="text-xs sm:text-sm text-neutral-300">Diseñamos soluciones a la medida integrando voz IP, CCTV con IA y enlaces de fibra óptica en toda la República.</p>
            </div>
            <a
              href="#contacto"
              className="px-5 py-3 rounded-md bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold shrink-0 transition-colors flex items-center gap-2 cursor-pointer"
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
