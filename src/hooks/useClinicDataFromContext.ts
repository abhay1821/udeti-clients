'use client';

import { useClinic } from '@/contexts/ClinicContext';
import { validateMandatoryFields } from '@/utils/clinicValidation';

export const useClinicDataFromContext = (templateName: string) => {
  const {
    clinicData,
    clinicValidation,
    isLoading: contextLoading,
    apiDataFetched,
    apiDataInvalid,
    getClinicById,
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

  // Get dummy clinic directly from context using getClinicById
  const dummyClinic = shouldFetchDummy
    ? getClinicById(templateName)
    : undefined;
  const dummyValidation = dummyClinic
    ? validateMandatoryFields(dummyClinic)
    : { isValid: false, errors: [] };

  const isLoading =
    contextLoading || (!apiDataFetched && apiThemeMatchesTemplate);

  if (shouldShowError) {
    console.warn(' API data invalid - showing error instead of dummy data:', {
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
        ? dummyClinic || null
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
