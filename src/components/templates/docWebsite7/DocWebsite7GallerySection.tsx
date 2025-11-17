'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7GallerySectionProps {
  clinic: Clinic;
}

export const DocWebsite7GallerySection: React.FC<
  DocWebsite7GallerySectionProps
> = ({ clinic }) => {
  if (!clinic.galleryImages?.length) {
    return null;
  }

  return (
    <Box
      id="gallery"
      sx={{
        backgroundColor: '#F7FAF8',
        color: '#0D2B21',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
        position: 'relative',
        borderTop: '1px solid rgba(15, 43, 33, 0.06)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 4,
          borderRadius: 999,
          backgroundColor: '#0B8E63',
          opacity: 0.7,
        },
      }}
    >
      <Box sx={{ maxWidth: 1300, mx: 'auto', textAlign: 'center' }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '2.2rem', md: '2.8rem' },
            fontWeight: 800,
            mb: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          Our Clinic
        </Typography>
        <Typography
          sx={{
            maxWidth: 720,
            mx: 'auto',
            color: 'rgba(15, 43, 33, 0.65)',
            fontSize: { xs: '1rem', md: '1.1rem' },
            mb: { xs: 5, md: 6 },
          }}
        >
          Step into a calming, state-of-the-art space designed to keep you
          comfortable at every visit.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            gap: { xs: 2, md: 3 },
            justifyItems: 'center',
          }}
        >
          {clinic.galleryImages.map((image, index) => (
            <Box
              key={`${image}-${index}`}
              component="img"
              src={image}
              alt={`Clinic gallery ${index + 1}`}
              sx={{
                width: '100%',
                height: { xs: 160, md: 210 },
                objectFit: 'cover',
                borderRadius: '28px',
                boxShadow: '0 25px 40px rgba(15,23,42,0.14)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite7GallerySection;
