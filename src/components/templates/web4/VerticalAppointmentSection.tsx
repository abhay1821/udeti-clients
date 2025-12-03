'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Person, AccessTime, Phone } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface VerticalAppointmentSectionProps {
  clinicId?: string;
}

const VerticalAppointmentSection: React.FC<VerticalAppointmentSectionProps> = ({
  clinicId,
}) => {
  const { getClinicById } = useClinic();
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const clinic = clinicId ? getClinicById(clinicId) : null;

  const doctors = clinic?.doctors || [
    { id: 'yuvaraj', name: 'Dr. Yuvaraj', specialization: 'General Medicine' },
    { id: 'priya', name: 'Dr. Priya Sharma', specialization: 'Pediatrics' },
    {
      id: 'rajesh',
      name: 'Dr. Rajesh Kumar',
      specialization: 'General Medicine',
    },
  ];

  const handleDoctorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDoctor(event.target.value);
  };

  const handleConfirmAppointment = () => {
    if (selectedDoctor) {
      window.location.href = `/appointment?doctor=${selectedDoctor}&clinic=${clinicId}`;
    }
  };

  return (
    <Box id="appointment">
      {/* Clinic Hours Info Bar */}
      <Box
        sx={{
          backgroundColor: clinic?.primaryColor || '#2196f3',
          color: 'white',
          py: { xs: 2, md: 2.5 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
            }}
          >
            {/* Clinic Hours */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <AccessTime sx={{ fontSize: { xs: '1.2rem', md: '1.3rem' } }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                }}
              >
                Clinic Hours:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Monday - Saturday: 9:00 AM - 6:00 PM
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Sunday: Closed
              </Typography>
            </Box>

            {/* Emergency Contact */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Phone sx={{ fontSize: { xs: '1.2rem', md: '1.3rem' } }} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                }}
              >
                Emergency:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                }}
              >
                +91-9876543210
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Appointment Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
              color: clinic?.primaryColor || '#2196f3',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Book Your Appointment
          </Typography>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              p: { xs: 2, md: 4 },
              backgroundColor: 'white',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Select Doctor Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Person sx={{ mr: 1, color: '#666' }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    fontSize: '1.1rem',
                  }}
                >
                  Select Your Doctor
                </Typography>
              </Box>

              {/* Doctor Selection - Row Layout until sm breakpoint */}
              <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
                <RadioGroup
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {doctors.map(doctor => (
                    <FormControlLabel
                      key={doctor.id}
                      value={doctor.id}
                      control={
                        <Radio
                          sx={{
                            color: clinic?.primaryColor || '#2196f3',
                            '&.Mui-checked': {
                              color: clinic?.primaryColor || '#2196f3',
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            ml: 1,
                            flex: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: '1.1rem',
                              color: '#333',
                            }}
                          >
                            {doctor.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#666',
                              fontSize: '0.9rem',
                            }}
                          >
                            {
                              (doctor as { specialization?: string })
                                .specialization
                            }
                          </Typography>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        p: 2,
                        border: '2px solid #e0e0e0',
                        borderRadius: 2,
                        backgroundColor:
                          selectedDoctor === doctor.id
                            ? 'rgba(33, 150, 243, 0.05)'
                            : 'transparent',
                        borderColor:
                          selectedDoctor === doctor.id
                            ? clinic?.primaryColor || '#2196f3'
                            : '#e0e0e0',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.02)',
                          borderColor: clinic?.primaryColor || '#2196f3',
                        },
                        transition: 'all 0.2s ease',
                        width: { xs: '100%', sm: 'auto' },
                        minWidth: { xs: '100%', sm: '200px' },
                        flex: { xs: '1 1 100%', sm: '1 1 auto' },
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Step Indicator */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: '#666',
                  mb: 3,
                  fontSize: '0.9rem',
                }}
              >
                Step 1: Select a doctor to begin
              </Typography>

              {/* Confirm Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmAppointment}
                disabled={!selectedDoctor}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  backgroundColor: clinic?.primaryColor || '#2196f3',
                  '&:hover': {
                    backgroundColor: clinic?.secondaryColor || '#1976d2',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                    color: '#666',
                  },
                }}
              >
                Confirm Appointment
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default VerticalAppointmentSection;
