'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import {
  LocalHospital,
  MedicalServices,
  EmojiEmotions,
  CalendarToday,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface DocWebsite12HeroSectionProps {
  clinic: Clinic;
}

interface Statistic {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const DocWebsite12HeroSectionComponent: React.FC<
  DocWebsite12HeroSectionProps
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

  const statistics: Statistic[] = [
    {
      icon: <LocalHospital />,
      value: '5',
      label: 'Hospitals Worked',
    },
    {
      icon: <MedicalServices />,
      value: '15000+',
      label: 'Major Surgeries',
    },
    {
      icon: <EmojiEmotions />,
      value: '25000+',
      label: 'Happy Patients',
    },
    {
      icon: <CalendarToday />,
      value: '15+',
      label: 'Years of Experience',
    },
  ];

  const parseTitle = (title: string) => {
    const parts = title.split('|').map(part => part.trim());
    return {
      prefix: parts[0] || 'Specialist in',
      line1: parts[1] || '',
      line2: parts[2] || '',
      line3: parts[3] || '',
    };
  };

  const titleParts = parseTitle(clinic.hero.title);

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '500px', sm: '80vh', md: '80vh', lg: '80vh' },
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
          }}
        >
          <Box
            component="img"
            src={clinic.hero.backgroundImage}
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
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            px: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
            py: { xs: 6, sm: 8, md: 10, lg: 12 },
            height: { xs: '500px', sm: '600px', md: '100vh', lg: '90vh' },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: '100%', md: '500px', lg: '600px' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: {
                  xs: '1.75rem',
                  sm: '2.25rem',
                  md: '3rem',
                  lg: '3.5rem',
                  xl: '4rem',
                },
                fontWeight: 700,
                color: theme.textColor,
                lineHeight: 1.2,
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              {titleParts.line1}
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: {
                  xs: '1.75rem',
                  sm: '2.25rem',
                  md: '3rem',
                  lg: '3.5rem',
                  xl: '4rem',
                },
                fontWeight: 700,
                color: theme.textColor,
                lineHeight: 1.2,
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              {titleParts.line2}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.35rem',
                  md: '1.5rem',
                  lg: '1.75rem',
                },
                fontWeight: 400,
                color: theme.textColor,
                lineHeight: 1.4,
                mb: { xs: 3, sm: 4, md: 5 },
              }}
            >
              {titleParts.line3}
            </Typography>

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
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          py: { xs: 2.5, sm: 4, md: 4.5 },
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          borderTop: { xs: 'none', sm: '1px solid rgba(0,0,0,0.05)' },
          position: 'absolute',
          bottom: { xs: 0, sm: 0, md: 0, lg: 0 },
          left: 0,
          right: 0,
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          transform: 'translateY(50%)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, sm: 4, md: 5, lg: 6 },
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {statistics.map((stat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Box
                sx={{
                  color: '#9E9E9E',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '1.5rem',
                      sm: '1.75rem',
                      md: '2rem',
                      lg: '2.25rem',
                    },
                    fontWeight: 700,
                    color: '#000000',
                    lineHeight: 1.2,
                    mb: 0.3,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
                    fontWeight: 400,
                    color: '#666666',
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite12HeroSection = React.memo(
  DocWebsite12HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite12HeroSection;
