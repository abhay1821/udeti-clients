'use client';

import React, { useEffect } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import UdetiHeader from '../../../components/templates/udeti/UdetiHeader';
import UdetiFooter from '../../../components/templates/udeti/UdetiFooter';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import UdetiMainSection from '@/components/templates/udeti/UdetiMainSection';
import UdetiHeroSection from '@/components/templates/udeti/UdetiHeroSection';
import RequestCallbackForm from '@/components/sections/RequestCallbackForm';
import PricingSection from '@/components/templates/udeti/PricingSection';
import WhyUdetiSection from '@/components/templates/udeti/WhyUdetiSection';
import { useClinic } from '@/contexts/ClinicContext';

export default function UdetiTemplatePage() {
  const theme = useTheme();
  const { getClinicById, setCurrentClinic } = useClinic();
  
  const clinicId = 'udeti-website';
  const clinic = getClinicById(clinicId);

  useEffect(() => {
    setCurrentClinic(clinicId);
  }, [setCurrentClinic]);

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
