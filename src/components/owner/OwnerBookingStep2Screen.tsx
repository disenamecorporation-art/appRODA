import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader, PrimaryButton } from '../common/Buttons';

interface OwnerBookingStep2ScreenProps {
  onBack: () => void;
  onNext: (selectedDate: string, selectedTime: string) => void;
}

export const OwnerBookingStep2Screen: React.FC<OwnerBookingStep2ScreenProps> = ({
  onBack,
  onNext,
}) => {
  // Calendar state initialized to April 2025 matching the design mockup exactly
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [monthName] = useState('Abril 2025');

  const timeSlots = ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

  // Days of April 2025 starting on Tuesday (so 1st day offset is index 1 for Monday-based)
  // Days of week: L, M, M, J, V, S, D
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  // April 2025: April 1 is a Tuesday (Index 1)
  const emptyDaysBefore = [null]; // 1 empty slot for Monday
  const daysInApril = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleContinue = () => {
    const formattedDate = `${selectedDay} Abr 2025`;
    onNext(formattedDate, selectedTime);
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col justify-between overflow-y-auto">
      {/* Top Status Bar */}
      <StatusBar />

      {/* Screen Header */}
      <ScreenHeader
        title="Selecciona fecha y hora"
        onBack={onBack}
      />

      <div className="px-5 pt-3 pb-6 flex-1 flex flex-col">
        {/* Month Selector Bar: < Abril 2025 > */}
        <div className="flex items-center justify-between px-2 py-2 mb-2 bg-[#F5F6FA] rounded-xl border border-gray-100">
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
            {monthName}
          </span>
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-3 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs mb-5">
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day, i) => (
              <span
                key={i}
                className="text-[11px] font-bold text-[#8A8F98] py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {emptyDaysBefore.map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}

            {daysInApril.map((d) => {
              const isSelected = d === selectedDay;
              const isPast = d < 12;

              return (
                <button
                  key={d}
                  type="button"
                  disabled={isPast}
                  onClick={() => setSelectedDay(d)}
                  className={`h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#1B3A8C] text-white shadow-md'
                      : isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horario disponible */}
        <div>
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">
            Horario disponible
          </h3>

          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isSelected = time === selectedTime;

              return (
                <motion.button
                  key={time}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-[#1B3A8C] border-[#1B3A8C] text-white shadow-sm'
                      : 'bg-white border-[#E5E7EB] text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {time}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Primary Button */}
      <div className="px-5 pb-6 pt-3 bg-white border-t border-gray-100 sticky bottom-0 z-20">
        <PrimaryButton onClick={handleContinue}>
          Continuar
        </PrimaryButton>
      </div>
    </div>
  );
};
