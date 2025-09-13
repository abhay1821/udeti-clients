import { createTheme } from '@mui/material/styles';
import { Clinic, ClinicTheme } from '@/types/Clinic';

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
    componentBackground:
      (clinic as { componentBackground?: string }).componentBackground ||
      clinic.primaryColor,
  };
};

export const getHeroBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).heroBackground;
};

export const getPrimaryColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).primaryColor;
};

export const getTextColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).textColor || 'white';
};

export const getButtonColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).buttonColor || '#424242';
};

export const getFooterBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).footerBackground || '#1a1a1a';
};

export const getLabelColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).labelColor || '#666666';
};

export const getAccentColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).accentColor || '#E3F2FD';
};

export const getSecondaryColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).secondaryColor || '#466D9F';
};

export const getBrownAccentColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).brownAccent || '#BF8360';
};
export const getComponentBackgroundColor = (clinic: Clinic | null): string => {
  return getClinicTheme(clinic).componentBackground || '#254E88';
};

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
