'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7HeroSectionProps {
  clinic: Clinic;
}

export const DocWebsite7HeroSection: React.FC<DocWebsite7HeroSectionProps> = ({
  clinic,
}) => {
  const scrollTo = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = selector;
    }
  };

  return (
    <Box
      id="home"
      sx={{
        background: 'linear-gradient(135deg, #F5FBF8, #E9F4EF)',
        color: '#0D2B21',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 10 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Compassionate Care,
            <br />
            Modern Medicine.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: 'rgba(13, 43, 33, 0.7)',
              lineHeight: 1.8,
              maxWidth: 520,
              mb: 4,
            }}
          >
            Dr. Elara Vance combines years of expertise with a unique,
            patient-first philosophy to provide care that’s both advanced and
            deeply personal.
          </Typography>

          <Button
            variant="contained"
            onClick={() => scrollTo('#appointment')}
            sx={{
              backgroundColor: '#19D08A',
              color: '#052316',
              fontWeight: 700,
              borderRadius: '999px',
              px: 4.5,
              py: 1.4,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#21e1a0' },
            }}
          >
            Book an Appointment
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: 520,
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(15, 19, 38, 0.2)',
          }}
        >
          <Box
            component="img"
            src={clinic.hero.backgroundImage}
            alt={clinic.name}
            sx={{
              width: '100%',
              height: { xs: 320, md: 420 },
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite7HeroSection;
