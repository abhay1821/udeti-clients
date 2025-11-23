'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Clinic } from '@/types/Clinic';

interface DocWebsite6AppointmentSectionProps {
  clinic: Clinic;
}

export const DocWebsite6AppointmentSection: React.FC<
  DocWebsite6AppointmentSectionProps
> = () => {
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [preferredTime, setPreferredTime] = useState<Date | null>(null);

  return (
    <Box
      id="appointment"
      sx={{
        py: { xs: 6, md: 10 },
        background:
          'radial-gradient(circle at top, #EEF0FF 0%, #E4E7FF 40%, #F9F7FF 100%)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 2.5, md: 4 },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#F1F3FF',
            borderRadius: '32px',
            p: { xs: 4, md: 5 },
            boxShadow: '0 35px 80px rgba(15, 23, 42, 0.12)',
            border: '1px solid rgba(90, 84, 245, 0.15)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.4rem' },
                fontWeight: 800,
                color: '#111827',
                mb: 1.5,
              }}
            >
              Book an Appointment
            </Typography>
            <Typography
              sx={{ color: '#5B6472', fontSize: '1.05rem', lineHeight: 1.7 }}
            >
              Find a time that works for you and book your visit online in just
              a few clicks.
            </Typography>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, minmax(0, 1fr))',
                },
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: '14px', backgroundColor: '#fff' },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    sx: { borderRadius: '14px', backgroundColor: '#fff' },
                  }}
                />
              </Box>
              <Box>
                <DatePicker
                  label="Preferred Date"
                  value={preferredDate}
                  onChange={newValue => setPreferredDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        sx: { borderRadius: '14px', backgroundColor: '#fff' },
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <TimePicker
                  label="Preferred Time"
                  value={preferredTime}
                  onChange={newValue => setPreferredTime(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        sx: { borderRadius: '14px', backgroundColor: '#fff' },
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}>
                <TextField
                  fullWidth
                  label="Reason for Visit (optional)"
                  multiline
                  rows={4}
                  InputProps={{
                    sx: { borderRadius: '20px', backgroundColor: '#fff' },
                  }}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          <Stack alignItems="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #5A54F5, #7D59FF)',
                borderRadius: '999px',
                px: 6,
                py: 1.7,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 25px 45px rgba(90, 84, 245, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4E48E7, #6A3EF0)',
                },
              }}
            >
              Request Appointment
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default DocWebsite6AppointmentSection;
