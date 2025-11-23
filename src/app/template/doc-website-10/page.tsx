'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useClinicData } from '@/hooks/useClinicData';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import StandardAboutSection from '@/components/sections/StandardAboutSection';
import DocWebsite10HeroSection from '@/components/templates/docWebsite10/DocWebsite10HeroSection';
import CircularImageServicesSection from '@/components/services/CircularImageServicesSection';
import DocWebsite10AppointmentSection from '@/components/templates/docWebsite10/DocWebsite10AppointmentSection';
import DocWebsite10TestimonialsSection from '@/components/templates/docWebsite10/DocWebsite10TestimonialsSection';
import DocWebsite10Footer from '@/components/templates/docWebsite10/DocWebsite10Footer';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite10TemplatePage = () => {
  const clinicId = 'doc-website-10';
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
      <DocWebsite10HeroSection key="hero" clinic={clinic} />,
      hasAbout(clinic) && <StandardAboutSection key="about" clinic={clinic} />,
      hasServices(clinic) && (
        <CircularImageServicesSection key="services" clinic={clinic} />
      ),
      <DocWebsite10AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <DocWebsite10TestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite10Footer key="footer" clinic={clinic} />,
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
          backgroundColor: '#FDF9F7',
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
          backgroundColor: '#FDF9F7',
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
          backgroundColor: '#FDF9F7',
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

export default DocWebsite10TemplatePage;
