'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface GridServicesSectionProps {
  clinic: Clinic;
}

const GridServicesSectionComponent: React.FC<GridServicesSectionProps> = ({
  clinic,
}) => {
  const theme = useClinicTheme(clinic.id);

  if (!clinic.services?.length) {
    return null;
  }
  const primaryColor = theme.buttonColor;
  const backgroundColor = theme.componentBackground;
  const textColor = theme.textColor;

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <Box
      id="services"
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        px: { xs: 3, md: 5 },
        py: { xs: 6, md: 9 },
        borderTop: `1px solid ${hexToRgba(textColor, 0.12)}`,
        boxShadow: `inset 0 20px 40px ${hexToRgba(primaryColor, 0.08)}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '320px 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'start',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: primaryColor,
              letterSpacing: '0.25em',
              fontWeight: 600,
              mb: 1,
            }}
          >
            MEDICAL SERVICES
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2.4rem', md: '2.8rem' },
              fontWeight: 800,
              mb: 3,
              color: textColor,
            }}
          >
            We&apos;re Providing Best Services.
          </Typography>
          <Typography
            sx={{ color: hexToRgba(textColor, 0.75), lineHeight: 1.8 }}
          >
            {clinic.description ||
              'Comprehensive healthcare services tailored to your needs with advanced techniques and personalized treatment plans.'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {clinic.services.map(service => (
            <Box
              key={service.id}
              sx={{
                backgroundColor: '#FFFFFF',
                border: `1px solid ${hexToRgba(textColor, 0.1)}`,
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200,
                transition: 'background-color 0.3s ease, color 0.3s ease',
                '&:hover': {
                  backgroundColor: primaryColor,
                  color: '#FFFFFF',
                },
              }}
            >
              <Box sx={{ flex: 1, p: 3 }}>
                <Typography fontWeight={700} sx={{ mb: 1, color: 'inherit' }}>
                  {service.title}
                </Typography>
                <Typography sx={{ color: 'inherit', opacity: 0.8 }}>
                  {service.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderTop: `1px solid ${hexToRgba(textColor, 0.08)}`,
                  backgroundColor: hexToRgba(primaryColor, 0.2),
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    textTransform: 'none',
                    color: 'inherit',
                    fontWeight: 600,
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const GridServicesSection = React.memo(
  GridServicesSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default GridServicesSection;
