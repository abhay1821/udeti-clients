'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import StandardServicesSection from '@/components/sections/StandardServicesSection';
import StandardAboutSection from '@/components/sections/StandardAboutSection';
import StandardGallerySection from '@/components/sections/StandardGallerySection';
import StandardTestimonialsSection from '@/components/sections/StandardTestimonialsSection';
import StandardFooter from '@/components/sections/StandardFooter';
import DocWebsite11HeroSection from '@/components/templates/docWebsite11/DocWebsite11HeroSection';
import DocWebsite11AppointmentSection from '@/components/templates/docWebsite11/DocWebsite11AppointmentSection';
import { useClinicDataFromContext } from '@/hooks/useClinicDataFromContext';
import {
  hasLogo,
  hasServices,
  hasAbout,
  hasGalleryImages,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite11TemplatePage = () => {
  const { clinic, validation, isLoading } =
    useClinicDataFromContext('doc-website-11');

  const components = useMemo(() => {
    if (!clinic) return [];
    return [
      hasLogo(clinic) ? (
        <HeaderWithLogo key="header" clinic={clinic} />
      ) : (
        <HeaderWithoutLogo key="header" clinic={clinic} />
      ),
      <DocWebsite11HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <StandardServicesSection key="services" clinic={clinic} />
      ),
      hasAbout(clinic) && <StandardAboutSection key="about" clinic={clinic} />,
      hasGalleryImages(clinic) && (
        <StandardGallerySection key="gallery" clinic={clinic} />
      ),
      <DocWebsite11AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <StandardTestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <StandardFooter key="footer" clinic={clinic} />,
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

export default DocWebsite11TemplatePage;
