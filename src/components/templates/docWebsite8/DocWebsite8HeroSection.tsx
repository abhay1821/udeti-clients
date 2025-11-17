'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8HeroSectionProps {
  clinic: Clinic;
}

export const DocWebsite8HeroSection: React.FC<DocWebsite8HeroSectionProps> = ({
  clinic,
}) => {
  const scrollTo = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = selector;
    }
  };

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        color: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0C2D48',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={clinic.hero.backgroundImage}
        alt={clinic.name}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(60%)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          px: { xs: 2.5, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 2,
            }}
          >
            {clinic.hero.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 4,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {clinic.hero.subtitle}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => scrollTo('#appointment')}
              sx={{
                textTransform: 'none',
                backgroundColor: '#4DB7F8',
                color: '#0C2D48',
                fontWeight: 700,
                px: 4,
                py: 1.2,
                borderRadius: '999px',
              }}
            >
              {clinic.hero.ctaText}
            </Button>
            <Button
              variant="contained"
              onClick={() => scrollTo('#services')}
              sx={{
                textTransform: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontWeight: 600,
                px: 4,
                py: 1.2,
                borderRadius: '999px',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.35)' },
              }}
            >
              Our Services
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite8HeroSection;
