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
// import { useAbdmAuth } from '@/hooks/useAbdmAuth';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function WellnessTemplatePage() {
  const { getClinicById } = useClinic();

  // ABDM Authentication commented out to prevent API calls
  // const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = 'doc-website-4';
  const clinic = getClinicById(clinicId);

  // Loading state check commented out
  // if (isAuthLoading) {
  //   return (
  //     <Layout>
  //       <Container
  //         maxWidth="lg"
  //         sx={{
  //           py: 8,
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           minHeight: '50vh',
  //         }}
  //       >
  //         <LoadingSpinner />
  //       </Container>
  //     </Layout>
  //   );
  // }

  // Error state check commented out
  // if (authError) {
  //   console.error('ABDM Authentication Error:', authError);
  // }

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

  const wellnessStats = [
    { number: '15+', label: 'Years of Experience', icon: 'award' },
    { number: '8,000+', label: 'Lives Transformed', icon: 'people' },
    { number: '80+', label: 'Wellness Programs', icon: 'heart' },
    { number: '4.8/5', label: 'Client Rating', icon: 'star' },
  ];

  return (
    <Layout clinicId={clinicId}>
      <ClinicGallery
        clinicId={clinicId}
        title="Our Clinic in Pics"
        subtitle="Take a virtual tour of our facility designed for your comfort and care"
      />

      <DetailedDoctorsSection
        clinicId={clinicId}
        title="Book Appointment With your Physician"
        subtitle="Our experienced team of medical professionals is committed to providing you with the highest quality care."
      />

      <VerticalAppointmentSection clinicId={clinicId} />

      <ServicesSection
        clinicId={clinicId}
        title="Wellness Services"
        subtitle="Comprehensive wellness programs designed for your unique needs"
      />

      <StatsSection clinicId={clinicId} stats={wellnessStats} />

      <TestimonialsSection
        clinicId={clinicId}
        title="Transformation Stories"
        subtitle="Real experiences from our wellness journey participants"
      />
    </Layout>
  );
}
