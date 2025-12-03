export interface SessionData {
  accessToken: string;
  tokenType: string;
  expiresAt: number;
  createdAt: number;
}

const globalForSessions = globalThis as unknown as {
  sessions: Map<string, SessionData> | undefined;
};

const sessions = globalForSessions.sessions ?? new Map<string, SessionData>();
globalForSessions.sessions = sessions;

export const sessionStore = {
  set: (sessionId: string, data: SessionData): void => {
    sessions.set(sessionId, data);
  },

  get: (sessionId: string): SessionData | null => {
    const session = sessions.get(sessionId);

    if (!session) {
      return null;
    }

    const now = Date.now();
    if (session.expiresAt < now + 60000) {
      sessions.delete(sessionId);
      return null;
    }

    return session;
  },

  delete: (sessionId: string): boolean => {
    const deleted = sessions.delete(sessionId);
    if (deleted) {
      console.log(`[SessionStore] Session deleted: ${sessionId}`);
    }
    return deleted;
  },
};
