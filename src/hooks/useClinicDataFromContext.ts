'use client';

import { useClinic } from '@/contexts/ClinicContext';
import { useClinicData } from './useClinicData';

export const useClinicDataFromContext = (templateName: string) => {
  const {
    clinicData,
    clinicValidation,
    isLoading: contextLoading,
    apiDataFetched,
    apiDataInvalid,
  } = useClinic();

  const apiTheme =
    clinicData?.theme ||
    (typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('clinicTheme') || 'null')
      : null);

  const apiThemeMatchesTemplate = apiTheme === templateName;

  const hasValidApiData =
    clinicData && clinicValidation?.isValid && apiThemeMatchesTemplate;

  const shouldShowError = apiDataFetched && apiDataInvalid;

  const shouldFetchDummy =
    !hasValidApiData && !shouldShowError && apiDataFetched;

  const {
    clinic: dummyClinic,
    validation: dummyValidation,
    isLoading: dummyLoading,
  } = useClinicData(shouldFetchDummy ? templateName : '');

  const isLoading =
    contextLoading ||
    (!apiDataFetched && apiThemeMatchesTemplate) ||
    (!hasValidApiData && !shouldShowError && shouldFetchDummy && dummyLoading);

  if (shouldShowError) {
    console.warn('🚨 API data invalid - showing error instead of dummy data:', {
      shouldShowError,
      apiDataFetched,
      apiDataInvalid,
      apiThemeMatchesTemplate,
      clinicValidation,
      hasClinicData: !!clinicData,
    });
    return {
      clinic: null,
      validation: clinicValidation || {
        isValid: false,
        errors: ['API data validation failed'],
      },
      isLoading: false,
      source: 'api' as const,
    };
  }

  return {
    clinic: hasValidApiData
      ? clinicData
      : shouldFetchDummy
        ? dummyClinic
        : null,
    validation: hasValidApiData
      ? clinicValidation || { isValid: false, errors: [] }
      : shouldFetchDummy
        ? dummyValidation
        : { isValid: false, errors: [] },
    isLoading,
    source: hasValidApiData ? ('api' as const) : ('dummy' as const),
  };
};
