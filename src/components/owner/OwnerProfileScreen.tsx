import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Mail,
  Shield,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
  RefreshCw,
  ChevronRight,
  Car,
  Wrench
} from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader } from '../common/Buttons';
import { UserRole } from '../../types';

interface OwnerProfileScreenProps {
  userName: string;
  onSwitchRole: (newRole: UserRole) => void;
  onLogout: () => void;
}

export const OwnerProfileScreen: React.FC<OwnerProfileScreenProps> = ({
  userName,
  onSwitchRole,
  onLogout,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="relative w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Screen Header */}
      <ScreenHeader title="Mi Perfil" />

      <div className="p-5 space-y-4">
        {/* User Card */}
        <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1B3A8C] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            CM
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#1A1A1A] truncate">{userName}</h2>
            <p className="text-xs text-[#8A8F98] truncate">carlos.mendoza@email.com</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1B3A8C]">
              Dueño de vehículo
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1B3A8C] mx-auto flex items-center justify-center mb-1">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-gray-900 block">3</span>
            <span className="text-[11px] text-gray-500">Vehículos en garage</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#2E9E5B] mx-auto flex items-center justify-center mb-1">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-gray-900 block">6</span>
            <span className="text-[11px] text-gray-500">Servicios realizados</span>
          </div>
        </div>

        {/* Switch to Shop Mode for Instant Demoing */}
        <motion.div
          whileTap={{ scale: 0.99 }}
          onClick={() => onSwitchRole('shop')}
          className="p-4 bg-linear-to-r from-[#1B3A8C] to-[#2748A8] text-white rounded-2xl shadow-md cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Cambiar a Vista Taller</h3>
              <p className="text-[11px] text-blue-100">Explorar panel de mecánico / agenda</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </motion.div>

        {/* Settings Menu List */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-gray-100 overflow-hidden text-xs">
          {/* Notifications toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-800">
              <Bell className="w-4 h-4 text-[#1B3A8C]" />
              <span className="font-semibold">Recordatorios y alertas</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1B3A8C]"></div>
            </label>
          </div>

          {/* Security */}
          <button
            type="button"
            onClick={() => alert('Seguridad RODA: Tus datos están cifrados.')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-gray-800"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Seguridad y privacidad</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {/* Help */}
          <button
            type="button"
            onClick={() => alert('Centro de Ayuda RODA: soporte@roda.com')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-gray-800"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Centro de ayuda</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {/* Terms */}
          <button
            type="button"
            onClick={() => alert('Términos y condiciones oficiales RODA v2.4')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-gray-800"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Términos y condiciones</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
