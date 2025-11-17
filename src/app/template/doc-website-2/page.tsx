'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import DoctorsSection from '@/components/sections/DoctorsSection';
import { useClinic } from '@/contexts/ClinicContext';
import ClinicGallery from '@/components/sections/ClinicGallery';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function MedicalCenterTemplatePage() {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-2';
  const clinic = getClinicById(clinicId);

  // Show loading state while authenticating
  if (isAuthLoading) {
    return (
      <Layout>
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <LoadingSpinner />
        </Container>
      </Layout>
    );
  }

  // Show error state if authentication fails (non-blocking, but logged)
  if (authError) {
    console.error('ABDM Authentication Error:', authError);
  }

  if (!clinic) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" color="error">
            Template not found
          </Typography>
        </Container>
      </Layout>
    );
  }

  const medicalStats = [
    { number: '22+', label: 'Years of Experience', icon: 'award' },
    { number: '12,000+', label: 'Patients Treated', icon: 'people' },
    { number: '120+', label: 'Health Camps Conducted', icon: 'heart' },
    { number: '4.9/5', label: 'Patient Rating', icon: 'star' },
  ];

  return (
    <Layout clinicId={clinicId}>
      {/* Hero Section */}
      <HeroSection
        clinicId={clinicId}
        customTitle="Excellence in Medical Care"
        customSubtitle="We are dedicated to providing comprehensive, compassionate, and advanced medical care to our community"
        customCtaText="Book Appointment"
        customCtaLink="/appointment"
      />

      {/* Appointment Section */}
      <AppointmentSection clinicId={clinicId} />

      {/* Doctors Section */}
      <DoctorsSection
        clinicId={clinicId}
        title="Meet Our Medical Team"
        subtitle="Our experienced team of medical professionals is committed to providing you with the highest quality care."
      />

      {/* Stats Section */}
      <StatsSection clinicId={clinicId} stats={medicalStats} />

      {/* Services Section */}
      <ServicesSection
        clinicId={clinicId}
        title="Medical Specialties"
        subtitle="Comprehensive healthcare services across multiple specialties"
      />

      <ClinicGallery
        clinicId={clinicId}
        title="Our Clinic in Pics"
        subtitle="Take a virtual tour of our facility designed for your comfort and care"
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        clinicId={clinicId}
        title="Patient Success Stories"
        subtitle="Hear from patients whose lives we've touched"
      />
    </Layout>
  );
}
