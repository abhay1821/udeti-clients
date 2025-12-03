'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import DocWebsite8HeroSection from '@/components/templates/docWebsite8/DocWebsite8HeroSection';
import IconCardServicesSection from '@/components/sections/IconCardServicesSection';
import DocWebsite8AboutSection from '@/components/templates/docWebsite8/DocWebsite8AboutSection';
import DocWebsite8AppointmentSection from '@/components/templates/docWebsite8/DocWebsite8AppointmentSection';
import DocWebsite8TestimonialsSection from '@/components/templates/docWebsite8/DocWebsite8TestimonialsSection';
import DocWebsite8Footer from '@/components/templates/docWebsite8/DocWebsite8Footer';
import { useClinicDataFromContext } from '@/hooks/useClinicDataFromContext';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite8TemplatePage = () => {
  const { clinic, validation, isLoading } =
    useClinicDataFromContext('doc-website-8');

  // Call useMemo BEFORE any conditional returns to follow Rules of Hooks
  const components = useMemo(() => {
    if (!clinic) return [];
    return [
      hasLogo(clinic) ? (
        <HeaderWithLogo key="header" clinic={clinic} />
      ) : (
        <HeaderWithoutLogo key="header" clinic={clinic} />
      ),
      <DocWebsite8HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <IconCardServicesSection key="services" clinic={clinic} />
      ),
      hasAbout(clinic) && (
        <DocWebsite8AboutSection key="about" clinic={clinic} />
      ),
      <DocWebsite8AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <DocWebsite8TestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite8Footer key="footer" clinic={clinic} />,
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
          backgroundColor: '#F7FDFF',
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
          backgroundColor: '#F7FDFF',
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
          backgroundColor: '#F7FDFF',
        }}
      >
        <Typography variant="h5" color="error">
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

export default DocWebsite8TemplatePage;
