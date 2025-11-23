export const abdmApiConfig = {
  endPoint: process.env.NEXT_PUBLIC_ABDM_API_ENDPOINT || '',
  grantType: process.env.NEXT_PUBLIC_ABDM_GRANT_TYPE || 'client_credentials',
  cmId: process.env.NEXT_PUBLIC_ABDM_CM_ID || 'sbx',
};
