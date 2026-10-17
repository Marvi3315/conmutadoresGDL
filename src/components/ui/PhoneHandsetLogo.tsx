import React from 'react';

interface PhoneHandsetLogoProps {
  className?: string;
}

/** Logo oficial de Conmutadores GDL (archivo /logo-conmutadores.png). */
export const PhoneHandsetLogo: React.FC<PhoneHandsetLogoProps> = ({
  className = 'w-10 h-10'
}) => (
  <img
    src="/logo-conmutadores.png"
    alt="Conmutadores GDL"
    className={`${className} object-cover bg-black`}
    draggable={false}
  />
);
