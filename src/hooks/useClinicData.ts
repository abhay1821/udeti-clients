'use client';

import { useState, useEffect, useRef } from 'react';
import { useClinic, ValidatedClinic } from '@/contexts/ClinicContext';

export const useClinicData = (clinicId: string) => {
  const { getValidatedClinic, isLoading } = useClinic();
  const [clinicData, setClinicData] = useState<ValidatedClinic | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const getValidatedClinicRef = useRef(getValidatedClinic);

  useEffect(() => {
    getValidatedClinicRef.current = getValidatedClinic;
  }, [getValidatedClinic]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!clinicId || clinicId.trim() === '') {
      setIsLoadingData(false);
      return;
    }

    let isMounted = true;

    const loadClinic = async () => {
      setIsLoadingData(true);
      try {
        const validated = await getValidatedClinicRef.current(clinicId);
        if (isMounted) {
          setClinicData(validated);
        }
      } catch (error) {
        console.error(`Error loading clinic ${clinicId}:`, error);
        if (isMounted) {
          setClinicData({
            clinic: null,
            validation: {
              isValid: false,
              errors: ['Failed to load clinic data'],
            },
          });
        }
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    loadClinic();

    return () => {
      isMounted = false;
    };
  }, [clinicId, isClient]);

  if (!isClient) {
    return {
      clinic: null,
      validation: { isValid: false, errors: [] },
      source: 'dummy' as const,
      isLoading: true,
    };
  }

  return {
    clinic: clinicData?.clinic || null,
    validation: clinicData?.validation || { isValid: false, errors: [] },
    source: clinicData?.source || 'dummy',
    isLoading: isLoading || isLoadingData,
  };
};
