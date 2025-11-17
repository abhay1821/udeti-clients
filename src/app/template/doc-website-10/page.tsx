'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';
import DocWebsite6Header from '@/components/templates/docWebsite6/DocWebsite6Header';
import DocWebsite10HeroSection from '@/components/templates/docWebsite10/DocWebsite10HeroSection';
import DocWebsite10AboutSection from '@/components/templates/docWebsite10/DocWebsite10AboutSection';
import DocWebsite10ServicesSection from '@/components/templates/docWebsite10/DocWebsite10ServicesSection';
import DocWebsite10AppointmentSection from '@/components/templates/docWebsite10/DocWebsite10AppointmentSection';
import DocWebsite10TestimonialsSection from '@/components/templates/docWebsite10/DocWebsite10TestimonialsSection';
import DocWebsite10Footer from '@/components/templates/docWebsite10/DocWebsite10Footer';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const DocWebsite10TemplatePage = () => {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-10';
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
          backgroundColor: '#FFFFFF',
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
      <DocWebsite6Header clinic={clinic} />
      <DocWebsite10HeroSection clinic={clinic} />
      <DocWebsite10AboutSection clinic={clinic} />
      <DocWebsite10ServicesSection clinic={clinic} />
      <DocWebsite10AppointmentSection clinic={clinic} />
      <DocWebsite10TestimonialsSection clinic={clinic} />
      <DocWebsite10Footer clinic={clinic} />
    </Box>
  );
};

export default DocWebsite10TemplatePage;
