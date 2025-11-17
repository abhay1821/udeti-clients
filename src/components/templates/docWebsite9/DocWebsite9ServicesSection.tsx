'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Clinic } from '@/types/Clinic';

interface DocWebsite9ServicesSectionProps {
  clinic: Clinic;
}

export const DocWebsite9ServicesSection: React.FC<
  DocWebsite9ServicesSectionProps
> = ({ clinic }) => {
  if (!clinic.services?.length) {
    return null;
  }

  return (
    <Box
      id="services"
      sx={{
        backgroundColor: '#FFF6F0',
        color: '#0C2D23',
        px: { xs: 3, md: 5 },
        py: { xs: 6, md: 9 },
        borderTop: '1px solid rgba(12,45,35,0.12)',
        boxShadow: 'inset 0 20px 40px rgba(255,162,126,0.08)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '320px 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'start',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#F5A27E',
              letterSpacing: '0.25em',
              fontWeight: 600,
              mb: 1,
            }}
          >
            MEDICAL SERVICES
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2.4rem', md: '2.8rem' },
              fontWeight: 800,
              mb: 3,
            }}
          >
            We&apos;re Providing Best Services.
          </Typography>
          <Typography sx={{ color: 'rgba(12,45,35,0.75)', lineHeight: 1.8 }}>
            Evidence-based endocrinology and hormone care tailored to your body.
            From thyroid and metabolic conditions to fertility and autoimmune
            disorders, Dr. Tanvi creates personalized plans that fit your
            lifestyle.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {clinic.services.map(service => (
            <Box
              key={service.id}
              sx={{
                backgroundColor: '#FFF7F2',
                border: '1px solid rgba(12,45,35,0.1)',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200,
                transition: 'background-color 0.3s ease, color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#F5A27E',
                  color: '#0C2D23',
                },
              }}
            >
              <Box sx={{ flex: 1, p: 3 }}>
                <Typography fontWeight={700} sx={{ mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography sx={{ color: 'inherit', opacity: 0.8 }}>
                  {service.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderTop: '1px solid rgba(12,45,35,0.08)',
                  backgroundColor: 'rgba(245,162,126,0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    textTransform: 'none',
                    color: 'inherit',
                    fontWeight: 600,
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite9ServicesSection;
