'use client';

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10AboutSectionProps {
  clinic: Clinic;
}

export const DocWebsite10AboutSection: React.FC<
  DocWebsite10AboutSectionProps
> = ({ clinic }) => {
  if (!clinic.about) {
    return null;
  }

  const { title, description, education, expertise, image } = clinic.about;

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: '#FFF8F4',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 4, lg: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '2.1rem', md: '2.4rem' },
              fontWeight: 800,
              mb: 3,
            }}
          >
            {title}
          </Typography>
          {description.map((paragraph, index) => (
            <Typography
              key={index}
              sx={{
                color: '#6C5A52',
                lineHeight: 1.8,
                mb: index === description.length - 1 ? 4 : 3,
              }}
            >
              {paragraph}
            </Typography>
          ))}
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <Box
              sx={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                p: 3,
              }}
            >
              <Typography fontWeight={700} sx={{ mb: 1 }}>
                Education
              </Typography>
              {education.map(item => (
                <Typography key={item}>{item}</Typography>
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                p: 3,
              }}
            >
              <Typography fontWeight={700} sx={{ mb: 1 }}>
                Expertise
              </Typography>
              {expertise.map(item => (
                <Typography key={item}>{item}</Typography>
              ))}
            </Box>
          </Stack>
        </Box>

        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: { xs: 320, md: 420 },
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default DocWebsite10AboutSection;
