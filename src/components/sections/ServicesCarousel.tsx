'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
  Chip,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface ServicesCarouselProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  maxServices?: number;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  clinicId,
  title = 'Our Services',
  subtitle = 'Comprehensive healthcare services tailored to your needs',
  maxServices,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const services = clinic?.services || [];
  const displayServices = maxServices ? services.slice(0, maxServices) : services;
  
  // Show 4 services at once, slide by 1
  const servicesPerView = 4;
  const totalSlides = Math.max(1, displayServices.length - servicesPerView + 1);
  const showNavigation = displayServices.length > servicesPerView;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Get services for current view
  const startIndex = Math.min(currentIndex, displayServices.length - servicesPerView);
  const endIndex = startIndex + servicesPerView;
  const currentServices = displayServices.slice(startIndex, endIndex);

  if (displayServices.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Carousel Container */}
        <Box sx={{ position: 'relative' }}>
          {/* Services Grid */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflow: 'hidden',
              pb: 2,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                transform: showNavigation ? `translateX(-${currentIndex * (100 / totalSlides)}%)` : 'none',
                transition: 'transform 0.3s ease-in-out',
                width: showNavigation ? `${totalSlides * 100}%` : '100%',
              }}
            >
              {(showNavigation ? currentServices : displayServices).map((service, index) => (
                <Card
                  key={service.id}
                  sx={{
                    flex: '0 0 calc(25% - 12px)',
                    minWidth: { xs: '280px', sm: '320px', md: '350px' },
                    boxShadow: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {/* Service Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image || '/images/service-placeholder.jpg'}
                    alt={service.title}
                    sx={{
                      objectFit: 'cover',
                      height: '200px',
                    }}
                  />

                  {/* Service Content */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: clinic?.primaryColor || theme.palette.primary.main,
                        mb: 1.5,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 2,
                        lineHeight: 1.5,
                        fontSize: '0.9rem',
                        minHeight: '40px',
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* Bullet Points */}
                    {service.bulletPoints && (
                      <Box sx={{ mt: 2 }}>
                        {service.bulletPoints.slice(0, 4).map((point: string, pointIndex: number) => (
                          <Box
                            key={pointIndex}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                                mr: 1.5,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '0.9rem',
                                color: 'text.secondary',
                                lineHeight: 1.4,
                              }}
                            >
                              {point}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Service Icon */}
                    {service.icon && (
                      <Box
                        sx={{
                          fontSize: '2rem',
                          textAlign: 'center',
                          mt: 2,
                        }}
                      >
                        {service.icon}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Navigation Controls - Only show if needed */}
          {showNavigation && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mt: 3,
                px: 2,
              }}
            >
              {/* Previous Button */}
              <IconButton
                onClick={handlePrevious}
                sx={{
                  backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                    opacity: 0.8,
                  },
                  transition: 'all 0.3s ease',
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  boxShadow: 2,
                }}
              >
                <ChevronLeft />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={handleNext}
                sx={{
                  backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                    opacity: 0.8,
                  },
                  transition: 'all 0.3s ease',
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  boxShadow: 2,
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesCarousel;
