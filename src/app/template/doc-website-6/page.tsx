'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import DocWebsite6Header from '@/components/templates/docWebsite6/DocWebsite6Header';
import DocWebsite6HeroSection from '@/components/templates/docWebsite6/DocWebsite6HeroSection';
import DocWebsite6ServicesSection from '@/components/templates/docWebsite6/DocWebsite6ServicesSection';
import DocWebsite6AboutSection from '@/components/templates/docWebsite6/DocWebsite6AboutSection';
import DocWebsite6AppointmentSection from '@/components/templates/docWebsite6/DocWebsite6AppointmentSection';
import DocWebsite6TestimonialsSection from '@/components/templates/docWebsite6/DocWebsite6TestimonialsSection';
import DocWebsite6Footer from '@/components/templates/docWebsite6/DocWebsite6Footer';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const DocWebsite6TemplatePage = () => {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-6';
  const clinic = getClinicById(clinicId);

  // Show loading state while authenticating
  if (isAuthLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F6F7FB',
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  // Show error state if authentication fails (non-blocking, but logged)
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
      <DocWebsite6Header clinic={clinic} />
      <DocWebsite6HeroSection clinic={clinic} />
      <DocWebsite6ServicesSection clinic={clinic} />
      <DocWebsite6AboutSection clinic={clinic} />
      <DocWebsite6AppointmentSection clinic={clinic} />
      <DocWebsite6TestimonialsSection clinic={clinic} />
      <DocWebsite6Footer clinic={clinic} />
    </Box>
  );
};

export default DocWebsite6TemplatePage;
