'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Clinic } from '@/types/Clinic';

interface DocWebsite6ServicesSectionProps {
  clinic: Clinic;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <HealthAndSafetyIcon fontSize="large" />,
  heart: <FavoriteBorderIcon fontSize="large" />,
  video: <VideoCameraFrontIcon fontSize="large" />,
  vaccination: <VaccinesIcon fontSize="large" />,
};

export const DocWebsite6ServicesSection: React.FC<
  DocWebsite6ServicesSectionProps
> = ({ clinic }) => {
  const services = clinic.services.slice(0, 4);

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #EEF0FF 0%, #FDF7FF 100%)',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, md: 4 },
          maxWidth: { xl: '1400px' },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            component="span"
            sx={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#5A54F5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-block',
              mb: 1,
            }}
          >
            Our Expertise
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Comprehensive Medical Services
          </Typography>
          <Typography
            sx={{
              color: '#5B6472',
              maxWidth: 640,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.8,
            }}
          >
            We offer a wide range of services to meet your healthcare needs,
            from routine check-ups to specialized treatments.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))',
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {services.map(service => (
            <Box key={service.id} sx={{ height: '100%' }}>
              <Box
                sx={{
                  height: '100%',
                  borderRadius: '28px',
                  p: 3.5,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 25px 60px rgba(15, 23, 42, 0.08)',
                  border: '1px solid rgba(90, 84, 245, 0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(90,84,245,0.08), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 35px 80px rgba(90, 84, 245, 0.2)',
                    '&:before': { opacity: 1 },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(90, 84, 245, 0.12)',
                    color: '#5A54F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    boxShadow: '0 12px 30px rgba(90, 84, 245, 0.2)',
                  }}
                >
                  {service.icon && iconMap[service.icon] ? (
                    iconMap[service.icon]
                  ) : (
                    <LocalHospitalIcon fontSize="large" />
                  )}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#0F172A',
                    mb: 1.5,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#5B6472',
                    lineHeight: 1.7,
                    fontSize: '0.98rem',
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default DocWebsite6ServicesSection;
