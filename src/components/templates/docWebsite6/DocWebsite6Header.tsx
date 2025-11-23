'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
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

interface DocWebsite6HeaderProps {
  clinic: Clinic;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const DocWebsite6Header: React.FC<DocWebsite6HeaderProps> = ({
  clinic,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false);
        return;
      }
      window.location.href = href;
      setDrawerOpen(false);
      return;
    }
    window.location.href = href;
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 },
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          backgroundColor: '#F6F7FB',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 1.25,
            borderRadius: '999px',
            boxShadow: '0px 15px 35px rgba(96, 102, 208, 0.15)',
            backgroundColor: '#FFFFFF',
            alignSelf: { xs: 'center', md: 'flex-start' },
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'space-between', sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #5A54F5, #7B5BFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {clinic.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)}
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {clinic.name}
              </Typography>
            </Box>
          </Box>

          <IconButton
            aria-label="open navigation menu"
            onClick={() => setDrawerOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              borderRadius: '14px',
              backgroundColor: '#F2F3FF',
              color: '#5A54F5',
              boxShadow: '0px 10px 25px rgba(90, 84, 245, 0.25)',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          component="nav"
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2.5,
            color: '#4B5563',
            fontWeight: 500,
          }}
        >
          {navItems.map(item => (
            <Typography
              key={item.label}
              component="span"
              onClick={() => handleNavClick(item.href)}
              sx={{
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#111827' },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={() => handleNavClick('#appointment')}
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            alignSelf: { xs: 'center', md: 'center' },
            background: 'linear-gradient(135deg, #5A54F5, #844CFF)',
            borderRadius: '999px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            boxShadow: '0px 15px 35px rgba(90, 84, 245, 0.35)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4E48E7, #7035E4)',
            },
          }}
        >
          {clinic.hero.ctaText}
        </Button>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
            borderTopRightRadius: '24px',
            borderBottomRightRadius: '24px',
            backgroundColor: '#FFFFFF',
            pt: 2,
          },
        }}
      >
        <Box
          sx={{
            px: 3,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography fontWeight={700}>{clinic.name}</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map(item => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavClick(item.href)}>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 600, color: '#0F172A' }}
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DocWebsite6Header;
