import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Car, Phone } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader } from '../common/Buttons';
import { Badge } from '../common/Badge';
import { WorkshopAppointment } from '../../types';

interface ShopAgendaScreenProps {
  appointments: WorkshopAppointment[];
  onUpdateStatus: (id: string, newStatus: 'En proceso' | 'Confirmada' | 'Realizado') => void;
  onBack: () => void;
}

export const ShopAgendaScreen: React.FC<ShopAgendaScreenProps> = ({
  appointments,
  onUpdateStatus,
  onBack,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // 15 Apr is index 1

  const weekDays = [
    { label: 'L', day: 14 },
    { label: 'M', day: 15 },
    { label: 'M', day: 16 },
    { label: 'J', day: 17 },
    { label: 'V', day: 18 },
    { label: 'S', day: 19 },
    { label: 'D', day: 20 },
  ];

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Screen Header */}
      <ScreenHeader
        title="Agenda del taller"
        onBack={onBack}
      />

      {/* Date Navigator Bar: < Hoy, 15 Abr > */}
      <div className="px-5 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
          aria-label="Día anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-bold text-[#1A1A1A]">
          Hoy, {weekDays[selectedDayIndex].day} Abr
        </span>

        <button
          type="button"
          onClick={() => setSelectedDayIndex((prev) => Math.min(weekDays.length - 1, prev + 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
          aria-label="Día siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekly Horizontal Day Selector */}
      <div className="px-5 py-3 bg-white border-b border-[#E5E7EB]">
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((item, idx) => {
            const isSelected = idx === selectedDayIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDayIndex(idx)}
                className="flex flex-col items-center justify-center py-1 group focus:outline-none"
              >
                <span className="text-[11px] font-bold text-[#8A8F98] mb-1">
                  {item.label}
                </span>

                <div
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#1B3A8C] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.day}
                </div>

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A8C] mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments List for the selected day */}
      <div className="p-5 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Citas programadas ({appointments.length})</span>
          <span>Horario: 8:00 AM - 5:00 PM</span>
        </div>

        {appointments.map((app, index) => {
          const borderAccent =
            app.status === 'En proceso'
              ? 'border-l-4 border-l-[#F5821F]'
              : index === 1
              ? 'border-l-4 border-l-[#1B3A8C]'
              : 'border-l-4 border-l-[#2E9E5B]';

          return (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.01 }}
              className={`p-4 bg-white rounded-2xl border border-[#E5E7EB] ${borderAccent} shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2.5 transition-all`}
            >
              {/* Header: Time and Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
                  <Clock className="w-3.5 h-3.5 text-[#1B3A8C]" />
                  <span>{app.time}</span>
                </div>
                <Badge status={app.status} />
              </div>

              {/* Vehicle & Client Info */}
              <div className="pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {app.vehicleName}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-gray-700 bg-gray-100 rounded-md border border-gray-200">
                    {app.plate}
                  </span>
                </div>

                <p className="text-xs text-[#1B3A8C] font-semibold mt-0.5">
                  {app.serviceName}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  <span>Cliente: <strong className="text-gray-700">{app.clientName}</strong></span>
                  <a
                    href={`tel:${app.clientPhone}`}
                    className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3 h-3" /> Llamar
                  </a>
                </div>
              </div>

              {/* Status Quick Toggle for Workshop Owner */}
              <div className="flex gap-2 pt-1">
                {app.status !== 'En proceso' && (
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(app.id, 'En proceso')}
                    className="flex-1 py-1.5 bg-[#FFF3E8] text-[#F5821F] text-[11px] font-bold rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    Iniciar atención
                  </button>
                )}
                {app.status === 'En proceso' && (
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(app.id, 'Realizado')}
                    className="flex-1 py-1.5 bg-[#EAF7EE] text-[#2E9E5B] text-[11px] font-bold rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Marcar listo
                  </button>
                )}
                {app.status === 'Realizado' && (
                  <span className="w-full py-1 text-center text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg">
                    ✓ Servicio completado
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
