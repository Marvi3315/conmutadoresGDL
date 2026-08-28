import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Cpu, 
  Camera, 
  Network, 
  ShieldCheck, 
  BellRing, 
  Wrench, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  Layers,
  Award,
  PhoneCall,
  Send
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { COMPANY_INFO } from '../../data/telecomData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenCalculatorWithService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  service, 
  onClose,
  onOpenCalculatorWithService 
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!service) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'PhoneCall': return PhoneCall;
      case 'Camera': return Camera;
      case 'Network': return Network;
      case 'ShieldCheck': return ShieldCheck;
      case 'BellRing': return BellRing;
      case 'Wrench': return Wrench;
      default: return Cpu;
    }
  };

  const IconComp = getIcon(service.iconName);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*SOLICITUD DE COTIZACIÓN - CONMUTADORES GDL*%0A%0A` +
      `📌 *Servicio:* ${service.title}%0A` +
      `👤 *Nombre:* ${clientName}%0A` +
      `🏢 *Empresa:* ${clientCompany || 'No especificada'}%0A` +
      `📱 *Teléfono:* ${clientPhone}%0A` +
      `📝 *Requerimiento:* ${clientNotes || 'Solicito información y propuesta técnica.'}%0A` +
      `📍 *Ubicación:* Zona Metropolitana de Guadalajara`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="relative p-6 sm:p-8 bg-blue-600 dark:bg-blue-700 text-white border-b border-blue-700 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-700 dark:bg-blue-800 text-white border border-blue-500">
              <IconComp className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-800/80 text-blue-100 text-xs font-bold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{service.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-blue-100 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-600 dark:text-slate-300">
          
          {/* Detailed Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Descripción Técnica</h3>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>Alcance y Entregables del Proyecto</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>Marcas y Equipos Certificados</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Suministramos exclusivamente equipo original con respaldo y garantía directa del fabricante:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {service.brands.map((brand, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {brand}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Incluye pruebas de rendimiento y certificación.</span>
              </div>
            </div>
          </div>

          {/* Quick Direct Quote Form */}
          <div className="p-6 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Cotizar {service.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Envía tus datos para recibir propuesta económica en menos de 2 horas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCalculatorWithService(service.id);
                }}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-700 text-xs font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-50"
              >
                <span>Usar Cotizador Guiado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold text-center">
                ¡Mensaje preparado! Te hemos redirigido a WhatsApp con Felipe Romo para atender tu solicitud.
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Tu Nombre *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono / WhatsApp *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Empresa (Opcional)"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="sm:col-span-3">
                  <textarea
                    rows={2}
                    placeholder="Detalles de tu proyecto (número de extensiones, cámaras, puntos de red o ubicación)..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Solicitud Inmediata por WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Atención telefónica directa: <span className="font-bold text-slate-900 dark:text-white">{COMPANY_INFO.phoneMain}</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              Cerrar
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Felipe%20Romo,%20me%20gustaría%20cotizar%20el%20servicio%20de%20${encodeURIComponent(service.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
