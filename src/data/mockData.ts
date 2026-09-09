import { Vehicle, MaintenanceRecord, Workshop, MaintenanceServiceItem, WorkshopAppointment, ClientRecord, NotificationItem } from '../types';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2021,
    plate: 'AB123CD',
    image: '/toyota_hilux.jpg',
    color: 'Blanco Perlado',
    mileage: 48500,
    lastServiceDate: '10 Ene 2025',
    nextServiceDays: 8,
    nextServiceType: 'Cambio de aceite y filtros'
  },
  {
    id: 'veh-2',
    brand: 'Chevrolet',
    model: 'Spark',
    year: 2018,
    plate: 'FG456HI',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    color: 'Plata Metálico',
    mileage: 72300,
    lastServiceDate: '15 Nov 2024',
    nextServiceDays: 28,
    nextServiceType: 'Revisión de frenos'
  },
  {
    id: 'veh-3',
    brand: 'Ford',
    model: 'Fiesta',
    year: 2016,
    plate: 'JK789LM',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    color: 'Rojo Rubí',
    mileage: 104200,
    lastServiceDate: '05 Feb 2025',
    nextServiceDays: 45,
    nextServiceType: 'Alineación y balanceo'
  }
];

export const MOCK_SERVICES: MaintenanceServiceItem[] = [
  {
    id: 'serv-1',
    name: 'Cambio de aceite y filtros',
    description: 'Sintético o semisintético con reemplazo de filtro de aceite y aire de motor.',
    duration: '1-2 horas',
    estimatedPrice: '$45 - $65',
    iconName: 'Droplet',
    category: 'Mantenimiento preventivo'
  },
  {
    id: 'serv-2',
    name: 'Revisión de frenos',
    description: 'Inspección completa de pastillas, discos, tambores y purgado de líquido.',
    duration: '1-2 horas',
    estimatedPrice: '$35 - $80',
    iconName: 'Disc',
    category: 'Seguridad'
  },
  {
    id: 'serv-3',
    name: 'Alineación y balanceo',
    description: 'Calibración computarizada de las 4 ruedas y balanceo de rines.',
    duration: '1-2 horas',
    estimatedPrice: '$25 - $40',
    iconName: 'RotateCw',
    category: 'Tren delantero'
  },
  {
    id: 'serv-4',
    name: 'Cambio de batería',
    description: 'Prueba de alternador, diagnóstico de carga y reemplazo de acumulador.',
    duration: '1-2 horas',
    estimatedPrice: '$80 - $140',
    iconName: 'BatteryCharging',
    category: 'Eléctrico'
  },
  {
    id: 'serv-5',
    name: 'Diagnóstico general',
    description: 'Escaneo computarizado OBD-II, revisión multipunto y reporte digital.',
    duration: '1-2 horas',
    estimatedPrice: '$30 - $50',
    iconName: 'Activity',
    category: 'Electrónica'
  },
  {
    id: 'serv-6',
    name: 'Suspensión y amortiguadores',
    description: 'Revisión y sustitución de terminales, bujes, muñones y amortiguadores.',
    duration: '2-3 horas',
    estimatedPrice: '$70 - $180',
    iconName: 'Wrench',
    category: 'Tren delantero'
  }
];

