import React from 'react';
import { Home, Car, Store, User, Calendar, Users } from 'lucide-react';
import { UserRole, ScreenId } from '../../types';

interface BottomNavProps {
  role: UserRole;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ role, currentScreen, onNavigate }) => {
  const ownerTabs = [
    { id: 'owner_home' as ScreenId, label: 'Inicio', icon: Home },
    { id: 'owner_vehicles' as ScreenId, label: 'Vehículos', icon: Car },
    { id: 'owner_nearby_shops' as ScreenId, label: 'Talleres', icon: Store },
    { id: 'owner_profile' as ScreenId, label: 'Perfil', icon: User },
  ];

  const shopTabs = [
    { id: 'shop_home' as ScreenId, label: 'Inicio', icon: Home },
    { id: 'shop_agenda' as ScreenId, label: 'Agenda', icon: Calendar },
    { id: 'shop_clients' as ScreenId, label: 'Clientes', icon: Users },
    { id: 'shop_profile' as ScreenId, label: 'Perfil', icon: User },
  ];

  const tabs = role === 'owner' ? ownerTabs : shopTabs;

  const isTabActive = (tabId: ScreenId) => {
    if (currentScreen === tabId) return true;
    if (tabId === 'owner_nearby_shops' && currentScreen === 'owner_shop_profile') return true;
    if (tabId === 'owner_home' && (currentScreen === 'owner_maintenances' || currentScreen === 'owner_booking_step1' || currentScreen === 'owner_booking_step2' || currentScreen === 'owner_booking_confirm')) {
      return false;
    }
    return false;
  };

  return (
    <div className="w-full bg-white border-t border-[#E5E7EB] px-3 py-2 flex items-center justify-around z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const active = isTabActive(tab.id);
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-1 relative group focus:outline-none"
          >
            <div
              className={`transition-all duration-200 ${
                active
                  ? 'text-[#1B3A8C] scale-105'
                  : 'text-[#8A8F98] group-hover:text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2]" />
            </div>
            <span
              className={`text-[11px] mt-1 font-medium transition-colors ${
                active ? 'text-[#1B3A8C] font-bold' : 'text-[#8A8F98]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
