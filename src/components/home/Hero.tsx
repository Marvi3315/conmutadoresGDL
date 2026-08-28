import React from 'react';
import { motion } from 'motion/react';
import heroBgImage from '../../assets/images/hero_telecom_gdl_1787438631332.jpg';

interface HeroProps {
  onOpenCalculator?: (defaultService?: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative w-full pt-10 sm:pt-12 md:pt-14 bg-[#0c0d0f] overflow-hidden">
      {/* Responsive container adapting smoothly across mobile, tablet, and desktop */}
      <div className="relative w-full overflow-hidden bg-[#0c0d0f] flex items-center justify-center">
        <div className="relative w-full max-w-[1920px] mx-auto min-h-[260px] xs:min-h-[320px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[620px] xl:min-h-[680px] max-h-[85vh] flex items-center justify-center overflow-hidden">
          
          {/* Animated Hero Image with Smooth Ken-Burns Loop & Entry Transition */}
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: 1
            }}
            transition={{
              opacity: { duration: 1, ease: 'easeOut' },
              scale: {
                duration: 18,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
            className="w-full h-full flex items-center justify-center will-change-transform"
          >
            <img
              src={heroBgImage}
              alt="Conmutadores GDL - Telecomunicaciones, Torres y Seguridad en Guadalajara y México"
              className="w-full h-full object-cover object-center sm:object-[60%_center] md:object-center select-none pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </motion.div>

          {/* Dynamic Light Sheen & Network Pulse Highlight */}
          <motion.div 
            animate={{ 
              opacity: [0.15, 0.35, 0.15],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="absolute inset-0 bg-radial from-blue-500/10 via-cyan-500/5 to-transparent pointer-events-none"
          />

          {/* Smooth dark gradient overlays matching the deep neutral palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0f]/50 via-transparent to-[#0c0d0f]/50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

