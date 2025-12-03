'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface StandardGallerySectionProps {
  clinic: Clinic;
}

const StandardGallerySectionComponent: React.FC<
  StandardGallerySectionProps
> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);

  if (!clinic.galleryImages?.length) {
    return null;
  }
  const backgroundColor = theme.componentBackground;
  const textColor = theme.textColor;
  const accentColor = theme.accentColor;
  const descriptionColor = theme.labelColor;

  return (
    <Box
      id="gallery"
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
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
          backgroundColor: accentColor,
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
            color: descriptionColor,

            mb: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          Our Clinic
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 2, md: 3, lg: 4 },
            justifyItems: 'center',
          }}
        >
          {clinic.galleryImages.map((image, index) => (
            <Box
              key={`${image}-${index}`}
              component="img"
              src={image}
              alt={`Clinic gallery ${index + 1}`}
              onError={e => {
                console.error('Failed to load image:', image);
                // Set a placeholder or hide the image
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', image);
              }}
              sx={{
                width: '100%',
                height: { xs: 200, sm: 250, md: 300, lg: 350 },
                objectFit: 'cover',
                borderRadius: '28px',
                boxShadow: '0 25px 40px rgba(15,23,42,0.14)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 30px 50px rgba(15,23,42,0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const StandardGallerySection = React.memo(
  StandardGallerySectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default StandardGallerySection;
