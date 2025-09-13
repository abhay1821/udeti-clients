'use client';

import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';
import { getButtonColor } from '@/lib/theme';

interface HeaderProps {
  clinicId?: string;
}

const Header: React.FC<HeaderProps> = ({ clinicId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getClinicById } = useClinic();

  const clinic = clinicId ? getClinicById(clinicId) : null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (href: string, isSection: boolean) => {
    if (isSection) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const navigationItems = useMemo(() => {
    const baseItems = [
      {
        label: 'Book Appointment',
        href: '#appointment',
        isSection: true,
      },
      { label: 'Doctors', href: '#doctors', isSection: true },
      { label: 'Services', href: '#services', isSection: true },
      { label: 'Clinic', href: '#clinic', isSection: true },
      { label: 'Testimonials', href: '#testimonials', isSection: true },
      { label: 'Contact', href: '#contact', isSection: true },
    ];

    // Add Home button only for web1, web2, and other templates (not web4, web5)
    if (!clinicId || !['doc-website-4', 'doc-website-5'].includes(clinicId)) {
      baseItems.unshift({ label: 'Home', href: '#home', isSection: true });
    }

    return baseItems;
  }, [clinicId]);

  const drawer = (
    <Box
      sx={{
        height: '75vh',
        backgroundColor: clinic?.primaryColor || '#1976d2',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with close button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          {clinic?.name || 'Healthcare'}
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, px: 2, py: 1 }}>
        <List sx={{ p: 0 }}>
          {navigationItems.map(item => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <Button
                onClick={() => {
                  handleNavigation(item.href, item.isSection);
                  setMobileOpen(false); // Close drawer after navigation
                }}
                sx={{
                  color: 'white',
                  textAlign: 'left',
                  width: '100%',
                  justifyContent: 'flex-start',
                  py: 1,
                  px: 0,
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  minHeight: 'auto',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Book Appointment Button */}
      <Box
        sx={{ px: 2, py: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <Button
          variant="contained"
          onClick={() => {
            handleNavigation('#appointment', true);
            setMobileOpen(false);
          }}
          sx={{
            backgroundColor: getButtonColor(clinic || null),
            color: 'white',
            width: '100%',
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: getButtonColor(clinic || null),
              opacity: 0.8,
            },
          }}
        >
          Book Appointment
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: clinic?.primaryColor || '#1976d2',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: '70px',
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ height: '100%', px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', md: '1.1rem' },
              color: 'white',
            }}
          >
            {clinic?.name || 'Healthcare'}
          </Typography>

            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              aria-expanded={mobileOpen}
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1, md: 1.5 }, 
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }}>
              {navigationItems.map(item => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => handleNavigation(item.href, item.isSection)}
                  aria-label={`Navigate to ${item.label} section`}
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                    textTransform: 'none',
                    color: 'white',
                    minWidth: 'auto',
                    px: { xs: 0.5, sm: 1, md: 1.5 },
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Show Book Appointment button for all clinics */}
              <Button
                variant="contained"
                onClick={() => handleNavigation('#appointment', true)}
                sx={{
                  backgroundColor: getButtonColor(clinic || null),
                  color: 'white',
                  px: { xs: 1, sm: 1.5, md: 2 },
                  py: 0.8,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: getButtonColor(clinic || null),
                    opacity: 0.8,
                  },
                }}
              >
                Book Appointment
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            height: '60vh',
            top: 0,
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
