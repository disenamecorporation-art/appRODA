import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Plus, ChevronRight, X, Calendar, Wrench, Gauge, Check } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader, PrimaryButton } from '../common/Buttons';
import { Vehicle, ScreenId } from '../../types';

interface OwnerVehiclesScreenProps {
  vehicles: Vehicle[];
  onAddVehicle: (newVehicle: Vehicle) => void;
  onSelectVehicle: (v: Vehicle) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const OwnerVehiclesScreen: React.FC<OwnerVehiclesScreenProps> = ({
  vehicles,
  onAddVehicle,
  onSelectVehicle,
  onBack,
  onNavigate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('45000');

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model || !plate) return;

    const newV: Vehicle = {
      id: `veh-${Date.now()}`,
      brand,
      model,
      year: parseInt(year, 10) || 2022,
      plate: plate.toUpperCase(),
      color: color || 'Gris Plata',
      mileage: parseInt(mileage, 10) || 0,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      lastServiceDate: 'Reciente',
      nextServiceDays: 30,
      nextServiceType: 'Revisión preventiva',
    };

    onAddVehicle(newV);
    setShowAddModal(false);
    setBrand('');
    setModel('');
    setPlate('');
  };

  return (
    <div className="relative w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Screen Header */}
      <ScreenHeader
        title="Mis vehículos"
        onBack={onBack}
        rightElement={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="w-8 h-8 rounded-full bg-[#1B3A8C] text-white flex items-center justify-center shadow-xs hover:bg-[#2748A8]"
            title="Agregar vehículo"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        }
      />

      <div className="p-5 space-y-4">
        {/* Helper Banner */}
        <div className="p-3.5 bg-linear-to-r from-[#1B3A8C] to-[#2748A8] text-white rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold">Garage Digital RODA</h3>
            <p className="text-[11px] text-blue-100 mt-0.5">
              Mantén el historial y alertas de todos tus autos sincronizados.
            </p>
          </div>
          <Car className="w-7 h-7 text-white/80 shrink-0 ml-2" />
        </div>

        {/* Vehicles List */}
        <div className="space-y-3">
          {vehicles.map((veh) => (
            <motion.div
              key={veh.id}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectVehicle(veh)}
              className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3 cursor-pointer hover:border-gray-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={veh.image}
                      alt={veh.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      {veh.brand} {veh.model} {veh.year}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold text-gray-700 bg-gray-100 rounded-md border border-gray-200 tracking-wider">
                        {veh.plate}
                      </span>
                      {veh.color && (
                        <span className="text-[11px] text-gray-400">
                          {veh.color}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
              </div>

              {/* Maintenance summary chips */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#1B3A8C]" />
                  <span>{veh.mileage?.toLocaleString()} km</span>
                </div>
                {veh.nextServiceDays && (
                  <div className="flex items-center gap-1 font-semibold text-[#F5821F]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Próximo serv. en {veh.nextServiceDays} días</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button: Agregar otro vehículo */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full py-3.5 border-2 border-dashed border-[#1B3A8C]/30 bg-white hover:bg-blue-50/50 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-[#1B3A8C] transition-colors"
        >
          <Plus className="w-4 h-4" /> Agregar nuevo vehículo
        </button>
      </div>

      {/* Add Vehicle Modal / Drawer */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-base text-gray-900">Registrar vehículo</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateVehicle} className="p-5 space-y-3.5 overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Marca
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Toyota, Chevrolet, Ford"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1B3A8C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Modelo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Hilux, Corolla, Fiesta"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1B3A8C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Año
                    </label>
                    <input
                      type="number"
                      placeholder="2022"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1B3A8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Placa / Matrícula
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="AB123CD"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 uppercase focus:outline-none focus:border-[#1B3A8C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      placeholder="Blanco, Negro..."
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1B3A8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Kilometraje (km)
                    </label>
                    <input
                      type="number"
                      placeholder="45000"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#F5F6FA] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1B3A8C]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <PrimaryButton type="submit">
                    Guardar vehículo
                  </PrimaryButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
