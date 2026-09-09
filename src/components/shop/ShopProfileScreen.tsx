import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Check, Edit3, RefreshCw, LogOut, Phone, ShieldCheck } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader, SecondaryButton } from '../common/Buttons';
import { Workshop, UserRole } from '../../types';

interface ShopProfileScreenProps {
  shop: Workshop;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const ShopProfileScreen: React.FC<ShopProfileScreenProps> = ({
  shop,
  onSwitchRole,
  onLogout,
  onBack,
}) => {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(shop.phone);
  const [address, setAddress] = useState(shop.address);

  const servicesList = [
    'Mecánica general',
    'Electricidad',
    'Frenos',
    'Suspensión',
    'Diagnóstico',
  ];

  return (
    <div className="relative w-full h-full bg-[#F5F6FA] flex flex-col overflow-y-auto pb-6">
      {/* Screen Header */}
      <ScreenHeader
        title="Mi taller"
        onBack={onBack}
      />

      {/* Cover photo with circular logo superimposed */}
      <div className="relative w-full h-44 shrink-0 bg-slate-800">
        <img
          src={shop.coverImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* Superimposed Circular Logo */}
        <div className="absolute -bottom-6 left-5 w-16 h-16 rounded-full bg-white border-2 border-white shadow-md overflow-hidden flex items-center justify-center p-1.5 z-10">
          <img
            src="https://i.postimg.cc/85qBZzyK/LOGO-WEB-RODA.png"
            alt="Logo Taller"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Workshop Profile Content */}
      <div className="px-5 pt-8 pb-4 space-y-4">
        {/* Name and Rating */}
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight">
              {shop.name}
            </h1>
            <ShieldCheck className="w-5 h-5 text-[#2E9E5B] fill-emerald-100" />
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-1" />
              <span>{shop.rating}</span>
              <span className="text-gray-400 font-normal ml-1">
                ({shop.reviewCount})
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-medium">{shop.distance}</span>
          </div>

          {/* Address */}
          <div className="flex items-start gap-1.5 mt-2 text-xs text-[#8A8F98]">
            <MapPin className="w-3.5 h-3.5 text-[#1B3A8C] shrink-0 mt-0.5" />
            <span>{address}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-700">
            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{phone}</span>
          </div>
        </div>

        {/* Section: Servicios in list with checkmarks */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-2.5">
            Servicios
          </h2>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-gray-100 overflow-hidden">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="p-3.5 flex items-center justify-between hover:bg-gray-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#1B3A8C] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-semibold text-[#1A1A1A]">
                    {service}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  Activo
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit profile modal/fields toggle */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3"
          >
            <h3 className="text-xs font-bold text-gray-900">Editar datos de contacto</h3>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 text-xs border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">Dirección</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-9 px-3 text-xs border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                alert('Perfil de taller actualizado');
              }}
              className="w-full py-2 bg-[#1B3A8C] text-white text-xs font-bold rounded-lg"
            >
              Guardar cambios
            </button>
          </motion.div>
        )}

        {/* Switch to Owner Mode for Testing */}
        <motion.div
          whileTap={{ scale: 0.99 }}
          onClick={() => onSwitchRole('owner')}
          className="p-3.5 bg-linear-to-r from-[#1B3A8C] to-[#2748A8] text-white rounded-2xl shadow-sm cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-4 h-4 text-white" />
            <div>
              <h4 className="text-xs font-bold">Cambiar a Vista Dueño</h4>
              <p className="text-[10px] text-blue-100">Regresar al dashboard de vehículos</p>
            </div>
          </div>
          <span className="text-xs text-white/90">Cambiar →</span>
        </motion.div>

        {/* Secondary button: Editar perfil */}
        <div className="pt-2 space-y-2">
          <SecondaryButton
            onClick={() => setEditing(!editing)}
            icon={<Edit3 className="w-4 h-4" />}
          >
            {editing ? 'Cancelar edición' : 'Editar perfil'}
          </SecondaryButton>

          <button
            type="button"
            onClick={onLogout}
            className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
