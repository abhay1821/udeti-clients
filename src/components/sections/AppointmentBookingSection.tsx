'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ArrowBack } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { Clinic } from '@/types/Clinic';
import {
  getAvailableSlots,
  saveBooking,
  isSlotAvailable,
} from '@/utils/appointmentStorage';
import { format } from 'date-fns';
import MapWithDirections from '@/components/sections/MapWithDirections';
import { generateICS, downloadICS } from '@/utils/icsGenerator';
import { formatDisplayDate, formatTimeOnly } from '@/utils/dateFormatters';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface AppointmentBookingSectionProps {
  clinic: Clinic;
}

type BookingStep = 'date-time' | 'details';

export const AppointmentBookingSection: React.FC<
  AppointmentBookingSectionProps
> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);
  const recaptchaSitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

  if (!recaptchaSitekey) {
    console.error(
      'NEXT_PUBLIC_RECAPTCHA_SITEKEY is not set in environment variables'
    );
  }

  const [step, setStep] = useState<BookingStep>('date-time');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    city: false,
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ slot: string; available: boolean; bookingCount: number }>
  >([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const defaultTimeSlots = [
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
  ];

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const slots = getAvailableSlots(clinic.id, dateString, defaultTimeSlots);
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, clinic.id]);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotClick = (slot: string) => {
    if (!selectedDate) return;
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    if (isSlotAvailable(clinic.id, dateString, slot)) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleProceedToDetails = () => {
    if (selectedDate && selectedTimeSlot) {
      setStep('details');
    }
  };

  const handleBackToDateTime = () => {
    setStep('date-time');
    setRecaptchaVerified(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) {
      return 'Name can only contain letters, spaces, and basic punctuation';
    }
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    if (!/^[6-9]/.test(digitsOnly)) {
      return 'Phone number must start with 6, 7, 8, or 9';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateCity = (city: string): string => {
    if (city.trim() && city.trim().length < 2) {
      return 'City name must be at least 2 characters';
    }
    return '';
  };

  const handleFormChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = e.target.value;

      if (field === 'phone') {
        value = value.replace(/\D/g, '');
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
      }

      setFormData(prev => ({ ...prev, [field]: value }));

      if (touched[field as keyof typeof touched]) {
        let error = '';
        switch (field) {
          case 'name':
            error = validateName(value);
            break;
          case 'phone':
            error = validatePhone(value);
            break;
          case 'email':
            error = validateEmail(value);
            break;
          case 'city':
            error = validateCity(value);
            break;
        }
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    };

  const handleBlur = (field: string) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));

    let error = '';
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'city':
        error = validateCity(formData.city);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaVerified(!!token);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      city: true,
    });

    // Validate all fields
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    const cityError = validateCity(formData.city);

    setErrors({
      name: nameError,
      phone: phoneError,
      email: emailError,
      city: cityError,
    });

    // Check if there are any validation errors
    if (nameError || phoneError || emailError || cityError) {
      alert('Please fix the errors in the form before submitting');
      return;
    }

    if (!recaptchaVerified) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select a date and time slot');
      return;
    }

    const dateString = format(selectedDate, 'yyyy-MM-dd');

    const booking = saveBooking({
      clinicId: clinic.id,
      date: dateString,
      timeSlot: selectedTimeSlot,
      patientName: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
    });

    console.log('Appointment booked:', booking);

    const [time, period] = selectedTimeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let startHours = parseInt(hours);
    if (period === 'PM' && startHours !== 12) {
      startHours += 12;
    } else if (period === 'AM' && startHours === 12) {
      startHours = 0;
    }

    const startDate = new Date(selectedDate);
    startDate.setHours(startHours, parseInt(minutes), 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const icsContent = generateICS({
      title: `Appointment with ${clinic.name}`,
      start: startDate,
      end: endDate,
      description: `Appointment booking with ${clinic.name}. Patient: ${formData.name}, Phone: ${formData.phone}, Email: ${formData.email}`,
      location: clinic.contact.address,
    });

    downloadICS(
      icsContent,
      `appointment-${clinic.name.replace(/\s+/g, '-')}-${dateString}.ics`
    );

    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
    });
    setErrors({
      name: '',
      phone: '',
      email: '',
      city: '',
    });
    setTouched({
      name: false,
      phone: false,
      email: false,
      city: false,
    });
    setSelectedDate(null);
    setSelectedTimeSlot('');
    setStep('date-time');
    setRecaptchaVerified(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }

    alert('Appointment request submitted successfully! ');
  };

  return (
    <Box
      id="appointment"
      sx={{
        backgroundColor: theme.componentBackground,
        px: { xs: 2, sm: 2.5, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              color: '#0D1B2A',
              mb: 1,
            }}
          >
            Book Your Appointment with {clinic.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.95rem',
              color: '#6f7a8c',
            }}
          >
            We will confirm your appointment within 2 hours
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 3, sm: 4, md: 6 },
            width: '100%',
          }}
        >
          <Box
            sx={{
              order: { xs: -1, lg: 1 },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: '20px',
                border: '1px solid #e2e7f1',
                backgroundColor: '#FFFFFF',
                position: { xs: 'relative', lg: 'sticky' },
                top: { lg: 20 },
                mb: { xs: 3, lg: 0 },
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mb: 2, color: '#0D1B2A' }}
              >
                Request An Appointment
              </Typography>

              <Typography
                sx={{
                  color: '#6f7a8c',
                  mb: 3,
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                }}
              >
                Book an Appointment or Consultation with {clinic.name} - OPD
                schedule. {clinic.tagline || clinic.description}
              </Typography>

              <MapWithDirections
                clinic={clinic}
                height={{ xs: 200, sm: 250, md: 300 }}
                showButton={true}
                buttonVariant="outlined"
              />
            </Paper>
          </Box>

          <Box
            sx={{
              order: { xs: 1, lg: 0 },
            }}
          >
            {step === 'date-time' ? (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: '20px',
                  border: '1px solid #e2e7f1',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mb: 3, color: '#0D1B2A' }}
                >
                  Pick a Date and Time
                </Typography>

                <Stack spacing={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      disablePast={true}
                      onChange={handleDateChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'medium',
                          variant: 'outlined',
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {selectedDate && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#4B5563',
                          mb: 2,
                        }}
                      >
                        Available Time Slots
                      </Typography>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                          },
                          gap: 1.5,
                          width: '100%',
                        }}
                      >
                        {availableSlots.map(({ slot, available }) => (
                          <Chip
                            key={slot}
                            label={slot}
                            onClick={() => handleTimeSlotClick(slot)}
                            sx={{
                              backgroundColor:
                                selectedTimeSlot === slot
                                  ? theme.buttonColor
                                  : available
                                    ? '#F3F4F6'
                                    : '#E5E7EB',
                              color:
                                selectedTimeSlot === slot
                                  ? '#FFFFFF'
                                  : available
                                    ? '#1F2937'
                                    : '#9CA3AF',
                              cursor: available ? 'pointer' : 'not-allowed',
                              '&:hover': {
                                backgroundColor:
                                  selectedTimeSlot === slot
                                    ? theme.buttonColor
                                    : available
                                      ? '#E5E7EB'
                                      : '#E5E7EB',
                                opacity: available ? 0.8 : 1,
                              },
                              fontWeight: selectedTimeSlot === slot ? 600 : 500,
                              borderRadius: '12px',
                              py: 2,
                              px: 1,
                              fontSize: '0.9rem',
                              width: '100%',
                              minHeight: '48px',
                              justifyContent: 'center',
                            }}
                            disabled={!available}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {selectedDate && selectedTimeSlot && (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleProceedToDetails}
                      sx={{
                        backgroundColor: theme.buttonColor,
                        color: 'white',
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: theme.buttonColor,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Continue
                    </Button>
                  )}
                </Stack>
              </Paper>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: '20px',
                  border: '1px solid #e2e7f1',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: '#0D1B2A',
                        borderBottom: `2px solid ${theme.buttonColor}`,
                        pb: 1,
                        display: 'inline-block',
                        mb: 1,
                      }}
                    >
                      Enter Details
                    </Typography>
                    {selectedDate && selectedTimeSlot && (
                      <Typography
                        sx={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: '#6f7a8c',
                          mt: 0.5,
                        }}
                      >
                        {formatDisplayDate(selectedDate)} (
                        {formatTimeOnly(selectedTimeSlot)})
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="text"
                    startIcon={<ArrowBack />}
                    onClick={handleBackToDateTime}
                    sx={{
                      color: theme.buttonColor,
                      textTransform: 'none',
                      fontWeight: 600,
                      minWidth: 'auto',
                      px: 1.5,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.8,
                      },
                    }}
                  >
                    Back
                  </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      label="Name "
                      variant="outlined"
                      size="medium"
                      value={formData.name}
                      onChange={handleFormChange('name')}
                      onBlur={handleBlur('name')}
                      required
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Phone"
                      variant="outlined"
                      size="medium"
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormChange('phone')}
                      onBlur={handleBlur('phone')}
                      required
                      error={!!errors.phone}
                      helperText={
                        errors.phone || 'Enter 10-digit mobile number'
                      }
                      inputProps={{
                        maxLength: 10,
                        pattern: '[0-9]{10}',
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email "
                      variant="outlined"
                      size="medium"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange('email')}
                      onBlur={handleBlur('email')}
                      required
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      size="medium"
                      value={formData.city}
                      onChange={handleFormChange('city')}
                      onBlur={handleBlur('city')}
                      error={!!errors.city}
                      helperText={errors.city}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />

                    {recaptchaSitekey && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          my: 2,
                        }}
                      >
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={recaptchaSitekey}
                          onChange={handleRecaptchaChange}
                        />
                      </Box>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={!recaptchaVerified}
                      sx={{
                        backgroundColor: theme.buttonColor,
                        color: 'white',
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: theme.buttonColor,
                          opacity: 0.9,
                        },
                        '&:disabled': {
                          backgroundColor: '#cccccc',
                          color: '#666666',
                        },
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Stack>
                </form>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentBookingSection;
