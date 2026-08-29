import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  Building,
  User,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, COVERAGE_ZONES } from '../../data/telecomData';
import { FadeInUp } from '../ui/FadeInUp';

export const ContactSection: React.FC = () => {
  const [surveyName, setSurveyName] = useState('');
  const [surveyPhone, setSurveyPhone] = useState('');
  const [surveyCompany, setSurveyCompany] = useState('');
  const [surveyZone, setSurveyZone] = useState('Guadalajara Centro y Minerva');
  const [surveyService, setSurveyService] = useState('Conmutadores Telefónicos IP');
  const [surveyDate, setSurveyDate] = useState('');
  const [surveyNotes, setSurveyNotes] = useState('');
  const [isSurveyBooked, setIsSurveyBooked] = useState(false);

  const handleBookSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message =
      `*SOLICITUD DE LEVANTAMIENTO TÉCNICO EN SITIO (GRATUITO)*\n\n` +
      `👤 *Solicitante:* ${surveyName}\n` +
      `🏢 *Empresa:* ${surveyCompany || 'No especificada'}\n` +
      `📞 *Teléfono:* ${surveyPhone}\n` +
      `📍 *Zona / Municipio:* ${surveyZone}\n` +
      `🔧 *Servicio / Interés:* ${surveyService}\n` +
      `📅 *Fecha Propuesta:* ${surveyDate || 'A coordinar'}\n` +
      `📝 *Requerimiento:* ${surveyNotes || 'Ninguno'}\n\n` +
      `Hola Licenciado Felipe Romo, solicito programar la visita técnica sin costo en nuestras instalaciones.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setIsSurveyBooked(true);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-slate-50/80 dark:bg-[#0c0d10] border-t border-slate-200 dark:border-neutral-800/80 relative overflow-hidden text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Contact Form & Office Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Office & Executive Contact Info (5 cols) */}
          <FadeInUp delay={0} distance={24} className="lg:col-span-5 h-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  Contacto y Asesoría Directa
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Atención ejecutiva, levantamientos en sitio y venta directa de material para empresas, corporativos e industrias en Jalisco y la República Mexicana.
                </p>
              </div>

              {/* High-Tech Contact Cards */}
              <div className="space-y-3.5">
                {/* Lic. Felipe Romo Mobile & WhatsApp Card */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mt-0.5 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Línea Directa & WhatsApp
                    </div>
                    <a 
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20me%20gustaría%20solicitar%20información%20o%20cotización.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-black text-slate-950 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 mt-0.5 block"
                    >
                      {COMPANY_INFO.phoneMain}
                    </a>
                    <div className="text-xs font-semibold text-slate-500 dark:text-neutral-400 mt-0.5">
                      Licenciado Felipe Romo González · Dirección General y Proyectos
                    </div>
                  </div>
                </div>

                {/* Office Phone Card */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 mt-0.5 shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      Teléfono Fijo de Oficina
                    </div>
                    <a 
                      href={`tel:${COMPANY_INFO.phoneOfficeDirect.replace(/\s/g, '')}`} 
                      className="text-base sm:text-lg font-black text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mt-0.5 block"
                    >
                      {COMPANY_INFO.phoneOffice}
                    </a>
                    <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                      Conmutador & Oficinas Guadalajara
                    </div>
                  </div>
                </div>

                {/* Email Contact Card */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mt-0.5 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                      Correo Electrónico
                    </div>
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-base sm:text-lg font-black text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mt-0.5 block break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                      Cotizaciones formales y licitaciones
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="p-5 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 flex items-start gap-4 shadow-sm">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 mt-0.5 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                      Horarios de Atención
                    </div>
                    <div className="space-y-1 text-xs text-slate-700 dark:text-neutral-300">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-neutral-800/80">
                        <span className="font-semibold text-slate-900 dark:text-white">Lunes a Viernes:</span>
                        <span className="font-mono text-slate-600 dark:text-neutral-300 font-bold">9:00 a.m. – 7:00 p.m.</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-neutral-800/80">
                        <span className="font-semibold text-slate-900 dark:text-white">Sábados y Domingos:</span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400">Cerrado</span>
                      </div>
                      <div className="pt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        * Pólizas empresariales con soporte técnico 24/7 disponible.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </FadeInUp>

          {/* Right: Free Site Survey Booking Form (7 cols) */}
          <FadeInUp delay={120} distance={24} className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 shadow-xl relative overflow-hidden">
              
              <div className="pb-5 mb-6 border-b border-slate-100 dark:border-neutral-800/80">
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Gratuito en la Zona Metropolitana de Guadalajara</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                  Agendar Levantamiento en Sitio
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
                  Un ingeniero especialista visita tus oficinas o nave industrial para inspeccionar cableado, distancias y elaborar el plano con cotización exacta.
                </p>
              </div>

              {isSurveyBooked ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-slate-950 dark:text-white text-lg">¡Solicitud de Visita Técnica Registrada!</h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed max-w-md mx-auto">
                    Hemos abierto WhatsApp para coordinar la hora exacta de la visita con el ingeniero asignado a tu zona en Guadalajara.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSurveyBooked(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-700"
                  >
                    Agendar otra cita
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookSurvey} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Ing. Carlos Mendoza"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. 33 3812 5590"
                        value={surveyPhone}
                        onChange={(e) => setSurveyPhone(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Empresa / Razón Social</label>
                      <input
                        type="text"
                        placeholder="Ej. Grupo Industrial Jalisco"
                        value={surveyCompany}
                        onChange={(e) => setSurveyCompany(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Zona del Inmueble</label>
                      <select
                        value={surveyZone}
                        onChange={(e) => setSurveyZone(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      >
                        {COVERAGE_ZONES.map((z, idx) => (
                          <option key={idx} value={z.name}>{z.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Servicio Principal a Revisar</label>
                      <select
                        value={surveyService}
                        onChange={(e) => setSurveyService(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      >
                        <option value="Conmutadores Telefónicos IP">Conmutadores Telefónicos & Telefonía IP</option>
                        <option value="CCTV & Cámaras de Seguridad 4K">CCTV & Cámaras de Seguridad 4K</option>
                        <option value="Cableado Estructurado & Fibra Óptica">Cableado Estructurado & Fibra Óptica</option>
                        <option value="Control de Acceso & Biometría">Control de Acceso & Biometría</option>
                        <option value="Alarmas & Cercas Eléctricas">Alarmas & Cercas Eléctricas</option>
                        <option value="Póliza de Mantenimiento Integral">Póliza de Mantenimiento Integral</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Fecha Tentativa Preferida</label>
                      <input
                        type="date"
                        value={surveyDate}
                        onChange={(e) => setSurveyDate(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Detalles del Requerimiento</label>
                    <textarea
                      rows={3}
                      placeholder="Ej. Requerimos migrar 20 extensiones a IP y cotizar 8 cámaras 4K para bodega..."
                      value={surveyNotes}
                      onChange={(e) => setSurveyNotes(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirmar y Agendar Visita por WhatsApp</span>
                  </button>

                </form>
              )}

            </div>
          </FadeInUp>

        </div>

      </div>
    </section>
  );
};
