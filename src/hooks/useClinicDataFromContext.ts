'use client';

import { useClinic } from '@/contexts/ClinicContext';
import { useClinicData } from './useClinicData';

/**
 * Hook that uses clinic data from context (if available from API)
 * Otherwise falls back to fetching dummy data using template name
 *
 * This prevents duplicate API calls - if data was already fetched in ClinicContext,
 * it uses that data directly instead of fetching again.
 */
export const useClinicDataFromContext = (templateName: string) => {
  const {
    doctorId,
    clinicData,
    clinicValidation,
    isLoading: contextLoading,
    apiDataFetched,
    apiDataInvalid,
  } = useClinic();

  // Check if API data theme matches the current template
  // Only use API data if the theme matches the template route
  const apiThemeMatchesTemplate = clinicData?.theme === templateName;

  // If we have valid API data from context AND theme matches current template, use it directly
  const hasValidApiData =
    doctorId &&
    clinicData &&
    clinicValidation?.isValid &&
    apiThemeMatchesTemplate;

  // If API data is invalid AND theme matches, don't fall back to dummy - show error instead
  // If theme doesn't match, we'll use dummy data (not an error case)
  const shouldShowError =
    doctorId && apiDataFetched && apiDataInvalid && apiThemeMatchesTemplate;

  // Only fetch dummy data if:
  // 1. We don't have matching API data AND
  // 2. API data is not invalid for this template (if invalid, show error instead) AND
  // 3. API fetch is complete (prevents flicker - don't fetch dummy while waiting for API)
  const shouldFetchDummy =
    !hasValidApiData && !shouldShowError && apiDataFetched;

  // Note: We always call the hook (can't conditionally call hooks)
  // but it will only fetch if shouldFetchDummy is true
  const {
    clinic: dummyClinic,
    validation: dummyValidation,
    isLoading: dummyLoading,
  } = useClinicData(
    shouldFetchDummy ? templateName : '' // Only fetch dummy if API fetch is complete and no API data
  );

  // If API is still loading, show loading state
  // If API data exists and theme matches, use it
  // If API data is invalid and theme matches, return validation errors (will show error screen)
  // If API fetch complete but no matching data and not invalid, use dummy data
  const isLoading =
    contextLoading ||
    (!apiDataFetched && doctorId && apiThemeMatchesTemplate) ||
    (!hasValidApiData && !shouldShowError && shouldFetchDummy && dummyLoading);

  // If API data is invalid for this template, return validation errors (don't use dummy data)
  if (shouldShowError && clinicValidation) {
    return {
      clinic: null,
      validation: clinicValidation,
      isLoading: false,
      source: 'api' as const,
    };
  }

  // Return API data if available and theme matches, otherwise return dummy data
  return {
    clinic: hasValidApiData ? clinicData : dummyClinic,
    validation: hasValidApiData
      ? clinicValidation || { isValid: false, errors: [] }
      : dummyValidation,
    isLoading,
    source: hasValidApiData ? ('api' as const) : ('dummy' as const),
  };
};
