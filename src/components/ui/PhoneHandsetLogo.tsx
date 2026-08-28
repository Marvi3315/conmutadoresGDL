import React from 'react';

interface PhoneHandsetLogoProps {
  className?: string;
}

export const PhoneHandsetLogo: React.FC<PhoneHandsetLogoProps> = ({ 
  className = 'w-10 h-10'
}) => {
  return (
    <svg 
      viewBox="0 0 320 320" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Black authentic background if rendered standalone */}
      <rect width="320" height="320" rx="40" fill="#000000" />

      {/* Handset Body & Discs Group */}
      <g>
        {/* Telephone Handset Main White Body with crisp outline */}
        <path
          d="M 125,230 C 95,190 75,130 110,65 C 122,42 140,55 130,78 C 105,125 100,168 138,212 C 145,220 138,235 125,230 Z"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Upper Earpiece White Head */}
        <ellipse 
          cx="150" 
          cy="68" 
          rx="32" 
          ry="46" 
          transform="rotate(28 150 68)" 
          fill="#FFFFFF" 
          stroke="#111827" 
          strokeWidth="2.5"
        />

        {/* Upper Earpiece Inner Silver/Gray Disc */}
        <ellipse 
          cx="151" 
          cy="68" 
          rx="22" 
          ry="36" 
          transform="rotate(28 151 68)" 
          fill="#C8CDD5" 
          stroke="#9CA3AF" 
          strokeWidth="1.2"
        />

        {/* Upper Earpiece Sound Holes (2x2 grid) */}
        <circle cx="149" cy="60" r="2.2" fill="#4B5563" />
        <circle cx="157" cy="64" r="2.2" fill="#4B5563" />
        <circle cx="145" cy="72" r="2.2" fill="#4B5563" />
        <circle cx="153" cy="76" r="2.2" fill="#4B5563" />

        {/* Lower Mouthpiece White Head */}
        <ellipse 
          cx="88" 
          cy="208" 
          rx="34" 
          ry="48" 
          transform="rotate(-20 88 208)" 
          fill="#FFFFFF" 
          stroke="#111827" 
          strokeWidth="2.5"
        />

        {/* Lower Mouthpiece Inner Silver/Gray Disc */}
        <ellipse 
          cx="89" 
          cy="209" 
          rx="24" 
          ry="38" 
          transform="rotate(-20 89 209)" 
          fill="#C8CDD5" 
          stroke="#9CA3AF" 
          strokeWidth="1.2"
        />

        {/* Lower Mouthpiece Sound Holes (2x2 grid) */}
        <circle cx="85" cy="220" r="2.2" fill="#4B5563" />
        <circle cx="93" cy="223" r="2.2" fill="#4B5563" />
        <circle cx="83" cy="230" r="2.2" fill="#4B5563" />
        <circle cx="91" cy="233" r="2.2" fill="#4B5563" />

        {/* Cursive Cord Spelling "Romo" in Authentic Pure White */}
        <path
          d="M 80,248 
             C 86,260 98,258 98,245 
             C 98,232 84,232 82,248 
             C 80,265 102,266 112,254
             C 125,238 132,198 145,212
             C 152,220 138,245 125,258
             C 118,265 128,272 138,266
             C 152,256 160,225 174,228
             C 184,230 178,252 165,262
             C 156,268 168,272 178,265
             C 192,255 198,238 208,242
             C 214,245 208,265 198,266
             C 188,268 198,274 212,268
             C 224,262 232,242 245,246
             C 252,249 245,268 232,268
             C 220,268 238,274 256,270
             C 268,267 278,256 270,248"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
