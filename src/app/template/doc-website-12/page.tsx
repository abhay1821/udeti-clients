'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import ServicesSection from '@/components/sections/ServicesSection';
import StandardTestimonialsSection from '@/components/sections/StandardTestimonialsSection';
import DocWebsite6Footer from '@/components/templates/docWebsite6/DocWebsite6Footer';
import DocWebsite8AboutSection from '@/components/templates/docWebsite8/DocWebsite8AboutSection';
import DocWebsite12AppointmentSection from '@/components/templates/docWebsite12/DocWebsite12AppointmentSection';
import DocWebsite12HeroSection from '@/components/templates/docWebsite12/DocWebsite12HeroSection';
import { useClinicData } from '@/hooks/useClinicData';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite12TemplatePage = () => {
  const clinicId = 'doc-website-12';
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
      <DocWebsite12HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <Box key="services" sx={{ mt: { xs: '100px', sm: '70px' } }}>
          <ServicesSection
            clinicId={clinicId}
            title="Our Services"
            subtitle="Comprehensive dental care services for the whole family with advanced techniques and personalized treatment"
          />
        </Box>
      ),
      hasAbout(clinic) && (
        <DocWebsite8AboutSection key="about" clinic={clinic} />
      ),
      <DocWebsite12AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <StandardTestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite6Footer key="footer" clinic={clinic} />,
    ].filter(Boolean);
  }, [clinic, clinicId]);

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

export default DocWebsite12TemplatePage;