export const MOCK_MAINTENANCES: MaintenanceRecord[] = [
  {
    id: 'maint-1',
    serviceId: 'serv-1',
    serviceName: 'Cambio de aceite y filtros',
    vehicleId: 'veh-1',
    vehicleName: 'Toyota Hilux 2021',
    vehiclePlate: 'AB123CD',
    date: '15 Abr 2025',
    time: '10:00 AM',
    status: 'Pendiente',
    shopName: 'AutoSoluciones C.A.',
    shopAddress: 'Av. principal, Valencia, Carabobo',
    price: '$55',
    iconName: 'Droplet',
    notes: 'Requiere aceite 5W-30 sintético.'
  },
  {
    id: 'maint-2',
    serviceId: 'serv-2',
    serviceName: 'Revisión de frenos',
    vehicleId: 'veh-1',
    vehicleName: 'Toyota Hilux 2021',
    vehiclePlate: 'AB123CD',
    date: '20 May 2025',
    time: '02:00 PM',
    status: 'Pendiente',
    shopName: 'AutoSoluciones C.A.',
    shopAddress: 'Av. principal, Valencia, Carabobo',
    price: '$45',
    iconName: 'Disc',
    notes: 'Revisar pastillas delanteras.'
  },
  {
    id: 'maint-3',
    serviceId: 'serv-3',
    serviceName: 'Alineación y balanceo',
    vehicleId: 'veh-2',
    vehicleName: 'Chevrolet Spark 2018',
    vehiclePlate: 'FG456HI',
    date: '10 Jun 2025',
    time: '09:00 AM',
    status: 'Programado',
    shopName: 'AutoSoluciones C.A.',
    shopAddress: 'Av. principal, Valencia, Carabobo',
    price: '$30',
    iconName: 'RotateCw'
  },
  {
    id: 'maint-4',
    serviceId: 'serv-4',
    serviceName: 'Cambio de batería',
    vehicleId: 'veh-2',
    vehicleName: 'Chevrolet Spark 2018',
    vehiclePlate: 'FG456HI',
    date: '12 Ago 2025',
    time: '11:00 AM',
    status: 'Programado',
    shopName: 'AutoSoluciones C.A.',
    shopAddress: 'Av. principal, Valencia, Carabobo',
    price: '$95',
    iconName: 'BatteryCharging'
  },
  {
    id: 'maint-5',
    serviceId: 'serv-5',
    serviceName: 'Diagnóstico general computarizado',
    vehicleId: 'veh-3',
    vehicleName: 'Ford Fiesta 2016',
    vehiclePlate: 'JK789LM',
    date: '14 Feb 2025',
    time: '03:00 PM',
    status: 'Realizado',
    shopName: 'AutoSoluciones C.A.',
    shopAddress: 'Av. principal, Valencia, Carabobo',
    price: '$35',
    iconName: 'Activity',
    notes: 'Todo en orden en sistema de inyección.'
  },
  {
    id: 'maint-6',
    serviceId: 'serv-1',
    serviceName: 'Cambio de aceite y filtro',
    vehicleId: 'veh-3',
    vehicleName: 'Ford Fiesta 2016',
    vehiclePlate: 'JK789LM',
    date: '28 Nov 2024',
    time: '10:30 AM',
    status: 'Realizado',
    shopName: 'Centro Automotriz Carabobo',
    shopAddress: 'Av. Bolívar Norte',
    price: '$50',
    iconName: 'Droplet'
  }
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'shop-1',
    name: 'AutoSoluciones C.A.',
    rating: 4.8,
    reviewCount: 124,
    distance: '2.3 km',
    address: 'Av. principal, Valencia, Carabobo',
    city: 'Valencia',
    phone: '+58 241-8254411',
    coverImage: '/workshop_garage.jpg',
    logoImage: 'https://i.postimg.cc/85qBZzyK/LOGO-WEB-RODA.png',
    specialties: ['Mecánica general', 'Electricidad'],
    servicesOffered: ['Mecánica general', 'Electricidad', 'Frenos', 'Suspensión', 'Diagnóstico'],
    lat: 10.2230,
    lng: -67.9940,
    openHours: 'Lun - Sáb: 8:00 AM - 5:00 PM'
  },
  {
    id: 'shop-2',
    name: 'Taller Mecánico El Águila',
    rating: 4.7,
    reviewCount: 89,
    distance: '3.1 km',
    address: 'Urb. Prebo, Calle 130, Valencia',
    city: 'Valencia',
    phone: '+58 241-8223399',
    coverImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
    specialties: ['Tren delantero', 'Frenos'],
    servicesOffered: ['Frenos', 'Suspensión', 'Mecánica general', 'Alineación'],
    lat: 10.2310,
    lng: -68.0050,
    openHours: 'Lun - Vie: 7:30 AM - 4:30 PM'
  },
  {
    id: 'shop-3',
    name: 'Centro Automotriz Carabobo',
    rating: 4.9,
    reviewCount: 210,
    distance: '1.8 km',
    address: 'Av. Bolívar Norte, Edf. Rueda, Valencia',
    city: 'Valencia',
    phone: '+58 241-8249900',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    specialties: ['Diagnóstico computarizado', 'Aire acondicionado'],
    servicesOffered: ['Diagnóstico', 'Mecánica general', 'Electricidad', 'A/C Automotriz'],
    lat: 10.2180,
    lng: -67.9890,
    openHours: 'Lun - Sáb: 8:00 AM - 6:00 PM'
  },
  {
    id: 'shop-4',
    name: 'ElectroAuto Express',
    rating: 4.6,
    reviewCount: 64,
    distance: '4.2 km',
    address: 'Zona Industrial El Recreo, Galpón 4',
    city: 'Valencia',
    phone: '+58 241-8712200',
    coverImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=200&q=80',
    specialties: ['Baterías', 'Alternadores'],
    servicesOffered: ['Electricidad', 'Baterías', 'Arranques', 'Diagnóstico'],
    lat: 10.2050,
    lng: -67.9750,
    openHours: 'Lun - Vie: 8:00 AM - 5:00 PM'
  }
];

