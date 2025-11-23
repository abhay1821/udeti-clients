'use client';

import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Clinic } from '@/types/Clinic';

interface DocWebsite6AboutSectionProps {
  clinic: Clinic;
}

const aboutHighlights = [
  'MD, Stanford University',
  'Board Certified in Internal Medicine',
  'Member, American College of Physicians',
];

const DocWebsite6AboutSectionComponent: React.FC<
  DocWebsite6AboutSectionProps
> = ({ clinic }) => {
  const paragraphs = [
    `With over 15 years of experience, Dr. Vance is committed to providing exceptional, evidence-based healthcare. She graduated with honors from the Stanford University School of Medicine and completed her residency at Johns Hopkins Hospital.`,
    `Dr. Vance believes in a patient-centered approach, focusing on building strong, trusting relationships. Her philosophy of care is rooted in empathy, open communication, and empowering patients to take an active role in their health journey.`,
  ];

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#F6F7FB',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, md: 4 },
          maxWidth: { xl: '1200px' },
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 4, lg: 6 }}
          alignItems="center"
        >
          <Box
            sx={{
              flex: 1,
              width: '100%',
              maxWidth: 520,
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(15, 23, 42, 0.2)',
            }}
          >
            <Box
              component="img"
              src={clinic.hero.backgroundImage}
              alt={clinic.name}
              sx={{
                width: '100%',
                height: { xs: 320, md: 420 },
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          <Box flex={1}>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#5A54F5',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                mb: 1,
              }}
            >
              Meet Your Doctor
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                color: '#0F172A',
                mb: 3,
              }}
            >
              {clinic.name}, MD
            </Typography>

            <Stack spacing={2.5} mb={3}>
              {paragraphs.map((text, index) => (
                <Typography
                  key={index}
                  sx={{ color: '#5B6472', lineHeight: 1.8, fontSize: '1rem' }}
                >
                  {text}
                </Typography>
              ))}
            </Stack>

            <Stack spacing={1.5}>
              {aboutHighlights.map(item => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <CheckCircleIcon sx={{ color: '#3CC18F' }} />
                  <Typography sx={{ fontWeight: 600, color: '#0F172A' }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export const DocWebsite6AboutSection = React.memo(
  DocWebsite6AboutSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite6AboutSection;
