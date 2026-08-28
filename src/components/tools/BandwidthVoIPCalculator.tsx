import React, { useState } from 'react';
import { 
  Camera, 
  HardDrive, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Server,
  MessageSquare
} from 'lucide-react';
import { FadeInUp } from '../ui/FadeInUp';
import { COMPANY_INFO } from '../../data/telecomData';

export const BandwidthVoIPCalculator: React.FC<{ onOpenQuote: (srv?: string) => void }> = ({ onOpenQuote }) => {
  // CCTV State
  const [cctvCameras, setCctvCameras] = useState<number>(8);
  const [resolution, setResolution] = useState<'1080p' | '4mp' | '4k'>('4k');
  const [compression, setCompression] = useState<'h265' | 'h264'>('h265');
  const [storageDays, setStorageDays] = useState<number>(30);
  const [recordingMode, setRecordingMode] = useState<'continuous' | 'motion'>('motion');

  // Calculations for CCTV Storage
  const getCameraBitrateMbps = () => {
    if (resolution === '1080p') return compression === 'h265' ? 1.5 : 4.0;
    if (resolution === '4mp') return compression === 'h265' ? 2.5 : 6.0;
    return compression === 'h265' ? 4.5 : 12.0; // 4K
  };

  const cameraBitrate = getCameraBitrateMbps();
  const totalBitrateMbps = (cameraBitrate * cctvCameras).toFixed(1);

  // Hours per day recorded: 24h for continuous, ~9h effective for motion AI AcuSense
  const hoursRecordedPerDay = recordingMode === 'continuous' ? 24 : 9;
  
  // Gigabytes per camera per day: (Mbps * 3600s * hours) / 8000
  const gbPerCameraPerDay = (cameraBitrate * 3600 * hoursRecordedPerDay) / 8000;
  const totalGbNeeded = gbPerCameraPerDay * cctvCameras * storageDays;
  const totalTbNeeded = (totalGbNeeded / 1000).toFixed(1);
  
  const recommendedDisks = Number(totalTbNeeded) <= 4 ? '1x Disco 4TB WD Purple' :
                          Number(totalTbNeeded) <= 8 ? '1x Disco 8TB o 2x 4TB WD Purple' :
                          Number(totalTbNeeded) <= 16 ? '2x Discos 8TB WD Purple Surveillance' :
                          '4x Discos 8TB Enterprise RAID';

  return (
    <section id="calculadora-red" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0c0d10] border-t border-slate-200 dark:border-neutral-800/80 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <FadeInUp delay={0} distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Calculadora de Almacenamiento <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">CCTV 4K</span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-base leading-relaxed">
              Estima con precisión técnica cuántos Terabytes (TB) y qué discos duros especializados requieres para tu grabador NVR/DVR según el número de cámaras y días de respaldo.
            </p>
          </div>
        </FadeInUp>

        {/* Interactive Main Bento Box */}
        <FadeInUp delay={80} distance={28}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-9 rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-neutral-800/80">
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">Parámetros de Grabación</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold font-mono bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800/60">
                NVR Storage Calc
              </span>
            </div>

            {/* Cameras Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-800 dark:text-neutral-200">Número de Cámaras de Seguridad:</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-base">{cctvCameras} cámaras</span>
              </div>
              <input
                type="range"
                min="2"
                max="64"
                step="2"
                value={cctvCameras}
                onChange={(e) => setCctvCameras(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
                <span>2</span>
                <span>16</span>
                <span>32</span>
                <span>64 cámaras</span>
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-2">Resolución de Video</label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '1080p', label: '1080p Full HD', tag: '2MP' },
                  { id: '4mp', label: '4MP Quad HD', tag: '2K AcuSense' },
                  { id: '4k', label: '8MP Ultra HD', tag: '4K ColorVu' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setResolution(r.id as any)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      resolution === r.id
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-950 dark:text-blue-200 font-bold shadow-sm ring-2 ring-blue-600/20'
                        : 'bg-slate-50 dark:bg-[#1a1b20] border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{r.label}</div>
                    <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold mt-1">{r.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Days */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-800 dark:text-neutral-200">Días de Grabación de Historial Requeridos:</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{storageDays} días</span>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                step="7"
                value={storageDays}
                onChange={(e) => setStorageDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
                <span>7 días</span>
                <span>30 días (1 mes)</span>
                <span>60 días</span>
                <span>90 días (3 meses)</span>
              </div>
            </div>

            {/* Compression & Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Compresión de Video</label>
                <select
                  value={compression}
                  onChange={(e) => setCompression(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 text-xs focus:outline-none focus:border-blue-600"
                >
                  <option value="h265">H.265+ (Ahorro del 50-70%)</option>
                  <option value="h264">H.264 Estándar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Modo de Grabación</label>
                <select
                  value={recordingMode}
                  onChange={(e) => setRecordingMode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 text-xs focus:outline-none focus:border-blue-600"
                >
                  <option value="motion">Inteligente por Movimiento / IA</option>
                  <option value="continuous">Grabación Continua 24/7</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Live Results Output (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-9 rounded-3xl bg-[#090a0d] text-white border border-neutral-800 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Resultados de Cálculo en Tiempo Real</span>
              </div>

              <div className="space-y-4">
                {/* Storage Result */}
                <div className="p-5 rounded-2xl bg-[#14151b] border border-neutral-800/90 space-y-1 shadow-inner">
                  <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-blue-400" />
                    <span>Capacidad de Almacenamiento:</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono tracking-tight">
                    {totalTbNeeded} <span className="text-sm font-sans font-semibold text-neutral-300">TB Requeridos</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Para retener {storageDays} días de historial ({resolution.toUpperCase()})
                  </div>
                </div>

                {/* Network Bandwidth */}
                <div className="p-5 rounded-2xl bg-[#14151b] border border-neutral-800/90 space-y-1 shadow-inner">
                  <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Ancho de Banda Total en Red Local:</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    ~{totalBitrateMbps} <span className="text-sm font-sans font-semibold text-neutral-300">Mbps</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Tráfico constante hacia el switch PoE y NVR
                  </div>
                </div>

                {/* Hard Drive Recommendation */}
                <div className="p-5 rounded-2xl bg-[#14151b] border border-neutral-800/90 space-y-1.5 shadow-inner">
                  <div className="text-xs text-neutral-400">Configuración de Discos Recomendada:</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{recommendedDisks}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Grado vigilancia 24/7 con garantía de fábrica SYSCOM.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-6 border-t border-neutral-800/80 mt-6 space-y-2.5">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `*CÁLCULO DE SISTEMA CCTV Y ALMACENAMIENTO*\n\n` +
                  `📹 *Cámaras:* ${cctvCameras} cámaras\n` +
                  `🔍 *Resolución:* ${resolution.toUpperCase()}\n` +
                  `💾 *Almacenamiento Calculado:* ${totalTbNeeded} TB (${storageDays} días de historial)\n` +
                  `⚡ *Ancho de Banda:* ~${totalBitrateMbps} Mbps\n` +
                  `💽 *Discos Recomendados:* ${recommendedDisks}\n\n` +
                  `Hola Licenciado Felipe Romo, solicito cotización formal para este paquete de CCTV.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar Cálculo por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenQuote('cctv-videovigilancia')}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Cotizar en Línea con Instalación</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
        </FadeInUp>

      </div>
    </section>
  );
};
