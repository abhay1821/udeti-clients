'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8AppointmentSectionProps {
  clinic: Clinic;
}

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
const fallbackServices = [
  'General Checkup',
  'Cardiology',
  'Preventive Care',
  'Vaccinations',
  'Lab Services',
  'Pediatric Care',
];

export const DocWebsite8AppointmentSection: React.FC<
  DocWebsite8AppointmentSectionProps
> = ({ clinic }) => {
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        id="appointment"
        sx={{
          backgroundColor: '#F5FAFF',
          px: { xs: 2.5, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'stretch',
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.3rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 2,
              }}
            >
              Book Your Appointment
            </Typography>
            <Typography color="rgba(12,45,72,0.7)" sx={{ mb: 4 }}>
              Schedule your visit with our expert medical team. We offer
              flexible timing and quick confirmation.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                {
                  title: 'Easy Scheduling',
                  description: 'Book appointments online in just a few clicks.',
                },
                {
                  title: 'Flexible Timing',
                  description:
                    'Choose from morning, afternoon, or evening slots.',
                },
                {
                  title: 'Instant Confirmation',
                  description: 'Get immediate confirmation via email and SMS.',
                },
              ].map(feature => (
                <Box key={feature.title}>
                  <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="rgba(12,45,72,0.7)">
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Paper
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #D1E9FF, #91D3FF)',
                borderRadius: '28px',
                p: 4,
                color: '#0C2D48',
                boxShadow: '0 25px 45px rgba(12,45,72,0.15)',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, minmax(0, 1fr))',
                  },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  label="First Name"
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Last Name"
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Email Address"
                  InputProps={{ disableUnderline: true }}
                  sx={{ gridColumn: { xs: '1 / -1', md: 'span 2' } }}
                />
                <DatePicker
                  label="Preferred Date"
                  value={preferredDate}
                  onChange={setPreferredDate}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true,
                      InputProps: { disableUnderline: true },
                    },
                  }}
                />
                <TextField
                  select
                  label="Time Slot"
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                >
                  {timeSlots.map(slot => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Service Required"
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  sx={{ gridColumn: '1 / -1' }}
                >
                  {(
                    clinic.services?.map(service => service.title) ??
                    fallbackServices
                  ).map(service => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="contained"
                  sx={{
                    gridColumn: '1 / -1',
                    backgroundColor: '#FFFFFF',
                    color: '#0C2D48',
                    fontWeight: 700,
                    textTransform: 'none',
                    py: 1.2,
                    borderRadius: '16px',
                    '&:hover': { backgroundColor: '#EBF4FF' },
                  }}
                >
                  Book Appointment Now
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DocWebsite8AppointmentSection;
