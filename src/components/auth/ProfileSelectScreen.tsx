import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Car, Store, UserCheck } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { DiagonalStripes } from '../common/DiagonalStripes';
import { UserRole } from '../../types';
import { PrimaryButton } from '../common/Buttons';

interface ProfileSelectScreenProps {
  onBack: () => void;
  onSelectRole: (role: UserRole, details?: { name: string; email: string }) => void;
}

export const ProfileSelectScreen: React.FC<ProfileSelectScreenProps> = ({
  onBack,
  onSelectRole,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<UserRole | null>(null);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (selectedProfile) {
      onSelectRole(selectedProfile, {
        name: name.trim() || (selectedProfile === 'owner' ? 'Carlos Mendoza' : 'Taller AutoSoluciones'),
        email: email.trim() || (selectedProfile === 'owner' ? 'carlos@email.com' : 'contacto@autosoluciones.com'),
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] bg-white flex flex-col justify-between overflow-y-auto">
      {/* Decorative corner stripes */}
      <DiagonalStripes position="bottom-right" />

      {/* Status Bar */}
      <StatusBar />

      {/* Header with back button */}
      <div className="px-5 py-2 flex items-center z-10">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
        </button>
      </div>

      <div className="px-6 pt-2 pb-6 z-10 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight">
            Crear cuenta
          </h2>
          <p className="text-[14px] text-[#8A8F98] mt-1 font-normal">
            Selecciona tu perfil
          </p>
        </div>

        {/* Profile Options */}
        <div className="space-y-3.5">
          {/* Dueño de vehículo card */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('owner', { name: 'Carlos Mendoza', email: 'carlos@email.com' })}
            className="p-4 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1B3A8C] cursor-pointer transition-all flex items-center justify-between gap-3.5 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center shrink-0">
                <Car className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[15px] text-[#1A1A1A]">
                  Dueño de vehículo
                </h3>
                <p className="text-xs text-[#8A8F98] mt-0.5 leading-snug">
                  Gestiona tus vehículos y agenda mantenimientos
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </motion.div>

          {/* Taller card */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('shop', { name: 'Taller AutoSoluciones', email: 'contacto@autosoluciones.com' })}
            className="p-4 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1B3A8C] cursor-pointer transition-all flex items-center justify-between gap-3.5 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[15px] text-[#1A1A1A]">
                  Taller
                </h3>
                <p className="text-xs text-[#8A8F98] mt-0.5 leading-snug">
                  Registra tu taller y ofrece tus servicios
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* Spacer matching layout */}
      <div className="pb-8" />
    </div>
  );
};
