'use client';

import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Place, AccessTime } from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';
import MapWithDirections from '@/components/sections/MapWithDirections';

interface ContactMapSectionProps {
  clinic: Clinic;
}

export const ContactMapSection: React.FC<ContactMapSectionProps> = ({
  clinic,
}) => {
  return (
    <Box>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #e1e6f0',
          }}
        >
          <MapWithDirections clinic={clinic} height={260} showButton={false} />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '18px',
            border: '1px solid #e1e6f0',
          }}
        >
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  backgroundColor: '#E6F0FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Place />
              </Box>
              <Box>
                <Typography fontWeight={700}>Our Address</Typography>
                <Typography color="#6f7a8c">
                  {clinic.contact.address}
                </Typography>
                <Button
                  variant="text"
                  sx={{ textTransform: 'none', pl: 0 }}
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.contact.address)}`;
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  Get Directions
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  backgroundColor: '#E5F9F0',
                  color: '#19D08A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AccessTime />
              </Box>
              <Box>
                <Typography fontWeight={700}>Clinic Hours</Typography>
                <Typography color="#6f7a8c">{clinic.contact.hours}</Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ContactMapSection;
