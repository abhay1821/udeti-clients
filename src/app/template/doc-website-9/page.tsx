'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import DocWebsite9Header from '@/components/templates/docWebsite9/DocWebsite9Header';
import DocWebsite9HeroSection from '@/components/templates/docWebsite9/DocWebsite9HeroSection';
import DocWebsite9AboutSection from '@/components/templates/docWebsite9/DocWebsite9AboutSection';
import DocWebsite9ServicesSection from '@/components/templates/docWebsite9/DocWebsite9ServicesSection';
import DocWebsite9AppointmentSection from '@/components/templates/docWebsite9/DocWebsite9AppointmentSection';
import DocWebsite9TestimonialsSection from '@/components/templates/docWebsite9/DocWebsite9TestimonialsSection';
import DocWebsite9Footer from '@/components/templates/docWebsite9/DocWebsite9Footer';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const DocWebsite9TemplatePage = () => {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-9';
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
          backgroundColor: '#082B23',
        }}
      >
        <Typography variant="h5" color="white">
          Template not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <DocWebsite9Header clinic={clinic} />
      <DocWebsite9HeroSection clinic={clinic} />
      <DocWebsite9AboutSection clinic={clinic} />
      <DocWebsite9ServicesSection clinic={clinic} />
      <DocWebsite9AppointmentSection clinic={clinic} />
      <DocWebsite9TestimonialsSection clinic={clinic} />
      <DocWebsite9Footer clinic={clinic} />
    </Box>
  );
};

export default DocWebsite9TemplatePage;
