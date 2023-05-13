import { DateTime, type DateTimeFormatOptions } from 'luxon';
import { computed } from 'vue';
import { localeLang } from '@/support/i18n';

/**
 * Return the date formatted
 * @param date
 */
export const dateFormated = (date: string): string => {
  const formatOptions = computed((): DateTimeFormatOptions => {
    if (DateTime.now().year !== DateTime.fromISO(date).year) {
      return {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
    }
    return {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
  });

  return DateTime.fromISO(date).toLocaleString(formatOptions.value, {
    locale: localeLang(),
  });
};

/**
 * Return the date formatted in short format
 * @param date
 */
export const dateFormatedShort = (date: string): string => {
  return DateTime.fromISO(date).toFormat('EEEE dd MMMM', {
    locale: localeLang(),
  });
};

/**
 * Return the date formatted with only hours
 * @param date
 */
export const dateFormatedOnlyHours = (date: string): string => {
  return DateTime.fromISO(date).toLocaleString(
    {
      hour: '2-digit',
      minute: '2-digit',
    },
    {
      locale: localeLang(),
    }
  );
};

/**
 * Return the actual date (format: YYYY-MM-DD)
 */
export const actualDate = (): string => {
  return DateTime.now().toISODate() as string;
};

/**
 * Return full actual date (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export const actualFullDate = (): string => {
  return DateTime.now().toISO() as string;
};
