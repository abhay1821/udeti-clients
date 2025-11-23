'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10AppointmentSectionProps {
  clinic: Clinic;
}

const accentGradient = 'linear-gradient(135deg, #7A421F, #B86A3D)';

export const DocWebsite10AppointmentSection: React.FC<
  DocWebsite10AppointmentSectionProps
> = ({ clinic }) => {
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [preferredTime, setPreferredTime] = useState<Date | null>(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      id="appointment"
      sx={{
        background:
          'linear-gradient(180deg, #FFF4EA 0%, #FDF9F7 60%, #FFFFFF 100%)',
        py: { xs: 6, md: 10 },
        px: { xs: 2.5, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '40px',
          boxShadow: '0 40px 80px rgba(109, 64, 38, 0.20)',
          border: '1px solid rgba(122, 66, 31, 0.08)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.85fr' },
        }}
      >
        {/* Form column */}
        <Box sx={{ p: { xs: 4, md: 5 } }}>
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#A36B47',
                fontWeight: 600,
              }}
            >
              Book Now
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.1rem', md: '2.5rem' },
                fontWeight: 800,
                color: '#3B2A27',
                mt: 1,
              }}
            >
              Reserve Your Appointment
            </Typography>
            <Typography sx={{ color: '#75645A', mt: 1.5, lineHeight: 1.7 }}>
              Share a few details and our care coordinator will call you back to
              confirm your slot.
            </Typography>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                },
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: '14px', backgroundColor: '#FDF9F7' },
                }}
              />
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                type="tel"
                InputProps={{
                  sx: { borderRadius: '14px', backgroundColor: '#FDF9F7' },
                }}
              />
              <DatePicker
                label="Preferred Date"
                value={preferredDate}
                onChange={newValue => setPreferredDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      sx: { borderRadius: '14px', backgroundColor: '#FDF9F7' },
                    },
                  },
                }}
              />
              <TimePicker
                label="Preferred Time"
                value={preferredTime}
                onChange={newValue => setPreferredTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      sx: { borderRadius: '14px', backgroundColor: '#FDF9F7' },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Treatment Interest (optional)"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: '14px', backgroundColor: '#FDF9F7' },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={isMdUp ? 4 : 3}
                sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }}
                InputProps={{
                  sx: { borderRadius: '18px', backgroundColor: '#FDF9F7' },
                }}
              />
            </Box>
          </LocalizationProvider>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            spacing={2.5}
            mt={5}
          >
            <Button
              fullWidth={!isMdUp}
              variant="contained"
              sx={{
                background: accentGradient,
                color: '#fff',
                borderRadius: '999px',
                px: { xs: 4, md: 6 },
                py: 1.6,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 25px 45px rgba(122, 66, 31, 0.35)',
                '&:hover': {
                  background: accentGradient,
                  opacity: 0.9,
                },
              }}
            >
              Request a Call Back
            </Button>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography sx={{ color: '#A36B47', fontSize: '0.9rem' }}>
                Need help instantly?
              </Typography>
              <Typography
                component="a"
                href={`tel:${clinic.contact.phone}`}
                sx={{
                  fontWeight: 700,
                  color: '#3B2A27',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                }}
              >
                {clinic.contact.phone}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Contact column */}
        <Box
          sx={{
            background:
              'linear-gradient(180deg, rgba(241, 218, 200, 0.35) 0%, #FEF5EE 100%)',
            p: { xs: 4, md: 5 },
            borderLeft: { md: '1px solid rgba(122, 66, 31, 0.08)' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3.5,
              color: '#4A362D',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: '#B77C55',
                }}
              >
                Visit Us
              </Typography>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 1 }}>
                {clinic.name}
              </Typography>
              <Typography sx={{ mt: 1.5, lineHeight: 1.6 }}>
                {clinic.contact.address}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1, color: '#3B2A27' }}>
                Clinic Hours
              </Typography>
              <Typography sx={{ color: '#5F4A41' }}>
                {clinic.contact.hours}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(58,28,16,0.15)' }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#B77C55',
                  }}
                >
                  Call Us
                </Typography>
                <Typography
                  component="a"
                  href={`tel:${clinic.contact.phone}`}
                  sx={{
                    display: 'block',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#3B2A27',
                    textDecoration: 'none',
                    mt: 0.5,
                  }}
                >
                  {clinic.contact.phone}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#B77C55',
                  }}
                >
                  Write to Us
                </Typography>
                <Typography
                  component="a"
                  href={`mailto:${clinic.contact.email}`}
                  sx={{
                    color: '#3B2A27',
                    fontWeight: 600,
                    textDecoration: 'none',
                    mt: 0.5,
                    display: 'inline-block',
                  }}
                >
                  {clinic.contact.email}
                </Typography>
              </Box>
            </Stack>

            <Box
              sx={{
                backgroundColor: '#3B2A27',
                color: '#FCEBDD',
                borderRadius: '24px',
                p: 3,
                mt: 2,
                boxShadow: '0 25px 50px rgba(51,25,12,0.4)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#F1C5A2',
                }}
              >
                Same-Day Treatments
              </Typography>
              <Typography sx={{ fontSize: '1.35rem', fontWeight: 700, mt: 1 }}>
                Microscopic Single Visit Root Canal
              </Typography>
              <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.8)' }}>
                Most procedures completed in 45-90 mins with advanced digital
                dentistry.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite10AppointmentSection;
