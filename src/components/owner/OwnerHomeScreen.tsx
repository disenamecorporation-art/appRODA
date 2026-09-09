import React from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  ChevronRight,
  Wrench,
  Store,
  Clock,
  Calendar,
  ShieldCheck,
  Headphones,
  Droplet,
  Plus
} from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { Vehicle, MaintenanceRecord, ScreenId } from '../../types';

interface OwnerHomeScreenProps {
  userName: string;
  vehicles: Vehicle[];
  upcomingMaintenance: MaintenanceRecord | null;
  onNavigate: (screen: ScreenId) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const OwnerHomeScreen: React.FC<OwnerHomeScreenProps> = ({
  userName,
  vehicles,
  upcomingMaintenance,
  onNavigate,
  onSelectVehicle,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  const activeVehicle = vehicles[0] || null;

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-4">
      {/* Top Header Bar */}
      <div className="px-5 pt-4 pb-4 bg-white border-b border-[#E5E7EB]/60 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">
            Hola, {userName}
          </h1>
          <p className="text-xs text-[#8A8F98] font-medium">Dueño de vehículo</p>
        </div>

        {/* Notification Bell */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F5821F] ring-2 ring-white" />
          )}
        </motion.button>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Sección: Mis vehículos (Featured Active Vehicle Card) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-[#1A1A1A]">Mis vehículos</h2>
            <button
              onClick={() => onNavigate('owner_vehicles')}
              className="text-xs font-semibold text-[#1B3A8C] flex items-center gap-0.5 hover:underline"
            >
              Ver todos ({vehicles.length})
            </button>
          </div>

          {activeVehicle ? (
            <motion.div
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                onSelectVehicle(activeVehicle);
                onNavigate('owner_vehicles');
              }}
              className="p-3.5 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                  <img
                    src={activeVehicle.image}
                    alt={`${activeVehicle.brand} ${activeVehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {activeVehicle.brand} {activeVehicle.model} {activeVehicle.year}
                  </h3>
                  <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-semibold tracking-wider text-gray-600 bg-gray-100 rounded-md border border-gray-200">
                    {activeVehicle.plate}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          ) : (
            <button
              onClick={() => onNavigate('owner_vehicles')}
              className="w-full p-4 bg-white border border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-[#1B3A8C]"
            >
              <Plus className="w-4 h-4" /> Agregar vehículo
            </button>
          )}
        </div>

        {/* Sección: Próximo mantenimiento */}
        {upcomingMaintenance && (
          <div>
            <h2 className="text-sm font-bold text-[#1A1A1A] mb-2.5">
              Próximo mantenimiento
            </h2>
            <motion.div
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigate('owner_maintenances')}
              className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer hover:border-gray-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      {upcomingMaintenance.serviceName}
                    </h3>
                    <p className="text-xs text-[#8A8F98] mt-0.5">
                      {upcomingMaintenance.vehicleName}
                    </p>
                  </div>
                </div>

                {/* Counter tag: en 8 días */}
                <span className="px-2.5 py-1 text-[11px] font-bold text-[#F5821F] bg-[#FFF3E8] rounded-full">
                  en 8 días
                </span>
              </div>

              <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-[#1B3A8C]" />
                  <span className="font-semibold text-[#F5821F]">
                    {upcomingMaintenance.date}
                  </span>
                  <span>• {upcomingMaintenance.shopName}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Grid de accesos rápidos (2x3) */}
        <div>
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-2.5">
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Mantenimientos */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('owner_maintenances')}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center mb-1.5">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Mantenimientos
              </span>
            </motion.button>

            {/* Talleres cercanos */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('owner_nearby_shops')}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center mb-1.5">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Talleres cercanos
              </span>
            </motion.button>

            {/* Historial */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('owner_maintenances')}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center mb-1.5">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Historial
              </span>
            </motion.button>

            {/* Recordatorios */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onOpenNotifications}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center mb-1.5">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Recordatorios
              </span>
            </motion.button>

            {/* Asistencia */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => alert('Soporte RODA 24/7: Atención vial y mecánica en línea.')}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Asistencia
              </span>
            </motion.button>

            {/* Garantías */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => alert('Garantía RODA: Todos los servicios agendados cuentan con respaldo de calidad.')}
              className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center text-center shadow-xs hover:border-gray-300 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1B3A8C] flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                Garantías
              </span>
            </motion.button>
          </div>
        </div>

        {/* Sección: Tus vehículos (Mini cards list) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-[#1A1A1A]">Tus vehículos</h2>
            <button
              onClick={() => onNavigate('owner_vehicles')}
              className="text-xs font-semibold text-[#1B3A8C] flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> Agregar
            </button>
          </div>

          <div className="space-y-2">
            {vehicles.map((v) => (
              <motion.div
                key={v.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  onSelectVehicle(v);
                  onNavigate('owner_vehicles');
                }}
                className="p-3 bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={v.image}
                      alt={v.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">
                      {v.brand} {v.model} {v.year}
                    </h4>
                    <span className="text-[10px] text-[#8A8F98] font-medium tracking-wide">
                      {v.plate}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
