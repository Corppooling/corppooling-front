import { DateTime, type DateTimeFormatOptions } from "luxon";
import { computed } from "vue";

const locale = computed((): string => {
  return localStorage?.getItem("lang") ?? "fr";
});

export const dateFormated = (date: string): string => {
  const formatOptions = computed((): DateTimeFormatOptions => {
    if (DateTime.now().year !== DateTime.fromISO(date).year) {
      return {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
    }
    return {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
  });

  return DateTime.fromISO(date).toLocaleString(formatOptions.value, {
    locale: locale.value,
  });
};

export const dateFormatedShort = (date: string): string => {
  return DateTime.fromISO(date).toFormat("EEEE dd MMMM", {
    locale: locale.value,
  });
};

export const dateFormatedOnlyHours = (date: string): string => {
  return DateTime.fromISO(date).toFormat("HH:mm", {
    locale: locale.value,
  });
};
