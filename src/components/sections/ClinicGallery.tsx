'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';
import { clinicGalleryImages } from '@/assets/images';

interface ClinicGalleryProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  images?: string[];
}

const ClinicGallery: React.FC<ClinicGalleryProps> = ({
  clinicId,
  title = 'Our Clinic in Pics',
  subtitle = 'Take a virtual tour of our facility designed for your comfort and care',
  images,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const clinic = clinicId ? getClinicById(clinicId) : null;
  const galleryImages = images || clinic?.galleryImages || clinicGalleryImages;

  // Handle initial image loading
  useEffect(() => {
    if (galleryImages.length > 0) {
      setImageLoading(true);
      // Small delay to ensure loading state is visible
      const timer = setTimeout(() => {
        setImageLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [galleryImages]);

  const handlePrevious = () => {
    setImageLoading(true);
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImageLoading(true);
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setImageLoading(true);
    setCurrentImage(index);
  };

  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };


  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <Box id="clinic" sx={{ py: 8 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || theme.palette.primary.main,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Main Image Carousel */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          {/* Main Image */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', lg: '80%', xl: '70%' },
              height: { xs: '300px', sm: '400px', md: '500px' },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 6,
              mx: 'auto',
            }}
          >
            {imageLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <Box
              component="img"
              src={galleryImages[currentImage]}
              alt={`Clinic image ${currentImage + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease',
                opacity: imageLoading ? 0 : 1,
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', galleryImages[currentImage]);
                setImageLoading(false);
              }}
              onError={(e) => {
                console.error('Image failed to load:', galleryImages[currentImage]);
                setImageLoading(false);
                // Set a fallback image
                e.currentTarget.src = clinicGalleryImages[0];
              }}
            />

            {/* Navigation Arrows - Overlaid on image */}
            <IconButton
              onClick={handlePrevious}
              
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                boxShadow: 2,
              }}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                boxShadow: 2,
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

        

          {/* Indicator Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {galleryImages.map((_: string, index: number) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: { xs: 8, sm: 10 },
                  height: { xs: 8, sm: 10 },
                  borderRadius: '50%',
                  backgroundColor: index === currentImage
                    ? (clinic?.primaryColor || theme.palette.primary.main)
                    : '#ddd',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                    opacity: 0.7,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClinicGallery;
