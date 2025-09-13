'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';
import ServicesCarousel from './ServicesCarousel';
import ServicesSingleCard from './ServicesSingleCard';

interface ServicesSectionProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  maxServices?: number;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  clinicId,
  title = 'Our Services',
  subtitle = 'Comprehensive healthcare services tailored to your needs',
  maxServices,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const services = clinic?.services || [];
  const displayServices = maxServices ? services.slice(0, maxServices) : services;

  // Use different layouts for different websites
  const useCarousel = clinicId && ['doc-website-2', 'doc-website-4'].includes(clinicId);
  const useSingleCard = clinicId === 'doc-website-5';
  const useGrid = clinicId === 'doc-website-1';

  if (useCarousel) {
    return (
      <Box id="services">
        <ServicesCarousel
          clinicId={clinicId}
          title={title}
          subtitle={subtitle}
          maxServices={maxServices}
        />
      </Box>
    );
  }

  if (useSingleCard) {
    return (
      <Box id="services">
        <ServicesSingleCard
          clinicId={clinicId}
          title={title}
          subtitle={subtitle}
          maxServices={maxServices}
        />
      </Box>
    );
  }

  if (useGrid) {
    return (
      <Box id="services" sx={{ py: 8, backgroundColor: 'grey.50' }}>
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

          {/* Services Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {displayServices.map((service) => (
              <Card
                key={service.id}
                sx={{
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
                    <Box sx={{ mb: 3 }}>
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

                  {/* Learn More Button */}
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: clinic?.primaryColor || theme.palette.primary.main,
                      color: clinic?.primaryColor || theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                        color: 'white',
                      },
                      width: '100%',
                      mt: 2,
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box id="services" sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || theme.palette.primary.main,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {displayServices.map((service) => (
            <Box key={service.id} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: `${clinic?.primaryColor || theme.palette.primary.main}15`,
                      color: clinic?.primaryColor || theme.palette.primary.main,
                    }}
                  >
                    {service.icon}
                  </Box>
                  
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: 'text.primary',
                    }}
                  >
                    {service.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {maxServices && services.length > maxServices && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              And {services.length - maxServices} more services...
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServicesSection;
