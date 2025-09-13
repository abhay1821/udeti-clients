export interface Doctor {
  id: string;
  name: string;
  specialization?: string;
  experience?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface TimeSlots {
  morning: TimeSlot[];
  afternoon: TimeSlot[];
}

export interface AppointmentFormData {
  doctors: Doctor[];
  timeSlots: TimeSlots;
  formLabels: {
    title: string;
    subtitle: string;
    doctorLabel: string;
    dateLabel: string;
    timeLabel: string;
    personalInfoLabel: string;
    fullNameLabel: string;
    mobileLabel: string;
    emailLabel: string;
    bookButton: string;
    contactInfo: {
      title: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
}

export const appointmentData: AppointmentFormData = {
  doctors: [
    {
      id: '1',
      name: 'Dr. Yuvaraj',
      specialization: 'General Surgery',
      experience: '15+ years',
    },
    {
      id: '2',
      name: 'Dr. Ankit',
      specialization: 'Dental Care',
      experience: '10+ years',
    },
    {
      id: '3',
      name: 'Dr. Anurag',
      specialization: 'Wellness',
      experience: '12+ years',
    },
    {
      id: '4',
      name: 'Dr. Priya',
      specialization: 'Mental Health',
      experience: '8+ years',
    },
    {
      id: '5',
      name: 'Dr. Rajesh',
      specialization: 'Orthopedics',
      experience: '20+ years',
    },
  ],

  timeSlots: {
    morning: [
      { time: '9:00 AM', available: true },
      { time: '9:30 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '10:30 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '11:30 AM', available: false },
    ],
    afternoon: [
      { time: '2:00 PM', available: true },
      { time: '2:30 PM', available: true },
      { time: '3:00 PM', available: false },
      { time: '3:30 PM', available: true },
      { time: '4:00 PM', available: true },
      { time: '4:30 PM', available: false },
      { time: '5:00 PM', available: true },
      { time: '5:30 PM', available: true },
    ],
  },

  formLabels: {
    title: 'Book Your Appointment',
    subtitle: 'Schedule your visit with our experienced medical professionals',
    doctorLabel: 'Select Doctor',
    dateLabel: 'Preferred Date',
    timeLabel: 'Preferred Time',
    personalInfoLabel: 'Personal Information',
    fullNameLabel: 'Full Name',
    mobileLabel: 'Mobile Number',
    emailLabel: 'Email Address',
    bookButton: 'Book Appointment',
    contactInfo: {
      title: 'Need Help?',
      phone: '+1 (555) 123-4567',
      email: 'appointments@clinic.com',
      hours: 'Mon-Fri: 9AM-6PM',
    },
  },
};

export const getAvailableTimeSlots = (timeSlots: TimeSlots): TimeSlot[] => {
  return [...timeSlots.morning, ...timeSlots.afternoon].filter(
    slot => slot.available
  );
};

export const getDoctorById = (
  doctors: Doctor[],
  id: string
): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};

export const getDoctorByName = (
  doctors: Doctor[],
  name: string
): Doctor | undefined => {
  return doctors.find(doctor => doctor.name === name);
};
