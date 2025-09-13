'use client';

import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import DoctorsSection from '@/components/sections/DoctorsSection';
import { useClinic } from '@/contexts/ClinicContext';

export default function DentalTemplatePage() {
  const { getClinicById, setCurrentClinic } = useClinic();
  
  const clinicId = 'doc-website-1';
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

  const dentalStats = [
    { number: '20+', label: 'Years of Experience', icon: 'award' },
    { number: '10,000+', label: 'Patients Treated', icon: 'people' },
    { number: '100+', label: 'Dental Camps Conducted', icon: 'heart' },
    { number: '4.9/5', label: 'Patient Rating', icon: 'star' },
  ];

  return (
    <Layout clinicId={clinicId}>
      {/* Hero Section */}
      <HeroSection 
        clinicId={clinicId}
        customTitle="Your Smile, Our Priority"
        customSubtitle="Established in 2003, Dr. Yuvaraj Clinic has been serving the community with exceptional dental care, combining traditional values with modern technology."
        customCtaText="Book Appointment"
        customCtaLink="/appointment"
      />

           {/* Appointment Section */}
           <AppointmentSection clinicId={clinicId} />

       {/* Doctors Section */}
      <DoctorsSection 
        clinicId={clinicId}
        title="Meet Your Dentists"
        subtitle="Our experienced team of dental professionals is committed to providing you with the highest quality care."
      />


      {/* Stats Section */}
      <StatsSection clinicId={clinicId} stats={dentalStats} />

      

      {/* Services Section */}
      <ServicesSection 
        clinicId={clinicId}
        title="Our Dental Services"
        subtitle="Comprehensive dental care for patients of all ages"
      />

      {/* Testimonials Section */}
      <TestimonialsSection 
        clinicId={clinicId}
        title="What Our Patients Say"
        subtitle="Real stories from our satisfied patients"
      />


 
    </Layout>
  );
}
