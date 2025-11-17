'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10HeroSectionProps {
  clinic: Clinic;
}

export const DocWebsite10HeroSection: React.FC<
  DocWebsite10HeroSectionProps
> = ({ clinic }) => {
  const badgeText =
    clinic.hero.badgeText ||
    (clinic.heroBadge
      ? [clinic.heroBadge.title, clinic.heroBadge.description]
          .filter(Boolean)
          .join(' · ')
      : null);
  const heroHighlights = clinic.heroHighlights ?? [];
  const doctorCard = clinic.heroDoctorCard;

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
        py: { xs: 6, md: 8 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          {badgeText && (
            <Box
              sx={{
                display: 'inline-flex',
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
              fontSize: { xs: '2.5rem', md: '3.1rem' },
              fontWeight: 800,
              mb: 3,
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
              sx={{ mt: 4, color: '#8B6E5C', fontWeight: 600 }}
            >
              {heroHighlights.map(highlight => (
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
            p: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              component="img"
              src={doctorCard?.image || clinic.hero.backgroundImage}
              alt={doctorCard?.name || clinic.name}
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Box>
              <Typography fontWeight={700}>
                {doctorCard?.name || clinic.name}
              </Typography>
              <Typography color="#6C5A52">
                {doctorCard?.title || clinic.tagline}
              </Typography>
              <Typography color="#6C5A52">
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
              fontSize: '1.3rem',
              fontWeight: 700,
              textDecoration: 'none',
              mb: 3,
            }}
          >
            {clinic.contact.phone}
          </Typography>

          {(doctorCard?.highlights ?? []).length > 0 && (
            <Stack spacing={1.5} sx={{ color: '#6C5A52' }}>
              {doctorCard?.highlights.map(item => (
                <Box key={item}>{item}</Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite10HeroSection;
