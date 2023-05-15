import type { Department } from '@/interfaces/department.interface';
import type { Company } from '@/interfaces/company.interface';
import { Trip } from '@/interfaces/trip.interface';

export interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  presentation?: string;
  profile_image?: string;
  role: Role[];
  created_at: string;
  updated_at: string;
  department: Department;
  company: Company;
  reservations: Trip[];
  trips: Trip[];
}

export const enum Role {
  ADMIN = 'ROLE_ADMIN',
  MANAGER = 'ROLE_MANAGER',
  USER = 'ROLE_USER',
}
