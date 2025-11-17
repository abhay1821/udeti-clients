'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import DocWebsite7Header from '@/components/templates/docWebsite7/DocWebsite7Header';
import DocWebsite7HeroSection from '@/components/templates/docWebsite7/DocWebsite7HeroSection';
import DocWebsite7ServicesSection from '@/components/templates/docWebsite7/DocWebsite7ServicesSection';
import DocWebsite7GallerySection from '@/components/templates/docWebsite7/DocWebsite7GallerySection';
import DocWebsite7AppointmentSection from '@/components/templates/docWebsite7/DocWebsite7AppointmentSection';
import DocWebsite7TestimonialsSection from '@/components/templates/docWebsite7/DocWebsite7TestimonialsSection';
import DocWebsite7Footer from '@/components/templates/docWebsite7/DocWebsite7Footer';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const DocWebsite7TemplatePage = () => {
  const { getClinicById } = useClinic();

  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-7';
  const clinic = getClinicById(clinicId);

  if (isAuthLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F8F5',
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (authError) {
    console.error('ABDM Authentication Error:', authError);
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
      <DocWebsite7Header clinic={clinic} />
      <DocWebsite7HeroSection clinic={clinic} />
      <DocWebsite7ServicesSection clinic={clinic} />
      <DocWebsite7GallerySection clinic={clinic} />
      <DocWebsite7AppointmentSection clinic={clinic} />
      <DocWebsite7TestimonialsSection clinic={clinic} />
      <DocWebsite7Footer clinic={clinic} />
    </Box>
  );
};

export default DocWebsite7TemplatePage;
