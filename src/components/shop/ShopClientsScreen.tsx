import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Phone, Mail, Car, Calendar, UserPlus } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader } from '../common/Buttons';
import { ClientRecord } from '../../types';

interface ShopClientsScreenProps {
  clients: ClientRecord[];
  onBack: () => void;
}

export const ShopClientsScreen: React.FC<ShopClientsScreenProps> = ({
  clients,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Header */}
      <ScreenHeader
        title="Clientes registrados"
        onBack={onBack}
        subtitle={`${clients.length} clientes activos`}
      />

      {/* Search */}
      <div className="p-4 bg-white border-b border-gray-100 shadow-xs">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, auto o placa..."
            className="w-full h-11 pl-10 pr-4 bg-[#F5F6FA] border border-[#E5E7EB] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B3A8C] transition-all"
          />
        </div>
      </div>

      {/* Clients list */}
      <div className="p-5 space-y-3">
        {filtered.map((client) => (
          <motion.div
            key={client.id}
            whileHover={{ scale: 1.01 }}
            className="p-4 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2.5 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">
                  {client.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#1B3A8C] font-semibold mt-0.5">
                  <Car className="w-3.5 h-3.5" />
                  <span>{client.vehicle}</span>
                  <span className="text-gray-400 font-normal">• {client.plate}</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                {client.totalVisits} visitas
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <span className="text-[11px] text-gray-400">
                Último servicio: {client.lastVisit}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${client.phone}`}
                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <Phone className="w-3 h-3" /> Llamar
                </a>
                <a
                  href={`mailto:${client.email}`}
                  className="p-1.5 rounded-lg bg-blue-50 text-[#1B3A8C] hover:bg-blue-100 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <Mail className="w-3 h-3" /> Correo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
