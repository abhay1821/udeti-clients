export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  quote: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  bulletPoints?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface Social {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badgeText?: string;
}

export interface HeroBadge {
  title: string;
  description: string;
}

export interface HeroDoctorCard {
  name: string;
  title: string;
  location: string;
  image: string;
  highlights: string[];
}

export interface ClinicAbout {
  title: string;
  description: string[];
  image: string;
  education: string[];
  expertise: string[];
}

export interface Clinic {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  theme?: {
    heroBackground: string;
    textColor?: string;
    accentColor?: string;
    buttonColor?: string;
    footerBackground?: string;
    labelColor?: string;
    brownAccent?: string;
    componentBackground?: string;
  };
  hero: Hero;
  heroBadge?: HeroBadge;
  heroHighlights?: string[];
  heroDoctorCard?: HeroDoctorCard;
  services: Service[];
  testimonials: Testimonial[];
  contact: Contact;
  about?: ClinicAbout;
  galleryImages?: string[];
  social: Social;
  doctors?: Doctor[];
}

export interface ClinicTheme {
  heroBackground: string;
  primaryColor: string;
  secondaryColor: string;
  textColor?: string;
  accentColor?: string;
  buttonColor?: string;
  footerBackground?: string;
  labelColor?: string;
  brownAccent?: string;
  componentBackground?: string;
}
