'use client';

import React from 'react';
import { Avatar, Box, Button, Rating, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8TestimonialsSectionProps {
  clinic: Clinic;
}

export const DocWebsite8TestimonialsSection: React.FC<
  DocWebsite8TestimonialsSectionProps
> = ({ clinic }) => {
  if (!clinic.testimonials?.length) {
    return null;
  }

  return (
    <Box
      id="testimonials"
      sx={{
        backgroundColor: '#EFF4FB',
        color: '#0C2D48',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center', mb: 4 }}>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: '2.3rem', md: '2.6rem' }, fontWeight: 800 }}
        >
          What Our Patients Say
        </Typography>
        <Typography sx={{ color: 'rgba(12,45,72,0.7)', mt: 1 }}>
          Read genuine feedback from our patients who have experienced our
          exceptional healthcare services.
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 3,
        }}
      >
        {clinic.testimonials.map(testimonial => (
          <Box
            key={testimonial.id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              p: 3,
              boxShadow: '0 25px 35px rgba(15, 23, 42, 0.08)',
              textAlign: 'left',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar src={testimonial.image} alt={testimonial.name} />
              <Box>
                <Typography fontWeight={700}>{testimonial.name}</Typography>
                <Rating
                  value={testimonial.rating}
                  readOnly
                  size="small"
                  sx={{ color: '#FFB400' }}
                />
              </Box>
            </Box>
            <Typography
              sx={{ fontStyle: 'italic', color: 'rgba(12,45,72,0.8)' }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1E56FF',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '999px',
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          Read More Reviews
        </Button>
      </Box>
    </Box>
  );
};

export default DocWebsite8TestimonialsSection;
