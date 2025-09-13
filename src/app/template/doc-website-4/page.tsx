'use client';

import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import ClinicGallery from '@/components/sections/ClinicGallery';
import VerticalAppointmentSection from '@/components/templates/web4/VerticalAppointmentSection';
import DetailedDoctorsSection from '@/components/templates/web4/DetailedDoctorsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import { useClinic } from '@/contexts/ClinicContext';

export default function WellnessTemplatePage() {
  const { getClinicById, setCurrentClinic } = useClinic();

  const clinicId = 'doc-website-4';
  const clinic = getClinicById(clinicId);

  useEffect(() => {
    setCurrentClinic(clinicId);
  }, [setCurrentClinic]);

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

     

      {/* Services Section */}
      <ServicesSection
        clinicId={clinicId}
        title="Wellness Services"
        subtitle="Comprehensive wellness programs designed for your unique needs"
      />

      {/* Stats Section */}
      <StatsSection clinicId={clinicId} stats={wellnessStats} />

      {/* Testimonials Section */}
      <TestimonialsSection
        clinicId={clinicId}
        title="Transformation Stories"
        subtitle="Real experiences from our wellness journey participants"
      />
    </Layout>
  );
}
