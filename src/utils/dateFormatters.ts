import { format } from 'date-fns';

export const formatDisplayDate = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'EEE, MMM d, yyyy');
};

export const formatTimeOnly = (timeSlot: string): string => {
  const [time] = timeSlot.split(' ');
  return time;
};
