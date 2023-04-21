import { TripType } from '@/interfaces/trip.interface';

export const bgTypeColor = (type: TripType | undefined): string => {
  switch (type) {
    case TripType.DRIVER:
      return 'bg-main-base';
    default:
      return 'bg-content-flight';
  }
};
