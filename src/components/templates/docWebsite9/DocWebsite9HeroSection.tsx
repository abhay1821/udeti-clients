'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Clinic } from '@/types/Clinic';

interface DocWebsite9HeroSectionProps {
  clinic: Clinic;
}

const heroImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
];

export const DocWebsite9HeroSection: React.FC<DocWebsite9HeroSectionProps> = ({
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
        backgroundColor: '#082B23',
        color: '#F5A27E',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2.5, md: 5 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          gap: { xs: 4, lg: 8 },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              letterSpacing: '0.2em',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.8)',
              mb: 2,
            }}
          >
            WE TAKE CARE OF YOUR HORMONES, HEALTH & HAPPINESS
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
            }}
          >
            {clinic.hero.title}
          </Typography>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, mb: 4 }}
          >
            {clinic.hero.subtitle}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={() => scrollTo('#about')}
              sx={{
                textTransform: 'none',
                color: '#F5A27E',
                borderColor: '#F5A27E',
                borderRadius: '999px',
                px: 4,
                py: 1.2,
                fontWeight: 600,
                '&:hover': { borderColor: '#FFC3A4', color: '#FFC3A4' },
              }}
            >
              Read More
            </Button>
            <Button
              variant="text"
              onClick={() => scrollTo('#appointment')}
              startIcon={<PlayCircleOutlineIcon />}
              sx={{ textTransform: 'none', color: '#FFFFFF', fontWeight: 600 }}
            >
              Watch Video
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(2, 220px)',
            },
            justifyContent: 'center',
            gap: { xs: 2.5, md: 4 },
          }}
        >
          {heroImages.map((image, index) => (
            <Box
              key={image}
              component="img"
              src={image}
              alt={`${clinic.name} hero ${index + 1}`}
              sx={{
                width: { xs: '100%', sm: 240 },
                height: { xs: 220, sm: 280 },
                borderRadius: '50%',
                objectFit: 'cover',
                border: '6px solid rgba(255,255,255,0.15)',
                boxShadow: '0 35px 60px rgba(0,0,0,0.45)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite9HeroSection;
