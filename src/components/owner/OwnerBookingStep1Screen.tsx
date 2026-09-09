import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Car } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader, PrimaryButton } from '../common/Buttons';
import { MaintenanceServiceItem, Vehicle } from '../../types';

interface OwnerBookingStep1ScreenProps {
  services: MaintenanceServiceItem[];
  vehicles: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (v: Vehicle) => void;
  selectedService: MaintenanceServiceItem;
  onSelectService: (s: MaintenanceServiceItem) => void;
  onBack: () => void;
  onNext: () => void;
}

export const OwnerBookingStep1Screen: React.FC<OwnerBookingStep1ScreenProps> = ({
  services,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  selectedService,
  onSelectService,
  onBack,
  onNext,
}) => {
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between overflow-y-auto">
      {/* Top Status Bar */}
      <StatusBar />

      {/* Header */}
      <ScreenHeader
        title="Agendar mantenimiento"
        onBack={onBack}
      />

      <div className="px-5 pt-3 pb-6 flex-1 flex flex-col">
        {/* Horizontal 3-Step Indicator */}
        <div className="py-2 mb-4">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {/* Step 1: Active */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#1B3A8C] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                1
              </div>
              <span className="text-[11px] font-bold text-[#1B3A8C] mt-1">Servicio</span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-4" />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">
                2
              </div>
              <span className="text-[11px] font-medium text-gray-400 mt-1">Fecha</span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-4" />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">
                3
              </div>
              <span className="text-[11px] font-medium text-gray-400 mt-1">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-sm font-bold text-[#1A1A1A] mb-3">
          Selecciona el servicio
        </h2>

        {/* Radio Cards List */}
        <div className="space-y-2.5 flex-1">
          {services.map((service) => {
            const isSelected = service.id === selectedService.id;

            return (
              <motion.div
                key={service.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectService(service)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between shadow-xs ${
                  isSelected
                    ? 'border-[#1B3A8C] bg-[#1B3A8C]/5'
                    : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Custom Radio Icon */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#1B3A8C] bg-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1B3A8C]" />
                    )}
                  </div>

                  {/* Service Info */}
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#1A1A1A] truncate">
                      {service.name}
                    </h3>
                    <p className="text-[11px] text-[#8A8F98] mt-0.5">
                      {service.duration} • {service.estimatedPrice}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Primary Button */}
      <div className="px-5 pb-6 pt-3 bg-white border-t border-gray-100 sticky bottom-0 z-20">
        <PrimaryButton onClick={onNext}>
          Continuar
        </PrimaryButton>
      </div>
    </div>
  );
};
