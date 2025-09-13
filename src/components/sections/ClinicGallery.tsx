'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

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

  const clinic = clinicId ? getClinicById(clinicId) : null;
  const galleryImages = images || clinic?.galleryImages || [
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba0efed?w=800&h=600&fit=crop&auto=format&q=80',
  ];

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
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
            <Box
              component="img"
              src={galleryImages[currentImage]}
              alt={`Clinic image ${currentImage + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease',
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
