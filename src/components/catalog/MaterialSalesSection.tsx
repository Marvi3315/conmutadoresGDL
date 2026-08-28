import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  MessageSquare, 
  Tag, 
  Lock,
  Truck,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/telecomData';
import { EquipmentItem } from '../../types';
import { useCatalog } from '../../context/CatalogContext';
import { FadeInUp } from '../ui/FadeInUp';

interface MaterialSalesSectionProps {
  onOpenQuote: (serviceId?: string) => void;
}

export const MaterialSalesSection: React.FC<MaterialSalesSectionProps> = ({ onOpenQuote }) => {
  const { items, setIsAdminOpen } = useCatalog();
  const [selectedBrand, setSelectedBrand] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const brandOptions = [
    { id: 'todos', label: 'Todas las Marcas' },
    { id: 'Panduit', label: 'Panduit (Material & Redes)' },
    { id: 'Panasonic', label: 'Panasonic (Conmutadores & Teléfonos)' },
    { id: 'Grandstream', label: 'Grandstream (IP & PBX)' },
    { id: 'Hikvision', label: 'Hikvision (CCTV & IA)' },
    { id: 'Ubiquiti', label: 'Ubiquiti (Wi-Fi 6 & UniFi)' },
    { id: 'Dahua', label: 'Dahua (Seguridad)' },
    { id: 'ZKTeco', label: 'ZKTeco (Biometría)' },
  ];

  const categoryOptions = [
    { id: 'todos', label: 'Todos los Artículos' },
    { id: 'panduit-material', label: 'Cables & Conectividad Panduit' },
    { id: 'panasonic-telefonia', label: 'Conmutadores & Teléfonos Panasonic' },
    { id: 'conmutadores', label: 'Conmutadores IP & PBX' },
    { id: 'telefonos-ip', label: 'Teléfonos IP & Diademas' },
    { id: 'cctv', label: 'CCTV 4K & Cámaras' },
    { id: 'redes', label: 'Networking & Access Points' },
    { id: 'control-acceso', label: 'Control de Acceso' },
    { id: 'alarmas', label: 'Sistemas de Alarma' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesBrand = selectedBrand === 'todos' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.name.toLowerCase().includes(query) ||
        item.model.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        (item.sku && item.sku.toLowerCase().includes(query)) ||
        (item.syscomCode && item.syscomCode.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);
      return matchesBrand && matchesCat && matchesSearch;
    });
  }, [items, selectedBrand, selectedCategory, searchQuery]);

  const handleWhatsAppQuote = (item: EquipmentItem) => {
    const message = `*SOLICITUD DE COTIZACIÓN DE MATERIAL / ARTÍCULO*%0A%0A` +
      `📦 *Artículo:* ${item.name}%0A` +
      `🏷️ *Marca:* ${item.brand}%0A` +
      `🔢 *Modelo / SKU:* ${item.model} (${item.sku || 'N/A'})%0A` +
      `🔖 *Código SYSCOM:* ${item.syscomCode || 'N/A'}%0A` +
      `🛡️ *Garantía:* ${item.warranty}%0A%0A` +
      `Hola Licenciado Felipe Romo, solicito precio unitario, existencias en Guadalajara y tiempo de entrega.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="materiales" className="py-16 sm:py-24 bg-slate-50/80 dark:bg-[#0d0e11] text-slate-800 dark:text-neutral-200 border-t border-slate-200 dark:border-neutral-800/80 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <FadeInUp delay={0} distance={20} className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Venta de Material <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300">Panduit, Panasonic</span> y Marcas Líderes
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-base leading-relaxed">
            Suministro de cableado estructurado, jacks, patch cords, conmutadores analógicos/IP, teléfonos propietarios y consumibles con stock en Guadalajara y entregas a toda la República Mexicana.
          </p>
        </FadeInUp>

        {/* Filter & Search Tech Toolbar */}
        <div className="bg-white dark:bg-[#131418] rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-neutral-800 shadow-sm mb-10 space-y-4">
          
          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre, modelo, SKU o código SYSCOM (ej. Panduit Cat6, KX-TES824, KX-T7730, UCM6302)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-8 py-3 rounded-2xl bg-slate-50 dark:bg-[#1a1b20] border border-slate-200 dark:border-neutral-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-neutral-300 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 whitespace-nowrap bg-slate-100 dark:bg-neutral-800/80 px-3 py-2 rounded-xl">
                {filteredItems.length} artículos en catálogo
              </span>

              {/* Discreet Admin Button */}
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-neutral-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Gestión de catálogo exclusiva para el Licenciado Felipe Romo González"
              >
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Gestionar Catálogo</span>
              </button>
            </div>
          </div>

          {/* Quick Brand Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 dark:border-neutral-800/80 pt-3">
            <span className="text-xs font-bold text-slate-400 dark:text-neutral-500 mr-1 shrink-0 uppercase tracking-wider">Marca:</span>
            {brandOptions.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedBrand === brand.id
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                    : 'bg-slate-100 dark:bg-neutral-800/90 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                }`}
              >
                {brand.label}
              </button>
            ))}
          </div>

          {/* Quick Category / Item Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 dark:text-neutral-500 mr-1 shrink-0 uppercase tracking-wider">Línea:</span>
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 dark:bg-neutral-200 text-white dark:text-neutral-950 font-bold'
                    : 'bg-slate-50 dark:bg-neutral-800/50 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Bespoke Equipment / Material Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#131418] rounded-3xl p-12 text-center border border-slate-200 dark:border-neutral-800 space-y-4">
            <Package className="w-12 h-12 text-slate-400 dark:text-neutral-600 mx-auto" />
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">No encontramos artículos con ese criterio</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto">
              Como integradores autorizados SYSCOM contamos con más de 15,000 artículos en catálogo. Envíanos tu lista o número de parte por WhatsApp para cotización inmediata.
            </p>
            <button
              onClick={() => { setSelectedBrand('todos'); setSelectedCategory('todos'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
            >
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 p-5 flex flex-col justify-between group shadow-sm hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="overflow-hidden">
                  {/* Image Container with Badges */}
                  <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-[#1c1d23] flex items-center justify-center border border-slate-100 dark:border-neutral-800">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Brand Pill */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-xs text-white text-[9.5px] font-black tracking-wider uppercase shadow-md max-w-[50%] truncate">
                      {item.brand}
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[9px] font-bold backdrop-blur-xs shadow-md max-w-[45%] truncate text-right">
                      {item.tag}
                    </div>

                    {/* Stock Indicator */}
                    {item.inStock && (
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-950/85 backdrop-blur-xs border border-emerald-700/60 text-emerald-300 text-[9.5px] font-bold flex items-center gap-1.5 shadow-md max-w-[90%] truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                        <span className="truncate">{item.stockQuantity || 'Stock Disponible'}</span>
                      </div>
                    )}
                  </div>

                  {/* Codes (SKU & Syscom) */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {item.sku && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-mono text-[9.5px] font-semibold">
                        <Tag className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate max-w-[140px]">SKU: {item.sku}</span>
                      </span>
                    )}
                    {item.syscomCode && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono text-[9.5px] font-bold border border-blue-200 dark:border-blue-900">
                        <span className="truncate max-w-[140px]">SYSCOM: {item.syscomCode}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Model */}
                  <h3 className="font-extrabold text-slate-950 dark:text-white text-sm sm:text-[15px] leading-snug break-words mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono break-all mb-2">
                    Modelo: {item.model}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-neutral-400 mb-3.5 leading-relaxed break-words line-clamp-3">
                    {item.description}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-1.5 mb-4 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80">
                    {item.specs.slice(0, 3).map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-neutral-300 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="break-words">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppQuote(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>Cotizar Artículo</span>
                  </button>

                  <div className="px-2 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-[10px] font-mono font-medium text-slate-600 dark:text-neutral-400 text-center shrink-0 border border-slate-200 dark:border-neutral-700 max-w-[100px] truncate" title={item.warranty}>
                    {item.warranty.replace('Directo con Conmutadores GDL', '').replace('SYSCOM / Conmutadores GDL', '').trim()}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner for Custom Volume Requests */}
        <div className="mt-14 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Suministro a Contratistas, Instaladores & Empresas</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              ¿Requieres cotización por volumen de material Panduit, Panasonic o SYSCOM?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Envíanos tu catálogo de conceptos o lista de números de parte en Excel o PDF. Entregamos cotizaciones con precio preferencial en menos de 2 horas.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola,%20tengo%20una%20lista%20de%20materiales/artículos%20por%20volumen%20que%20deseo%20cotizar.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Enviar Lista por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
