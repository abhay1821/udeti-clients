'use client';

import { useEffect, useState } from 'react';
import {
  handleAuth,
  AbdmSession,
  clearSession,
  getStoredSession,
} from '@/services/abdmAuth';

interface UseAbdmAuthReturn {
  session: AbdmSession | null;
  isLoading: boolean;
  error: Error | null;
  authenticate: () => Promise<void>;
  clearAuth: () => Promise<void>;
}

export const useAbdmAuth = (
  autoAuthenticate: boolean = true
): UseAbdmAuthReturn => {
  const [session, setSession] = useState<AbdmSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(autoAuthenticate);
  const [error, setError] = useState<Error | null>(null);

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const existingSession = await getStoredSession();
      if (existingSession) {
        setSession(existingSession);
        setIsLoading(false);
        return;
      }

      const newSession = await handleAuth();
      setSession(newSession);
    } catch (err) {
      const authError =
        err instanceof Error
          ? err
          : new Error('Failed to authenticate with ABDM');
      setError(authError);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = async () => {
    await clearSession();
    setSession(null);
    setError(null);
  };

  useEffect(() => {
    if (autoAuthenticate) {
      authenticate();
    }
  }, [autoAuthenticate]);

  return {
    session,
    isLoading,
    error,
    authenticate,
    clearAuth,
  };
};
