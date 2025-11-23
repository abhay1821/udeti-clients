'use client';

import React, { useRef } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface StandardServicesSectionProps {
  clinic: Clinic;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <HealthAndSafetyIcon fontSize="large" />,
  heart: <FavoriteBorderIcon fontSize="large" />,
  video: <VideoCameraFrontIcon fontSize="large" />,
  vaccination: <VaccinesIcon fontSize="large" />,
};

const StandardServicesSectionComponent: React.FC<
  StandardServicesSectionProps
> = ({ clinic }) => {
  const services = clinic.services;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useClinicTheme(clinic.id);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const primaryColor = theme.buttonColor;

  const getRgbaColor = (color: string, opacity: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const ServiceCard = ({ service }: { service: (typeof services)[0] }) => (
    <Box sx={{ height: '100%', minWidth: { lg: '300px', xl: '320px' } }}>
      <Box
        sx={{
          height: '100%',
          borderRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3.5,
          backgroundColor: '#FFFFFF',
          border: `1px solid ${getRgbaColor(primaryColor, 0.08)}`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${getRgbaColor(primaryColor, 0.08)}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 35px 80px ${getRgbaColor(primaryColor, 0.2)}`,
            '&:before': { opacity: 1 },
          },
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '16px',
            backgroundColor: getRgbaColor(primaryColor, 0.12),
            color: primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            boxShadow: `0 12px 30px ${getRgbaColor(primaryColor, 0.2)}`,
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
  );

  const backgroundGradient = `linear-gradient(135deg, ${theme.componentBackground} 0%, #FFFFFF 100%)`;

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 6 },
        background: backgroundGradient,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, md: 4 },
          maxWidth: { xl: '1400px' },
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            component="span"
            sx={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: primaryColor,
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
            display: { xs: 'grid', lg: 'none' },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'relative',
          }}
        >
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              pb: 2,
            }}
          >
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </Box>

          {/* Navigation Buttons */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: 'absolute',
              left: { lg: -20, xl: -30 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#F6F7FB',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
              zIndex: 2,
            }}
          >
            <ChevronLeftIcon sx={{ color: primaryColor }} />
          </IconButton>

          <IconButton
            onClick={scrollRight}
            sx={{
              position: 'absolute',
              right: { lg: -20, xl: -30 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#F6F7FB',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
              zIndex: 2,
            }}
          >
            <ChevronRightIcon sx={{ color: primaryColor }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export const StandardServicesSection = React.memo(
  StandardServicesSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default StandardServicesSection;
