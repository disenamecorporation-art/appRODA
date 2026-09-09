import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../common/BrandLogo';
import { DiagonalStripes } from '../common/DiagonalStripes';
import { StatusBar } from '../common/StatusBar';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full min-h-[640px] bg-white flex flex-col justify-between overflow-hidden cursor-pointer" onClick={onComplete}>
      {/* Decorative corner stripes */}
      <DiagonalStripes position="both" />

      {/* Status Bar */}
      <StatusBar />

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 z-10 -mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <BrandLogo size="xl" showSlogan={true} />
        </motion.div>
      </div>

      {/* Bottom dual-color brand bar matching Screen 1 in screenshot */}
      <div className="w-full pb-10 z-10 flex justify-center">
        <div className="w-20 h-1.5 rounded-full overflow-hidden flex shadow-xs">
          <div className="w-1/2 h-full bg-[#1B3A8C]" />
          <div className="w-1/2 h-full bg-[#F5821F]" />
        </div>
      </div>
    </div>
  );
};
