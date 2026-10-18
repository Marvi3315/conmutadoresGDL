import { useEffect, useState } from 'react';

// Router mínimo (sin dependencias): la página tiene solo dos "pantallas",
// "/" (inicio) y "/productos" (catálogo completo). Firebase Hosting ya
// redirige cualquier ruta a index.html, así que las URLs directas funcionan.

export interface RouteState {
  path: string;
  search: string;
  hash: string;
}

const NAV_EVENT = 'app:navigate';

const read = (): RouteState => ({
  path: window.location.pathname.replace(/\/+$/, '') || '/',
  search: window.location.search,
  hash: window.location.hash,
});

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function useRoute(): RouteState {
  const [route, setRoute] = useState<RouteState>(read);

  useEffect(() => {
    const update = () => setRoute(read());
    window.addEventListener('popstate', update);
    window.addEventListener(NAV_EVENT, update);

    // Convierte los <a href="/..."> internos en navegación sin recargar.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (a.target && a.target !== '_self') return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAV_EVENT, update);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return route;
}
