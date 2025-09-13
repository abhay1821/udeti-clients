'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Rating,
  Avatar,
  useTheme,
} from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';

interface TestimonialsCarouselProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  maxTestimonials?: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  clinicId,
  title = 'What Our Patients Say',
  subtitle = 'Read testimonials from our satisfied patients who have experienced our quality medical care',
  maxTestimonials,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const clinic = clinicId ? getClinicById(clinicId) : null;
  const testimonials = clinic?.testimonials || [];
  const displayTestimonials = maxTestimonials ? testimonials.slice(0, maxTestimonials) : testimonials;

  const handleDotClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  const currentTestimonialData = displayTestimonials[currentTestimonial];

  if (displayTestimonials.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || theme.palette.primary.main,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              mb: 4,
            }}
          >
            {subtitle}
          </Typography>
          
          {/* Divider */}
          <Box
            sx={{
              width: '60px',
              height: '4px',
              backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
              mx: 'auto',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Single Testimonial Card */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Card
            sx={{
              maxWidth: { xs: '100%', sm: '800px', md: '900px' },
              width: '100%',
              boxShadow: 6,
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Left Side - Avatar and Patient Info */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  minWidth: { xs: 'auto', md: '200px' },
                  textAlign: 'center'
                }}>
                  {/* Avatar */}
                  <Avatar
                    src={currentTestimonialData?.image}
                    alt={currentTestimonialData?.name}
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      mb: 2,
                      backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {currentTestimonialData?.name?.charAt(0)}
                  </Avatar>

                  {/* Patient Name */}
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: clinic?.primaryColor || theme.palette.primary.main,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      mb: 0.5,
                    }}
                  >
                    {currentTestimonialData?.name}
                  </Typography>

                  {/* Patient Role */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      mb: 2,
                    }}
                  >
                    {currentTestimonialData?.role}
                  </Typography>

                  {/* Rating */}
                  <Rating
                    value={currentTestimonialData?.rating || 5}
                    readOnly
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#ffc107',
                      },
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                    }}
                  />
                </Box>

                {/* Right Side - Testimonial Quote */}
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  minHeight: { xs: 'auto', md: '200px' }
                }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{currentTestimonialData?.content}&rdquo;
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Dots - Inside the card */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1, 
                mt: 3,
                pt: 2,
                borderTop: '1px solid #e0e0e0'
              }}>
                {displayTestimonials.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => handleDotClick(index)}
                    sx={{
                      width: { xs: 10, sm: 12 },
                      height: { xs: 10, sm: 12 },
                      borderRadius: '50%',
                      backgroundColor: index === currentTestimonial
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
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsCarousel;
