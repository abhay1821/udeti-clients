'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AccessTime, Phone } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface TopInfoBarProps {
  clinicId?: string;
}

const TopInfoBar: React.FC<TopInfoBarProps> = ({ clinicId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getClinicById } = useClinic();

  const clinic = clinicId ? getClinicById(clinicId) : null;

  return (
    <Box
      sx={{
        backgroundColor: clinic?.primaryColor || '#2196f3',
        color: 'white',
        py: { xs: 1, md: 1.5 },
        fontSize: { xs: '0.8rem', md: '0.9rem' },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1, md: 0 },
          }}
        >
          {/* Clinic Hours */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <AccessTime sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                fontWeight: 500,
              }}
            >
              <strong>Clinic Hours:</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
              }}
            >
              Monday - Saturday: 9:00 AM - 6:00 PM
            </Typography>
            {!isMobile && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  ml: 1,
                }}
              >
                Sunday: Closed
              </Typography>
            )}
          </Box>

          {/* Emergency Contact */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textAlign: { xs: 'center', md: 'right' },
            }}
          >
            <Phone sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                fontWeight: 500,
              }}
            >
              Emergency:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                fontWeight: 600,
              }}
            >
              +91-9876543210
            </Typography>
          </Box>
        </Box>

        {/* Mobile Sunday Hours */}
        {isMobile && (
          <Box sx={{ textAlign: 'center', mt: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.75rem',
                opacity: 0.9,
              }}
            >
              Sunday: Closed
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TopInfoBar;
