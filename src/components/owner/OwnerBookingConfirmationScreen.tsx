import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, MapPin, Wrench, CalendarPlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StatusBar } from '../common/StatusBar';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';
import { Vehicle, MaintenanceServiceItem, Workshop } from '../../types';

interface OwnerBookingConfirmationScreenProps {
  vehicle: Vehicle;
  service: MaintenanceServiceItem;
  workshop: Workshop;
  bookingDate: string;
  bookingTime: string;
  onGoHome: () => void;
  onViewCalendar: () => void;
}

export const OwnerBookingConfirmationScreen: React.FC<OwnerBookingConfirmationScreenProps> = ({
  vehicle,
  service,
  workshop,
  bookingDate,
  bookingTime,
  onGoHome,
  onViewCalendar,
}) => {
  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#1B3A8C', '#F5821F', '#2E9E5B', '#2748A8'],
      });
    } catch {
      // safe fallback if canvas is restricted
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between overflow-y-auto">
      {/* Top Status Bar */}
      <StatusBar />

      <div className="px-6 pt-6 pb-6 flex-1 flex flex-col items-center justify-center text-center">
        {/* Big Blue Circle Check Icon with animated spring effect */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative w-20 h-20 rounded-full bg-[#1B3A8C] text-white flex items-center justify-center shadow-lg shadow-[#1B3A8C]/25 mb-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Check className="w-10 h-10 stroke-[3]" />
          </motion.div>
        </motion.div>

        {/* Title and Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-[23px] font-bold text-[#1B3A8C] tracking-tight">
            ¡Cita agendada!
          </h2>
          <p className="text-[13px] text-[#8A8F98] mt-1.5 max-w-xs leading-relaxed">
            Tu mantenimiento ha sido agendado correctamente.
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full mt-6 p-4 bg-[#F5F6FA] rounded-2xl border border-[#E5E7EB] text-left space-y-3.5 shadow-xs"
        >
          {/* Vehicle Row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-9 rounded-lg bg-white overflow-hidden border border-gray-200 shrink-0">
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1A]">
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </h4>
              <span className="text-[11px] text-gray-500 font-medium">
                {vehicle.plate}
              </span>
            </div>
          </div>

          <div className="h-px bg-gray-200/70" />

          {/* Service Row */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-full bg-white text-[#1B3A8C] border border-gray-200 flex items-center justify-center shrink-0">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">{service.name}</span>
              <span className="text-[11px] text-gray-500">Duración estimada: {service.duration}</span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-full bg-white text-[#F5821F] border border-gray-200 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">
                {bookingDate} • {bookingTime}
              </span>
              <span className="text-[11px] text-gray-500">Recordatorio activo</span>
            </div>
          </div>

          {/* Workshop Row */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-full bg-white text-emerald-600 border border-gray-200 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">{workshop.name}</span>
              <span className="text-[11px] text-gray-500">{workshop.address}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6 pb-8 pt-2 space-y-2.5 z-10 bg-white">
        <SecondaryButton onClick={onViewCalendar} icon={<CalendarPlus className="w-4 h-4" />}>
          Ver en calendario
        </SecondaryButton>

        <PrimaryButton onClick={onGoHome}>
          Volver al inicio
        </PrimaryButton>
      </div>
    </div>
  );
};
