'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface MapWithDirectionsProps {
  clinic: Clinic;
  height?: number | { xs?: number; sm?: number; md?: number };
  showButton?: boolean;
  buttonVariant?: 'contained' | 'outlined' | 'text';
}

export const MapWithDirections: React.FC<MapWithDirectionsProps> = ({
  clinic,
  height = { xs: 200, sm: 250, md: 300 },
  showButton = true,
  buttonVariant = 'outlined',
}) => {
  const theme = useClinicTheme(clinic.id);
  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.contact.address)}`;
    window.open(mapsUrl, '_blank');
  };

  const getHeight = () => {
    if (typeof height === 'number') return height;
    return height.md || height.sm || height.xs || 300;
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: showButton ? '1px solid #e1e6f0' : 'none',
          mb: showButton ? 2 : 0,
        }}
      >
        <Box
          component="iframe"
          title="Clinic Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            clinic.contact.address
          )}&output=embed`}
          sx={{
            width: '100%',
            height:
              typeof height === 'number'
                ? height
                : {
                    xs: height.xs || 200,
                    sm: height.sm || 250,
                    md: height.md || 300,
                  },
            border: 0,
            display: 'block',
          }}
          allowFullScreen
          loading="lazy"
        />
      </Box>

      {showButton && (
        <Button
          variant={buttonVariant}
          fullWidth
          onClick={handleGetDirections}
          sx={{
            borderColor: theme.buttonColor,
            color: theme.buttonColor,
            backgroundColor:
              buttonVariant === 'contained' ? theme.buttonColor : 'transparent',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.2,
            borderRadius: '12px',
            '&:hover': {
              borderColor: theme.buttonColor,
              backgroundColor: theme.buttonColor,
              color: 'white',
            },
          }}
        >
          Get Directions
        </Button>
      )}
    </Box>
  );
};

export default MapWithDirections;
