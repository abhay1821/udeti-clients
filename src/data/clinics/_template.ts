export const clinicDataTemplate = {
  // Required fields
  id: 'doc-website-X',
  name: 'Dr. Example Name',
  tagline: 'Example Tagline',
  description: 'Example description text',

  logo: '',
  hero: {
    title: 'Example Hero Title',
    subtitle: 'Example hero subtitle text',
    backgroundImage: '/images/doctors/doctor-1.jpg',
    ctaText: 'Book Appointment',
    ctaLink: '#appointment',
    secondaryCtaText: undefined, // Optional
    secondaryCtaLink: undefined, // Optional
    badgeText: undefined, // Optional
    badge: undefined, // Optional - HeroBadge object
    highlights: undefined,
    doctorCard: undefined,
  },

  // About - should always be present (can have empty arrays if not used)
  about: {
    title: 'About Dr. Example Name',
    description: ['Description paragraph 1', 'Description paragraph 2'],
    image: '/images/doctors/doctor-1.jpg',
    yearsOfExperience: undefined, // Optional
    education: [], // Should always be array (can be empty)
    expertise: [], // Should always be array (can be empty)
  },

  // Services - should always be array (can be empty)
  services: [
    {
      id: 'service-1',
      title: 'Service Title',
      description: 'Service description',
      icon: undefined, // Optional
      image: undefined, // Optional
      bulletPoints: undefined, // Optional - string[]
    },
  ],

  // Testimonials - should always be array (can be empty)
  testimonials: [
    {
      id: 1,
      name: 'Patient Name',
      role: 'Patient Role',
      content: 'Testimonial content',
      rating: 5,
      image: '/images/doctors/doctor-1.jpg',
    },
  ],

  // Contact - all fields required
  contact: {
    phone: '+91 9876543210',
    email: 'info@example.com',
    address: 'Address, City, Country',
    hours: 'Mon-Sat: 9AM-7PM',
  },

  // Gallery Images - should always be array (can be empty)
  galleryImages: [],

  // Social - all fields required
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },

  // Doctors - optional, can be undefined or empty array
  doctors: undefined,
};
