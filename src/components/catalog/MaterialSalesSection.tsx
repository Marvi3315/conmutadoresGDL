import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  MessageSquare, 
  Tag, 
  Lock,
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
import { BrandLogo } from '../ui/BrandLogo';

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
    { id: 'Dahua', label: 'Dahua (Seguridad)' },
    { id: 'ZKTeco', label: 'ZKTeco (Biometría)' },
  ];

  const categoryOptions = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'panduit-material', label: 'Cables & Conectividad Panduit' },
    { id: 'panasonic-telefonia', label: 'Conmutadores & Teléfonos Panasonic' },
    { id: 'conmutadores', label: 'Conmutadores IP & PBX' },
    { id: 'telefonos-ip', label: 'Teléfonos IP & Diademas' },
    { id: 'cctv', label: 'CCTV 4K & Cámaras' },
    { id: 'redes', label: 'Networking & Access Points' },
    { id: 'control-acceso', label: 'Control de Acceso' },
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
    const message =
      `*SOLICITUD DE COTIZACIÓN DE PRODUCTO*\n\n` +
      `📦 *Producto:* ${item.name}\n` +
      `🏷️ *Marca:* ${item.brand}\n` +
      `🔢 *Modelo / SKU:* ${item.model} (${item.sku || 'N/A'})\n` +
      `🔖 *Código SYSCOM:* ${item.syscomCode || 'N/A'}\n` +
      `🛡️ *Garantía:* ${item.warranty}\n\n` +
      `Hola Licenciado Felipe Romo, solicito precio unitario, existencias en Guadalajara y tiempo de entrega.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="productos" className="py-16 sm:py-24 bg-slate-50/80 dark:bg-[#0d0e11] text-slate-800 dark:text-neutral-200 border-t border-slate-200 dark:border-neutral-800/80 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <FadeInUp delay={0} distance={20} className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Venta de Productos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300">Panduit, Panasonic</span> y Marcas Líderes
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-base leading-relaxed">
            Suministro de cableado estructurado, jacks, patch cords, conmutadores analógicos/IP, teléfonos propietarios y consumibles con stock en Guadalajara y entregas a toda la República Mexicana.
          </p>
        </FadeInUp>

        {/* Filter & Search Tech Toolbar */}
        <div className="bg-white dark:bg-[#131418] rounded-md p-4 sm:p-5 border border-slate-200 dark:border-neutral-800 mb-8 space-y-3">
          
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
                {filteredItems.length} productos en catálogo
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
          <div className="flex items-center overflow-x-auto scrollbar-none border-t border-slate-100 dark:border-neutral-800/80 pt-3">
            <span className="text-xs font-bold text-slate-400 dark:text-neutral-500 mr-1 shrink-0 uppercase tracking-wider">Marca:</span>
            {brandOptions.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-1 py-1.5 mr-3 text-xs whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  selectedBrand === brand.id
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold'
                    : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {brand.label}
              </button>
            ))}
          </div>

          {/* Quick Category / Item Type Filter Pills */}
          <div className="flex items-center overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-400 dark:text-neutral-500 mr-1 shrink-0 uppercase tracking-wider">Línea:</span>
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-1 py-1.5 mr-3 text-xs whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold'
                    : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
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
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">No encontramos productos con ese criterio</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto">
              Como integradores autorizados SYSCOM contamos con más de 15,000 productos en catálogo. Envíanos tu lista o número de parte por WhatsApp para cotización inmediata.
            </p>
            <button
              onClick={() => { setSelectedBrand('todos'); setSelectedCategory('todos'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 rounded-md hover:border-slate-900 dark:hover:border-neutral-300 transition-colors"
              >
                {/* Placa de marca / foto */}
                <div className="relative h-36 border-b border-slate-200 dark:border-neutral-800 bg-white overflow-hidden">
                  {item.imageUrl && !item.imageUrl.includes('images.unsplash.com') ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6">
                      <BrandLogo brand={item.brand} className="max-h-16 w-auto max-w-full" textClassName="text-2xl font-black tracking-widest !text-slate-800 text-center" />
                    </div>
                  )}
                  <span className="absolute top-2 left-2.5 font-mono text-[10px] tabular-nums text-slate-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex items-baseline justify-between gap-2 text-[11px] text-slate-500 dark:text-neutral-400">
                    <span className="font-semibold uppercase tracking-wide text-slate-700 dark:text-neutral-200">{item.brand}</span>
                    {item.tag && <span className="truncate italic">{item.tag}</span>}
                  </div>

                  <h3 className="mt-1.5 font-bold text-slate-950 dark:text-white text-[15px] leading-snug break-words">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Ficha técnica */}
                  <dl className="mt-4 text-[11px] divide-y divide-slate-200 dark:divide-neutral-800 border-y border-slate-200 dark:border-neutral-800">
                    <div className="flex justify-between gap-3 py-1.5">
                      <dt className="text-slate-500 dark:text-neutral-500">Modelo</dt>
                      <dd className="font-mono text-slate-800 dark:text-neutral-200 text-right break-all">{item.model}</dd>
                    </div>
                    {item.sku && (
                      <div className="flex justify-between gap-3 py-1.5">
                        <dt className="text-slate-500 dark:text-neutral-500">SKU</dt>
                        <dd className="font-mono text-slate-800 dark:text-neutral-200 text-right break-all">{item.sku}</dd>
                      </div>
                    )}
                    {item.syscomCode && (
                      <div className="flex justify-between gap-3 py-1.5">
                        <dt className="text-slate-500 dark:text-neutral-500">SYSCOM</dt>
                        <dd className="font-mono text-slate-800 dark:text-neutral-200 text-right break-all">{item.syscomCode}</dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-3 py-1.5">
                      <dt className="text-slate-500 dark:text-neutral-500">Garantía</dt>
                      <dd className="text-slate-800 dark:text-neutral-200 text-right">
                        {item.warranty.replace('Directo con Conmutadores GDL', '').replace('SYSCOM / Conmutadores GDL', '').trim() || 'Directa'}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-3 space-y-1 text-[11px] text-slate-600 dark:text-neutral-300 leading-snug">
                    {item.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="flex gap-2">
                        <span aria-hidden className="text-slate-400 dark:text-neutral-600">–</span>
                        <span className="break-words">{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                    {item.inStock ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-neutral-400 min-w-0">
                        <span className="w-1.5 h-1.5 bg-emerald-500 shrink-0" />
                        <span className="truncate">{item.stockQuantity || 'Disponible'}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Bajo pedido</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(item)}
                  className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-colors cursor-pointer rounded-b-md"
                >
                  <span>Cotizar producto</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
