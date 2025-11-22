'use client';

import React from 'react';
import { Box, Stack, Typography, Container } from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface StandardAboutSectionProps {
  clinic: Clinic;
}

const StandardAboutSectionComponent: React.FC<StandardAboutSectionProps> = ({
  clinic,
}) => {
  const theme = useClinicTheme(clinic.id);

  if (!clinic.about) {
    return null;
  }

  const { title, description, education, expertise, image } = clinic.about;
  const backgroundColor = theme.componentBackground;
  const textColor = theme.textColor;
  const descriptionColor = theme.labelColor;
  const cardBackground = '#FFFFFF';
  const cardShadow = '0 15px 40px rgba(0,0,0,0.08)';

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: backgroundColor,
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: { xl: '1200px' },
        }}
      >
        <Box
          sx={{
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
                color: textColor,
                mb: 3,
              }}
            >
              {title}
            </Typography>
            {description.map((paragraph, index) => (
              <Typography
                key={index}
                sx={{
                  color: descriptionColor,
                  lineHeight: 1.8,
                  mb: index === description.length - 1 ? 4 : 3,
                }}
              >
                {paragraph}
              </Typography>
            ))}
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: cardBackground,
                  borderRadius: '20px',
                  boxShadow: cardShadow,
                  p: 3,
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 1, color: textColor }}>
                  Education
                </Typography>
                {education.map(item => (
                  <Typography key={item} sx={{ color: descriptionColor }}>
                    {item}
                  </Typography>
                ))}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: cardBackground,
                  borderRadius: '20px',
                  boxShadow: cardShadow,
                  p: 3,
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 1, color: textColor }}>
                  Expertise
                </Typography>
                {expertise.map(item => (
                  <Typography key={item} sx={{ color: descriptionColor }}>
                    {item}
                  </Typography>
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
      </Container>
    </Box>
  );
};

export const StandardAboutSection = React.memo(
  StandardAboutSectionComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default StandardAboutSection;
