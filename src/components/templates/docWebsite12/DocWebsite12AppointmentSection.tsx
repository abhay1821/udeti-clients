'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Email, Phone, Place } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { Clinic } from '@/types/Clinic';
import MapWithDirections from '@/components/sections/MapWithDirections';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface DocWebsite12AppointmentSectionProps {
  clinic: Clinic;
}

export const DocWebsite12AppointmentSection: React.FC<
  DocWebsite12AppointmentSectionProps
> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);

  const recaptchaSitekey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ||
    '6LcSyxEsAAAAAE2uqSp5Dj46vGNH078PuOK-b8lq';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferredDate: null as Date | null,
    timeSlot: '',
    serviceRequired: '',
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaVerified(!!token);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaVerified) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    console.log('Appointment booking:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      preferredDate: null,
      timeSlot: '',
      serviceRequired: '',
    });
    setRecaptchaVerified(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  return (
    <Box
      id="appointment"
      sx={{
        backgroundColor: '#FFFFFF',
        px: { xs: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: theme.buttonColor,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                mb: 1,
              }}
            >
              Contact
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.4rem' },
                fontWeight: 700,
                mb: 1.5,
                color: '#0D1B2A',
              }}
            >
              Get in Touch with Us!
            </Typography>
            <Typography
              sx={{
                color: '#5b6778',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              We&apos;re here to help you look and feel your best. Get in touch
              to book a consultation or ask any questions.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '20px',
                border: '1px solid #e2e7f1',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Book Your Appointment
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      size="small"
                      value={formData.firstName}
                      onChange={handleChange('firstName')}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      value={formData.lastName}
                      onChange={handleChange('lastName')}
                      required
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                  />
                  <TextField
                    fullWidth
                    select
                    label="Service Required"
                    variant="outlined"
                    size="small"
                    value={formData.serviceRequired}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        serviceRequired: e.target.value,
                      }))
                    }
                    required
                  >
                    {clinic.services.map(service => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2,
                      }}
                    >
                      <DatePicker
                        label="Preferred Date"
                        value={formData.preferredDate}
                        disablePast={true}
                        onChange={newValue =>
                          setFormData(prev => ({
                            ...prev,
                            preferredDate: newValue,
                          }))
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            variant: 'outlined',
                            required: true,
                          },
                        }}
                      />
                      {formData.preferredDate && (
                        <TextField
                          fullWidth
                          select
                          label="Time Slot"
                          variant="outlined"
                          size="small"
                          value={formData.timeSlot}
                          onChange={e =>
                            setFormData(prev => ({
                              ...prev,
                              timeSlot: e.target.value,
                            }))
                          }
                          required
                        >
                          {timeSlots.map(slot => (
                            <MenuItem key={slot} value={slot}>
                              {slot}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Box>
                  </LocalizationProvider>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSitekey || ''}
                      onChange={handleRecaptchaChange}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!recaptchaVerified}
                    sx={{
                      backgroundColor: theme.buttonColor,
                      '&:hover': {
                        backgroundColor: theme.buttonColor,
                        opacity: 0.9,
                      },
                      '&:disabled': {
                        backgroundColor: '#cccccc',
                        color: '#666666',
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.2,
                      borderRadius: '12px',
                    }}
                  >
                    Submit Form
                  </Button>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#6f7a8c',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                    }}
                  >
                    Submitting this form does not confirm an appointment. Our
                    team will contact you to schedule and provide further
                    details.
                  </Typography>
                </Stack>
              </form>
            </Paper>
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
                <MapWithDirections
                  clinic={clinic}
                  height={300}
                  showButton={false}
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '18px',
                  border: '1px solid #e1e6f0',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: '#FFF5E6',
                        color: '#FF8C00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Email />
                    </Box>
                    <Box>
                      <Typography
                        fontWeight={700}
                        sx={{ fontSize: '1rem', mb: 0.5 }}
                      >
                        Quick Contact:
                      </Typography>
                      <Typography color="#6f7a8c">
                        {clinic.contact.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: '#FFF5E6',
                        color: '#FF8C00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone />
                    </Box>
                    <Box>
                      <Typography
                        fontWeight={700}
                        sx={{ fontSize: '1rem', mb: 0.5 }}
                      >
                        Phone Number:
                      </Typography>
                      <Typography color="#6f7a8c">
                        {clinic.contact.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: '#FFF5E6',
                        color: '#FF8C00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Place />
                    </Box>
                    <Box>
                      <Typography
                        fontWeight={700}
                        sx={{ fontSize: '1rem', mb: 0.5 }}
                      >
                        Headquarter
                      </Typography>
                      <Typography color="#6f7a8c">
                        {clinic.contact.address}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      height: '1px',
                      backgroundColor: '#e1e6f0',
                      width: '100%',
                    }}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite12AppointmentSection;
