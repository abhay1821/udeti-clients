'use client';

import React, { useState, useEffect } from 'react';
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
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Star,
} from '@mui/icons-material';

const UdetiHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    setMounted(true);
  }, []);

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
      }
    } else {
      window.location.href = href;
    }
  };

  const navigationItems = [
    { label: 'Solution', href: '#solution', isSection: true },
    { label: 'Why Udeti', href: '#why-udeti', isSection: true },
    { label: 'Pricing', href: '#pricing', isSection: true },
    { label: 'Contact Us', href: '#contact', isSection: true },

    { label: 'About Us', href: '#stats', isSection: true },
    { label: 'Testimonials', href: '#testimonials', isSection: true },
  ];

  const drawer = (
    <Box sx={{ backgroundColor: '#07503F' }}>
      {/* Header with Logo and Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box component="span" sx={{ color: '#28B47C' }}>
            Lets
          </Box>
          <Box component="span" sx={{ color: '#87CEEB', position: 'relative' }}>
            Doc
            <Star
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                fontSize: '0.8rem',
                color: '#ffeb3b',
              }}
            />
          </Box>
        </Typography>

        {/* Close Button */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: 'white' }}
        >
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              lineHeight: 1,
            }}
          >
            ×
          </Box>
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: 1, py: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemText
              primary={item.label}
              onClick={() => {
                handleNavigation(item.href, item.isSection);
                setMobileOpen(false);
              }}
              sx={{
                color: 'white',
                cursor: 'pointer',
                '& .MuiListItemText-primary': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  py: 0.8,
                  px: 1,
                  borderRadius: 1,
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Action Buttons */}
      <Box sx={{ p: 2, pt: 1 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1A608C',
            color: 'white',
            borderRadius: 2,
            py: 1,
            mb: 1.1,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            '&:hover': {
              backgroundColor: '#0F4A6B',
            },
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#28B47C',
            color: 'white',
            borderRadius: 2,
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            '&:hover': {
              backgroundColor: '#1F8B5C',
            },
          }}
        >
          Request Demo
        </Button>
      </Box>
    </Box>
  );

  // Prevent hydration mismatch by showing loading state
  if (!mounted) {
    return (
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#2E7D6B',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: 1,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Box component="span" sx={{ color: '#28B47C' }}>
                Lets
              </Box>
              <Box component="span" sx={{ color: '#87CEEB', position: 'relative' }}>
                Doc
                <Star
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    fontSize: '0.8rem',
                    color: '#FFD700',
                  }}
                />
              </Box>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#2E7D6B',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: 1,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Box component="span" sx={{ color: '#28B47C' }}>
                Lets
              </Box>
              <Box component="span" sx={{ color: '#87CEEB', position: 'relative' }}>
                Doc
                <Star
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    fontSize: '0.8rem',
                    color: '#FFD700',
                  }}
                />
              </Box>
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {/* Navigation Links */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                }}
              >
                {navigationItems.map((item) => (
                  <Typography
                    key={item.label}
                    variant="body1"
                    onClick={() => handleNavigation(item.href, item.isSection)}
                    sx={{
                      color: '#e0e0e0',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1A608C',
                    color: 'white',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#0F4A6B',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#28B47C',
                    color: 'white',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#1F8B5C',
                    },
                  }}
                >
                  Request Demo
                </Button>
              </Box>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', xl: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            height: 'auto',
            maxHeight: '100vh',
            backgroundColor: '#2E7D6B',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default UdetiHeader;
