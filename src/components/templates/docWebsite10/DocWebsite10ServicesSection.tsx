'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10ServicesSectionProps {
  clinic: Clinic;
}

export const DocWebsite10ServicesSection: React.FC<
  DocWebsite10ServicesSectionProps
> = ({ clinic }) => {
  const services = clinic.services ?? [];
  if (services.length === 0) {
    return null;
  }

  return (
    <Box
      id="services"
      sx={{
        backgroundColor: '#FFF6F0',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: '2.3rem', md: '2.6rem' },
          fontWeight: 800,
          color: '#3B2A27',
          mb: 1.5,
        }}
      >
        Our Services
      </Typography>
      <Typography sx={{ color: '#6C5A52', mb: 5 }}>{clinic.tagline}</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {services.map((service, index) => (
          <Box
            key={service.id || index}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#3B2A27',
              borderRadius: '32px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: 360,
              boxShadow: '0 30px 60px rgba(36,21,17,0.08)',
            }}
          >
            <Box
              component="img"
              src={service.image || clinic.hero.backgroundImage}
              alt={service.title}
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '6px solid rgba(255,255,255,0.7)',
                mb: 3,
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
              }}
            />
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              {service.title}
            </Typography>
            <Typography
              sx={{ color: 'rgba(59,42,39,0.75)', lineHeight: 1.7, mb: 3 }}
            >
              {service.description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                background: 'linear-gradient(135deg, #7A421F, #B86A3D)',
                color: '#FFFFFF',
                fontWeight: 600,
                borderRadius: '999px',
                px: 3,
                mt: 'auto',
              }}
            >
              Know More
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DocWebsite10ServicesSection;
