'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import DocWebsite9HeroSection from '@/components/templates/docWebsite9/DocWebsite9HeroSection';
import DocWebsite9AboutSection from '@/components/templates/docWebsite9/DocWebsite9AboutSection';
import GridServicesSection from '@/components/services/GridServicesSection';
import DocWebsite9AppointmentSection from '@/components/templates/docWebsite9/DocWebsite9AppointmentSection';
import StandardTestimonialsSection from '@/components/sections/StandardTestimonialsSection';
import DocWebsite9Footer from '@/components/templates/docWebsite9/DocWebsite9Footer';
import { useClinicData } from '@/hooks/useClinicData';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite9TemplatePage = () => {
  const clinicId = 'doc-website-9';
  const { clinic, validation, isLoading } = useClinicData(clinicId);

  // Call useMemo BEFORE any conditional returns to follow Rules of Hooks
  const components = useMemo(() => {
    if (!clinic) return [];
    return [
      hasLogo(clinic) ? (
        <HeaderWithLogo key="header" clinic={clinic} />
      ) : (
        <HeaderWithoutLogo key="header" clinic={clinic} />
      ),
      <DocWebsite9HeroSection key="hero" clinic={clinic} />,
      hasAbout(clinic) && (
        <DocWebsite9AboutSection key="about" clinic={clinic} />
      ),
      hasServices(clinic) && (
        <GridServicesSection key="services" clinic={clinic} />
      ),
      <DocWebsite9AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <StandardTestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite9Footer key="footer" clinic={clinic} />,
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
          backgroundColor: '#082B23',
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
          backgroundColor: '#082B23',
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
          backgroundColor: '#082B23',
        }}
      >
        <Typography variant="h5" color="white">
          Template not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {components}
    </Box>
  );
};

export default DocWebsite9TemplatePage;
