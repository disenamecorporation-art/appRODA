import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Store,
  Layers,
  X,
  RotateCcw
} from 'lucide-react';
import {
  UserRole,
  ScreenId,
  Vehicle,
  MaintenanceRecord,
  Workshop,
  MaintenanceServiceItem,
  WorkshopAppointment,
} from './types';
import {
  MOCK_VEHICLES,
  MOCK_SERVICES,
  MOCK_MAINTENANCES,
  MOCK_WORKSHOPS,
  MOCK_SHOP_APPOINTMENTS,
  MOCK_CLIENTS,
  MOCK_NOTIFICATIONS,
} from './data/mockData';

// Common Components
import { BottomNav } from './components/common/BottomNav';
import { NotificationsModal } from './components/common/NotificationsModal';
import { NativeAppModal } from './components/common/NativeAppModal';

// Auth Screens
import { SplashScreen } from './components/auth/SplashScreen';
import { OnboardingScreen } from './components/auth/OnboardingScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { ProfileSelectScreen } from './components/auth/ProfileSelectScreen';

// Owner Screens
import { OwnerHomeScreen } from './components/owner/OwnerHomeScreen';
import { OwnerMaintenanceScreen } from './components/owner/OwnerMaintenanceScreen';
import { OwnerNearbyShopsScreen } from './components/owner/OwnerNearbyShopsScreen';
import { OwnerShopProfileScreen } from './components/owner/OwnerShopProfileScreen';
import { OwnerBookingStep1Screen } from './components/owner/OwnerBookingStep1Screen';
import { OwnerBookingStep2Screen } from './components/owner/OwnerBookingStep2Screen';
import { OwnerBookingConfirmationScreen } from './components/owner/OwnerBookingConfirmationScreen';
import { OwnerVehiclesScreen } from './components/owner/OwnerVehiclesScreen';
import { OwnerProfileScreen } from './components/owner/OwnerProfileScreen';

// Shop Screens
import { ShopHomeScreen } from './components/shop/ShopHomeScreen';
import { ShopAgendaScreen } from './components/shop/ShopAgendaScreen';
import { ShopClientsScreen } from './components/shop/ShopClientsScreen';
import { ShopProfileScreen } from './components/shop/ShopProfileScreen';

