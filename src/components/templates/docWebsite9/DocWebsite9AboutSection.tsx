'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Clinic } from '@/types/Clinic';

interface DocWebsite9AboutSectionProps {
  clinic: Clinic;
}

const DocWebsite9AboutSectionComponent: React.FC<
  DocWebsite9AboutSectionProps
> = ({ clinic }) => {
  const highlights = [
    'Functional Medicine-Based Treatment Plans',
    'Rapid Hormone & Metabolic Improvement',
    'Personalized, Patient-Centric Healing',
  ];

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: '#FCEEE7',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FBE7DD',
            borderRadius: '50% / 45%',
            overflow: 'hidden',
            boxShadow: '0 30px 50px rgba(12,45,35,0.15)',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
            alt={clinic.name}
            sx={{
              width: '100%',
              height: { xs: 280, md: 360 },
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#F5A27E',
              letterSpacing: '0.2em',
              fontWeight: 600,
              mb: 1,
            }}
          >
            ABOUT CLINIC
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '2.2rem', md: '2.6rem' },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Our Best Services & Popular Treatment Here.
          </Typography>
          <Typography
            sx={{ color: 'rgba(12,45,35,0.75)', lineHeight: 1.8, mb: 3 }}
          >
            Expert Endocrine & Functional Medicine Care in Mumbai. We offer
            world-class, evidence-based treatments for thyroid disorders, PCOS,
            diabetes, and hormone imbalance — all under one roof. Our clinic
            blends Functional Medicine with advanced diagnostics to deliver
            faster, long-lasting results.
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 4 }}>
            {highlights.map(item => (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                key={item}
              >
                <CheckCircleIcon sx={{ color: '#F5A27E' }} />
                <Typography fontWeight={600}>{item}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: '#F5A27E',
              borderColor: '#F5A27E',
              borderRadius: '999px',
              px: 4,
              py: 1.2,
              fontWeight: 600,
              '&:hover': { borderColor: '#FFC3A4', color: '#FFC3A4' },
            }}
          >
            Read More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const DocWebsite9AboutSection = React.memo(
  DocWebsite9AboutSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite9AboutSection;
