'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite6HeroSectionProps {
  clinic: Clinic;
}

const DocWebsite6HeroSectionComponent: React.FC<
  DocWebsite6HeroSectionProps
> = ({ clinic }) => {
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
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        gap: { xs: 4, lg: 8 },
        px: { xs: 3, md: 5, lg: 6 },
        py: { xs: 4, md: 5, lg: 6 },
        backgroundColor: '#F6F7FB',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.1,
            mb: 3,
          }}
        >
          {clinic.hero.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            color: '#5B6472',
            maxWidth: 520,
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          {clinic.hero.subtitle}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleScroll('#appointment')}
            sx={{
              background: 'linear-gradient(135deg, #5A54F5, #844CFF)',
              borderRadius: '999px',
              px: 5,
              py: 1.75,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0px 18px 45px rgba(90, 84, 245, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4E48E7, #7035E4)',
              },
            }}
          >
            {clinic.hero.ctaText}
          </Button>
          <Button
            variant="text"
            onClick={() => handleScroll('#about')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#1F2937',
              fontSize: '1rem',
            }}
          >
            Learn More →
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={clinic.hero.backgroundImage}
          alt={clinic.name}
          sx={{
            width: '100%',
            maxWidth: 520,
            borderRadius: '32px',
            objectFit: 'cover',
            height: { xs: 320, md: 420 },
            boxShadow: '0px 25px 70px rgba(15, 23, 42, 0.25)',
          }}
        />

        {clinic.hero.badge && (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: -25, md: -35 },
              left: { xs: '50%', md: 'auto' },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              px: 3,
              py: 2,
              boxShadow: '0px 20px 45px rgba(15, 19, 38, 0.12)',
              minWidth: { xs: '70%', sm: 320 },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '16px',
                backgroundColor: 'rgba(90, 84, 245, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5A54F5',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              ✓
            </Box>
            <Box>
              <Typography fontWeight={700} sx={{ color: '#101828' }}>
                {clinic.hero.badge.title}
              </Typography>
              <Typography sx={{ color: '#6B7280', fontSize: '0.95rem' }}>
                {clinic.hero.badge.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const DocWebsite6HeroSection = React.memo(
  DocWebsite6HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite6HeroSection;
