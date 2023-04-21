import { DateTime, type DateTimeFormatOptions } from 'luxon';
import { computed } from 'vue';
import { localeLang } from '@/support/i18n';

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

export const dateFormatedShort = (date: string): string => {
  return DateTime.fromISO(date).toFormat('EEEE dd MMMM', {
    locale: localeLang(),
  });
};

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
