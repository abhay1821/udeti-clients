'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';

interface BrownThemeHeroProps {
  clinicId?: string;
  customTitle?: string;
  customSubtitle?: string;
  customCtaText?: string;
  customCtaLink?: string;
}

const BrownThemeHero: React.FC<BrownThemeHeroProps> = ({
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

  const title = customTitle || hero?.title || 'Your Smile, Our Priority';
  const subtitle = customSubtitle || hero?.subtitle || 'Established in 2003, Dr. Anurag\'s Dental Clinic has been serving the community with exceptional dental care, combining traditional values with modern technology.';
  const ctaText = customCtaText || hero?.ctaText || 'Book Appointment';
  const ctaLink = customCtaLink || hero?.ctaLink || '/appointment';

  return (
    <Box
      sx={{
        background: clinic?.primaryColor || '#7C573B',
        minHeight: { xs: '70vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
          {/* Text Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: 'white',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>
                Your Smile,
              </Box>
              <Box component="span" sx={{ display: 'block', ml: { xs: 0, md: 2 } }}>
                Our Priority
              </Box>
            </Typography>
            
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="p"
              sx={{
                mb: 4,
                color: 'white',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: { xs: '100%', md: '500px' },
                opacity: 0.95,
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
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                border: '4px solid white',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Dr. Anurag"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback if image doesn't load */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                  color: '#666',
                  fontSize: '4rem',
                }}
              >
                👨‍⚕️
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BrownThemeHero;
