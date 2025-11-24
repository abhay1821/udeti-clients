'use client';

import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import HeaderWithLogo from '@/components/headers/HeaderWithLogo';
import HeaderWithoutLogo from '@/components/headers/HeaderWithoutLogo';
import DocWebsite7HeroSection from '@/components/templates/docWebsite7/DocWebsite7HeroSection';
import ImageCardServicesSection from '@/components/sections/ImageCardServicesSection';
import StandardGallerySection from '@/components/sections/StandardGallerySection';
import DocWebsite7AppointmentSection from '@/components/templates/docWebsite7/DocWebsite7AppointmentSection';
import DocWebsite7TestimonialsSection from '@/components/templates/docWebsite7/DocWebsite7TestimonialsSection';
import DocWebsite7Footer from '@/components/templates/docWebsite7/DocWebsite7Footer';
import { useClinicData } from '@/hooks/useClinicData';
import {
  hasLogo,
  hasServices,
  hasGalleryImages,
  hasTestimonials,
} from '@/utils/clinicValidation';
import { CircularProgress } from '@mui/material';

const DocWebsite7TemplatePage = () => {
  const clinicId = 'doc-website-7';
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
      <DocWebsite7HeroSection key="hero" clinic={clinic} />,
      hasServices(clinic) && (
        <ImageCardServicesSection key="services" clinic={clinic} />
      ),
      hasGalleryImages(clinic) && (
        <StandardGallerySection key="gallery" clinic={clinic} />
      ),
      <DocWebsite7AppointmentSection key="appointment" clinic={clinic} />,
      hasTestimonials(clinic) && (
        <DocWebsite7TestimonialsSection key="testimonials" clinic={clinic} />
      ),
      <DocWebsite7Footer key="footer" clinic={clinic} />,
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
          backgroundColor: '#03130E',
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
          backgroundColor: '#03130E',
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
          backgroundColor: '#03130E',
        }}
      >
        <Typography variant="h5" color="white">
          Template not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F3F8F5' }}>
      {components}
    </Box>
  );
};

export default DocWebsite7TemplatePage;
