'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  AccessTime,
  Phone,
  Person,
  CalendarToday,
  Schedule,
  Email,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';
import { appointmentData } from '@/data/appointmentData';

interface AppointmentSectionProps {
  clinicId?: string;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({ clinicId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const { doctors, timeSlots, formLabels } = appointmentData;

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Appointment booked:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      fullName,
      mobileNumber,
      email
    });
  };

  return (
    <Box id="appointment" sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: clinic?.primaryColor || '#1976d2',
          color: 'white',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formLabels.contactInfo.hours}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone sx={{ fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formLabels.contactInfo.phone}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Title Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || '#1976d2',
              mb: 2,
            }}
          >
            Book Your Appointment
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Schedule your visit with our expert dentists. Choose your preferred doctor, date, and time.
          </Typography>
        </Box>

        {/* Appointment Form Card */}
        <Card
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: clinic?.primaryColor || '#1976d2',
                  mb: 1,
                }}
              >
                {formLabels.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {formLabels.subtitle}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Select Doctor */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Person sx={{ color: '#666' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formLabels.doctorLabel}
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      displayEmpty
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ddd',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Choose your preferred doctor
                      </MenuItem>
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.name}>
                          {doctor.name} - {doctor.specialization}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Select Date */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <CalendarToday sx={{ color: '#666' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formLabels.dateLabel}
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Select Time */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Schedule sx={{ color: '#666' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formLabels.timeLabel}
                    </Typography>
                  </Box>
                  
                  {/* Time Slots Container */}
                  <Box sx={{ mb: 3 }}>
                    {/* Morning and Afternoon Labels - Responsive */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4, mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>
                        Morning
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>
                        Afternoon
                      </Typography>
                    </Box>
                    
                    {/* Time Slots - Two Halves */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
                      {/* Morning Section - Left Half */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                          Morning
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                          {timeSlots.morning.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? 'contained' : 'outlined'}
                              disabled={!slot.available}
                              onClick={() => slot.available && handleTimeSlotClick(slot.time)}
                              sx={{
                                width: '100%',
                                py: 1,
                                fontSize: '0.875rem',
                                backgroundColor: selectedTime === slot.time 
                                  ? (clinic?.primaryColor || '#1976d2') 
                                  : 'transparent',
                                color: selectedTime === slot.time 
                                  ? 'white' 
                                  : slot.available ? '#333' : '#999',
                                borderColor: slot.available ? '#ddd' : '#eee',
                                '&:hover': {
                                  backgroundColor: slot.available 
                                    ? (clinic?.primaryColor || '#1976d2') + '20' 
                                    : 'transparent',
                                  borderColor: clinic?.primaryColor || '#1976d2',
                                },
                                '&:disabled': {
                                  color: '#999',
                                  borderColor: '#eee',
                                },
                              }}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </Box>
                      </Box>
                      
                      {/* Afternoon Section - Right Half */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                          Afternoon
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                          {timeSlots.afternoon.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? 'contained' : 'outlined'}
                              disabled={!slot.available}
                              onClick={() => slot.available && handleTimeSlotClick(slot.time)}
                              sx={{
                                width: '100%',
                                py: 1,
                                fontSize: '0.875rem',
                                backgroundColor: selectedTime === slot.time 
                                  ? (clinic?.primaryColor || '#1976d2') 
                                  : 'transparent',
                                color: selectedTime === slot.time 
                                  ? 'white' 
                                  : slot.available ? '#333' : '#999',
                                borderColor: slot.available ? '#ddd' : '#eee',
                                '&:hover': {
                                  backgroundColor: slot.available 
                                    ? (clinic?.primaryColor || '#1976d2') + '20' 
                                    : 'transparent',
                                  borderColor: clinic?.primaryColor || '#1976d2',
                                },
                                '&:disabled': {
                                  color: '#999',
                                  borderColor: '#eee',
                                },
                              }}
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Full Name */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#333' }}>
                    {formLabels.fullNameLabel}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Mobile Number */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Phone sx={{ color: '#666' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formLabels.mobileLabel}
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1, color: '#666' }}>+91</Typography>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Email Address */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Email sx={{ color: '#666' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formLabels.emailLabel}
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: clinic?.primaryColor || '#1976d2',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Submit Button */}
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      backgroundColor: clinic?.primaryColor || '#1976d2',
                      color: 'white',
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: clinic?.secondaryColor || '#1565c0',
                      },
                    }}
                  >
                    {formLabels.bookButton}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AppointmentSection;
