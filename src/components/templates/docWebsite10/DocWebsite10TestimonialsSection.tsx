'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Avatar, Box, Rating, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10TestimonialsSectionProps {
  clinic: Clinic;
}

const DocWebsite10TestimonialsSectionComponent: React.FC<
  DocWebsite10TestimonialsSectionProps
> = ({ clinic }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.firstElementChild as HTMLElement | null;
    const cardWidth = child?.clientWidth ?? container.clientWidth;
    const gap = 24;
    const index = Math.round(container.scrollLeft / (cardWidth + gap));
    setActiveIndex(
      Math.min(Math.max(index, 0), (clinic.testimonials?.length ?? 1) - 1)
    );
  }, [clinic.testimonials?.length]);

  const handleDotClick = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.firstElementChild as HTMLElement | null;
    const cardWidth = child?.clientWidth ?? container.clientWidth;
    const gap = 24;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  if (!clinic.testimonials?.length) {
    return null;
  }

  return (
    <Box
      id="testimonials"
      sx={{
        background: 'linear-gradient(135deg, #FFF8F4, #F8F2FF)',
        color: '#3B2A27',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 5, textAlign: 'center' }}>
        <Typography
          sx={{
            color: '#B86A3D',
            letterSpacing: '0.2em',
            fontWeight: 600,
            mb: 1,
          }}
        >
          TESTIMONIALS
        </Typography>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: '2.3rem', md: '2.6rem' }, fontWeight: 800 }}
        >
          Loved By Our Patients
        </Typography>
        <Typography sx={{ color: '#6C5A52', mt: 1 }}>
          Hear how painless dentistry and precision care transformed their
          smiles.
        </Typography>
      </Box>

      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          px: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {clinic.testimonials.map(testimonial => (
          <Box
            key={testimonial.id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              minHeight: 280,
              padding: 3,
              color: '#3B2A27',
              boxShadow: '0 30px 60px rgba(36,21,17,0.12)',
              display: 'flex',
              flexDirection: 'column',
              flex: { xs: '0 0 90%', md: '0 0 45%', lg: '0 0 32%' },
              scrollSnapAlign: 'center',
            }}
          >
            <FormatQuoteIcon sx={{ color: '#D29A6A', fontSize: 36 }} />
            <Typography
              sx={{
                color: 'rgba(59,42,39,0.8)',
                lineHeight: 1.8,
                flex: 1,
                mt: 1,
              }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar src={testimonial.image} alt={testimonial.name} />
                <Box>
                  <Typography fontWeight={700}>{testimonial.name}</Typography>
                  <Typography
                    sx={{ color: 'rgba(59,42,39,0.6)', fontSize: '0.9rem' }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
              <Rating
                value={testimonial.rating}
                readOnly
                sx={{ color: '#F0B27A' }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
        {clinic.testimonials.map((_, index) => (
          <Box
            key={`dot-${index}`}
            onClick={() => handleDotClick(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor:
                index === activeIndex ? '#B86A3D' : 'rgba(184,106,61,0.3)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export const DocWebsite10TestimonialsSection = React.memo(
  DocWebsite10TestimonialsSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite10TestimonialsSection;
