'use client';

import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Clinic } from '@/types/Clinic';

interface DocWebsite11HeroSectionProps {
  clinic: Clinic;
}

const DocWebsite11HeroSectionComponent: React.FC<
  DocWebsite11HeroSectionProps
> = ({ clinic }) => {
  const handleScroll = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = selector;
    }
  };

  return (
    <Box
      id="home"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', xl: 'flex-start' },
        gap: { xs: 4, md: 3, xl: 6 },
        px: { xs: 3, md: 3.5, lg: 4, xl: 6 },
        py: { xs: 5, md: 3.5, lg: 4, xl: 8 },
        backgroundColor: '#FFFFFF',
        minHeight: { xs: 'auto' },
        maxWidth: { md: '900px', lg: 'none' },
        mx: { md: 'auto', xl: 'unset' },
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: { xs: 1, xl: 1 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: '1.5rem',
              md: '2.25rem',
              lg: '2.25rem',
              xl: '3.25rem',
            },
            fontWeight: 700,
            color: '#0F172A',
            lineHeight: 1.2,
            mb: { xs: 2, md: 2.5, xl: 3 },
          }}
        >
          {clinic.hero.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            color: '#64748B',
            lineHeight: 1.7,
            mb: 4,
            maxWidth: { xs: '100%', md: '600px' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {clinic.hero.subtitle}
        </Typography>

        <Button
          variant="contained"
          onClick={() => handleScroll('#appointment')}
          sx={{
            alignSelf: { xs: 'stretch', sm: 'flex-start' },
            background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
            borderRadius: '8px',
            px: { xs: 4, md: 4, xl: 5 },
            py: { xs: 1.5, md: 1.5, xl: 1.75 },
            fontSize: { xs: '0.95rem', md: '0.95rem', xl: '1rem' },
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0px 10px 25px rgba(30, 64, 175, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
              boxShadow: '0px 15px 35px rgba(30, 64, 175, 0.4)',
            },
          }}
        >
          {clinic.hero.ctaText}
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: { xs: 2, xl: 2 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '100%', md: '400px', lg: '550px', xl: '850px' },
            borderRadius: { xs: '16px', md: '20px', xl: '24px' },
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={clinic.hero.backgroundImage}
            alt={clinic.name}
            sx={{
              width: '100%',
              height: { xs: '350px', md: '420px', lg: '480px', xl: '600px' },
              objectFit: 'cover',
              borderRadius: { xs: '16px', md: '20px', xl: '24px' },
            }}
          />

          {clinic.hero.doctorCard && (
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 16, md: 20, xl: 24 },
                left: { xs: 16, md: 20, xl: 24 },
                backgroundColor: '#FFFFFF',
                borderRadius: { xs: '12px', md: '14px', xl: '16px' },
                p: { xs: 2, md: 2, xl: 2.5 },
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                maxWidth: {
                  xs: 'calc(100% - 32px)',
                  sm: '280px',
                  md: '260px',
                  xl: '320px',
                },
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 700,
                  color: '#0F172A',
                  mb: 0.5,
                }}
              >
                {clinic.hero.doctorCard.name}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '0.875rem', md: '0.95rem' },
                    color: '#64748B',
                  }}
                >
                  {clinic.hero.doctorCard.highlights?.[0] ||
                    '7+ Years Experience'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <StarIcon
                    sx={{
                      color: '#9333EA',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      fontWeight: 600,
                      color: '#0F172A',
                    }}
                  >
                    4.5/5
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: '1  rem', md: '1.2rem', lg: '1.1rem' },
                  fontWeight: 700,
                  color: '#0F172A',
                  lineHeight: 1,
                  mb: 0.25,
                }}
              >
                15000+ Major Surgeries
              </Typography>

              <Link
                component="button"
                onClick={() => handleScroll('#about')}
                sx={{
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                  color: '#0F172A',
                  textDecoration: 'underline',
                  textDecorationColor: '#0F172A',
                  textUnderlineOffset: '4px',
                  marginTop: '5px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#5A54F5',
                    textDecorationColor: '#5A54F5',
                  },
                }}
              >
                VIEW FULL PROFILE
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite11HeroSection = React.memo(
  DocWebsite11HeroSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite11HeroSection;
