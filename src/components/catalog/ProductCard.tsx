import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/telecomData';
import { EquipmentItem } from '../../types';
import { BrandLogo } from '../ui/BrandLogo';

export const handleWhatsAppQuote = (item: EquipmentItem) => {
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

export const ProductCard: React.FC<{ item: EquipmentItem }> = ({ item }) => (
  <article
      className="group h-full flex flex-col bg-white dark:bg-[#131418] border border-slate-200 dark:border-neutral-800 rounded-md hover:border-slate-900 dark:hover:border-neutral-300 transition-colors"
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
    </div>

    <div className="flex-1 p-4 flex flex-col">
      <div className="flex items-baseline justify-between gap-2 text-[11px] text-slate-500 dark:text-neutral-400">
        <span className="font-semibold uppercase tracking-wide text-slate-700 dark:text-neutral-200">{item.brand}</span>

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
            <span className="truncate">En existencia</span>
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
);
