'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8HeaderProps {
  clinic: Clinic;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Appointments', href: '#appointment' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Gallery', href: '#gallery' },
];

export const DocWebsite8Header: React.FC<DocWebsite8HeaderProps> = () => {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#F7FDFF',
          borderBottom: '1px solid rgba(12, 45, 72, 0.08)',
          color: '#0C2D48',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            py: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                backgroundColor: '#C5F1FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#0C2D48',
              }}
            >
              CF
            </Box>
            <Typography variant="h6" fontWeight={700}>
              ClinicFlow
            </Typography>
          </Box>

          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2.5,
              color: 'rgba(12,45,72,0.8)',
            }}
          >
            {navItems.map(item => (
              <Typography
                key={item.label}
                sx={{ cursor: 'pointer', fontWeight: 500 }}
                onClick={() => handleNav(item.href)}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => handleNav('#appointment')}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                textTransform: 'none',
                backgroundColor: '#4DB7F8',
                color: '#0C2D48',
                fontWeight: 600,
                borderRadius: '999px',
                px: 3,
              }}
            >
              Book Now
            </Button>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: '#0C2D48',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: '75%',
            maxWidth: 320,
            backgroundColor: '#F7FDFF',
            color: '#0C2D48',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
          }}
        >
          <Typography fontWeight={700}>ClinicFlow</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map(item => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNav(item.href)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNav('#appointment')}
            sx={{
              textTransform: 'none',
              backgroundColor: '#4DB7F8',
              color: '#0C2D48',
              fontWeight: 600,
            }}
          >
            Book an Appointment
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default DocWebsite8Header;
