'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  IconButton,
  Container,
} from '@mui/material';
import {
  CheckCircle,
  ArrowBackIos,
  ArrowForwardIos,
  Language,
  Storage,
  Videocam,
} from '@mui/icons-material';
import { heroData } from '@/data/heroData';

const UdetiHeroSection: React.FC = () => {
  const { title, subtitle, slides } = heroData;
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentSlideData = slides[currentSlide];

  const handlePrevious = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'language':
        return <Language />;
      case 'storage':
        return <Storage />;
      case 'videocam':
        return <Videocam />;
      default:
        return <Language />;
    }
  };

  return (
    <Box
      id="solution"
      sx={{
        py: { xs: 4, sm: 5, md: 6, lg: 4 },
        backgroundColor: '#f8fffe',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Title Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 4, md: 5, lg: 4 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem', lg: '3rem' },
              fontWeight: 700,
              color: '#2c3e50',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.15rem',
                lg: '1.1rem',
              },
              color: '#5a6c7d',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Main Feature Card */}
        <Card
          sx={{
            maxWidth: { xs: '100%', md: '1000px', lg: '900px' },
            mx: 'auto',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            mb: { xs: 4, md: 3, lg: 2 },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
                minHeight: { xs: 'auto', md: '350px', lg: '320px' },
              }}
            >
              {/* Left Side - Main Feature */}
              <Box
                sx={{
                  background:
                    'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  p: { xs: 3, sm: 4, md: 4, lg: 3.5 },
                  color: 'white',
                  position: 'relative',
                  minHeight: { xs: '300px', md: '350px', lg: '320px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Doctor Image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 30 },
                    right: { xs: 20, md: 30 },
                    zIndex: 2,
                  }}
                >
                  <Avatar
                    src={currentSlideData.mainFeature.doctorImage}
                    sx={{
                      width: { xs: 80, sm: 100, md: 120 },
                      height: { xs: 80, sm: 100, md: 120 },
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ maxWidth: { xs: '70%', md: '60%' } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                      fontWeight: 700,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    {currentSlideData.mainFeature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      opacity: 0.9,
                      mb: 3,
                      lineHeight: 1.5,
                    }}
                  >
                    {currentSlideData.mainFeature.description}
                  </Typography>
                </Box>

                {/* CTA Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: '#1976d2',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    {currentSlideData.mainFeature.ctaButtons.primary}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {currentSlideData.mainFeature.ctaButtons.secondary}
                  </Button>
                </Box>
              </Box>

              {/* Right Side - Features */}
              <Box
                sx={{
                  p: { xs: 3, sm: 4, md: 4, lg: 3.5 },
                  backgroundColor: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Features Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      color: '#4caf50',
                      fontSize: { xs: '1.5rem', sm: '1.8rem' },
                      mr: 1.5,
                    }}
                  >
                    {getSectionIcon(currentSlideData.sectionIcon)}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      fontWeight: 700,
                      color: '#2c3e50',
                    }}
                  >
                    {currentSlideData.sectionTitle}
                  </Typography>
                </Box>

                {/* Features List */}
                <Box sx={{ mb: 4 }}>
                  {currentSlideData.features.map(feature => (
                    <Box
                      key={feature.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 2.5,
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: '#4caf50',
                          fontSize: { xs: '1.2rem', sm: '1.4rem' },
                          mr: 2,
                          mt: 0.2,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: '0.95rem', sm: '1.1rem' },
                            fontWeight: 600,
                            color: '#2c3e50',
                            mb: 0.5,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            color: '#5a6c7d',
                            lineHeight: 1.4,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton
            onClick={handlePrevious}
            sx={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ArrowBackIos sx={{ fontSize: '1rem' }} />
          </IconButton>

          {/* Pagination Dots */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentSlide ? '#4caf50' : '#e0e0e0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor:
                      index === currentSlide ? '#4caf50' : '#bdbdbd',
                  },
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ArrowForwardIos sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default UdetiHeroSection;
