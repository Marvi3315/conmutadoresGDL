import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  Cpu, 
  Camera, 
  Network, 
  ShieldCheck, 
  Wrench, 
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

  // Real-world dynamic estimation calculation logic (in MXN)
  const calculateBudget = () => {
    let baseHardware = 0;
    let laborInstallation = 0;
    let recommendedHardware = '';
    let itemizedList: { item: string; cost: number }[] = [];

    if (serviceType === 'conmutadores-ip') {
      if (unitsCount <= 8) {
        baseHardware = 7800;
        recommendedHardware = 'Conmutador IP Grandstream UCM6301 + Teléfonos IP Grandstream HD';
      } else if (unitsCount <= 24) {
        baseHardware = 16500;
        recommendedHardware = 'Conmutador IP Grandstream UCM6302 + Teléfonos Gigabit PoE';
      } else if (unitsCount <= 50) {
        baseHardware = 32000;
        recommendedHardware = 'Conmutador IP Grandstream UCM6304 + Consola de Operadora + Teléfonos Ejecutivos';
      } else {
        baseHardware = 58000;
        recommendedHardware = 'Conmutador IP Grandstream Enterprise UCM6308 / Servidor FreePBX HA';
      }

      const phonesTotal = unitsCount * 1150;
      itemizedList.push({ item: recommendedHardware, cost: baseHardware });
      itemizedList.push({ item: `${unitsCount}x Teléfonos IP Gigabit PoE con Audio HD`, cost: phonesTotal });

      laborInstallation = unitsCount * 450 + 2500;
      itemizedList.push({ item: 'Programación de PBX, IVR, Colas de Espera y Rutas SIP', cost: laborInstallation });

      if (includeSoftphoneApp) {
        itemizedList.push({ item: 'Configuración de App Móvil (Android/iOS) por usuario', cost: 0 });
      }
      if (includeCallRecording) {
        itemizedList.push({ item: 'Módulo de Grabación Centralizada de Llamadas', cost: 1800 });
      }
    } else if (serviceType === 'cctv-videovigilancia') {
      if (unitsCount <= 8) {
        baseHardware = 8500;
        recommendedHardware = 'NVR 8 Canales 4K PoE Hikvision AcuSense + Disco 4TB WD Purple';
      } else if (unitsCount <= 16) {
        baseHardware = 18900;
        recommendedHardware = 'NVR 16 Canales 4K PoE Hikvision + 2x Discos 6TB WD Purple';
      } else if (unitsCount <= 32) {
        baseHardware = 36000;
        recommendedHardware = 'NVR 32 Canales 4K Enterprise Dahua/Hikvision + 4x Discos 8TB RAID';
      } else {
        baseHardware = 64000;
        recommendedHardware = 'Servidor VMS Milestone / HikCentral + Almacenamiento SAN/NAS';
      }

      const camerasTotal = unitsCount * 1450;
      itemizedList.push({ item: recommendedHardware, cost: baseHardware });
      itemizedList.push({ item: `${unitsCount}x Cámaras IP Domo/Bala 4K con Visión Nocturna ColorVu & IA`, cost: camerasTotal });

      laborInstallation = unitsCount * 650 + 1500;
      itemizedList.push({ item: 'Instalación, orientación, canalización y configuración de app móvil Hik-Connect', cost: laborInstallation });
    } else if (serviceType === 'cableado-redes-fibra') {
      recommendedHardware = `${unitsCount} Nodos Cat6 100% Cobre Panduit/Belden + Patch Panel + Switch Gigabit PoE`;
      baseHardware = unitsCount * 850 + 6500;
      laborInstallation = unitsCount * 400 + 1800;

      itemizedList.push({ item: recommendedHardware, cost: baseHardware });
      itemizedList.push({ item: 'Tendido de cableado, peinado de rack y conectorización RJ45', cost: laborInstallation });

      if (includeFlukeCert) {
        itemizedList.push({ item: 'Certificación de reflectometría y atenuación con Fluke DSX-8000', cost: unitsCount * 180 });
      }
    } else if (serviceType === 'control-acceso-asistencia') {
      baseHardware = unitsCount * 6500;
      laborInstallation = unitsCount * 1800;
      itemizedList.push({ item: `${unitsCount}x Terminales Biométricas de Reconocimiento Facial / Huella ZKTeco + Chapas Magnéticas 600lbs`, cost: baseHardware });
      itemizedList.push({ item: 'Instalación electromecánica, sensor infrarrojo, botón no-touch y enrolamiento', cost: laborInstallation });
    } else {
      baseHardware = 4500;
      laborInstallation = 3000;
      itemizedList.push({ item: 'Diagnóstico en sitio, refacciones y reconfiguración integral de sistema', cost: baseHardware + laborInstallation });
    }

    if (includeUPSBackup) {
      itemizedList.push({ item: 'UPS No-Break Grado Servidor Smart-Online 1500VA', cost: 4200 });
    }

    if (includeMaintenancePolicy) {
      itemizedList.push({ item: 'Póliza Preventiva y Soporte Técnico de Guardia (1er mes incluido)', cost: 0 });
    }

    const subtotal = itemizedList.reduce((acc, curr) => acc + curr.cost, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return {
      subtotal,
      iva,
      total,
      itemizedList,
      recommendedHardware
    };
  };

  const budget = calculateBudget();

  const getServiceLabel = (id: string) => {
    switch (id) {
      case 'conmutadores-ip': return 'Conmutadores Telefónicos IP & Voz sobre Red';
      case 'cctv-videovigilancia': return 'CCTV & Cámaras de Seguridad 4K con IA';
      case 'cableado-redes-fibra': return 'Cableado Estructurado & Fibra Óptica';
      case 'control-acceso-asistencia': return 'Control de Acceso & Biometría';
      case 'alarmas-cercas-electricas': return 'Alarmas & Seguridad Perimetral';
      default: return 'Servicio Especializado TI';
    }
  };

  const handleSendToWhatsApp = () => {
    const summaryLines = budget.itemizedList
      .map(it => `• ${it.item}: ${it.cost === 0 ? 'Incluido' : `$${it.cost.toLocaleString('es-MX')} MXN`}`)
      .join('\n');

    const message =
      `*SOLICITUD DE COTIZACIÓN - CONMUTADORES GDL*\n\n` +
      `👤 *Cliente:* ${clientName || 'Cliente Web'}\n` +
      `🏢 *Empresa:* ${clientCompany || 'No indicada'}\n` +
      `📱 *Teléfono:* ${clientPhone || 'No indicado'}\n` +
      `📧 *Email:* ${clientEmail || 'No indicado'}\n` +
      `📍 *Zona ZMG:* ${selectedZone}\n\n` +
      `⚙️ *Servicio:* ${getServiceLabel(serviceType)}\n` +
      `🔢 *Cantidad:* ${unitsCount} unidades / puntos\n` +
      `🏷️ *Tipo:* Instalación ${installType.toUpperCase()}\n\n` +
      `📋 *Desglose Estimado:*\n${summaryLines}\n\n` +
      `💰 *Total Estimado (con IVA):* $${Math.round(budget.total).toLocaleString('es-MX')} MXN\n\n` +
      `Solicito confirmar disponibilidad y programar el levantamiento físico en sitio sin costo.`;

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
              <div className="text-xs uppercase tracking-widest text-blue-200 font-bold">Simulador Interactivo</div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Cotizador en Línea &middot; Telecomunicaciones & Seguridad GDL
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
              Presupuesto & Envío
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
                    { id: 'alarmas-cercas-electricas', name: 'Alarmas & Cercas', icon: ShieldCheck, desc: 'Sensores y sirenas perimetrales' },
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
              
              {/* Estimated Breakdown Table */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Resumen de Propuesta Técnica Estimada</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{getServiceLabel(serviceType)} ({unitsCount} unidades)</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    Incluye Instalación
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {budget.itemizedList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{item.item}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {item.cost === 0 ? 'Incluido' : `$${item.cost.toLocaleString('es-MX')} MXN`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Total */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-right font-mono">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Subtotal Estimado: <span className="text-slate-800 dark:text-slate-200 font-bold">${Math.round(budget.subtotal).toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    IVA (16%): <span className="text-slate-800 dark:text-slate-200">${Math.round(budget.iva).toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="text-base sm:text-lg text-slate-900 dark:text-white font-extrabold flex items-center justify-end gap-2 pt-1">
                    <span className="text-xs font-sans uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">Total Estimado con IVA:</span>
                    <span className="text-blue-600 dark:text-blue-400">${Math.round(budget.total).toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans text-right">
                    *Precios sujetos a validación de distancias en levantamiento físico sin costo.
                  </div>
                </div>
              </div>

              {/* Client Details Form */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Datos de Contacto para Formalizar Propuesta & Visita en Sitio</span>
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
                    <span>Enviar Cotización a WhatsApp Técnico</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Imprimir Resumen</span>
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
              <span>Siguiente: {step === 1 ? 'Complementos y Zona' : 'Ver Desglose y Total'}</span>
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
