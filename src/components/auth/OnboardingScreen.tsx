import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatusBar } from '../common/StatusBar';
import { DiagonalStripes } from '../common/DiagonalStripes';
import { PrimaryButton } from '../common/Buttons';

interface OnboardingScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const SLIDES = [
  {
    id: 1,
    title: 'Mantenimiento\nsin complicaciones',
    description:
      'Gestiona el mantenimiento de tu vehículo, encuentra talleres confiables y recibe recordatorios.',
    image: '/white_suv.jpg',
  },
  {
    id: 2,
    title: 'Talleres mecánicos\nverificados',
    description:
      'Conecta con los mejores talleres de tu zona, revisa valoraciones reales y agenda citas al instante.',
    image: '/workshop_garage.jpg',
  },
  {
    id: 3,
    title: 'Control total\nde tu vehículo',
    description:
      'Historial de servicios digitales, alertas de próximo mantenimiento y seguimiento en tiempo real.',
    image: '/toyota_hilux.jpg',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart, onLogin }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onStart();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] bg-white flex flex-col justify-between overflow-hidden">
      {/* Decorative Stripes bottom right */}
      <DiagonalStripes position="bottom-right" />

      {/* Top Status Bar */}
      <StatusBar />

      {/* Slide Content */}
      <div className="flex-1 px-6 pt-4 pb-2 flex flex-col z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col"
          >
            {/* Title & Subtitle */}
            <div className="mt-2">
              <h2 className="text-[24px] font-bold text-[#1B3A8C] leading-[1.2] tracking-tight whitespace-pre-line">
                {SLIDES[currentSlide].title}
              </h2>
              <p className="text-[13px] text-[#8A8F98] mt-2.5 leading-relaxed max-w-[280px]">
                {SLIDES[currentSlide].description}
              </p>
            </div>

            {/* Vehicle / Showcase Image */}
            <div className="my-auto py-4 flex items-center justify-center">
              <div className="relative w-full max-w-[300px] flex items-center justify-center">
                <img
                  src={SLIDES[currentSlide].image}
                  alt="Vehículo RODA"
                  className="w-full h-auto max-h-[190px] object-contain mix-blend-multiply drop-shadow-md"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-6 bg-[#1B3A8C]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 pt-2 z-10 flex flex-col items-center gap-2.5">
        <PrimaryButton onClick={handleNext}>
          Comenzar
        </PrimaryButton>

        <button
          type="button"
          onClick={onLogin}
          className="text-xs font-bold text-[#1B3A8C] hover:text-[#2748A8] transition-colors py-1 cursor-pointer"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
