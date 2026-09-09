import React from 'react';
import { motion } from 'motion/react';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Droplet,
  Disc,
  Wrench,
  Activity,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { CircularBackButton, CTAButton } from '../common/Buttons';
import { Workshop } from '../../types';

interface OwnerShopProfileScreenProps {
  shop: Workshop;
  onBack: () => void;
  onBookAppointment: () => void;
}

export const OwnerShopProfileScreen: React.FC<OwnerShopProfileScreenProps> = ({
  shop,
  onBack,
  onBookAppointment,
}) => {
  const serviceCards = [
    { id: '1', title: 'Cambio de aceite', icon: Droplet },
    { id: '2', title: 'Frenos', icon: Disc },
    { id: '3', title: 'Suspensión', icon: Wrench },
    { id: '4', title: 'Diagnóstico', icon: Activity },
  ];

  return (
    <div className="relative w-full h-full bg-white flex flex-col overflow-y-auto pb-6">
      {/* Cover Image Header */}
      <div className="relative w-full h-56 shrink-0 bg-slate-800">
        <img
          src={shop.coverImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/40" />

        {/* Floating Back Button & Share */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <CircularBackButton onClick={onBack} floating={true} />
          <button
            type="button"
            onClick={() => alert('Enlace del taller copiado al portapapeles')}
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 shadow-md flex items-center justify-center hover:bg-white"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Workshop Details Content */}
      <div className="px-5 pt-4 pb-2 space-y-4">
        {/* Title and Rating */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">
              {shop.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-xs">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-500 mr-1" />
              <span>{shop.rating}</span>
              <span className="text-gray-400 font-normal ml-1">
                ({shop.reviewCount})
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-medium">{shop.distance}</span>
          </div>

          {/* Address */}
          <div className="flex items-start gap-1.5 mt-2 text-xs text-[#8A8F98]">
            <MapPin className="w-3.5 h-3.5 text-[#1B3A8C] shrink-0 mt-0.5" />
            <span>{shop.address}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8A8F98]">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{shop.openHours}</span>
          </div>
        </div>

        {/* Specialty Tags */}
        <div className="flex flex-wrap gap-2 pt-0.5">
          {shop.specialties.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF1FC] text-[#1B3A8C]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Section: Servicios */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-3">
            Servicios
          </h2>

          <div className="grid grid-cols-4 gap-2">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBookAppointment}
                  className="p-2.5 bg-[#F5F6FA] rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-300 hover:bg-white transition-all shadow-xs"
                >
                  <div className="w-11 h-11 rounded-full bg-white text-[#1B3A8C] flex items-center justify-center shadow-xs mb-1.5">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1A1A1A] leading-tight">
                    {service.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button: Agendar cita (Orange #F5821F) */}
        <div className="pt-4">
          <CTAButton onClick={onBookAppointment}>
            Agendar cita
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
