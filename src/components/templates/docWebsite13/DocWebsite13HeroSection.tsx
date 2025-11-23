'use client';

import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface DocWebsite13HeroSectionProps {
  clinic: Clinic;
}

const DocWebsite13HeroSectionComponent: React.FC<
  DocWebsite13HeroSectionProps
> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);
  const handleScroll = (selector: string) => {
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
        width: '100%',
        minHeight: { xs: '500px', md: '600px', lg: '700px' },
        backgroundColor: theme.heroBackground,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.4,
        }}
      >
        <Box
          component="img"
          src={
            clinic.about?.image ||
            clinic.hero?.backgroundImage ||
            '/images/doctors/doctor-1.jpg'
          }
          alt={clinic.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: '800px', lg: '900px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem',
                lg: '3.5rem',
                xl: '4rem',
              },
              fontWeight: 700,
              color: theme.textColor,
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            {clinic.name}
          </Typography>

          {clinic.about?.education && clinic.about.education.length > 0 && (
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                fontWeight: 500,
                //   color: '#5A54F5',
                mb: 1,
              }}
            >
              {clinic.about.education[0]}
              {clinic.about?.yearsOfExperience &&
                ` • ${clinic.about.yearsOfExperience} Years of Experience`}
            </Typography>
          )}

          {clinic.about?.expertise && clinic.about.expertise.length > 0 && (
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                color: theme.textColor,
                mb: 3,
              }}
            >
              {clinic.about.expertise.join(', ')}
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              onClick={() => handleScroll(clinic.hero.ctaLink)}
              sx={{
                backgroundColor: theme.buttonColor,
                color: 'white',
                px: { xs: 4, sm: 5, md: 6 },
                py: { xs: 1.5, sm: 1.75, md: 2 },
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: theme.buttonColor,
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {clinic.hero.ctaText}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleScroll('#services')}
              sx={{
                borderColor: theme.buttonColor,
                color: theme.buttonColor,
                px: { xs: 4, sm: 5, md: 6 },
                py: { xs: 1.5, sm: 1.75, md: 2 },
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  borderColor: theme.buttonColor,
                  backgroundColor: theme.buttonColor,
                  color: 'white',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Explore Services
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite13HeroSection = React.memo(
  DocWebsite13HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite13HeroSection;
