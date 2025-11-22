import { useMemo } from 'react';
import { getClinicTheme, ClinicTheme } from '@/data/themes/clinicThemes';

export const useClinicTheme = (clinicId: string): ClinicTheme => {
  return useMemo(() => {
    return getClinicTheme(clinicId);
  }, [clinicId]);
};
