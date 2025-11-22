import { Clinic } from '@/types/Clinic';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

export const hasData = (value: unknown): boolean => {
  return !isEmpty(value);
};

export const validateMandatoryFields = (
  clinic: Clinic | null | undefined
): ValidationResult => {
  const errors: string[] = [];

  if (!clinic) {
    return {
      isValid: false,
      errors: ['Clinic data is missing'],
    };
  }

  if (!clinic.id || clinic.id.trim() === '') {
    errors.push('Clinic ID is required');
  }

  if (!clinic.name || clinic.name.trim() === '') {
    errors.push('Clinic name is required');
  }

  if (!clinic.hero) {
    errors.push('Hero section data is required');
  } else {
    if (!clinic.hero.title || clinic.hero.title.trim() === '') {
      errors.push('Hero title is required');
    }
    if (!clinic.hero.subtitle || clinic.hero.subtitle.trim() === '') {
      errors.push('Hero subtitle is required');
    }
  }

  if (!clinic.contact) {
    errors.push('Contact information is required');
  } else {
    if (!clinic.contact.phone || clinic.contact.phone.trim() === '') {
      errors.push('Contact phone is required');
    }
    if (!clinic.contact.email || clinic.contact.email.trim() === '') {
      errors.push('Contact email is required');
    }
    if (!clinic.contact.address || clinic.contact.address.trim() === '') {
      errors.push('Contact address is required');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const hasServices = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return (
    hasData(clinic.services) &&
    Array.isArray(clinic.services) &&
    clinic.services.length > 0
  );
};

export const hasTestimonials = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return (
    hasData(clinic.testimonials) &&
    Array.isArray(clinic.testimonials) &&
    clinic.testimonials.length > 0
  );
};

export const hasGalleryImages = (
  clinic: Clinic | null | undefined
): boolean => {
  if (!clinic) return false;
  return (
    hasData(clinic.galleryImages) &&
    Array.isArray(clinic.galleryImages) &&
    clinic.galleryImages.length > 0
  );
};

export const hasAbout = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return hasData(clinic.about);
};

export const hasDoctors = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return (
    hasData(clinic.doctors) &&
    Array.isArray(clinic.doctors) &&
    clinic.doctors.length > 0
  );
};

export const hasLogo = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return hasData(clinic.logo) && clinic.logo.trim() !== '';
};

export const hasSocial = (clinic: Clinic | null | undefined): boolean => {
  if (!clinic) return false;
  return hasData(clinic.social);
};
