import { User } from '@/interfaces/user.interface';
import { Trip } from '@/interfaces/trip.interface';
import { Cluster } from '@/interfaces/cluster.interface';

export interface Company {
  id: number;
  name: string;
  siren: string;
  logo: string;
  auth_code: string;
  cluster: Cluster | null;
  updated_at: string;
  created_at: string;
  users: User[];
  trips: Trip[];
}
