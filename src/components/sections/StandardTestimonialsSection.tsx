'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Avatar, Box, Rating, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface StandardTestimonialsSectionProps {
  clinic: Clinic;
}

const StandardTestimonialsSectionComponent: React.FC<
  StandardTestimonialsSectionProps
> = ({ clinic }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.firstElementChild as HTMLElement | null;
    const cardWidth = child?.clientWidth ?? container.clientWidth;
    const gap = 24; // matches gap defined in sx
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

  const theme = useClinicTheme(clinic.id);

  if (!clinic.testimonials?.length) {
    return null;
  }
  const backgroundColor = theme.componentBackground;
  const accentColor = theme.accentColor;
  const textColor = theme.textColor;
  const cardTextColor = '#0C2D23';

  return (
    <Box
      id="testimonials"
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 5, textAlign: 'center' }}>
        <Typography
          sx={{
            color: accentColor,
            letterSpacing: '0.2em',
            fontWeight: 600,
            mb: 1,
            fontSize: '0.9rem',
          }}
        >
          TESTIMONIAL
        </Typography>
        <Typography
          component="h2"
          sx={{ fontSize: { xs: '2.3rem', md: '2.6rem' }, fontWeight: 800 }}
        >
          What Patients Say About Us.
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
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {clinic.testimonials.map(testimonial => (
          <Box
            key={testimonial.id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              minHeight: 260,
              padding: 3,
              color: cardTextColor,
              display: 'flex',
              flexDirection: 'column',
              flex: { xs: '0 0 90%', md: '0 0 45%', lg: '0 0 32%' },
              scrollSnapAlign: 'center',
            }}
          >
            <FormatQuoteIcon sx={{ color: accentColor, fontSize: 36 }} />
            <Typography
              sx={{
                color: 'rgba(12,45,35,0.8)',
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
                <Avatar
                  sx={{
                    backgroundColor: accentColor,
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  {testimonial.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography fontWeight={700}>{testimonial.name}</Typography>
                  <Typography
                    sx={{ color: 'rgba(12,45,35,0.6)', fontSize: '0.9rem' }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
              <Rating
                value={testimonial.rating}
                readOnly
                sx={{ color: accentColor }}
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
                index === activeIndex ? accentColor : `${accentColor}4D`,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export const StandardTestimonialsSection = React.memo(
  StandardTestimonialsSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default StandardTestimonialsSection;
