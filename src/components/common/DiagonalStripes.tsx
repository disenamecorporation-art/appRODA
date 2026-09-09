import React from 'react';

interface DiagonalStripesProps {
  position?: 'top-left' | 'bottom-right' | 'both';
  className?: string;
}

export const DiagonalStripes: React.FC<DiagonalStripesProps> = ({
  position = 'both',
  className = '',
}) => {
  const showTopLeft = position === 'top-left' || position === 'both';
  const showBottomRight = position === 'bottom-right' || position === 'both';

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Top Left Stripes */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-36 h-36 z-0 pointer-events-none">
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            {/* Orange diagonal stripe (outer) */}
            <polygon
              points="0,15 15,0 42,0 0,42"
              fill="#F5821F"
            />
            {/* Navy Blue diagonal stripe (inner) */}
            <polygon
              points="0,62 62,0 92,0 0,92"
              fill="#1B3A8C"
            />
          </svg>
        </div>
      )}

      {/* Bottom Right Stripes */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-36 h-36 z-0 pointer-events-none">
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
            {/* Orange diagonal stripe (upper) */}
            <polygon
              points="68,160 160,68 160,98 98,160"
              fill="#F5821F"
            />
            {/* Navy Blue diagonal stripe (lower) */}
            <polygon
              points="118,160 160,118 160,145 145,160"
              fill="#1B3A8C"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
