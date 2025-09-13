'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import allClinicsData from '@/data/clinics';

interface Clinic {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    bulletPoints?: string[];
  }>;
  testimonials: Array<{
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  galleryImages?: string[];
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  doctors?: Array<{
    id: string;
    name: string;
    specialization: string;
    experience: string;
    quote: string;
    description: string;
    image: string;
  }>;
}

interface ClinicContextType {
  clinics: Clinic[];
  currentClinic: Clinic | null;
  setCurrentClinic: (clinicId: string) => void;
  getClinicById: (id: string) => Clinic | undefined;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinics] = useState<Clinic[]>(allClinicsData as Clinic[]);
  const [currentClinic, setCurrentClinicState] = useState<Clinic | null>(null);

  const setCurrentClinic = (clinicId: string) => {
    const clinic = clinics.find(c => c.id === clinicId);
    setCurrentClinicState(clinic || null);
  };

  const getClinicById = (id: string) => {
    return clinics.find(clinic => clinic.id === id);
  };

  return (
    <ClinicContext.Provider
      value={{
        clinics,
        currentClinic,
        setCurrentClinic,
        getClinicById,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
