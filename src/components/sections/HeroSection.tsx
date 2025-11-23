'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface HeroSectionProps {
  clinicId?: string;
  customTitle?: string;
  customSubtitle?: string;
  customCtaText?: string;
  customCtaLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  clinicId,
  customTitle,
  customSubtitle,
  customCtaText,
  customCtaLink,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getClinicById } = useClinic();

  const clinic = clinicId ? getClinicById(clinicId) : null;
  const hero = clinic?.hero;
  const clinicTheme = useClinicTheme(clinicId || '');

  const title = customTitle || hero?.title || 'Welcome to Our Healthcare';
  const subtitle =
    customSubtitle ||
    hero?.subtitle ||
    'Quality healthcare services for you and your family';

  const heroBackgroundColor = clinicTheme?.heroBackground || '#1F598C';
  const textColor = clinicTheme?.textColor || 'white';

  return (
    <Box
      id="home"
      sx={{
        background: heroBackgroundColor, // Dynamic background color based on clinic
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Text Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: textColor,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="p"
              sx={{
                mb: 4,
                color: textColor,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                maxWidth: { xs: '100%', md: '500px' },
                fontWeight: 400,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          {/* Image Content */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: { xs: '300px', md: '400px' },
                height: { xs: '300px', md: '400px' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, ${clinicTheme?.primaryColor || '#1976d2'}20, ${clinicTheme?.secondaryColor || '#42a5f5'}20)`,
                  zIndex: 1,
                },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Professional Doctor"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 3,
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector(
                    '.fallback-text'
                  ) as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback if image doesn't load - only shows when image fails */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'none', // Hidden by default
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: clinicTheme?.primaryColor || '#1976d2',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  zIndex: 2,
                }}
                className="fallback-text"
              >
                Doctor
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
