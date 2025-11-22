export interface ClinicTheme {
  primaryColor: string;
  secondaryColor: string;
  heroBackground: string;
  textColor: string;
  accentColor: string;
  buttonColor: string;
  footerBackground: string;
  labelColor: string;
  componentBackground: string;
  brownAccent?: string;
}

export const clinicThemes: Record<string, ClinicTheme> = {
  'doc-website-6': {
    primaryColor: '#5A54F5',
    secondaryColor: '#1B1F3B',
    heroBackground: '#F6F7FB',
    textColor: '#0A0E1A',
    accentColor: '#CDD5FF',
    buttonColor: '#5A54F5',
    footerBackground: '#1B1F3B',
    labelColor: '#64748B',
    componentBackground: '#F6F7FB',
  },
  'doc-website-7': {
    primaryColor: '#0F2C20',
    secondaryColor: '#19D08A',
    heroBackground: '#041A13',
    textColor: '#F4FFF7',
    accentColor: '#19D08A',
    buttonColor: '#19D08A',
    footerBackground: '#0F2C20',
    labelColor: '#64748B',
    componentBackground: '#041A13',
  },
  'doc-website-8': {
    primaryColor: '#0C2D48',
    secondaryColor: '#4DB7F8',
    heroBackground: '#E7F5FF',
    textColor: '#0C2D48',
    accentColor: '#4DB7F8',
    buttonColor: '#4DB7F8',
    footerBackground: '#0C2D48',
    labelColor: '#64748B',
    componentBackground: '#E7F5FF',
  },
  'doc-website-9': {
    primaryColor: '#0B2D23',
    secondaryColor: '#F5A27E',
    heroBackground: '#0B2D23',
    textColor: '#FFFFFF',
    accentColor: '#F5A27E',
    buttonColor: '#F5A27E',
    footerBackground: '#0B2D23',
    labelColor: '#64748B',
    componentBackground: '#082B23',
  },
  'doc-website-10': {
    primaryColor: '#3B2A27',
    secondaryColor: '#F4B285',
    heroBackground: '#FFFFFF',
    textColor: '#3B2A27',
    accentColor: '#F4B285',
    buttonColor: '#3B2A27',
    footerBackground: '#3B2A27',
    labelColor: '#64748B',
    componentBackground: '#FFFFFF',
  },
  'doc-website-11': {
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    heroBackground: '#FFFFFF',
    textColor: '#0F172A',
    accentColor: '#1E40AF',
    buttonColor: '#1E40AF',
    footerBackground: '#1E3A8A',
    labelColor: '#64748B',
    componentBackground: '#F6F7FB',
  },
  'doc-website-12': {
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444',
    heroBackground: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#DC2626',
    buttonColor: '#DC2626',
    footerBackground: '#DC2626',
    labelColor: '#64748B',
    componentBackground: '#FEF2F2',
  },
  'doc-website-13': {
    primaryColor: '#0891B2',
    secondaryColor: '#06B6D4',
    heroBackground: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#0891B2',
    buttonColor: '#0891B2',
    footerBackground: '#0891B2',
    labelColor: '#64748B',
    componentBackground: '#F0FDFA',
  },
  'doc-website-14': {
    primaryColor: '#A78B5B',
    secondaryColor: '#C4A574',
    heroBackground: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#A78B5B',
    buttonColor: '#A78B5B',
    footerBackground: '#A78B5B',
    labelColor: '#64748B',
    componentBackground: '#F9F7F4',
  },
  'doc-website-15': {
    primaryColor: '#059669',
    secondaryColor: '#10B981',
    heroBackground: '#FAFAFA',
    textColor: '#000000',
    accentColor: '#059669',
    buttonColor: '#059669',
    footerBackground: '#059669',
    labelColor: '#64748B',
    componentBackground: '#F0FDF4',
  },
};

export const getClinicTheme = (clinicId: string): ClinicTheme => {
  return clinicThemes[clinicId] || clinicThemes['doc-website-6']; // Default fallback
};
