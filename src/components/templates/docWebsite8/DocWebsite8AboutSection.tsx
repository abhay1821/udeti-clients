'use client';

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8AboutSectionProps {
  clinic: Clinic;
}

export const DocWebsite8AboutSection: React.FC<
  DocWebsite8AboutSectionProps
> = ({ clinic }) => {
  const highlights = [
    'MD, Stanford University',
    'Board Certified in Internal Medicine',
    'Member, American College of Physicians',
  ];

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: '#F9F5FF',
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
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 30px 50px rgba(15, 23, 42, 0.15)',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=900&q=80"
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
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#7C3AED',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              mb: 1,
            }}
          >
            Meet Your Doctor
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.4rem' },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Dr. Evelyn Reed, MD
          </Typography>
          <Typography
            sx={{ color: 'rgba(15,23,42,0.7)', lineHeight: 1.7, mb: 3 }}
          >
            With over 15 years of experience, Dr. Reed is committed to
            delivering exceptional, evidence-based healthcare. She graduated
            with honors from the Stanford University School of Medicine and
            completed her residency at Johns Hopkins Hospital.
          </Typography>
          <Typography
            sx={{ color: 'rgba(15,23,42,0.7)', lineHeight: 1.7, mb: 3 }}
          >
            Dr. Reed believes in a patient-centered approach, focusing on
            building strong, trusting relationships. Her care philosophy is
            rooted in empathy, communication, and empowering patients in their
            health journey.
          </Typography>
          <Stack spacing={1.5}>
            {highlights.map(item => (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                key={item}
              >
                <CheckCircleIcon sx={{ color: '#34D399' }} />
                <Typography fontWeight={600}>{item}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite8AboutSection;
