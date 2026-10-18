import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  MessageSquare, 
  Tag, 
  Lock,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { FadeInUp } from '../ui/FadeInUp';
import { ProductCard } from './ProductCard';

const PAGE_SIZE = 12;

export const ProductsPage: React.FC = () => {
  const { items, setIsAdminOpen } = useCatalog();
  // Filtros iniciales desde la URL: /productos?marca=Panduit&linea=cctv&q=cat6
  const params = new URLSearchParams(window.location.search);
  const [selectedBrand, setSelectedBrand] = useState<string>(params.get('marca') || 'todos');
  const [selectedCategory, setSelectedCategory] = useState<string>(params.get('linea') || 'todos');
  const [searchQuery, setSearchQuery] = useState<string>(params.get('q') || '');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    document.title = 'Catálogo de Productos | Conmutadores GDL';
    return () => { document.title = 'Conmutadores GDL | Telecomunicaciones y seguridad en Guadalajara'; };
  }, []);

  // Al cambiar filtros o búsqueda, volvemos a la primera "página".
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [selectedBrand, selectedCategory, searchQuery]);

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

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  return (
    <section id="catalogo" className="pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50/80 dark:bg-[#0d0e11] text-slate-800 dark:text-neutral-200 border-t border-slate-200 dark:border-neutral-800/80 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al inicio
        </a>

        {/* Header Title */}
        <FadeInUp delay={0} distance={20} className="max-w-3xl space-y-3 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Catálogo de productos
          </h1>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Cableado estructurado, conmutadores, teléfonos, cámaras y redes de Panduit, Panasonic, Grandstream, Hikvision y más, con stock en Guadalajara y entregas a toda la República Mexicana.
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
                title="Acceso solo para personal autorizado"
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <p className="text-xs text-slate-500 dark:text-neutral-500 mb-3">
                  Mostrando {visibleItems.length} de {filteredItems.length} productos
                </p>
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="px-6 py-3 rounded-md border border-slate-900 dark:border-neutral-300 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Mostrar más productos
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
