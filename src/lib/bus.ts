export interface Bus {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  driverId?: string;
  routeId?: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  startLocation: string;
  endLocation: string;
  distance: number; // in kilometers
  estimatedDuration: number; // in minutes
  stops: RouteStop[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RouteStop {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  order: number;
  estimatedArrival: number; // minutes from start
}

export interface Schedule {
  id: string;
  busId: string;
  routeId: string;
  driverId: string;
  departureTime: string; // HH:MM format
  arrivalTime: string; // HH:MM format
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  experience: number; // years
  rating: number; // 1-5
  createdAt: Date;
  updatedAt: Date;
}

export interface BusAnalytics {
  totalBuses: number;
  activeBuses: number;
  maintenanceBuses: number;
  inactiveBuses: number;
  totalRoutes: number;
  activeRoutes: number;
  totalDrivers: number;
  activeDrivers: number;
  dailyTrips: number;
  weeklyTrips: number;
  monthlyTrips: number;
  averageUtilization: number; // percentage
  maintenanceAlerts: number;
  driverAlerts: number;
}

// Mock data for development
export const mockBuses: Bus[] = [
  {
    id: '1',
    plateNumber: 'SL-001-ABC',
    model: 'Toyota Coaster',
    capacity: 30,
    status: 'active',
    driverId: '1',
    routeId: '1',
    lastMaintenance: new Date('2024-01-15'),
    nextMaintenance: new Date('2024-04-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    plateNumber: 'SL-002-DEF',
    model: 'Isuzu NPR',
    capacity: 25,
    status: 'maintenance',
    driverId: '2',
    routeId: '2',
    lastMaintenance: new Date('2024-01-20'),
    nextMaintenance: new Date('2024-04-20'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    plateNumber: 'SL-003-GHI',
    model: 'Mercedes Sprinter',
    capacity: 20,
    status: 'active',
    driverId: '3',
    routeId: '1',
    lastMaintenance: new Date('2024-01-10'),
    nextMaintenance: new Date('2024-04-10'),
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Hargeisa - Berbera',
    description: 'Main route connecting capital to port city',
    startLocation: 'Hargeisa',
    endLocation: 'Berbera',
    distance: 120,
    estimatedDuration: 90,
    stops: [
      {
        id: '1',
        name: 'Hargeisa Central',
        address: 'Hargeisa City Center',
        coordinates: { lat: 9.5616, lng: 44.0650 },
        order: 1,
        estimatedArrival: 0,
      },
      {
        id: '2',
        name: 'Gabiley',
        address: 'Gabiley Town Center',
        coordinates: { lat: 9.7167, lng: 43.9167 },
        order: 2,
        estimatedArrival: 30,
      },
      {
        id: '3',
        name: 'Berbera Port',
        address: 'Berbera Port Area',
        coordinates: { lat: 10.4333, lng: 45.0167 },
        order: 3,
        estimatedArrival: 90,
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Hargeisa - Burao',
    description: 'Route to eastern regions',
    startLocation: 'Hargeisa',
    endLocation: 'Burao',
    distance: 150,
    estimatedDuration: 120,
    stops: [
      {
        id: '4',
        name: 'Hargeisa Central',
        address: 'Hargeisa City Center',
        coordinates: { lat: 9.5616, lng: 44.0650 },
        order: 1,
        estimatedArrival: 0,
      },
      {
        id: '5',
        name: 'Sheikh',
        address: 'Sheikh Town',
        coordinates: { lat: 9.3333, lng: 44.1667 },
        order: 2,
        estimatedArrival: 60,
      },
      {
        id: '6',
        name: 'Burao Center',
        address: 'Burao City Center',
        coordinates: { lat: 9.5167, lng: 45.5333 },
        order: 3,
        estimatedArrival: 120,
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    licenseNumber: 'SL-DL-001',
    phone: '+252-61-123-4567',
    email: 'ahmed.hassan@example.com',
    status: 'active',
    experience: 5,
    rating: 4.5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Fatima Ali',
    licenseNumber: 'SL-DL-002',
    phone: '+252-61-234-5678',
    email: 'fatima.ali@example.com',
    status: 'active',
    experience: 3,
    rating: 4.2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Omar Mohamed',
    licenseNumber: 'SL-DL-003',
    phone: '+252-61-345-6789',
    email: 'omar.mohamed@example.com',
    status: 'inactive',
    experience: 7,
    rating: 4.8,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    busId: '1',
    routeId: '1',
    driverId: '1',
    departureTime: '08:00',
    arrivalTime: '09:30',
    dayOfWeek: 1, // Monday
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    busId: '2',
    routeId: '2',
    driverId: '2',
    departureTime: '10:00',
    arrivalTime: '12:00',
    dayOfWeek: 1, // Monday
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Utility functions
export function getBusStatusColor(status: Bus['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getDriverStatusColor(status: Driver['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getMaintenanceStatus(bus: Bus): 'good' | 'warning' | 'urgent' {
  const now = new Date();
  const daysUntilMaintenance = Math.ceil((bus.nextMaintenance.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilMaintenance <= 7) return 'urgent';
  if (daysUntilMaintenance <= 30) return 'warning';
  return 'good';
}

export function getMaintenanceStatusColor(status: 'good' | 'warning' | 'urgent'): string {
  switch (status) {
    case 'good':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function formatDistance(km: number): string {
  return `${km} km`;
}

export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}
