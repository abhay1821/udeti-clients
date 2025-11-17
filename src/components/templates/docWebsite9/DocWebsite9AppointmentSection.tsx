'use client';

import React from 'react';
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

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

interface DocWebsite9AppointmentSectionProps {
  clinic: Clinic;
}

export const DocWebsite9AppointmentSection: React.FC<
  DocWebsite9AppointmentSectionProps
> = () => {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        id="appointment"
        sx={{
          backgroundColor: '#FCEEE7',
          px: { xs: 2.5, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            sx={{
              color: '#F5A27E',
              letterSpacing: '0.2em',
              fontWeight: 600,
              mb: 1,
            }}
          >
            APPOINTMENT
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2.2rem', md: '2.5rem' },
              fontWeight: 800,
              color: '#082B23',
            }}
          >
            Book Your Appointment
          </Typography>
          <Typography sx={{ color: 'rgba(12,45,35,0.7)', mt: 1 }}>
            Schedule your visit with our expert medical team. Flexible timing
            and quick confirmation.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            maxWidth: 900,
            mx: 'auto',
            p: { xs: 3, md: 4 },
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(12,45,35,0.08)',
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
              label="Full Name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              label="Email Address"
              variant="filled"
              InputProps={{ disableUnderline: true }}
            />
            <DatePicker
              label="Preferred Date"
              value={date}
              onChange={setDate}
              slotProps={{
                textField: {
                  variant: 'filled',
                  InputProps: { disableUnderline: true },
                },
              }}
            />
            <TextField
              select
              label="Time Slot"
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
              label="Reason for Visit"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              sx={{ gridColumn: '1 / -1' }}
            />
            <Button
              variant="contained"
              sx={{
                gridColumn: '1 / -1',
                textTransform: 'none',
                backgroundColor: '#F5A27E',
                color: '#082B23',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
              }}
            >
              Book Appointment Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default DocWebsite9AppointmentSection;
