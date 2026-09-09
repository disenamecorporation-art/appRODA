import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Navigation, ShieldCheck } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { ScreenHeader } from '../common/Buttons';
import { Workshop, ScreenId } from '../../types';

interface OwnerNearbyShopsScreenProps {
  workshops: Workshop[];
  onBack: () => void;
  onSelectShop: (shop: Workshop) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const OwnerNearbyShopsScreen: React.FC<OwnerNearbyShopsScreenProps> = ({
  workshops,
  onBack,
  onSelectShop,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShopId, setSelectedShopId] = useState<string>(workshops[0]?.id || 'shop-1');

  const filteredShops = workshops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.specialties.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedShop = workshops.find((s) => s.id === selectedShopId) || workshops[0];

  // Coordinates for rendering visual pins on the map canvas
  const mapPinCoords: Record<string, { top: string; left: string }> = {
    'shop-1': { top: '48%', left: '50%' }, // Center primary
    'shop-2': { top: '28%', left: '32%' },
    'shop-3': { top: '35%', left: '72%' },
    'shop-4': { top: '65%', left: '38%' },
  };

  return (
    <div className="relative w-full h-full bg-[#F5F6FA] flex flex-col overflow-hidden">
      {/* Screen Header */}
      <ScreenHeader
        title="Talleres cercanos"
        onBack={onBack}
        className="z-20 border-b border-gray-100"
      />

      {/* Search Bar Floating */}
      <div className="px-4 py-2.5 bg-white border-b border-gray-200/70 z-20 shadow-xs">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar taller o ubicación..."
            className="w-full h-11 pl-10 pr-4 bg-[#F5F6FA] border border-[#E5E7EB] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#1B3A8C] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Interactive Styled Map View */}
      <div className="relative flex-1 w-full bg-[#EBF0F5] overflow-hidden select-none">
        {/* SVG Custom Vector Map Texture: roads, avenue curves, river, blocks */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="56" height="56" fill="#F4F7F9" rx="6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* Curved Arterial Roads (Valencia Avenue representation) */}
          <path
            d="M-20,120 Q120,100 200,200 T420,260"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M-20,120 Q120,100 200,200 T420,260"
            fill="none"
            stroke="#DDE3EA"
            strokeWidth="2"
            strokeDasharray="6,6"
          />

          <path
            d="M100,-20 Q160,180 180,320 T240,650"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="16"
          />
          <path
            d="M100,-20 Q160,180 180,320 T240,650"
            fill="none"
            stroke="#DDE3EA"
            strokeWidth="2"
            strokeDasharray="6,6"
          />

          <path
            d="M260,-10 L320,400 L420,450"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="12"
          />

          <path
            d="M-10,340 L420,380"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="14"
          />

          {/* Park area */}
          <ellipse cx="80" cy="460" rx="65" ry="45" fill="#E2F0D9" />
          {/* Lake/Water feature */}
          <path
            d="M320,80 Q360,110 350,160 T380,220 L420,200 L420,80 Z"
            fill="#D9E8F5"
          />
        </svg>

        {/* User Location Radar Pulse */}
        <div className="absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#1B3A8C] opacity-40" />
            <div className="relative w-4 h-4 bg-[#1B3A8C] border-2 border-white rounded-full shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Map Pins for Workshops */}
        {filteredShops.map((shop) => {
          const isSelected = shop.id === selectedShopId;
          const coords = mapPinCoords[shop.id] || { top: '50%', left: '50%' };

          return (
            <motion.button
              key={shop.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedShopId(shop.id)}
              style={{ top: coords.top, left: coords.left }}
              className={`absolute -translate-x-1/2 -translate-y-full z-15 group cursor-pointer focus:outline-none transition-transform ${
                isSelected ? 'scale-110 z-20' : 'hover:scale-105'
              }`}
            >
              <div className="relative flex flex-col items-center">
                {/* Pin Head */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-[#F5821F] border-white text-white ring-4 ring-[#F5821F]/25 scale-110'
                      : 'bg-[#1B3A8C] border-white text-white hover:bg-[#2748A8]'
                  }`}
                >
                  <MapPin className="w-4 h-4 fill-current stroke-[2]" />
                </div>
                {/* Pin Tip */}
                <div
                  className={`w-2 h-2 -mt-1 rotate-45 border-r border-b ${
                    isSelected ? 'bg-[#F5821F] border-white' : 'bg-[#1B3A8C] border-white'
                  }`}
                />

                {/* Micro Label */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs whitespace-nowrap ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : 'bg-white/95 text-gray-800 border border-gray-200'
                  }`}
                >
                  {shop.name.split(' ')[0]}
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Recenter button */}
        <button
          type="button"
          onClick={() => setSelectedShopId('shop-1')}
          className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 z-20 border border-gray-200"
          title="Centrar mapa"
        >
          <Navigation className="w-4 h-4 text-[#1B3A8C]" />
        </button>

        {/* Floating Card at Bottom for Selected Workshop (as in Screenshot 7) */}
        {selectedShop && (
          <motion.div
            key={selectedShop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#E5E7EB] cursor-pointer hover:border-gray-300 transition-all"
            onClick={() => {
              onSelectShop(selectedShop);
              onNavigate('owner_shop_profile');
            }}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-bold text-[#1A1A1A] truncate">
                    {selectedShop.name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-[#F5821F] shrink-0 fill-[#FFF3E8]" />
                </div>

                {/* Rating & Distance */}
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-1" />
                    <span>{selectedShop.rating}</span>
                    <span className="text-gray-400 font-normal ml-1">
                      ({selectedShop.reviewCount})
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600 font-medium">{selectedShop.distance}</span>
                </div>

                {/* Address */}
                <p className="text-xs text-[#8A8F98] mt-1 truncate">
                  {selectedShop.address}
                </p>
              </div>

              {/* Verified orange icon */}
              <div className="w-7 h-7 rounded-full bg-[#FFF3E8] text-[#F5821F] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

            {/* Specialty Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-gray-100">
              {selectedShop.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EBF1FC] text-[#1B3A8C]"
                >
                  {spec}
                </span>
              ))}
              <span className="text-[11px] font-semibold text-[#1B3A8C] ml-auto hover:underline flex items-center">
                Ver taller →
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
