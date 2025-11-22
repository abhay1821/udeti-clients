'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface ImageCardServicesSectionProps {
  clinic: Clinic;
}

const ImageCardServicesSectionComponent: React.FC<
  ImageCardServicesSectionProps
> = ({ clinic }) => {
  return (
    <Box
      id="services"
      sx={{
        backgroundColor: '#F4FBF7',
        color: '#0D2B21',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
        position: 'relative',
        borderTop: '1px solid rgba(15, 43, 33, 0.08)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 4,
          borderRadius: 999,
          backgroundColor: '#19D08A',
          opacity: 0.8,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1300,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '2.2rem', md: '2.8rem' },
            fontWeight: 800,
            mb: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          Our Services
        </Typography>
        <Typography
          sx={{
            maxWidth: 720,
            mx: 'auto',
            color: 'rgba(15, 43, 33, 0.65)',
            fontSize: { xs: '1rem', md: '1.1rem' },
            mb: { xs: 5, md: 6 },
          }}
        >
          Comprehensive treatments designed to meet you where you are in your
          wellness journey.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 3, md: 4 },
            justifyItems: 'center',
          }}
        >
          {clinic.services?.map(service => (
            <Box
              key={service.id}
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 30px 50px rgba(1, 27, 18, 0.12)',
                border: '1px solid rgba(15,23,42,0.06)',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 380,
              }}
            >
              <Box
                component="img"
                src={service.image}
                alt={service.title}
                sx={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ p: 3, flex: 1 }}>
                <Typography fontWeight={700} fontSize="1.2rem" sx={{ mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(15, 43, 33, 0.65)',
                    lineHeight: 1.7,
                    fontSize: '1rem',
                  }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    mt: 2,
                    color: '#0B8E63',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const ImageCardServicesSection = React.memo(
  ImageCardServicesSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default ImageCardServicesSection;
