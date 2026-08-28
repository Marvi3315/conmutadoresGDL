import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  PhoneCall, 
  Camera, 
  AlertTriangle, 
  Calendar, 
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/telecomData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const quickActions = [
    {
      title: 'Cotizar Conmutador IP',
      desc: 'Telefonía IP, IVR y Softphone',
      text: 'Hola, deseo cotizar un conmutador telefónico IP para mi empresa.',
      icon: PhoneCall,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Cotizar Cámaras CCTV 4K',
      desc: 'Videovigilancia con IA y visión nocturna',
      text: 'Hola, solicito información y cotización de cámaras de seguridad CCTV.',
      icon: Camera,
      color: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Agendar Visita en GDL (Gratis)',
      desc: 'Levantamiento físico en tus instalaciones',
      text: 'Hola, me gustaría agendar un levantamiento técnico sin costo en Guadalajara.',
      icon: Calendar,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Emergencia Técnica Inmediata',
      desc: 'Falla crítica de conmutador o cámaras',
      text: '🚨 REPORTE DE EMERGENCIA: Tengo una falla crítica y requiero asistencia técnica urgente.',
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
    },
  ];

  const handleOpenAction = (customText: string) => {
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(customText)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Interactive Quick Action Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-300 text-slate-800 dark:text-slate-100">
          
          {/* Header inside Widget */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Conmutadores GDL</h4>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span>●</span> En línea | Respuesta rápida
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            ¡Hola! 👋 ¿En qué podemos apoyarte hoy en Guadalajara? Selecciona una opción para conectar de inmediato:
          </p>

          {/* Quick Action List */}
          <div className="space-y-2">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleOpenAction(action.text)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between gap-3 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {action.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {action.desc}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => handleOpenAction('Hola Conmutadores GDL, requiero información.')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>O escribe un mensaje libre en WhatsApp &rarr;</span>
            </button>
          </div>

        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-3 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-500"
        aria-label="Abrir WhatsApp"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>

        <MessageSquare className="w-5 h-5 text-white" />
        
        <span className="hidden sm:inline font-bold">¿Asesoría en GDL? Chatear</span>
      </button>

    </div>
  );
};
