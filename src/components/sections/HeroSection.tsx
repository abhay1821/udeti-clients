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
import { getHeroBackgroundColor, getTextColor, getButtonColor } from '@/lib/theme';

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

  const title = customTitle || hero?.title || 'Welcome to Our Healthcare';
  const subtitle = customSubtitle || hero?.subtitle || 'Quality healthcare services for you and your family';
  const ctaText = customCtaText || hero?.ctaText || 'Book Appointment';
  const ctaLink = customCtaLink || hero?.ctaLink || '/appointment';

  // Get theme colors from clinic data
  const heroBackgroundColor = getHeroBackgroundColor(clinic || null);
  const textColor = getTextColor(clinic || null);
  const buttonColor = getButtonColor(clinic || null);

  // Determine layout based on clinic theme
  const isBrownTheme = clinic?.primaryColor === '#BF712C' || (clinic as any)?.theme?.heroBackground?.includes('brown') || (clinic as any)?.theme?.heroBackground?.includes('7C');

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
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 2, height: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'space-between',
          textAlign: 'left',
          height: '100%',
          gap: { xs: 4, md: 0 }
        }}>
          {/* Text Content */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            textAlign: 'left',
            width: { xs: '100%', md: '50%' },
            maxWidth: { xs: '100%', sm: '600px', md: '500px' },
            mx: 0
          }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: textColor,
                fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.2,
                textAlign: 'left',
                width: '100%',
              }}
            >
              {isBrownTheme ? (
                <>
                  <Box component="span" sx={{ display: 'block' }}>
                    Your Smile,
                  </Box>
                  <Box component="span" sx={{ display: 'block' }}>
                    Our Priority
                  </Box>
                </>
              ) : (
                title
              )}
            </Typography>
            
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="p"
              sx={{
                mb: 4,
                color: textColor,
                lineHeight: 1.6,
                fontSize: { xs: '1.3rem', sm: '1.4rem', md: '1.5rem' },
                fontWeight: 400,
                textAlign: 'left',
                width: '100%',
                opacity: isBrownTheme ? 0.95 : 1,
              }}
            >
              {subtitle}
            </Typography>

          </Box>

          {/* Image Content */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: { xs: '100%', md: '50%' }
          }}>
            <Box
              sx={{
                width: { xs: '300px', sm: '350px', md: '450px' },
                height: { xs: '300px', sm: '350px', md: '450px' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: isBrownTheme ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative',
                border: isBrownTheme ? '4px solid white' : 'none',
                '&::before': !isBrownTheme ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, ${clinic?.primaryColor || '#1976d2'}20, ${clinic?.secondaryColor || '#42a5f5'}20)`,
                  zIndex: 1,
                } : {}
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="Professional Doctor"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 3,
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  // Show fallback text when image fails to load
                  const fallback = e.currentTarget.parentElement?.querySelector('.fallback-text') as HTMLElement;
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
                  backgroundColor: isBrownTheme ? '#f0f0f0' : (clinic?.primaryColor || '#1976d2'),
                  color: isBrownTheme ? '#666' : 'white',
                  fontSize: isBrownTheme ? '4rem' : '2rem',
                  fontWeight: 'bold',
                  zIndex: 2,
                }}
                className="fallback-text"
              >
                {isBrownTheme ? '👨‍⚕️' : 'Doctor'}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
