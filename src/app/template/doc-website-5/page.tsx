'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import ClinicGallery from '@/components/sections/ClinicGallery';
import VerticalAppointmentSection from '@/components/templates/web4/VerticalAppointmentSection';
import DetailedDoctorsSection from '@/components/templates/web4/DetailedDoctorsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import { useClinic } from '@/contexts/ClinicContext';
import { useAbdmAuth } from '@/hooks/useAbdmAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function SurgicalCenterTemplatePage() {
  const { getClinicById } = useClinic();

  // Initialize ABDM authentication
  const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-5';
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

  const surgicalStats = [
    { number: '18+', label: 'Years of Experience', icon: 'award' },
    { number: '5,000+', label: 'Successful Surgeries', icon: 'people' },
    { number: '150+', label: 'Surgical Procedures', icon: 'heart' },
    { number: '4.9/5', label: 'Success Rating', icon: 'star' },
  ];

  return (
    <Layout clinicId={clinicId}>
      {/* Clinic Gallery Section */}
      <ClinicGallery
        clinicId={clinicId}
        title="Our Clinic in Pics"
        subtitle="Take a virtual tour of our facility designed for your comfort and care"
      />

      {/* Detailed Doctors Section */}
      <DetailedDoctorsSection
        clinicId={clinicId}
        title="Book Appointment With your Physician"
        subtitle="Our experienced team of medical professionals is committed to providing you with the highest quality care."
      />

      {/* Appointment Section */}
      <VerticalAppointmentSection clinicId={clinicId} />

      {/* Stats Section */}
      <StatsSection clinicId={clinicId} stats={surgicalStats} />

      {/* Services Section */}
      <ServicesSection
        clinicId={clinicId}
        title="Surgical Specialties"
        subtitle="Comprehensive surgical care across multiple specialties with advanced techniques"
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        clinicId={clinicId}
        title="Patient Success Stories"
        subtitle="Hear from patients who have experienced our surgical excellence"
      />
    </Layout>
  );
}
