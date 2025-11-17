'use client';

import React from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Phone, Email, Place, AccessTime } from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7AppointmentSectionProps {
  clinic: Clinic;
}

export const DocWebsite7AppointmentSection: React.FC<
  DocWebsite7AppointmentSectionProps
> = ({ clinic }) => {
  return (
    <Box
      id="appointment"
      sx={{
        backgroundColor: '#F5F7FB',
        color: '#0D1B2A',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, fontWeight: 700 }}
          >
            Get In Touch
          </Typography>
          <Typography sx={{ color: '#5b6778', mt: 1 }}>
            We&apos;re here to help. Reach out to us with any questions or to
            schedule an appointment.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Stack spacing={2}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '18px',
                  border: '1px solid #e2e7f1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    backgroundColor: '#E4F8F0',
                    color: '#19D08A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone />
                </Box>
                <Box>
                  <Typography fontWeight={600}>
                    {clinic.contact.phone}
                  </Typography>
                  <Typography color="#6f7a8c">
                    Call us for direct assistance
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '18px',
                  border: '1px solid #e2e7f1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    backgroundColor: '#E6F0FF',
                    color: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Email />
                </Box>
                <Box>
                  <Typography fontWeight={600}>
                    {clinic.contact.email}
                  </Typography>
                  <Typography color="#6f7a8c">
                    Email us for non-urgent matters
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  border: '1px solid #e2e7f1',
                }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Send Us a Message
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#2563EB',
                      '&:hover': { backgroundColor: '#1d4ed8' },
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.2,
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Box>

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
                <Box
                  component="iframe"
                  title="Clinic Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    clinic.contact.address
                  )}&output=embed`}
                  sx={{ width: '100%', height: 260, border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
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
                      <Typography color="#6f7a8c">
                        {clinic.contact.hours}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite7AppointmentSection;
