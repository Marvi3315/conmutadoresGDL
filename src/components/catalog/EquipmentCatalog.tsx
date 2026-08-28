import React, { useState } from 'react';
import { 
  Search, 
  Cpu, 
  Camera, 
  Network, 
  ShieldCheck, 
  BellRing, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  MessageSquare
} from 'lucide-react';
import { EQUIPMENT_CATALOG, COMPANY_INFO } from '../../data/telecomData';
import { EquipmentItem } from '../../types';

export const EquipmentCatalog: React.FC<{ onOpenQuote: (serviceId?: string) => void }> = ({ onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<EquipmentItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos los Equipos' },
    { id: 'conmutadores', label: 'Conmutadores IP / PBX' },
    { id: 'telefonos-ip', label: 'Teléfonos IP & Diademas' },
    { id: 'cctv', label: 'Cámaras CCTV & NVR 4K' },
    { id: 'redes', label: 'Switches & Access Points' },
    { id: 'control-acceso', label: 'Biometría & Acceso' },
    { id: 'alarmas', label: 'Sistemas de Alarma' },
  ];

  const filteredEquipment = EQUIPMENT_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRequestQuote = (item: EquipmentItem) => {
    const message = `*SOLICITUD DE EQUIPO - CONMUTADORES GDL*%0A%0A` +
      `📦 *Equipo:* ${item.name} (${item.model})%0A` +
      `🏷️ *Marca:* ${item.brand}%0A` +
      `📋 *Garantía:* ${item.warranty}%0A%0A` +
      `Hola, requiero precio y disponibilidad con instalación en Guadalajara.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="catalogo" className="py-20 bg-white relative overflow-hidden text-slate-800 border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Showroom & Venta de Equipamiento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Catálogo de Equipos y Marcas Líderes
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Equipos 100% nuevos y originales con garantía nacional de fábrica y soporte de configuración por nuestros ingenieros certificados en Guadalajara.
          </p>
        </div>

        {/* Search Bar & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por modelo o marca (ej. Grandstream, Hikvision)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-700 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-44 rounded-lg overflow-hidden mb-4 bg-slate-100 flex items-center justify-center border border-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-blue-700 text-white text-[10px] font-bold shadow-sm">
                    {item.brand}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-slate-700 text-[10px] font-bold shadow-xs">
                    {item.tag}
                  </div>
                  {item.inStock && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Stock Inmediato en GDL</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-700 transition-colors">
                  {item.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono mb-2">{item.model}</div>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs Chips */}
                <div className="space-y-1.5 mb-4">
                  {item.specs.slice(0, 3).map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRequestQuote(item)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Cotizar por WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenQuote(item.category === 'conmutadores' ? 'conmutadores-ip' : item.category === 'cctv' ? 'cctv-videovigilancia' : 'cableado-redes-fibra')}
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Configurar proyecto completo"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
