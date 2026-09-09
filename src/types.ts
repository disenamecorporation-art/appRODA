export type UserRole = 'owner' | 'shop';

export type MaintenanceStatus = 'Pendiente' | 'Programado' | 'En proceso' | 'Confirmada' | 'Realizado' | 'Cancelado';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  image: string;
  color?: string;
  mileage?: number;
  lastServiceDate?: string;
  nextServiceDays?: number;
  nextServiceType?: string;
}

export interface MaintenanceServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  estimatedPrice: string;
  iconName: string;
  category: string;
}

export interface MaintenanceRecord {
  id: string;
  serviceId: string;
  serviceName: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  date: string;
  time?: string;
  status: MaintenanceStatus;
  shopName: string;
  shopAddress: string;
  price?: string;
  iconName: string;
  notes?: string;
}

export interface Workshop {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  city: string;
  phone: string;
  coverImage: string;
  logoImage: string;
  specialties: string[];
  servicesOffered: string[];
  lat: number;
  lng: number;
  openHours: string;
}

export interface WorkshopAppointment {
  id: string;
  time: string;
  date: string;
  clientName: string;
  clientPhone: string;
  vehicleName: string;
  plate: string;
  serviceName: string;
  status: MaintenanceStatus;
  price: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  plate: string;
  totalVisits: number;
  lastVisit: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'reminder' | 'confirmation' | 'alert';
  read: boolean;
  actionScreen?: string;
}

export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register_profile'
  | 'register_form'
  | 'owner_home'
  | 'owner_maintenances'
  | 'owner_nearby_shops'
  | 'owner_shop_profile'
  | 'owner_booking_step1'
  | 'owner_booking_step2'
  | 'owner_booking_confirm'
  | 'owner_vehicles'
  | 'owner_profile'
  | 'shop_home'
  | 'shop_agenda'
  | 'shop_clients'
  | 'shop_profile';
