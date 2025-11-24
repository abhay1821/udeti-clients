'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import BiotechIcon from '@mui/icons-material/Biotech';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Clinic } from '@/types/Clinic';

interface IconCardServicesSectionProps {
  clinic: Clinic;
}

const IconCardServicesSectionComponent: React.FC<
  IconCardServicesSectionProps
> = ({ clinic }) => {
  if (!clinic.services?.length) {
    return null;
  }

  const iconMap: Record<string, React.ReactNode> = {
    stethoscope: <MedicalServicesIcon fontSize="large" />,
    heart: <FavoriteIcon fontSize="large" />,
    shield: <HealthAndSafetyIcon fontSize="large" />,
    syringe: <VaccinesIcon fontSize="large" />,
    flask: <BiotechIcon fontSize="large" />,
    child: <ChildCareIcon fontSize="large" />,
  };

  return (
    <Box
      id="services"
      sx={{
        backgroundColor: '#F2F6F8',
        color: '#0C2D48',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center', mb: 4 }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: '2.3rem', md: '2.6rem' }, fontWeight: 800 }}
        >
          Our Services
        </Typography>
        <Typography sx={{ color: 'rgba(12,45,72,0.7)', mt: 1 }}>
          We offer a wide range of healthcare services to meet your needs.
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 3,
        }}
      >
        {clinic.services.map(service => (
          <Box
            key={service.id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(12,45,72,0.08)',
              boxShadow: '0 20px 30px rgba(15, 23, 42, 0.05)',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
                backgroundColor: '#E0F7FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                fontSize: '1.5rem',
                color: '#0C2D48',
              }}
            >
              {service.icon && iconMap[service.icon] ? (
                iconMap[service.icon]
              ) : (
                <MedicalServicesIcon fontSize="large" />
              )}
            </Box>
            <Typography fontWeight={700} fontSize="1.1rem" sx={{ mb: 1 }}>
              {service.title}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(12,45,72,0.7)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              {service.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const IconCardServicesSection = React.memo(
  IconCardServicesSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default IconCardServicesSection;
