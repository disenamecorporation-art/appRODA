import React from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Calendar,
  Droplet,
  Disc,
  RotateCw,
  BatteryCharging,
  Clock,
  ArrowRight
} from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { PrimaryButton } from '../common/Buttons';
import { ScreenId, WorkshopAppointment } from '../../types';

interface ShopHomeScreenProps {
  shopName: string;
  appointments: WorkshopAppointment[];
  onNavigate: (screen: ScreenId) => void;
  onOpenNotifications: () => void;
}

export const ShopHomeScreen: React.FC<ShopHomeScreenProps> = ({
  shopName,
  appointments,
  onNavigate,
  onOpenNotifications,
}) => {
  const scheduledCount = appointments.filter(
    (a) => a.status === 'Programado' || a.status === 'Confirmada'
  ).length;
  const inProgressCount = appointments.filter((a) => a.status === 'En proceso').length;

  const popularServices = [
    { name: 'Cambio de aceite y filtros', count: 12, icon: Droplet, color: 'text-[#F5821F] bg-[#FFF3E8]' },
    { name: 'Revisión de frenos', count: 8, icon: Disc, color: 'text-[#F5821F] bg-[#FFF3E8]' },
    { name: 'Alineación y balanceo', count: 6, icon: RotateCw, color: 'text-[#1B3A8C] bg-[#EBF1FC]' },
    { name: 'Cambio de batería', count: 4, icon: BatteryCharging, color: 'text-[#1B3A8C] bg-[#EBF1FC]' },
  ];

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Header Bar */}
      <div className="px-5 pt-4 pb-4 bg-white border-b border-[#E5E7EB]/60 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight">
            Hola, {shopName}
          </h1>
          <p className="text-xs text-[#8A8F98] font-medium">Taller registrado</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F5821F] ring-2 ring-white" />
        </motion.button>
      </div>

      <div className="p-5 space-y-5">
        {/* Section: Hoy tienes (Two side-by-side cards) */}
        <div>
          <h2 className="text-xs font-bold text-[#8A8F98] uppercase tracking-wider mb-2.5">
            Hoy tienes
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Citas agendadas card */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('shop_agenda')}
              className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-pointer hover:border-gray-300 transition-all text-center flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-extrabold text-[#1B3A8C] tracking-tight">
                {scheduledCount || 5}
              </span>
              <span className="text-xs font-semibold text-gray-600 mt-1">
                Citas agendadas
              </span>
            </motion.div>

            {/* En proceso card */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('shop_agenda')}
              className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-pointer hover:border-gray-300 transition-all text-center flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-extrabold text-[#F5821F] tracking-tight">
                {inProgressCount || 2}
              </span>
              <span className="text-xs font-semibold text-gray-600 mt-1">
                En proceso
              </span>
            </motion.div>
          </div>
        </div>

        {/* Section: Servicios más solicitados */}
        <div>
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-2.5">
            Servicios más solicitados
          </h2>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-gray-100 overflow-hidden">
            {popularServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 flex items-center justify-between hover:bg-gray-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${service.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      {service.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                    {service.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button: Ver agenda completa */}
        <div className="pt-2">
          <PrimaryButton
            onClick={() => onNavigate('shop_agenda')}
            icon={<Calendar className="w-4 h-4" />}
          >
            Ver agenda completa
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
