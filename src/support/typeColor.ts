import { TripType } from '@/interfaces/trip.interface';

/**
 * Get the color of the type
 * @param type
 */
export const bgTypeColor = (type: TripType | undefined): string => {
  switch (type) {
    case TripType.DRIVER:
      return 'bg-main-base';
    default:
      return 'bg-content-flight';
  }
};
