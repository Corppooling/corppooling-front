import type { User } from "@/interfaces/user.interface";

export interface Trip {
  id: number;
  departure_location: string;
  arrival_location: string;
  departure_date: string;
  announcer: User;
  available_seats: number;
  type: TripType;
}

export enum TripType {
  PASSENGER = "passenger",
  DRIVER = "driver",
}
