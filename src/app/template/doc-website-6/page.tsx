'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import StandardServicesSection from '@/components/sections/StandardServicesSection';
import DocWebsite6HeroSection from '@/components/templates/docWebsite6/DocWebsite6HeroSection';
import DocWebsite6AboutSection from '@/components/templates/docWebsite6/DocWebsite6AboutSection';
import DocWebsite6AppointmentSection from '@/components/templates/docWebsite6/DocWebsite6AppointmentSection';
import DocWebsite6TestimonialsSection from '@/components/templates/docWebsite6/DocWebsite6TestimonialsSection';
import DocWebsite6Footer from '@/components/templates/docWebsite6/DocWebsite6Footer';
import { useClinicData } from '@/hooks/useClinicData';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite6TemplatePage = () => {
  const clinicId = 'doc-website-6';
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
      <DocWebsite6HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <StandardServicesSection key="services" clinic={clinic} />
      ),
      hasAbout(clinic) && (
        <DocWebsite6AboutSection key="about" clinic={clinic} />
      ),
      <DocWebsite6AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <DocWebsite6TestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite6Footer key="footer" clinic={clinic} />,
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
        backgroundColor: '#F6F7FB',
      }}
    >
      {components}
    </Box>
  );
};

export default DocWebsite6TemplatePage;
