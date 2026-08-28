import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA, COVERAGE_ZONES } from '../../data/telecomData';
import { PhoneHandsetLogo } from '../ui/PhoneHandsetLogo';

interface FooterProps {
  onSelectService: (serviceId: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenCalculator }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top CTA Card inside footer */}
        <div className="mb-16 p-8 md:p-10 rounded-xl bg-blue-700 text-white shadow-xl relative overflow-hidden border border-blue-600">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl text-center lg:text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ¿Listo para modernizar las telecomunicaciones de tu empresa en Guadalajara y México?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Nuestros ingenieros certificados te visitan en Guadalajara y Jalisco para evaluar tu conmutador o red, o enviamos material y equipo preconfigurado a cualquier estado de la República Mexicana.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-blue-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Cotizar en Línea Ahora</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20Licenciado%20Felipe%20Romo,%20deseo%20cotizar%20material%20o%20servicio%20para%20mi%20empresa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Agendar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black border border-slate-700 shadow-sm overflow-hidden p-0.5">
                <PhoneHandsetLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl tracking-tight text-white">CONMUTADORES</span>
                  <span className="font-extrabold text-xl tracking-tight text-blue-400">GDL</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-1">
                  Telecomunicaciones & Seguridad
                </span>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empresa líder en Guadalajara especializada en venta, instalación, programación y mantenimiento de conmutadores telefónicos IP, CCTV 4K, cableado estructurado certificado y sistemas de control de acceso.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+18 años conectando empresas e industrias en Jalisco</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Distribuidores e instaladores autorizados multimarca</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Cuadrillas técnicas con respuesta de emergencia &lt;2 horas</span>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="p-3.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-3">
              <div className="p-2 rounded-md bg-red-500/20 text-red-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                  Línea de Emergencia 24/7
                </div>
                <a href={`tel:${COMPANY_INFO.phoneEmergency.replace(/\s/g, '')}`} className="text-sm font-bold text-white hover:text-red-300">
                  {COMPANY_INFO.phoneEmergency}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Servicios Principales */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Servicios Especializados
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onSelectService(srv.id)}
                    className="text-left text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{srv.title.split('&')[0]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Enlaces Rápidos & Herramientas */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Herramientas & Soporte
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#calculadora-red" className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Calculadora CCTV & Almacenamiento</span>
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Levantamiento Técnico en Sitio</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Catálogo de Soluciones</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Atención en Jalisco
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Servicio y soporte técnico en sitio para Guadalajara, Zapopan, Tlaquepaque, Tonalá, El Salto, Tlajomulco y corredores industriales.
              </p>
            </div>
          </div>

          {/* Col 4: Contacto & Atención */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Atención & Contacto
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Guadalajara, Jalisco, México (Atención a Domicilio y en Sitio)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Licenciado Felipe Romo: </span>
                  <a href={`tel:${COMPANY_INFO.phoneDirect.replace(/\s/g, '')}`} className="hover:text-blue-300 font-bold text-white">
                    {COMPANY_INFO.phoneMain}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Oficina: </span>
                  <a href={`tel:${COMPANY_INFO.phoneOfficeDirect.replace(/\s/g, '')}`} className="hover:text-blue-300 font-bold text-white">
                    {COMPANY_INFO.phoneOffice}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: {COMPANY_INFO.whatsappFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-300">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 border-t border-slate-800">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-200">Horarios de Atención:</div>
                  <div className="text-slate-300 font-medium">Lunes a Viernes: 9:00 a.m. – 7:00 p.m.</div>
                  <div className="text-slate-500">Sábados y Domingos: Cerrado</div>
                  <div className="text-[11px] text-emerald-400 font-medium pt-0.5">Atención técnica y soporte a empresas</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Conmutadores GDL (conmutadoresgdl.com.mx). Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Guadalajara, Jalisco, México</span>
            <span>•</span>
            <span className="text-slate-400 font-medium">Marcas registradas pertenecen a sus respectivos fabricantes.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
