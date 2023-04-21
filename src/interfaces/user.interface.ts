import type { Department } from '@/interfaces/department.interface';
import type { Company } from '@/interfaces/company.interface';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  presentation?: string;
  profile_image?: string;
  role: Role;
  created_at: string;
  updated_at: string;
  department: Department;
  company: Company;
}

export const enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}
