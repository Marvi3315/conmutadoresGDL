import React, { useEffect, useState } from 'react';

/**
 * TopProgressBar component:
 * 1. Tracks document scroll progress (smooth micro-bar indicator).
 * 2. Simulates an ultra-fast YouTube/GitHub-style top progress bar whenever
 *    the user clicks navigation links, hash anchors, or triggers modals/tabs.
 */
export const TopProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  // 1. Scroll-based reading indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const percent = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Intercept anchor clicks and hash changes to trigger top loader animation
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    const triggerNavigationProgress = () => {
      setIsNavigating(true);
      setNavProgress(25);

      timer1 = setTimeout(() => {
        setNavProgress(70);
      }, 80);

      timer2 = setTimeout(() => {
        setNavProgress(100);
      }, 240);

      timer3 = setTimeout(() => {
        setIsNavigating(false);
        setNavProgress(0);
      }, 450);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.getAttribute('href')?.startsWith('#')) {
        triggerNavigationProgress();
      }
    };

    const handleHashChange = () => {
      triggerNavigationProgress();
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none h-[3px]">
      {/* Background track */}
      <div className="w-full h-full bg-transparent">
        {/* Navigation Fast Pulsing Indicator */}
        {isNavigating && (
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-200 ease-out"
            style={{ width: `${navProgress}%` }}
          />
        )}

        {/* Continuous Subtle Scroll Progress Bar */}
        {!isNavigating && (
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(37,99,235,0.6)]"
            style={{ width: `${scrollProgress}%` }}
          />
        )}
      </div>
    </div>
  );
};
