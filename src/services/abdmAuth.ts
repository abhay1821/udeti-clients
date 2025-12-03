import { clearTokenCache } from '@/lib/axios';
export type AbdmSession = {
  accessToken?: string;
  tokenType: string;
};

export const getStoredSession = async (): Promise<AbdmSession | null> => {
  try {
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.success && data.token) {
      return {
        accessToken: data.token,
        tokenType: data.tokenType || 'bearer',
      };
    }

    return null;
  } catch (error) {
    console.error('Error reading ABDM session:', error);
    return null;
  }
};

export const handleAuth = async (): Promise<AbdmSession | null> => {
  try {
    const authResponse = await fetch('/api/abdm/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const authData = await authResponse.json();

    if (!authData.success || !authData.token) {
      throw new Error(authData.error || 'Authentication failed');
    }

    return {
      accessToken: authData.token,
      tokenType: authData.tokenType || 'bearer',
    };
  } catch (error) {
    console.error('Error during ABDM authentication:', error);
    throw error;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    // Clear client-side token cache
    clearTokenCache();

    // Clear server-side session
    await fetch('/api/abdm/auth', {
      method: 'DELETE',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error clearing ABDM session:', error);
  }
};
