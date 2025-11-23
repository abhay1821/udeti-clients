'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Clinic } from '@/types/Clinic';
import allClinicsData from '@/data/clinics';
import {
  validateMandatoryFields,
  ValidationResult,
} from '@/utils/clinicValidation';
import { fetchClinicFromApi, isApiModeEnabled } from '@/services/clinicApi';

export interface ValidatedClinic {
  clinic: Clinic | null;
  validation: ValidationResult;
  source?: 'api' | 'dummy';
}

interface ClinicContextType {
  clinics: Clinic[];
  getClinicById: (id: string) => Clinic | undefined;
  getValidatedClinic: (id: string) => Promise<ValidatedClinic>;
  isLoading: boolean;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dummyClinics = useMemo(() => allClinicsData as Clinic[], []);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingClinics, setLoadingClinics] = useState<Set<string>>(new Set());

  const getClinicById = useCallback(
    (id: string): Clinic | undefined => {
      return dummyClinics.find(clinic => clinic.id === id);
    },
    [dummyClinics]
  );

  const fetchClinicById = useCallback(
    async (id: string): Promise<Clinic | null> => {
      if (!isApiModeEnabled()) {
        return null;
      }

      if (loadingClinics.has(id)) {
        return null;
      }
      setLoadingClinics(prev => new Set(prev).add(id));
      setIsLoading(true);
      try {
        const clinic = await fetchClinicFromApi(id);
        return clinic;
      } catch (error) {
        console.error(`Error fetching clinic ${id} from API:`, error);
        return null;
      } finally {
        setIsLoading(false);
        setLoadingClinics(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [loadingClinics]
  );

  const getValidatedClinic = useCallback(
    async (id: string): Promise<ValidatedClinic> => {
      let clinic: Clinic | undefined | null = null;
      let source: 'api' | 'dummy' = 'dummy';

      if (isApiModeEnabled()) {
        clinic = await fetchClinicById(id);

        if (clinic) {
          source = 'api';
          const validation = validateMandatoryFields(clinic);

          if (validation.isValid) {
            return {
              clinic,
              validation,
              source,
            };
          }

          console.error(
            `API data for clinic ${id} is invalid:`,
            validation.errors
          );

          return {
            clinic: null,
            validation,
            source,
          };
        }
      }

      clinic = dummyClinics.find(c => c.id === id);
      const validation = validateMandatoryFields(clinic);

      return {
        clinic: clinic || null,
        validation,
        source: 'dummy',
      };
    },
    [dummyClinics, fetchClinicById]
  );

  // Return dummy clinics by default (templates can opt-in to API per-template)
  const clinics = useMemo(() => dummyClinics, [dummyClinics]);

  const value = useMemo(
    () => ({
      clinics,
      getClinicById,
      getValidatedClinic,
      isLoading,
    }),
    [clinics, getClinicById, getValidatedClinic, isLoading]
  );

  return (
    <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
