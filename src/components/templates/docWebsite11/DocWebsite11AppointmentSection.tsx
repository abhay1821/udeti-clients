'use client';

import React, { useState } from 'react';
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
import { Phone, Email } from '@mui/icons-material';
import ContactMapSection from '@/components/sections/ContactMapSection';
import { Clinic } from '@/types/Clinic';

interface DocWebsite11AppointmentSectionProps {
  clinic: Clinic;
}

export const DocWebsite11AppointmentSection: React.FC<
  DocWebsite11AppointmentSectionProps
> = ({ clinic }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferredDate: null as Date | null,
    timeSlot: '',
    serviceRequired: '',
  });

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment booking:', formData);
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
                      disabled={
                        !clinic.services ||
                        !Array.isArray(clinic.services) ||
                        clinic.services.length === 0
                      }
                    >
                      {clinic.services &&
                      Array.isArray(clinic.services) &&
                      clinic.services.length > 0 ? (
                        clinic.services.map(service => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          No services available
                        </MenuItem>
                      )}
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

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#1E40AF',
                        '&:hover': { backgroundColor: '#1e3a8a' },
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: '12px',
                      }}
                    >
                      Book Appointment Now
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Stack>
          </Box>

          <ContactMapSection clinic={clinic} />
        </Box>
      </Box>
    </Box>
  );
};

export default DocWebsite11AppointmentSection;
