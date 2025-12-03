import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// In-memory token cache (client-side only, NOT persisted)
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const getAccessToken = async (): Promise<string | null> => {
  // Check if we have a valid cached token
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
    console.log('[Axios] Using cached token');
    return cachedToken;
  }

  // Token expired or not cached, fetch from server
  try {
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.expired || !data.token) {
        return null;
      }
      throw new Error(data.error || 'Failed to get token');
    }

    const data = await response.json();

    // Cache the token in memory
    if (data.token) {
      cachedToken = data.token;
      // Set expiry (token lifetime minus 1 minute buffer)
      // Assuming 1 hour token, cache for 59 minutes
      tokenExpiry = Date.now() + 59 * 60 * 1000;
      console.log(
        '[Axios] Token cached until:',
        new Date(tokenExpiry).toISOString()
      );
    }

    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

const fetchAbdmToken = async (): Promise<string | null> => {
  try {
    const authResponse = await fetch('/api/abdm/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with ABDM');
    }

    const authData = await authResponse.json();
    console.log('authData', authData, '---------');
    if (!authData.success || !authData.token) {
      throw new Error('ABDM authentication failed');
    }

    console.log('[Axios] Authentication successful, token received');

    // Cache the new token
    if (authData.token) {
      cachedToken = authData.token;
      tokenExpiry = Date.now() + 59 * 60 * 1000;
      console.log('[Axios] New token cached');
    }

    return authData.token;
  } catch (error) {
    console.error('Error fetching ABDM token:', error);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isAuthEndpoint =
      config.url?.includes('/api/auth') ||
      config.url?.includes('/api/abdm/auth');

    if (isAuthEndpoint) {
      return config;
    }

    try {
      let token = await getAccessToken();

      if (!token) {
        console.log('No valid token found, fetching new ABDM token...');
        token = await fetchAbdmToken();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(
          'Could not get ABDM token, proceeding without Authorization header'
        );
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('401 error, clearing cached token and fetching new one...');
        // Clear cached token on 401
        cachedToken = null;
        tokenExpiry = null;

        const newToken = await fetchAbdmToken();

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    }

    return Promise.reject(
      (error.response && error.response.data) ||
        error.message ||
        'Something went wrong'
    );
  }
);

// Export function to clear token cache (useful for logout)
export const clearTokenCache = () => {
  cachedToken = null;
  tokenExpiry = null;
  console.log('[Axios] Token cache cleared');
};

export default axiosInstance;
