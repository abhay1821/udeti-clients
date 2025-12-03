'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import DocWebsite15HeroSection from '@/components/templates/docWebsite15/DocWebsite15HeroSection';
import AppointmentBookingSection from '@/components/sections/AppointmentBookingSection';
import DocWebsite6Footer from '@/components/templates/docWebsite6/DocWebsite6Footer';
import StandardTestimonialsSection from '@/components/sections/StandardTestimonialsSection';
import FloatingAppointmentButton from '@/components/ui/FloatingAppointmentButton';
import { useClinicDataFromContext } from '@/hooks/useClinicDataFromContext';
import {
  hasLogo,
  hasServices,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';
import GridServicesSection from '@/components/sections/GridServicesSection';

const DocWebsite15TemplatePage = () => {
  const { clinic, validation, isLoading } =
    useClinicDataFromContext('doc-website-15');

  const components = useMemo(() => {
    if (!clinic) return [];
    return [
      hasLogo(clinic) ? (
        <HeaderWithLogo key="header" clinic={clinic} />
      ) : (
        <HeaderWithoutLogo key="header" clinic={clinic} />
      ),
      <DocWebsite15HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <GridServicesSection key="services" clinic={clinic} />
      ),
      <AppointmentBookingSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <StandardTestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite6Footer key="footer" clinic={clinic} />,
      <FloatingAppointmentButton key="floating-button" clinic={clinic} />,
    ].filter(Boolean);
  }, [clinic]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F4F6',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!validation.isValid) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F4F6',
          p: 4,
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Invalid Clinic Data
        </Typography>
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {validation.errors.join(', ')}
        </Typography>
      </Box>
    );
  }

  if (!clinic) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F4F6',
        }}
      >
        <Typography variant="h5" color="error">
          Template not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
      }}
    >
      {components}
    </Box>
  );
};

export default DocWebsite15TemplatePage;
