import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      </div>

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onNavigate={(s) => setCurrentScreen(s)}
      />
    </div>
  );
}
