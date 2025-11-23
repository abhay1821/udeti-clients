'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  Rating,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Clinic } from '@/types/Clinic';

interface DocWebsite6TestimonialsSectionProps {
  clinic: Clinic;
}

const DocWebsite6TestimonialsSectionComponent: React.FC<
  DocWebsite6TestimonialsSectionProps
> = ({ clinic }) => {
  if (!clinic.testimonials?.length) return null;

  return (
    <Box
      id="testimonials"
      sx={{
        py: { xs: 6, md: 10 },
        background:
          'linear-gradient(135deg, #F7F5FF 0%, #EEF0FF 50%, #F7FCFF 100%)',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 3, md: 4 }, maxWidth: { xl: '1200px' } }}
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
              mb: 1,
              display: 'inline-block',
            }}
          >
            Patient Stories
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '2rem', md: '2.6rem' },
            }}
          >
            Testimonials
          </Typography>
          <Typography
            sx={{
              color: '#5B6472',
              maxWidth: 640,
              mx: 'auto',
              mt: 2,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Hear from patients who trust Dr. Vance with their wellness journey.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {clinic.testimonials.map(testimonial => (
            <Box
              key={testimonial.id}
              sx={{
                position: 'relative',
                borderRadius: '28px',
                backgroundColor: '#fff',
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.08)',
                p: 4,
                minHeight: 320,
                overflow: 'hidden',
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  fontSize: 48,
                  color: 'rgba(90, 84, 245, 0.15)',
                }}
              />

              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 64, height: 64, borderRadius: '18px' }}
                />
                <Box>
                  <Typography fontWeight={700} color="#0F172A">
                    {testimonial.name}
                  </Typography>
                  <Typography fontSize="0.9rem" color="#5B6472">
                    {testimonial.role}
                  </Typography>
                </Box>
              </Stack>

              <Rating
                value={testimonial.rating}
                readOnly
                size="small"
                sx={{ mb: 2, '& .MuiRating-iconFilled': { color: '#F7B733' } }}
              />

              <Typography
                sx={{ color: '#1F2937', lineHeight: 1.7, fontSize: '1rem' }}
              >
                “{testimonial.content}”
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export const DocWebsite6TestimonialsSection = React.memo(
  DocWebsite6TestimonialsSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite6TestimonialsSection;
