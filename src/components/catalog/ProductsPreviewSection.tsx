import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { FadeInUp } from '../ui/FadeInUp';
import { ProductCard } from './ProductCard';

const PREVIEW_COUNT = 4;

const LINES = [
  { id: 'conmutadores', label: 'Conmutadores IP & PBX' },
  { id: 'panasonic-telefonia', label: 'Panasonic' },
  { id: 'telefonos-ip', label: 'Teléfonos IP' },
  { id: 'cctv', label: 'CCTV & Cámaras' },
  { id: 'redes', label: 'Redes & WiFi' },
  { id: 'panduit-material', label: 'Cableado Panduit' },
  { id: 'control-acceso', label: 'Control de Acceso' },
];

/**
 * Vista corta del catálogo para la página principal: unos cuantos productos
 * de marcas distintas y un acceso a la página completa /productos. Así el
 * inicio no crece aunque el catálogo tenga cientos de productos.
 */
export const ProductsPreviewSection: React.FC = () => {
  const { items } = useCatalog();

  const featured = useMemo(() => {
    // Prioriza lo que está en existencia y varía las marcas.
    const sorted = [...items].sort((a, b) => Number(b.inStock) - Number(a.inStock));
    const picked: typeof items = [];
    const usedBrands = new Set<string>();
    for (const it of sorted) {
      if (picked.length >= PREVIEW_COUNT) break;
      if (!usedBrands.has(it.brand)) {
        usedBrands.add(it.brand);
        picked.push(it);
      }
    }
    for (const it of sorted) {
      if (picked.length >= PREVIEW_COUNT) break;
      if (!picked.includes(it)) picked.push(it);
    }
    return picked;
  }, [items]);

  return (
    <section
      id="productos"
      className="py-16 sm:py-24 bg-slate-50/80 dark:bg-[#0d0e11] text-slate-800 dark:text-neutral-200 border-t border-slate-200 dark:border-neutral-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp delay={0} distance={20} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Conoce nuestros productos
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Conmutadores, teléfonos, cámaras, cableado y redes de las mejores marcas, con existencias en Guadalajara y envíos a toda la República.
            </p>
          </div>
          <a
            href="/productos"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-bold hover:bg-slate-700 dark:hover:bg-neutral-200 transition-colors"
          >
            Ver catálogo completo{items.length ? ` (${items.length})` : ''}
            <ArrowRight className="w-4 h-4" />
          </a>
        </FadeInUp>

        {/* Accesos rápidos por línea */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LINES.map((l) => (
            <a
              key={l.id}
              href={`/productos?linea=${l.id}`}
              className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-neutral-700 text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:border-slate-900 dark:hover:border-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((item, i) => (
            <FadeInUp key={item.id} delay={i * 80} distance={24} className="h-full">
              <ProductCard item={item} />
            </FadeInUp>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/productos"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-0.5 hover:opacity-70 transition-opacity"
          >
            Explorar todos los productos y filtrar por marca
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
