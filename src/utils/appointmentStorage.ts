export interface AppointmentBooking {
  id: string;
  clinicId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email: string;
  city: string;
  serviceId?: string;
  createdAt: string;
}

const STORAGE_KEY = 'appointment_bookings';
const MAX_OVERBOOKING = 2;

export const getBookings = (): AppointmentBooking[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
};

export const saveBooking = (
  booking: Omit<AppointmentBooking, 'id' | 'createdAt'>
): AppointmentBooking => {
  const bookings = getBookings();
  const newBooking: AppointmentBooking = {
    ...booking,
    id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
};

export const getBookingCount = (
  clinicId: string,
  date: string,
  timeSlot: string
): number => {
  const bookings = getBookings();
  return bookings.filter(
    booking =>
      booking.clinicId === clinicId &&
      booking.date === date &&
      booking.timeSlot === timeSlot
  ).length;
};

export const isSlotAvailable = (
  clinicId: string,
  date: string,
  timeSlot: string
): boolean => {
  const count = getBookingCount(clinicId, date, timeSlot);
  return count < MAX_OVERBOOKING;
};

export const getAvailableSlots = (
  clinicId: string,
  date: string,
  allSlots: string[]
): Array<{ slot: string; available: boolean; bookingCount: number }> => {
  return allSlots.map(slot => {
    const count = getBookingCount(clinicId, date, slot);
    return {
      slot,
      available: count < MAX_OVERBOOKING,
      bookingCount: count,
    };
  });
};
