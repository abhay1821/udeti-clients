import { Clinic } from '@/types/Clinic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export interface ClinicApiResponse {
  success: boolean;
  data?: Clinic;
  error?: string;
}

export const fetchClinicFromApi = async (
  clinicId: string
): Promise<Clinic | null> => {
  let apiUrl: string;
  if (API_BASE_URL) {
    apiUrl = `${API_BASE_URL}/api/clinics/${clinicId}`;
    console.log('apiUrl1', apiUrl);
  } else {
    apiUrl = `/api/clinics/${clinicId}`;
    console.log('apiUrl2', apiUrl);
  }

  try {
    const response = await fetch(apiUrl, {
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
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result: ClinicApiResponse = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching clinic ${clinicId} from API:`, error);
    return null;
  }
};

export const isApiModeEnabled = (): boolean => {
  return true;
};
