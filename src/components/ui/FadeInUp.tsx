import React, { useEffect, useRef, useState } from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number; // delay in ms
  className?: string;
  distance?: number; // distance in px to translate (default 28)
  threshold?: number;
  once?: boolean;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0,
  className = '',
  distance = 28,
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if reduced motion is preferred
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}px, 0)`,
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};
