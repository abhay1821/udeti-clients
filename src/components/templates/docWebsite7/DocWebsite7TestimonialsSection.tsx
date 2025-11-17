'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7TestimonialsSectionProps {
  clinic: Clinic;
}

export const DocWebsite7TestimonialsSection: React.FC<
  DocWebsite7TestimonialsSectionProps
> = ({ clinic }) => {
  if (!clinic.testimonials?.length) {
    return null;
  }

  return (
    <Box
      id="testimonials"
      sx={{
        backgroundColor: '#F4FAF6',
        color: '#0D2B21',
        px: { xs: 2.5, md: 4 },
        py: { xs: 4, md: 6 },
        borderBottom: '1px solid rgba(15,23,42,0.08)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          pb: 2,
          mb: { xs: 4, md: 5 },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.3rem' },
            fontWeight: 700,
            mb: 4,
          }}
        >
          From Our Patients
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box
          sx={{
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
                borderRadius: '32px',
                padding: { xs: 3, md: 3.5 },
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                border: '1px solid rgba(15,23,42,0.05)',
                position: 'relative',
                fontStyle: 'italic',
                lineHeight: 1.7,
              }}
            >
              <Typography sx={{ mb: 3, fontSize: '1.05rem' }}>
                &ldquo;{testimonial.content}&rdquo;
              </Typography>
              <Typography fontWeight={700} fontStyle="normal">
                - {testimonial.name}
              </Typography>
              <Typography fontStyle="normal" color="rgba(13,43,33,0.6)">
                {testimonial.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite7TestimonialsSection;
