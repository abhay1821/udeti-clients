'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface DocWebsite15HeroSectionProps {
  clinic: Clinic;
}

const DocWebsite15HeroSectionComponent: React.FC<
  DocWebsite15HeroSectionProps
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

  const statistics = [
    {
      value: '8',
      label: 'Hospitals Worked',
    },
    {
      value: '14+',
      label: 'Years of Experience',
    },
    {
      value: '3,578+',
      label: 'Satisfied Clients',
    },
  ];

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: theme.heroBackground,
        py: { xs: 4, sm: 6, md: 8, lg: 10 },
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', lg: 1400, xl: 1600 },
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr ',
            md: '1fr 1fr 1fr',
          },
          gap: { xs: 4, sm: 5, md: 6, lg: 8 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            order: { xs: 1, md: 1 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
              fontWeight: 600,
              color: theme.labelColor,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: { xs: 1, sm: 1.5 },
            }}
          >
            Welcome to {clinic.name}
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: '1.75rem',
                sm: '2.25rem',
                md: '2.75rem',
                lg: '3.5rem',
                xl: '4rem',
              },
              fontWeight: 800,
              color: theme.textColor,
              lineHeight: 1.1,
              mb: { xs: 2, sm: 3, md: 4 },
            }}
          >
            Destination For
            <br />
            Relief & Wellness
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: theme.labelColor,
              lineHeight: 1.7,
              mb: { xs: 3, sm: 4, md: 5 },
              maxWidth: { xs: '100%', md: '90%' },
            }}
          >
            {clinic.hero.subtitle || clinic.description}
          </Typography>

          <Button
            variant="contained"
            startIcon={<CalendarToday />}
            onClick={() => handleScroll(clinic.hero.ctaLink)}
            sx={{
              backgroundColor: theme.buttonColor,
              color: 'white',
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1.25, sm: 1.5, md: 1.75 },
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '12px',
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
            Make Appointment
          </Button>
        </Box>

        <Box
          sx={{
            order: { xs: 2, md: 2 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: 300, sm: 250, md: 300, lg: 350, xl: 400 },
              height: { xs: 250, sm: 350, md: 380, lg: 450, xl: 500 },
              borderRadius: { md: '20%', sm: '10%', xs: '50%' },
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '8px solid #FFFFFF',
            }}
          >
            <Box
              component="img"
              src={
                clinic.about?.image ||
                clinic.hero.backgroundImage ||
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
        </Box>

        <Box
          sx={{
            order: { xs: 3, md: 3 },
            display: { xs: 'grid', md: 'flex' },
            gridTemplateColumns: { xs: '1fr 1fr' },
            flexDirection: { md: 'column' },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {statistics.map((stat, index) => (
            <Box
              key={index}
              sx={{
                display: { xs: index === 2 ? 'none' : 'block', md: 'block' },
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                p: { xs: 2, sm: 2.5, md: 3 },
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                textAlign: { xs: 'center', md: 'left' },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '3.5rem',
                  },
                  fontWeight: 700,
                  color: theme.buttonColor,
                  lineHeight: 1.2,
                  mb: { xs: 0.5, sm: 1 },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  fontWeight: 600,
                  color: theme.labelColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite15HeroSection = React.memo(
  DocWebsite15HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite15HeroSection;
