// Environment configuration
export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Udeti Clients',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  databaseUrl: process.env.DATABASE_URL || '',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  externalApiKey: process.env.EXTERNAL_API_KEY || '',
  externalApiUrl: process.env.EXTERNAL_API_URL || '',
} as const;
