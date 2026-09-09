import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
  horizontal?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
  horizontal = true,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const heightClasses = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {!imgFailed ? (
        <img
          src="https://i.postimg.cc/85qBZzyK/LOGO-WEB-RODA.png"
          alt="RODA"
          onError={() => setImgFailed(true)}
          className={`${heightClasses[size]} w-auto object-contain transition-transform`}
        />
      ) : (
        <div className={`flex items-center gap-2.5 ${horizontal ? 'flex-row' : 'flex-col'}`}>
          {/* Geometric Dual-Arrow Chevron Icon: one in #1B3A8C (dark navy) and one in #F5821F (orange) */}
          <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              {/* First diagonal bar in Navy Blue #1B3A8C */}
              <path
                d="M15 80 L55 20 L72 20 L32 80 Z"
                fill="#1B3A8C"
              />
              {/* Second diagonal chevron in Orange #F5821F */}
              <path
                d="M42 80 L82 20 L96 20 L56 80 Z"
                fill="#F5821F"
              />
            </svg>
          </div>
          {/* Bold geometric text */}
          <span
            className={`${textSizes[size]} font-extrabold tracking-tight text-[#1B3A8C]`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            RODA
          </span>
        </div>
      )}

      {showSlogan && (
        <p className="mt-2 text-[13px] text-[#8A8F98] text-center font-normal max-w-xs">
          Tu vehículo, siempre en las mejores manos
        </p>
      )}
    </div>
  );
};
