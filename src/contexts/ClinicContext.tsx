'use client';

import React, { createContext, useContext, useState } from 'react';
import { Clinic } from '@/types/Clinic';
import allClinicsData from '@/data/clinics';

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