export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState<UserRole>('owner');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [userName, setUserName] = useState('Carlos');
  const [shopName, setShopName] = useState('Taller AutoSoluciones');

  // Presentation State
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [nativeAppModalOpen, setNativeAppModalOpen] = useState(false);

  // App Data State
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [maintenances, setMaintenances] = useState<MaintenanceRecord[]>(MOCK_MAINTENANCES);
  const [workshops] = useState<Workshop[]>(MOCK_WORKSHOPS);
  const [appointments, setAppointments] = useState<WorkshopAppointment[]>(MOCK_SHOP_APPOINTMENTS);
  const [clients] = useState(MOCK_CLIENTS);
  const [notifications] = useState(MOCK_NOTIFICATIONS);

  // Booking Flow State
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle>(MOCK_VEHICLES[0]);
  const [bookingService, setBookingService] = useState<MaintenanceServiceItem>(MOCK_SERVICES[0]);
  const [bookingWorkshop, setBookingWorkshop] = useState<Workshop>(MOCK_WORKSHOPS[0]);
  const [bookingDate, setBookingDate] = useState('17 Abr 2025');
  const [bookingTime, setBookingTime] = useState('10:00 AM');

  // Screen directory for the subtle switcher
  const screenList: { id: ScreenId; label: string; group: 'General' | 'Dueño' | 'Taller' }[] = [
    { id: 'splash', label: '1. Splash Screen', group: 'General' },
    { id: 'onboarding', label: '2. Onboarding', group: 'General' },
    { id: 'login', label: '3. Iniciar Sesión', group: 'General' },
    { id: 'register_profile', label: '4. Selección de Perfil', group: 'General' },
    { id: 'owner_home', label: '5. Home Dueño', group: 'Dueño' },
    { id: 'owner_maintenances', label: '6. Mantenimientos', group: 'Dueño' },
    { id: 'owner_nearby_shops', label: '7. Talleres Cercanos (Mapa)', group: 'Dueño' },
    { id: 'owner_shop_profile', label: '8. Perfil de Taller', group: 'Dueño' },
    { id: 'owner_booking_step1', label: '9. Agendar - Paso 1', group: 'Dueño' },
    { id: 'owner_booking_step2', label: '10. Agendar - Paso 2', group: 'Dueño' },
    { id: 'owner_booking_confirm', label: '11. Cita Agendada (Éxito)', group: 'Dueño' },
    { id: 'owner_vehicles', label: 'Garage de Vehículos', group: 'Dueño' },
    { id: 'owner_profile', label: 'Mi Perfil (Dueño)', group: 'Dueño' },
    { id: 'shop_home', label: '12. Home Taller', group: 'Taller' },
    { id: 'shop_agenda', label: '13. Agenda del Taller', group: 'Taller' },
    { id: 'shop_profile', label: '14. Mi Taller (Perfil negocio)', group: 'Taller' },
    { id: 'shop_clients', label: 'Clientes del Taller', group: 'Taller' },
  ];

  const handleLoginSuccess = (selectedRole: UserRole, name: string) => {
    setRole(selectedRole);
    if (selectedRole === 'owner') {
      setUserName(name || 'Carlos');
      setCurrentScreen('owner_home');
    } else {
      setShopName(name || 'Taller AutoSoluciones');
      setCurrentScreen('shop_home');
    }
  };

  const handleRoleSelected = (newRole: UserRole, details?: { name: string; email: string }) => {
    setRole(newRole);
    if (newRole === 'owner') {
      setUserName(details?.name || 'Carlos Mendoza');
      setCurrentScreen('owner_home');
    } else {
      setShopName(details?.name || 'Taller AutoSoluciones');
      setCurrentScreen('shop_home');
    }
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'owner') {
      setCurrentScreen('owner_home');
    } else {
      setCurrentScreen('shop_home');
    }
  };

  const handleStartBookingFromService = (serviceName?: string) => {
    if (serviceName) {
      const match = MOCK_SERVICES.find((s) => s.name.toLowerCase().includes(serviceName.toLowerCase()));
      if (match) setBookingService(match);
    }
    setCurrentScreen('owner_booking_step1');
  };

  const handleFinishBooking = (date: string, time: string) => {
    setBookingDate(date);
    setBookingTime(time);

    const newRecord: MaintenanceRecord = {
      id: `maint-${Date.now()}`,
      serviceId: bookingService.id,
      serviceName: bookingService.name,
      vehicleId: bookingVehicle.id,
      vehicleName: `${bookingVehicle.brand} ${bookingVehicle.model} ${bookingVehicle.year}`,
      vehiclePlate: bookingVehicle.plate,
      date,
      time,
      status: 'Programado',
      shopName: bookingWorkshop.name,
      shopAddress: bookingWorkshop.address,
      price: bookingService.estimatedPrice,
      iconName: bookingService.iconName,
      notes: 'Cita agendada vía app RODA.',
    };

    setMaintenances([newRecord, ...maintenances]);

    const newAppointment: WorkshopAppointment = {
      id: `app-${Date.now()}`,
      time,
      date,
      clientName: userName,
      clientPhone: '+58 414-3401234',
      vehicleName: `${bookingVehicle.brand} ${bookingVehicle.model} ${bookingVehicle.year}`,
      plate: bookingVehicle.plate,
      serviceName: bookingService.name,
      status: 'Confirmada',
      price: bookingService.estimatedPrice,
    };

    setAppointments([newAppointment, ...appointments]);
    setCurrentScreen('owner_booking_confirm');
  };

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setBookingVehicle(newVehicle);
  };

  const handleUpdateAppointmentStatus = (
    id: string,
    newStatus: 'En proceso' | 'Confirmada' | 'Realizado'
  ) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const shouldShowBottomNav = (screen: ScreenId) => {
    const bottomNavScreens: ScreenId[] = [
      'owner_home',
      'owner_vehicles',
      'owner_nearby_shops',
      'owner_profile',
      'owner_maintenances',
      'owner_shop_profile',
      'shop_home',
      'shop_agenda',
      'shop_clients',
      'shop_profile',
    ];
    return bottomNavScreens.includes(screen);
  };

  return (
    <div className="w-full h-full h-[100dvh] overflow-hidden bg-neutral-950 flex justify-center items-center select-none font-sans">
      {/* 
        Native Mobile Viewport Container:
        - On mobile devices: takes 100% width and 100% height without any letterboxing or borders
        - On wide desktop screens: behaves like a native mobile phone window (max-w-[430px], 100% height)
      */}
      <div className="w-full h-full max-w-[430px] bg-white flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Dynamic Screen Content Router */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="w-full h-full flex flex-col"
            >
              {/* Screen 1: Splash */}
              {currentScreen === 'splash' && (
                <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
              )}

              {/* Screen 2: Onboarding */}
              {currentScreen === 'onboarding' && (
                <OnboardingScreen
                  onStart={() => setCurrentScreen('login')}
                  onLogin={() => setCurrentScreen('login')}
                />
              )}

              {/* Screen 3: Login */}
              {currentScreen === 'login' && (
                <LoginScreen
                  onLogin={handleLoginSuccess}
                  onRegister={() => setCurrentScreen('register_profile')}
                />
              )}

              {/* Screen 4: Profile Selection */}
              {currentScreen === 'register_profile' && (
                <ProfileSelectScreen
                  onBack={() => setCurrentScreen('login')}
                  onSelectRole={handleRoleSelected}
                />
              )}

              {/* Screen 5: Home Dueño */}
              {currentScreen === 'owner_home' && (
                <OwnerHomeScreen
                  userName={userName}
                  vehicles={vehicles}
                  upcomingMaintenance={maintenances[0] || null}
                  onNavigate={(s) => setCurrentScreen(s)}
                  onSelectVehicle={(v) => {
                    setBookingVehicle(v);
                    setCurrentScreen('owner_vehicles');
                  }}
                  onOpenNotifications={() => setNotificationsOpen(true)}
                  unreadCount={notifications.filter((n) => !n.read).length}
                />
              )}

              {/* Screen 6: Mantenimientos */}
              {currentScreen === 'owner_maintenances' && (
                <OwnerMaintenanceScreen
                  maintenances={maintenances}
                  onBack={() => setCurrentScreen('owner_home')}
                  onNavigate={(s) => setCurrentScreen(s)}
                  onBookService={handleStartBookingFromService}
                />
              )}

              {/* Screen 7: Talleres Cercanos (Mapa) */}
              {currentScreen === 'owner_nearby_shops' && (
                <OwnerNearbyShopsScreen
                  workshops={workshops}
                  onBack={() => setCurrentScreen('owner_home')}
                  onSelectShop={(shop) => {
                    setBookingWorkshop(shop);
                    setCurrentScreen('owner_shop_profile');
                  }}
                  onNavigate={(s) => setCurrentScreen(s)}
                />
              )}

              {/* Screen 8: Perfil de Taller (Detalle) */}
              {currentScreen === 'owner_shop_profile' && (
                <OwnerShopProfileScreen
                  shop={bookingWorkshop}
                  onBack={() => setCurrentScreen('owner_nearby_shops')}
                  onBookAppointment={() => setCurrentScreen('owner_booking_step1')}
                />
              )}

              {/* Screen 9: Agendar - Paso 1 (Servicio) */}
              {currentScreen === 'owner_booking_step1' && (
                <OwnerBookingStep1Screen
                  services={MOCK_SERVICES}
                  vehicles={vehicles}
                  selectedVehicle={bookingVehicle}
                  onSelectVehicle={setBookingVehicle}
                  selectedService={bookingService}
                  onSelectService={setBookingService}
                  onBack={() => setCurrentScreen('owner_shop_profile')}
                  onNext={() => setCurrentScreen('owner_booking_step2')}
                />
              )}

              {/* Screen 10: Agendar - Paso 2 (Fecha y Hora) */}
              {currentScreen === 'owner_booking_step2' && (
                <OwnerBookingStep2Screen
                  onBack={() => setCurrentScreen('owner_booking_step1')}
                  onNext={handleFinishBooking}
                />
              )}

              {/* Screen 11: Cita Agendada (Confirmación) */}
              {currentScreen === 'owner_booking_confirm' && (
                <OwnerBookingConfirmationScreen
                  vehicle={bookingVehicle}
                  service={bookingService}
                  workshop={bookingWorkshop}
                  bookingDate={bookingDate}
                  bookingTime={bookingTime}
                  onGoHome={() => setCurrentScreen('owner_home')}
                  onViewCalendar={() => setCurrentScreen('owner_maintenances')}
                />
              )}

              {/* Garage / Vehículos Dueño */}
              {currentScreen === 'owner_vehicles' && (
                <OwnerVehiclesScreen
                  vehicles={vehicles}
                  onAddVehicle={handleAddVehicle}
                  onSelectVehicle={(v) => {
                    setBookingVehicle(v);
                    setCurrentScreen('owner_booking_step1');
                  }}
                  onBack={() => setCurrentScreen('owner_home')}
                  onNavigate={(s) => setCurrentScreen(s)}
                />
              )}

              {/* Perfil Dueño */}
              {currentScreen === 'owner_profile' && (
                <OwnerProfileScreen
                  userName={userName}
                  onSwitchRole={handleSwitchRole}
                  onLogout={() => setCurrentScreen('login')}
                />
              )}

              {/* Screen 12: Home Taller */}
              {currentScreen === 'shop_home' && (
                <ShopHomeScreen
                  shopName={shopName}
                  appointments={appointments}
                  onNavigate={(s) => setCurrentScreen(s)}
                  onOpenNotifications={() => setNotificationsOpen(true)}
                />
              )}

              {/* Screen 13: Agenda del Taller */}
              {currentScreen === 'shop_agenda' && (
                <ShopAgendaScreen
                  appointments={appointments}
                  onUpdateStatus={handleUpdateAppointmentStatus}
                  onBack={() => setCurrentScreen('shop_home')}
                />
              )}

              {/* Clientes Taller */}
              {currentScreen === 'shop_clients' && (
                <ShopClientsScreen
                  clients={clients}
                  onBack={() => setCurrentScreen('shop_home')}
                />
              )}

              {/* Screen 14: Mi Taller (Perfil) */}
              {currentScreen === 'shop_profile' && (
                <ShopProfileScreen
                  shop={bookingWorkshop}
                  onSwitchRole={handleSwitchRole}
                  onLogout={() => setCurrentScreen('login')}
                  onBack={() => setCurrentScreen('shop_home')}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Persistent Bottom Navigation Bar */}
        {shouldShowBottomNav(currentScreen) && (
          <div className="shrink-0 bg-white">
            <BottomNav
              role={role}
              currentScreen={currentScreen}
              onNavigate={(s) => setCurrentScreen(s)}
            />
          </div>
        )}

        {/* Native iOS/Android Home Indicator Bar */}
        <div className="w-full bg-white pb-2 pt-0.5 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 
          Discreet Floating Quick-Switch Pill
          (Tiny, non-intrusive floating button in top-right corner to jump between roles/screens instantly during review)
        */}
        <div className="absolute top-2 right-2 z-50">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDevToolsOpen(!devToolsOpen)}
            className="px-2 py-1 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-md border border-white/20 transition-all opacity-70 hover:opacity-100"
            title="Cambiar pantalla / rol"
          >
            <Layers className="w-3 h-3 text-[#F5821F]" />
            <span className="capitalize">{role === 'owner' ? 'Dueño' : 'Taller'}</span>
          </motion.button>
        </div>

        {/* Quick Navigation Drawer */}
        <AnimatePresence>
          {devToolsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-3 top-10 bg-slate-900/95 backdrop-blur-lg border border-slate-700 text-white rounded-2xl shadow-2xl p-4 z-50 max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Navegación Rápida RODA</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5821F] text-white font-bold">
                    14 Pantallas
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDevToolsOpen(false)}
                  className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Role Toggle */}
              <div className="py-2.5 flex items-center justify-between border-b border-slate-800">
                <span className="text-[11px] text-gray-300 font-semibold">Cambiar Rol Activo:</span>
                <div className="flex items-center bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('owner');
                      setCurrentScreen('owner_home');
                      setDevToolsOpen(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      role === 'owner'
                        ? 'bg-[#1B3A8C] text-white shadow-xs'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-3 h-3" /> Dueño
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('shop');
                      setCurrentScreen('shop_home');
                      setDevToolsOpen(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      role === 'shop'
                        ? 'bg-[#F5821F] text-white shadow-xs'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3 h-3" /> Taller
                  </button>
                </div>
              </div>

              {/* Screens Grid */}
              <div className="flex-1 overflow-y-auto py-2 space-y-3">
                {['General', 'Dueño', 'Taller'].map((grp) => (
                  <div key={grp}>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-[#F5821F] mb-1.5">
                      {grp}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {screenList
                        .filter((s) => s.group === grp)
                        .map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setCurrentScreen(s.id);
                              if (s.group === 'Dueño') setRole('owner');
                              if (s.group === 'Taller') setRole('shop');
                              setDevToolsOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                              currentScreen === s.id
                                ? 'bg-[#1B3A8C] text-white font-bold'
                                : 'text-gray-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate">{s.label}</span>
                            {currentScreen === s.id && (
                              <span className="w-2 h-2 rounded-full bg-[#F5821F]" />
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setDevToolsOpen(false);
                    setNativeAppModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-[#F5821F] hover:bg-[#e07519] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs"
                >
                  📲 Instalar en Celular / APK
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('splash');
                    setDevToolsOpen(false);
                  }}
                  className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reiniciar Splash
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onNavigate={(s) => setCurrentScreen(s)}
      />

      {/* Native App & APK Installation Guide Modal */}
      <NativeAppModal
        isOpen={nativeAppModalOpen}
        onClose={() => setNativeAppModalOpen(false)}
      />
    </div>
  );
}
