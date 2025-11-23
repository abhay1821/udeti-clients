'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import DocWebsite13HeroSection from '@/components/templates/docWebsite13/DocWebsite13HeroSection';
import StandardServicesSection from '@/components/services/StandardServicesSection';
import StandardTestimonialsSection from '@/components/sections/StandardTestimonialsSection';
import DocWebsite6Footer from '@/components/templates/docWebsite6/DocWebsite6Footer';
import DocWebsite8AboutSection from '@/components/templates/docWebsite8/DocWebsite8AboutSection';
import AppointmentBookingSection from '@/components/sections/AppointmentBookingSection';
import FloatingAppointmentButton from '@/components/ui/FloatingAppointmentButton';
import { useClinicDataFromContext } from '@/hooks/useClinicDataFromContext';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite13TemplatePage = () => {
  const { clinic, validation, isLoading } =
    useClinicDataFromContext('doc-website-13');

  const components = useMemo(() => {
    if (!clinic) return [];
    return [
      hasLogo(clinic) ? (
        <HeaderWithLogo key="header" clinic={clinic} />
      ) : (
        <HeaderWithoutLogo key="header" clinic={clinic} />
      ),
      <DocWebsite13HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <StandardServicesSection key="services" clinic={clinic} />
      ),
      hasAbout(clinic) && (
        <DocWebsite8AboutSection key="about" clinic={clinic} />
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

export default DocWebsite13TemplatePage;
