'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  X as TwitterIcon,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface StandardFooterProps {
  clinic: Clinic;
}

const StandardFooterComponent: React.FC<StandardFooterProps> = ({ clinic }) => {
  const theme = useClinicTheme(clinic.id);
  const handleAnchorNavigation = (selector: string) => {
    if (typeof window === 'undefined') return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = selector;
    }
  };

  // Extract initials from doctor's name
  const getInitials = (name: string) => {
    const parts = name
      .replace(/^Dr\.?\s*/i, '')
      .trim()
      .split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Extract name without "Dr."
  const getNameWithoutTitle = (name: string) => {
    return name.replace(/^Dr\.?\s*/i, '').trim();
  };

  const footerBackground = theme.footerBackground;

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        backgroundColor: footerBackground,
        color: 'white',
        pt: { xs: 5, sm: 6, md: 7 },
        pb: { xs: 3, sm: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, sm: 4, md: 5, lg: 6 },
          maxWidth: { xl: '1400px' },
        }}
      >
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1.5fr 1fr 1fr 1.5fr',
              lg: '1.5fr 1fr 1fr 1.5fr',
            },
            gap: { xs: 4, sm: 4, md: 5, lg: 6 },
            mb: { xs: 4, sm: 5 },
          }}
        >
          {/* Left Column - Logo and Social */}
          <Box>
            {/* Logo Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              {/* Circular Avatar with Initials */}
              <Avatar
                sx={{
                  width: { xs: 56, sm: 64 },
                  height: { xs: 56, sm: 64 },
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  fontWeight: 600,
                }}
              >
                {getInitials(clinic.name)}
              </Avatar>

              {/* Doctor Name */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: 'block',
                    lineHeight: 1.2,
                    mb: 0.3,
                  }}
                >
                  Dr.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'white',
                  }}
                >
                  {getNameWithoutTitle(clinic.name)}
                </Typography>
              </Box>
            </Box>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={1.5}>
              {clinic.social?.facebook && (
                <IconButton
                  component="a"
                  href={clinic.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Facebook"
                >
                  <Facebook fontSize="small" />
                </IconButton>
              )}
              {clinic.social?.instagram && (
                <IconButton
                  component="a"
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Instagram"
                >
                  <Instagram fontSize="small" />
                </IconButton>
              )}
              {clinic.social?.twitter && (
                <IconButton
                  component="a"
                  href={clinic.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Twitter"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>

          {/* Main Menu Column */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5 },
                color: 'white',
              }}
            >
              Main Menu
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Contact Us', href: '#contact' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  underline="none"
                  onClick={e => {
                    if (href.startsWith('#')) {
                      e.preventDefault();
                      handleAnchorNavigation(href);
                    }
                  }}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5 },
                color: 'white',
              }}
            >
              Useful Links
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="/blog"
                underline="none"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  '&:hover': {
                    color: 'white',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Blog
              </Link>
              <Link
                href="#gallery"
                underline="none"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  '&:hover': {
                    color: 'white',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Gallery
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  '&:hover': {
                    color: 'white',
                    textDecoration: 'underline',
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Terms and Conditions
              </Link>
            </Stack>
          </Box>

          {/* Contact Details Column */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5 },
                color: 'white',
              }}
            >
              Contact Details
            </Typography>
            <Stack spacing={2}>
              {clinic.contact?.address && (
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <LocationOn
                    sx={{
                      color: 'white',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    {clinic.contact.address}
                  </Typography>
                </Stack>
              )}
              {clinic.contact?.phone && (
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Phone
                    sx={{
                      color: 'white',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      flexShrink: 0,
                    }}
                  />
                  <Link
                    href={`tel:${clinic.contact.phone}`}
                    underline="none"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {clinic.contact.phone}
                  </Link>
                </Stack>
              )}
              {clinic.contact?.email && (
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Email
                    sx={{
                      color: 'white',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      flexShrink: 0,
                    }}
                  />
                  <Link
                    href={`mailto:${clinic.contact.email}`}
                    underline="none"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {clinic.contact.email}
                  </Link>
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            my: { xs: 3, sm: 4 },
          }}
        />

        {/* Copyright Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            position: 'relative',
            pt: { xs: 2, sm: 2 },
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Copyright © {new Date().getFullYear()} {clinic.name}. All Rights
            Reserved. | Powered by Future Revolution.
          </Typography>

          {/* Decorative Element (optional) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 120,
              height: 80,
              opacity: 0.1,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export const StandardFooter = React.memo(
  StandardFooterComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default StandardFooter;
