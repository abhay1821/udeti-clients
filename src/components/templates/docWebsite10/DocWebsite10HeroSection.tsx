'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10HeroSectionProps {
  clinic: Clinic;
}

const DocWebsite10HeroSectionComponent: React.FC<
  DocWebsite10HeroSectionProps
> = ({ clinic }) => {
  const badgeText =
    clinic.hero.badgeText ||
    (clinic.hero.badge
      ? [clinic.hero.badge.title, clinic.hero.badge.description]
          .filter(Boolean)
          .join(' · ')
      : null);
  const heroHighlights = clinic.hero.highlights ?? [];
  const doctorCard = clinic.hero.doctorCard;

  const handleNavigate = (target?: string) => {
    if (!target) return;
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = target;
  };

  return (
    <Box
      id="home"
      sx={{
        background: 'linear-gradient(135deg, #FDF9F7, #F8F2FF)',
        color: '#3B2A27',
        px: { xs: 2.5, md: 4 },
        py: { xs: 4, md: 8 },
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', lg: 1400, xl: 1600 },
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 4, lg: 8, xl: 10 },
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box>
          {badgeText && (
            <Box
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                alignItems: 'center',
                backgroundColor: '#ECE7FF',
                color: '#5C4B43',
                px: 3,
                py: 1,
                borderRadius: '999px',
                fontWeight: 600,
                mb: 3,
              }}
            >
              {badgeText}
            </Box>
          )}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', md: '3.1rem' },
              fontWeight: 800,
              mb: { xs: 2, md: 3 },
            }}
          >
            {clinic.hero.title}
          </Typography>
          <Typography sx={{ color: '#6C5A52', lineHeight: 1.8, mb: 4 }}>
            {clinic.hero.subtitle}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleNavigate(clinic.hero.ctaLink)}
              sx={{
                background: 'linear-gradient(135deg, #7A421F, #B86A3D)',
                color: '#FFFFFF',
                textTransform: 'none',
                px: 4,
                py: 1.4,
                borderRadius: '999px',
                fontWeight: 600,
              }}
            >
              Book Appointment
            </Button>
            {clinic.hero.secondaryCtaText && (
              <Button
                variant="outlined"
                onClick={() =>
                  handleNavigate(clinic.hero.secondaryCtaLink ?? '#services')
                }
                sx={{
                  borderColor: '#3B2A27',
                  color: '#3B2A27',
                  textTransform: 'none',
                  px: 4,
                  py: 1.4,
                  borderRadius: '999px',
                  fontWeight: 600,
                }}
              >
                {clinic.hero.secondaryCtaText}
              </Button>
            )}
          </Stack>

          {heroHighlights.length > 0 && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{
                mt: 4,
                color: '#8B6E5C',
                fontWeight: 600,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {heroHighlights.map((highlight: string) => (
                <Box key={highlight}>{highlight}</Box>
              ))}
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            boxShadow: '0 25px 60px rgba(58, 28, 16, 0.15)',
            p: { xs: 3, md: 4, lg: 5, xl: 6 },
            height: { lg: 'fit-content' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              mb: { xs: 2, md: 3 },
            }}
          >
            <Box
              component="img"
              src={doctorCard?.image || clinic.hero.backgroundImage}
              alt={doctorCard?.name || clinic.name}
              sx={{
                width: { xs: 90, md: 110, lg: 130, xl: 150 },
                height: { xs: 90, md: 110, lg: 130, xl: 150 },
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                fontWeight={700}
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem', lg: '1.25rem' },
                  mb: 0.5,
                }}
              >
                {doctorCard?.name || clinic.name}
              </Typography>
              <Typography
                color="#6C5A52"
                sx={{
                  fontSize: { xs: '0.85rem', md: '0.95rem', lg: '1rem' },
                  mb: 0.5,
                }}
              >
                {doctorCard?.title || clinic.tagline}
              </Typography>
              <Typography
                color="#6C5A52"
                sx={{ fontSize: { xs: '0.85rem', md: '0.95rem', lg: '1rem' } }}
              >
                {doctorCard?.location || clinic.contact.address}
              </Typography>
            </Box>
          </Box>

          <Typography
            component="a"
            href={`tel:${clinic.contact.phone}`}
            sx={{
              display: 'inline-block',
              color: '#1C5AD3',
              fontSize: {
                xs: '1.1rem',
                md: '1.3rem',
                lg: '1.5rem',
                xl: '1.6rem',
              },
              fontWeight: 700,
              textDecoration: 'none',
              mb: { xs: 2, md: 3, lg: 4 },
              mt: { xs: 1, md: 2 },
            }}
          >
            {clinic.contact.phone}
          </Typography>

          {(doctorCard?.highlights ?? []).length > 0 && (
            <Stack
              spacing={{ xs: 1.5, md: 2 }}
              sx={{
                color: '#6C5A52',
                fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              {doctorCard?.highlights.map((item: string) => (
                <Box key={item}>{item}</Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite10HeroSection = React.memo(
  DocWebsite10HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite10HeroSection;
