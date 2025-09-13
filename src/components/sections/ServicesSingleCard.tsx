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
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface ServicesSingleCardProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  maxServices?: number;
}

const ServicesSingleCard: React.FC<ServicesSingleCardProps> = ({
  clinicId,
  title = 'Our Services',
  subtitle = 'Comprehensive healthcare services tailored to your needs',
  maxServices,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  const [currentService, setCurrentService] = useState(0);
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const services = clinic?.services || [];
  const displayServices = maxServices ? services.slice(0, maxServices) : services;

  const handlePrevious = () => {
    setCurrentService((prev) => (prev === 0 ? displayServices.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentService((prev) => (prev === displayServices.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentService(index);
  };

  const currentServiceData = displayServices[currentService];

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

        {/* Single Card Carousel */}
        <Box sx={{ position: 'relative' }}>
          <Card
            sx={{
              maxWidth: '100%',
              mx: 'auto',
              boxShadow: 3,
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Image Section - Left */}
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={currentServiceData?.image || '/images/service-placeholder.jpg'}
                  alt={currentServiceData?.title}
                  sx={{
                    objectFit: 'cover',
                    height: { xs: '250px', md: '400px' },
                  }}
                />
              </Box>

              {/* Content Section - Right */}
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {/* Service Title */}
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: clinic?.primaryColor || theme.palette.primary.main,
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    {currentServiceData?.title}
                  </Typography>

                  {/* Service Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                  >
                    {currentServiceData?.description}
                  </Typography>

                  {/* Bullet Points */}
                  {currentServiceData?.bulletPoints && (
                    <Box sx={{ mb: 3 }}>
                      {currentServiceData.bulletPoints.slice(0, 4).map((point: string, pointIndex: number) => (
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

                          {/* Navigation Controls - Inside the card content */}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: 2,
                              mt: 3,
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

                            {/* Dots Indicator */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {displayServices.map((_, index) => (
                                <Box
                                  key={index}
                                  onClick={() => handleDotClick(index)}
                                  sx={{
                                    width: { xs: 10, sm: 12 },
                                    height: { xs: 10, sm: 12 },
                                    borderRadius: '50%',
                                    backgroundColor: index === currentService 
                                      ? (clinic?.primaryColor || theme.palette.primary.main)
                                      : '#ddd',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                                      opacity: 0.7,
                                    },
                                  }}
                                />
                              ))}
                            </Box>

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

                          {/* Service Counter */}
                          <Box sx={{ textAlign: 'center', mt: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                              }}
                            >
                              {currentService + 1} of {displayServices.length}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>
                  </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSingleCard;
