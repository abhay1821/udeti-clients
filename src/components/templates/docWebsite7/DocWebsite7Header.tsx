'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7HeaderProps {
  clinic: Clinic;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const DocWebsite7Header: React.FC<DocWebsite7HeaderProps> = ({
  clinic,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
          boxShadow: '0 6px 20px rgba(15, 23, 42, 0.05)',
          px: { xs: 2.5, md: 4 },
          py: { xs: 2.5, md: 3 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#0D2B21',
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: '16px',
                backgroundColor: '#19D08A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#052316',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              {clinic.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)}
            </Box>
            <Box>
              <Typography fontWeight={700} fontSize="1.15rem">
                {clinic.name}
              </Typography>
              <Typography fontSize="0.85rem" color="rgba(15,43,33,0.6)">
                Modern Healthcare
              </Typography>
            </Box>
          </Box>

          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2.5,
              color: '#1C3A2F',
              fontWeight: 500,
            }}
          >
            {navItems.map(item => (
              <Typography
                key={item.label}
                component="span"
                onClick={() => scrollTo(item.href)}
                sx={{
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#0B8E63' },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Button
              variant="contained"
              onClick={() => scrollTo('#appointment')}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                backgroundColor: '#19D08A',
                color: '#052316',
                fontWeight: 700,
                borderRadius: '999px',
                px: 3.5,
                py: 1,
                textTransform: 'none',
                boxShadow: '0 12px 25px rgba(25,208,138,0.35)',
                '&:hover': { backgroundColor: '#22eaa1' },
              }}
            >
              Book Now
            </Button>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: '#0D2B21',
                border: '1px solid rgba(15,23,42,0.1)',
                borderRadius: '12px',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '78%',
            maxWidth: 340,
            backgroundColor: '#FFFFFF',
            color: '#0D2B21',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
          }}
        >
          <Typography fontWeight={700}>{clinic.name}</Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: '#0D2B21' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map(item => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => scrollTo(item.href)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, color: '#0D2B21' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 3, pb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => scrollTo('#appointment')}
            sx={{
              backgroundColor: '#19D08A',
              color: '#052316',
              fontWeight: 700,
              borderRadius: '12px',
              textTransform: 'none',
              py: 1.1,
              '&:hover': { backgroundColor: '#22eaa1' },
            }}
          >
            Book an Appointment
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default DocWebsite7Header;
