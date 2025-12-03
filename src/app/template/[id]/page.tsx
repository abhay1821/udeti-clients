'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import Layout from '../../../components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useClinic } from '@/contexts/ClinicContext';
import { useClinicTheme } from '@/hooks/useClinicTheme';
import NotFound from '@/app/not-found';
// import { useAbdmAuth } from '@/hooks/useAbdmAuth';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function TemplatePage() {
  const params = useParams();
  const { getClinicById } = useClinic();

  // ABDM Authentication commented out to prevent API calls
  // const { isLoading: isAuthLoading, error: authError } = useAbdmAuth();

  const clinicId = params?.id as string;
  const clinic = getClinicById(clinicId);
  const theme = useClinicTheme(clinicId || '');

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
      // <Layout>
      //   <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      //     <Typography variant="h4" color="error">
      //       Template not found
      //     </Typography>
      //     <Typography variant="body1" sx={{ mt: 2 }}>
      //       The requested template does not exist.
      //     </Typography>
      //   </Container>
      // </Layout>
      <NotFound />
    );
  }

  return (
    <Layout clinicId={clinicId}>
      {/* Hero Section */}
      <HeroSection clinicId={clinicId} />

      {/* About Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme?.buttonColor || '#1976d2',
              }}
            >
              About {clinic.name}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
            >
              {clinic.description}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <ServicesSection clinicId={clinicId} />

      {/* Testimonials Section */}
      <TestimonialsSection clinicId={clinicId} />

      {/* Contact Section */}
      <ContactSection clinicId={clinicId} />
    </Layout>
  );
}
