'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import UdetiHeader from '../../../components/templates/udeti/UdetiHeader';
import UdetiFooter from '../../../components/templates/udeti/UdetiFooter';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import UdetiMainSection from '@/components/templates/udeti/UdetiMainSection';
import UdetiHeroSection from '@/components/templates/udeti/UdetiHeroSection';
import RequestCallbackForm from '@/components/sections/RequestCallbackForm';
import PricingSection from '@/components/templates/udeti/PricingSection';
import WhyUdetiSection from '@/components/templates/udeti/WhyUdetiSection';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UdetiTemplatePage() {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'udeti-website';
  const clinic = getClinicById(clinicId);

  // Show loading state while authenticating
  if (isAuthLoading) {
    return (
      <Box
        sx={{
          pt: '70px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <UdetiHeader />
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
      <Box>
        <UdetiHeader />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" color="error">
            Template not found
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: '70px' }}>
      <UdetiHeader />

      {/* Udeti Hero Section */}
      <UdetiHeroSection />

      {/* Why Udeti Section */}
      <WhyUdetiSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Request Callback Form */}
      <RequestCallbackForm />

      {/* Udeti Main Section - Combined Hero + Stats */}
      <UdetiMainSection />

      {/* Testimonials Section */}
      <TestimonialsSection
        clinicId={clinicId}
        title="Client Success Stories"
        subtitle="Hear from healthcare providers who have transformed their practice with our solutions"
      />

      {/* Udeti Footer */}
      <UdetiFooter />
    </Box>
  );
}
