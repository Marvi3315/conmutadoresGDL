import React, { useState } from 'react';

interface BrandLogoProps {
  /** Nombre de la marca, p. ej. "Panduit" o "PANDUIT" */
  brand: string;
  className?: string;
  /** Clases del texto de respaldo (cuando aún no existe el archivo del logo) */
  textClassName?: string;
}

export const brandSlug = (brand: string) =>
  brand
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '');

/**
 * Muestra el logo de la marca desde /public/logos/<marca>.svg (o .png).
 * Si el archivo no existe todavía, muestra el nombre de la marca en MAYÚSCULAS.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = 'h-10 w-auto max-w-full', textClassName = 'text-lg font-black tracking-wider' }) => {
  const slug = brandSlug(brand);
  const [attempt, setAttempt] = useState(0); // 0 = svg, 1 = png, 2 = texto
  const exts = ['svg', 'png'];

  if (!slug || attempt >= exts.length) {
    return <span className={`${textClassName} uppercase text-slate-700 dark:text-neutral-100`}>{brand}</span>;
  }

  return (
    <img
      src={`/logos/${slug}.${exts[attempt]}`}
      alt={`Logo ${brand.toUpperCase()}`}
      className={`${className} object-contain`}
      loading="lazy"
      onError={() => setAttempt(a => a + 1)}
    />
  );
};
