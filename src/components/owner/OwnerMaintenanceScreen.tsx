import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplet, Disc, RotateCw, BatteryCharging, Activity, Wrench, Plus, Calendar, MapPin } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader } from '../common/Buttons';
import { Badge } from '../common/Badge';
import { MaintenanceRecord, ScreenId } from '../../types';

interface OwnerMaintenanceScreenProps {
  maintenances: MaintenanceRecord[];
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  onBookService?: (serviceName?: string) => void;
}

export const OwnerMaintenanceScreen: React.FC<OwnerMaintenanceScreenProps> = ({
  maintenances,
  onBack,
  onNavigate,
  onBookService,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);

  const pendingCount = maintenances.filter(
    (m) => m.status === 'Pendiente'
  ).length;

  const filtered = maintenances.filter((item) => {
    if (activeTab === 'pending') {
      return item.status === 'Pendiente';
    }
    if (activeTab === 'completed') {
      return item.status === 'Realizado';
    }
    // 'all' shows the primary upcoming and programmed records
    return true;
  });

  const getServiceIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('aceite')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center shrink-0">
          <Droplet className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('freno')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center shrink-0">
          <Disc className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('alineación') || lower.includes('balanceo')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center shrink-0">
          <RotateCw className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('batería')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center shrink-0">
          <BatteryCharging className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('diagnóstico')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#EBF1FC] text-[#1B3A8C] flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
        <Wrench className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Screen Header */}
      <ScreenHeader
        title="Mantenimientos"
        onBack={onBack}
        rightElement={
          <button
            onClick={() => onNavigate('owner_booking_step1')}
            className="w-8 h-8 rounded-full bg-[#1B3A8C] text-white flex items-center justify-center shadow-xs hover:bg-[#2748A8] transition-colors"
            title="Agendar nuevo servicio"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        }
      />

      {/* Segmented Tabs */}
      <div className="px-5 pt-3 pb-2 bg-white border-b border-[#E5E7EB]">
        <div className="flex bg-[#F5F6FA] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#1B3A8C] shadow-xs'
                : 'text-[#8A8F98] hover:text-gray-700'
            }`}
          >
            Todos
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-white text-[#1B3A8C] shadow-xs'
                : 'text-[#8A8F98] hover:text-gray-700'
            }`}
          >
            <span>Pendientes</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#F5821F] text-white text-[10px] font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-[#1B3A8C] shadow-xs'
                : 'text-[#8A8F98] hover:text-gray-700'
            }`}
          >
            Realizados
          </button>
        </div>
      </div>

      {/* List of Maintenance Cards */}
      <div className="p-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
            <Wrench className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No hay registros en esta sección</p>
            <p className="text-xs text-gray-400 mt-1">Programa un nuevo mantenimiento para tu vehículo</p>
          </div>
        ) : (
          filtered.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedRecord(item)}
              className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3 cursor-pointer hover:border-gray-300 transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {getServiceIcon(item.serviceName)}

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#1A1A1A] truncate">
                    {item.serviceName}
                  </h3>
                  <p className="text-xs text-[#8A8F98] mt-0.5 truncate">
                    {item.vehicleName}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                    {item.date} {item.time ? `• ${item.time}` : ''}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 flex flex-col items-end gap-1">
                <Badge status={item.status} />
                {item.price && (
                  <span className="text-xs font-bold text-gray-800">{item.price}</span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Maintenance Details Drawer / Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                {getServiceIcon(selectedRecord.serviceName)}
                <div>
                  <h3 className="text-base font-bold text-gray-900">{selectedRecord.serviceName}</h3>
                  <p className="text-xs text-gray-500">{selectedRecord.vehicleName}</p>
                </div>
              </div>
              <Badge status={selectedRecord.status} />
            </div>

            <div className="space-y-2.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1B3A8C]" />
                <span>Fecha: <strong className="text-gray-900">{selectedRecord.date} {selectedRecord.time}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5821F]" />
                <span>Taller: <strong className="text-gray-900">{selectedRecord.shopName}</strong></span>
              </div>
              {selectedRecord.notes && (
                <div className="pt-2 border-t border-gray-200 text-gray-600">
                  <span>Nota: {selectedRecord.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRecord(null);
                  if (onBookService) onBookService(selectedRecord.serviceName);
                  else onNavigate('owner_booking_step1');
                }}
                className="flex-1 py-2.5 bg-[#1B3A8C] text-white text-xs font-semibold rounded-xl hover:bg-[#2748A8]"
              >
                Reagendar / Cita
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
