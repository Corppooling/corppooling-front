import type { User } from '@/interfaces/user.interface';
import type { Company } from '@/interfaces/company.interface';

export interface Trip {
  id: number;
  departure_location: string;
  arrival_location: string;
  departure_time: string;
  available_seats: number | null;
  message?: string;
  price?: number;
  car_model?: string;
  car_color?: string;
  updated_at: string;
  created_at: string;
  members: User[];
  type: TripType;
  company: Company;
  announcer: User;
}

export enum TripType {
  PASSENGER = 'passenger',
  DRIVER = 'driver',
}
