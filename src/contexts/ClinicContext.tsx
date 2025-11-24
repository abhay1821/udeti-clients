'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Clinic } from '@/types/Clinic';
import allClinicsData from '@/data/clinics';
import {
  validateMandatoryFields,
  ValidationResult,
} from '@/utils/clinicValidation';
export interface ValidatedClinic {
  clinic: Clinic | null;
  validation: ValidationResult;
  source?: 'api' | 'dummy';
}

interface ClinicContextType {
  getClinicById: (id: string) => Clinic | undefined;
  getValidatedClinic: (id: string) => Promise<ValidatedClinic>;
  isLoading: boolean;
  theme: string | null;
  clinicData: Clinic | null;
  clinicValidation: ValidationResult | null;
  apiDataFetched: boolean;
  apiDataInvalid: boolean;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dummyClinics = useMemo(() => allClinicsData as Clinic[], []);

  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<string | null>(null); // Template name for redirect
  const [clinicData, setClinicData] = useState<Clinic | null>(null);
  const [clinicValidation, setClinicValidation] =
    useState<ValidationResult | null>(null);
  const [apiDataFetched, setApiDataFetched] = useState(false);
  const [apiDataInvalid, setApiDataInvalid] = useState(false);

  useEffect(() => {
    const initializeClinic = async () => {
      try {
        setIsLoading(true);
        // sessionStorage.removeItem('clinicConfig');
        // sessionStorage.removeItem('doctorId');
        // const envResponse = await fetch('/assets/environment.json');
        // if (!envResponse.ok) {
        //   setApiDataFetched(true);
        //   throw new Error('Failed to fetch environment config');
        // }
        // const envData = await envResponse.json();

        // sessionStorage.setItem('clinicConfig', JSON.stringify(envData));
        // sessionStorage.setItem('doctorId', envData.doctorId);

        // const clinicId = envData.doctorId;
        // const clinicId = process.env.NEXT_PUBLIC_DOCTOR_ID;

        const clinicId = window.location.host;

        if (!clinicId) {
          setApiDataFetched(true);
          return;
        }

        const apiResponse = await fetch(`/api/clinics/${clinicId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (apiResponse.ok) {
          const result = await apiResponse.json();
          const clinic = result.data;
          console.log('clinic', clinic);

          if (clinic) {
            const clinicTheme =
              typeof clinic.theme === 'string' ? clinic.theme : 'default';
            sessionStorage.setItem('clinicTheme', JSON.stringify(clinicTheme));
            setTheme(clinicTheme);

            const validation = validateMandatoryFields(clinic);
            setClinicValidation(validation);

            if (validation.isValid) {
              setClinicData(clinic);
              setApiDataInvalid(false);
              setApiDataFetched(true);
            } else {
              console.error('API clinic data is invalid:', validation.errors);
              setClinicData(null);
              setApiDataInvalid(true);
              setApiDataFetched(true);
            }
          } else {
            setApiDataFetched(true);
            setApiDataInvalid(false);
          }
        } else {
          setApiDataFetched(true);
          setApiDataInvalid(false);
        }
      } catch (error) {
        console.error('Error initializing clinic:', error);
        setApiDataFetched(true);
        setApiDataInvalid(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeClinic();
  }, []);

  const getClinicById = useCallback(
    (id: string): Clinic | undefined => {
      return dummyClinics.find(clinic => clinic.id === id);
    },
    [dummyClinics]
  );

  const getValidatedClinic = useCallback(
    async (id: string): Promise<ValidatedClinic> => {
      const clinic = getClinicById(id);
      const validation = validateMandatoryFields(clinic);

      return {
        clinic: clinic || null,
        validation,
        source: 'dummy',
      };
    },
    [getClinicById]
  );

  const value = useMemo(
    () => ({
      getClinicById,
      getValidatedClinic,
      isLoading,
      theme,
      clinicData,
      clinicValidation,
      apiDataFetched,
      apiDataInvalid,
    }),
    [
      getClinicById,
      getValidatedClinic,
      isLoading,
      theme,
      clinicData,
      clinicValidation,
      apiDataFetched,
      apiDataInvalid,
    ]
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
