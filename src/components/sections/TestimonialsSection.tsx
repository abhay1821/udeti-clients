'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Rating,
  useTheme,
} from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';
import TestimonialsCarousel from './TestimonialsCarousel';

interface TestimonialsSectionProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  maxTestimonials?: number;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  clinicId,
  title = 'What Our Patients Say',
  subtitle = 'Real feedback from our valued patients',
  maxTestimonials,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const testimonials = clinic?.testimonials || [];
  const displayTestimonials = maxTestimonials ? testimonials.slice(0, maxTestimonials) : testimonials;

  // Determine layout based on clinicId
  const useCarousel = clinicId && ['doc-website-1'].includes(clinicId);

  if (displayTestimonials.length === 0) {
    return null;
  }

  // Render carousel for web2, web4, web5
  if (useCarousel) {
    return (
      <Box id="testimonials">
        <TestimonialsCarousel
          clinicId={clinicId}
          title={title}
          subtitle={subtitle}
          maxTestimonials={maxTestimonials}
        />
      </Box>
    );
  }

  // Render grid layout for web1 and others
  return (
    <Box id="testimonials" sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {displayTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              sx={{
                height: '100%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                {/* Rating Stars */}
                <Box sx={{ mb: 2 }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#ffc107',
                      },
                    }}
                  />
                </Box>
                
                {/* Testimonial Content */}
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: 'text.primary',
                    mb: 3,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                >
                  &ldquo;{testimonial.content}&rdquo;
                </Typography>
                
                {/* Divider */}
                <Box
                  sx={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#e0e0e0',
                    my: 2,
                  }}
                />

                {/* Patient Info */}
                <Box>
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
                    {testimonial.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
