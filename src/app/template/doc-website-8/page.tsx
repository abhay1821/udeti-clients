'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import DocWebsite8Header from '@/components/templates/docWebsite8/DocWebsite8Header';
import DocWebsite8HeroSection from '@/components/templates/docWebsite8/DocWebsite8HeroSection';
import DocWebsite8ServicesSection from '@/components/templates/docWebsite8/DocWebsite8ServicesSection';
import DocWebsite8AboutSection from '@/components/templates/docWebsite8/DocWebsite8AboutSection';
import DocWebsite8AppointmentSection from '@/components/templates/docWebsite8/DocWebsite8AppointmentSection';
import DocWebsite8TestimonialsSection from '@/components/templates/docWebsite8/DocWebsite8TestimonialsSection';
import DocWebsite8Footer from '@/components/templates/docWebsite8/DocWebsite8Footer';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const DocWebsite8TemplatePage = () => {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-8';
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
      <DocWebsite8Header clinic={clinic} />
      <DocWebsite8HeroSection clinic={clinic} />
      <DocWebsite8ServicesSection clinic={clinic} />
      <DocWebsite8AboutSection clinic={clinic} />
      <DocWebsite8AppointmentSection clinic={clinic} />
      <DocWebsite8TestimonialsSection clinic={clinic} />
      <DocWebsite8Footer clinic={clinic} />
    </Box>
  );
};

export default DocWebsite8TemplatePage;
