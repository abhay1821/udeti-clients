import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export const getTokenExpiration = (token: string): number | null => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    // JWT exp is in seconds, convert to milliseconds
    return decodedToken.exp * 1000;
  } catch (error) {
    console.error('Error decoding token to get expiration:', error);
    return null;
  }
};