export const MOCK_SHOP_APPOINTMENTS: WorkshopAppointment[] = [
  {
    id: 'app-1',
    time: '08:00 AM',
    date: '15 Abr 2025',
    clientName: 'Carlos Mendoza',
    clientPhone: '+58 414-3401234',
    vehicleName: 'Toyota Hilux 2021',
    plate: 'AB123CD',
    serviceName: 'Cambio de aceite y filtros',
    status: 'En proceso',
    price: '$55'
  },
  {
    id: 'app-2',
    time: '10:00 AM',
    date: '15 Abr 2025',
    clientName: 'María Rodríguez',
    clientPhone: '+58 412-8822456',
    vehicleName: 'Chevrolet Spark 2018',
    plate: 'FG456HI',
    serviceName: 'Revisión de frenos',
    status: 'Confirmada',
    price: '$45'
  },
  {
    id: 'app-3',
    time: '01:00 PM',
    date: '15 Abr 2025',
    clientName: 'Alejandro Ramos',
    clientPhone: '+58 424-4456789',
    vehicleName: 'Ford Fiesta 2016',
    plate: 'JK789LM',
    serviceName: 'Alineación y balanceo',
    status: 'Confirmada',
    price: '$30'
  },
  {
    id: 'app-4',
    time: '03:30 PM',
    date: '15 Abr 2025',
    clientName: 'Daniela Gómez',
    clientPhone: '+58 416-5591023',
    vehicleName: 'Jeep Grand Cherokee 2019',
    plate: 'MN554PO',
    serviceName: 'Diagnóstico general',
    status: 'Programado',
    price: '$40'
  },
  {
    id: 'app-5',
    time: '04:45 PM',
    date: '15 Abr 2025',
    clientName: 'Roberto Silva',
    clientPhone: '+58 414-9988112',
    vehicleName: 'Hyundai Tucson 2020',
    plate: 'XY987ZT',
    serviceName: 'Cambio de batería',
    status: 'Programado',
    price: '$95'
  }
];

export const MOCK_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-1',
    name: 'Carlos Mendoza',
    phone: '+58 414-3401234',
    email: 'carlos.mendoza@email.com',
    vehicle: 'Toyota Hilux 2021',
    plate: 'AB123CD',
    totalVisits: 5,
    lastVisit: '10 Ene 2025'
  },
  {
    id: 'cli-2',
    name: 'María Rodríguez',
    phone: '+58 412-8822456',
    email: 'maria.rodriguez@email.com',
    vehicle: 'Chevrolet Spark 2018',
    plate: 'FG456HI',
    totalVisits: 3,
    lastVisit: '15 Nov 2024'
  },
  {
    id: 'cli-3',
    name: 'Alejandro Ramos',
    phone: '+58 424-4456789',
    email: 'aramos@email.com',
    vehicle: 'Ford Fiesta 2016',
    plate: 'JK789LM',
    totalVisits: 7,
    lastVisit: '14 Feb 2025'
  },
  {
    id: 'cli-4',
    name: 'Daniela Gómez',
    phone: '+58 416-5591023',
    email: 'dgomez@email.com',
    vehicle: 'Jeep Grand Cherokee 2019',
    plate: 'MN554PO',
    totalVisits: 2,
    lastVisit: '02 Mar 2025'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Recordatorio de mantenimiento',
    message: 'Tu Toyota Hilux 2021 tiene pendiente el cambio de aceite y filtros en 8 días (15 Abr 2025).',
    date: 'Hace 2 horas',
    type: 'reminder',
    read: false,
    actionScreen: 'owner_maintenances'
  },
  {
    id: 'notif-2',
    title: 'Cita confirmada',
    message: 'El taller AutoSoluciones C.A. confirmó tu cita para el 15 de Abril a las 10:00 AM.',
    date: 'Ayer',
    type: 'confirmation',
    read: false,
    actionScreen: 'owner_maintenances'
  },
  {
    id: 'notif-3',
    title: 'Promoción de frenos',
    message: '20% de descuento en revisión y rectificación de frenos durante todo este mes.',
    date: 'Hace 3 días',
    type: 'alert',
    read: true,
    actionScreen: 'owner_nearby_shops'
  }
];

export const MOCK_SHOP_POPULAR_SERVICES = [
  { name: 'Cambio de aceite y filtros', count: 12, icon: 'Droplet' },
  { name: 'Revisión de frenos', count: 8, icon: 'Disc' },
  { name: 'Alineación y balanceo', count: 6, icon: 'RotateCw' },
  { name: 'Cambio de batería', count: 4, icon: 'BatteryCharging' }
];
