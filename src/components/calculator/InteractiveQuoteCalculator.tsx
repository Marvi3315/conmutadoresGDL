import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  Cpu, 
  Camera, 
  Network, 
  ShieldCheck, 
  Wrench, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare, 
  Printer, 
  Send, 
  Sparkles,
  Building,
  MapPin,
  HelpCircle,
  FileCheck,
  Check
} from 'lucide-react';
import { COMPANY_INFO, COVERAGE_ZONES } from '../../data/telecomData';

interface InteractiveQuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const InteractiveQuoteCalculator: React.FC<InteractiveQuoteCalculatorProps> = ({
  isOpen,
  onClose,
  initialService = 'conmutadores-ip'
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<string>(initialService);
  
  // Specific configurations
  const [unitsCount, setUnitsCount] = useState<number>(12); // extensions, cameras, or nodes
  const [installType, setInstallType] = useState<'nueva' | 'migracion' | 'mantenimiento'>('nueva');
  const [deploymentType, setDeploymentType] = useState<'onpremise' | 'cloud' | 'hibrido'>('onpremise');
  const [selectedZone, setSelectedZone] = useState<string>('Guadalajara Centro, Providencia & Minerva');
  
  // Add-ons
  const [includeSoftphoneApp, setIncludeSoftphoneApp] = useState<boolean>(true);
  const [includeCallRecording, setIncludeCallRecording] = useState<boolean>(true);
  const [includeUPSBackup, setIncludeUPSBackup] = useState<boolean>(true);
  const [includeFlukeCert, setIncludeFlukeCert] = useState<boolean>(false);
  const [includeMaintenancePolicy, setIncludeMaintenancePolicy] = useState<boolean>(true);

  // Client form
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const installLabels: Record<string, string> = {
    nueva: 'Instalación nueva',
    migracion: 'Migración / Ampliación',
    mantenimiento: 'Revisión y soporte',
  };

  const getServiceLabel = (id: string) => {
    switch (id) {
      case 'conmutadores-ip': return 'Conmutadores Telefónicos IP & Voz sobre Red';
      case 'cctv-videovigilancia': return 'CCTV & Cámaras de Seguridad 4K con IA';
      case 'cableado-redes-fibra': return 'Cableado Estructurado & Fibra Óptica';
      case 'control-acceso-asistencia': return 'Control de Acceso & Biometría';
      case 'equipos-redes': return 'Equipos de Redes: Switch, Router & WiFi';
      default: return 'Servicio Especializado TI';
    }
  };

  const handleSendToWhatsApp = () => {
    const addons: string[] = [];
    if (includeUPSBackup) addons.push('UPS No-Break');
    if (serviceType === 'conmutadores-ip' && includeCallRecording) addons.push('Grabación de llamadas');
    if (serviceType === 'conmutadores-ip' && includeSoftphoneApp) addons.push('App móvil');
    if (serviceType === 'cableado-redes-fibra' && includeFlukeCert) addons.push('Certificación Fluke');

    const message =
      `*SOLICITUD DE COTIZACIÓN - CONMUTADORES GDL*\n\n` +
      `👤 *Cliente:* ${clientName || 'Cliente Web'}\n` +
      `🏢 *Empresa:* ${clientCompany || 'No indicada'}\n` +
      `📱 *Teléfono:* ${clientPhone || 'No indicado'}\n` +
      `📧 *Email:* ${clientEmail || 'No indicado'}\n` +
      `📍 *Zona:* ${selectedZone}\n\n` +
      `⚙️ *Servicio:* ${getServiceLabel(serviceType)}\n` +
      `🔢 *Cantidad:* ${unitsCount} unidades / puntos\n` +
      `🏷️ *Tipo de proyecto:* ${installLabels[installType]}\n` +
      `➕ *Complementos:* ${addons.length ? addons.join(', ') : 'Ninguno'}\n\n` +
      `Hola Licenciado Felipe Romo, solicito una cotización con estos datos.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100 transition-colors">
        
        {/* Header Bar */}
        <div className="relative p-5 sm:p-6 bg-blue-600 dark:bg-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-700 dark:bg-blue-800 text-white border border-blue-500">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-200 font-bold">Solicitud de Cotización</div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Cuéntanos qué necesitas &middot; Conmutadores GDL
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-700/60 hover:bg-blue-800 text-blue-100 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar cotizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
            }`}>
              1
            </div>
            <span className={step === 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'}>
              Servicio & Dimensión
            </span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-slate-200 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
            }`}>
              2
            </div>
            <span className={step === 2 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'}>
              Complementos & Zona
            </span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-slate-200 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
            }`}>
              3
            </div>
            <span className={step === 3 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'}>
              Datos & Envío
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-grow space-y-6">
          
          {/* STEP 1: Select Service & Units */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  1. Selecciona la solución técnica a cotizar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'conmutadores-ip', name: 'Conmutador IP & PBX', icon: Cpu, desc: 'Central IP, IVR y teléfonos SIP' },
                    { id: 'cctv-videovigilancia', name: 'CCTV & Cámaras 4K', icon: Camera, desc: 'NVR con IA y visión ColorVu' },
                    { id: 'cableado-redes-fibra', name: 'Cableado & Fibra Óptica', icon: Network, desc: 'Cat6/6A y racks certificados' },
                    { id: 'control-acceso-asistencia', name: 'Control de Acceso', icon: ShieldCheck, desc: 'Facial, biométrico y chapas' },
                    { id: 'equipos-redes', name: 'Switch, Router & WiFi', icon: Wifi, desc: 'Equipos de red y cobertura inalámbrica' },
                    { id: 'reparacion-soporte-tecnico', name: 'Póliza o Reparación', icon: Wrench, desc: 'Mantenimiento preventivo/correctivo' },
                  ].map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setServiceType(srv.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          serviceType === srv.id
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-950 dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <Icon className={`w-4 h-4 ${serviceType === srv.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold">{srv.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{srv.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Units Slider */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-800 dark:text-slate-200">
                    {serviceType === 'conmutadores-ip' ? 'Número de Extensiones / Teléfonos requeridos:' :
                     serviceType === 'cctv-videovigilancia' ? 'Número de Cámaras de Seguridad:' :
                     serviceType === 'cableado-redes-fibra' ? 'Número de Puntos / Nodos de Red:' :
                     'Cantidad de Dispositivos / Puertas:'}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-lg font-black">
                    {unitsCount} {unitsCount === 1 ? 'unidad' : 'unidades'}
                  </span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={unitsCount}
                  onChange={(e) => setUnitsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>2 mín.</span>
                  <span>16 est.</span>
                  <span>32 pyme</span>
                  <span>64 corporativo</span>
                </div>
              </div>

              {/* Installation Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Tipo de Proyecto:
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'nueva', title: 'Instalación Nueva', desc: 'Suministro de todo el equipo y cableado desde cero' },
                    { id: 'migracion', title: 'Migración / Ampliación', desc: 'Reemplazo o aumento de equipos preexistentes' },
                    { id: 'mantenimiento', title: 'Revisión y Soporte', desc: 'Configuración, reparación o cambio de piezas' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInstallType(t.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        installType === t.id
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-300 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.title}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Addons & Zone */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Complementos Recomendados para tu Infraestructura:
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Sistema de Respaldo Eléctrico UPS No-Break</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Garantiza operación continua ante apagones y fluctuaciones de CFE.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeUPSBackup}
                      onChange={(e) => setIncludeUPSBackup(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </label>

                  {serviceType === 'conmutadores-ip' && (
                    <>
                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">Grabación de Llamadas de Entrada y Salida</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Auditoría de calidad para ventas, atención al cliente y soporte.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeCallRecording}
                          onChange={(e) => setIncludeCallRecording(e.target.checked)}
                          className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">App Móvil para Smartphone (Home Office)</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Contesta y transfiere llamadas de la oficina en tu celular iOS o Android.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeSoftphoneApp}
                          onChange={(e) => setIncludeSoftphoneApp(e.target.checked)}
                          className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>
                    </>
                  )}

                  {serviceType === 'cableado-redes-fibra' && (
                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Certificación Fluke Networks nodo por nodo</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Entrega de gráfica de reflectometría y garantía de 15 años de enlace.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeFlukeCert}
                        onChange={(e) => setIncludeFlukeCert(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Zone in ZMG */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Ubicación del Inmueble (Zona Metropolitana de Guadalajara)
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600"
                >
                  {COVERAGE_ZONES.map((zone, idx) => (
                    <option key={idx} value={zone.name}>
                      {zone.name} — Respuesta {zone.responseTime}
                    </option>
                  ))}
                  <option value="Otra zona de Jalisco">Otra localidad en Jalisco o Bajío</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Breakdown, Estimated Total & Direct WhatsApp */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Request summary (sin precios) */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm pb-3 border-b border-slate-200 dark:border-slate-700">Resumen de tu solicitud</h3>
                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {[
                    ['Servicio', getServiceLabel(serviceType)],
                    ['Cantidad', `${unitsCount} ${unitsCount === 1 ? 'unidad' : 'unidades'}`],
                    ['Tipo de proyecto', installLabels[installType]],
                    ['Zona', selectedZone],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />{k}</span>
                      <span className="text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Con estos datos Felipe te enviará la cotización por WhatsApp.
                </p>
              </div>

              {/* Client Details Form */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Tus datos de contacto</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Tu Nombre o Contacto *</label>
                    <input
                      type="text"
                      placeholder="Ej. Ing. Carlos Mendoza"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Teléfono *</label>
                    <input
                      type="tel"
                      placeholder="Ej. 33 3812 5590"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Empresa / Negocio</label>
                    <input
                      type="text"
                      placeholder="Ej. Corporativo Arcos"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      placeholder="contacto@miempresa.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar solicitud por WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Imprimir</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Stepper Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Siguiente: {step === 1 ? 'Complementos y Zona' : 'Datos de Contacto'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
