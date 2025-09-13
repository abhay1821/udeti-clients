import { createTheme } from '@mui/material/styles';

// Theme system for clinic websites
export interface ClinicTheme {
  heroBackground: string;
  primaryColor: string;
  secondaryColor: string;
  textColor?: string;
  accentColor?: string;
  buttonColor?: string;
  footerBackground?: string;
  labelColor?: string;
  brownAccent?: string;
  componentBackground?: string;
}

export interface Clinic {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  theme?: {
    heroBackground: string;
    textColor?: string;
    accentColor?: string;
    buttonColor?: string;
    footerBackground?: string;
    labelColor?: string;
    brownAccent?: string;
    componentBackground?: string;
  };
}

/**
 * Get theme colors for a clinic
 * @param clinic - The clinic object
 * @returns ClinicTheme object with all theme colors
 */
export const getClinicTheme = (clinic: Clinic | null): ClinicTheme => {
  if (!clinic) {
    return {
      heroBackground: '#1F598C',
      primaryColor: '#3A67A1',
      secondaryColor: '#466D9F',
      textColor: 'white',
    };
  }

  return {
    heroBackground: clinic.theme?.heroBackground || clinic.primaryColor,
    primaryColor: clinic.primaryColor,
    secondaryColor: clinic.secondaryColor,
    textColor: clinic.theme?.textColor || 'white',
    accentColor: clinic.theme?.accentColor || clinic.secondaryColor,
    buttonColor: clinic.theme?.buttonColor || '#424242',
    footerBackground: clinic.theme?.footerBackground || clinic.primaryColor,
    labelColor: clinic.theme?.labelColor || clinic.secondaryColor,
    brownAccent: clinic.theme?.brownAccent || '#BF8360',
    componentBackground: (clinic as any).componentBackground || clinic.primaryColor,
  };
};

/**
 * Get hero section background color
 * @param clinic - The clinic object
 * @returns Background color string
 */
export const getHeroBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).heroBackground;
};

/**
 * Get primary color for the clinic
 * @param clinic - The clinic object
 * @returns Primary color string
 */
export const getPrimaryColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).primaryColor;
};

/**
 * Get text color for the clinic
 * @param clinic - The clinic object
 * @returns Text color string
 */
export const getTextColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).textColor || 'white';
};

/**
 * Get button color for the clinic
 * @param clinic - The clinic object
 * @returns Button color string
 */
export const getButtonColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).buttonColor || '#424242';
};

/**
 * Get footer background color for the clinic
 * @param clinic - The clinic object
 * @returns Footer background color string
 */
export const getFooterBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).footerBackground || '#1a1a1a';
};

/**
 * Get label color for the clinic
 * @param clinic - The clinic object
 * @returns Label color string
 */
export const getLabelColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).labelColor || '#666666';
};

/**
 * Get accent color for the clinic
 * @param clinic - The clinic object
 * @returns Accent color string
 */
export const getAccentColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).accentColor || '#E3F2FD';
};

/**
 * Get secondary color for the clinic
 * @param clinic - The clinic object
 * @returns Secondary color string
 */
export const getSecondaryColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).secondaryColor || '#466D9F';
};

/**
 * Get brown accent color for the clinic
 * @param clinic - The clinic object
 * @returns Brown accent color string
 */
export const getBrownAccentColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).brownAccent || '#BF8360';
};

/**
 * Get component background color for the clinic
 * @param clinic - The clinic object
 * @returns Component background color string
 */
export const getComponentBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).componentBackground || '#254E88';
};

// Material-UI theme for the application
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#42a5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});