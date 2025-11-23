'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Clinic, ClinicTheme } from '@/types/Clinic';
import allClinicsData from '@/data/clinics';
import {
  validateMandatoryFields,
  ValidationResult,
} from '@/utils/clinicValidation';
import { isApiModeEnabled } from '@/services/clinicApi';
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
  theme: ClinicTheme | null;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dummyClinics = useMemo(() => allClinicsData as Clinic[], []);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingClinics, setLoadingClinics] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<ClinicTheme | null>(null);

  // Fetch environment config and clinic data on mount
  useEffect(() => {
    const initializeClinic = async () => {
      try {
        setIsLoading(true);
        sessionStorage.removeItem('clinicConfig');
        sessionStorage.removeItem('doctorId');
        // Step 1: Fetch env.json
        const envResponse = await fetch('/assets/environment.json');
        if (!envResponse.ok) {
          throw new Error('Failed to fetch environment config');
        }
        const envData = await envResponse.json();

        // Store in sessionStorage
        sessionStorage.setItem('clinicConfig', JSON.stringify(envData));
        sessionStorage.setItem('doctorId', envData.doctorId);

        // Step 2: Fetch clinic data from API using doctorId
        const clinicId = envData.doctorId;
        const apiResponse = await fetch(`/api/clinics/${clinicId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (apiResponse.ok) {
          const result = await apiResponse.json();

          // If API returns theme, use it; otherwise use static
          const clinicTheme = result.data?.theme || 'default';

          sessionStorage.setItem('clinicTheme', JSON.stringify(clinicTheme));

          // Apply theme to document
          applyTheme(clinicTheme);
        }
      } catch (error) {
        console.error('Error initializing clinic:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeClinic();
  }, []);

  const applyTheme = (clinicTheme: ClinicTheme) => {
    console.log('Applying theme:', clinicTheme);
    setTheme(clinicTheme);
  };

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
        // Direct API call (not from router)
        const response = await fetch(`/api/clinics/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          return result.data;
        }

        return null;
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
      theme,
    }),
    [clinics, getClinicById, getValidatedClinic, isLoading, theme]
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
