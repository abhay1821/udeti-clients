export type AbdmSession = {
  accessToken?: string;
  expiresIn: number;
  tokenType: string;
  createdAt: number;
};

type AuthResponse = {
  success: boolean;
  session: AbdmSession | null;
  fromCache?: boolean;
  error?: string;
};

export const getStoredSession = async (): Promise<AbdmSession | null> => {
  try {
    const response = await fetch('/api/abdm/auth', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data: AuthResponse = await response.json();

    if (data.success && data.session) {
      return data.session;
    }

    return null;
  } catch (error) {
    console.error('Error reading ABDM session:', error);
    return null;
  }
};

export const handleAuth = async (): Promise<AbdmSession | null> => {
  try {
    const response = await fetch('/api/abdm/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }

    const data: AuthResponse = await response.json();

    if (data.success && data.session) {
      return data.session;
    }

    throw new Error(data.error || 'Authentication failed');
  } catch (error) {
    console.error('Error during ABDM authentication:', error);
    throw error;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    await fetch('/api/abdm/auth', {
      method: 'DELETE',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error clearing ABDM session:', error);
  }
};
