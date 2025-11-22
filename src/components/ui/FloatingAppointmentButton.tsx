'use client';

import React from 'react';
import { Fab, Tooltip, Box } from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface FloatingAppointmentButtonProps {
  clinic: Clinic;
}

export const FloatingAppointmentButton: React.FC<
  FloatingAppointmentButtonProps
> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);
  const handleClick = () => {
    const appointmentSection = document.querySelector('#appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '#appointment';
    }
  };

  return (
    <Tooltip
      title={`Book Appointment with ${clinic.name}`}
      arrow
      placement="left"
    >
      <Fab
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          backgroundColor: theme.buttonColor,
          color: 'white',
          boxShadow: `0 8px 24px ${theme.buttonColor}40`,
          zIndex: 1000,
          '&:hover': {
            backgroundColor: theme.buttonColor,
            opacity: 0.9,
            transform: 'scale(1.05)',
            boxShadow: `0 12px 32px ${theme.buttonColor}60`,
          },
          transition: 'all 0.3s ease',
        }}
        aria-label="Book Appointment"
      >
        <Box
          component="img"
          src="/images/button/appointmentIcon.png"
          alt="Book Appointment"
          sx={{
            width: { xs: 32, md: 36 },
            height: { xs: 32, md: 36 },
            objectFit: 'contain',
          }}
        />
      </Fab>
    </Tooltip>
  );
};

export default FloatingAppointmentButton;
