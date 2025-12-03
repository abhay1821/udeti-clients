'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';
import { getFooterBackgroundColor } from '@/lib/theme';
import { useClinicTheme } from '@/hooks/useClinicTheme';

interface FooterProps {
  clinicId?: string;
}

const Footer: React.FC<FooterProps> = ({ clinicId }) => {
  const { getClinicById } = useClinic();
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const theme = useClinicTheme(clinicId || clinic?.id || 'default');

  const socialIcons = [
    { icon: Facebook, href: clinic?.social?.facebook, label: 'Facebook' },
    { icon: Twitter, href: clinic?.social?.twitter, label: 'Twitter' },
    { icon: LinkedIn, href: clinic?.social?.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: clinic?.social?.instagram, label: 'Instagram' },
  ];

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        backgroundColor: getFooterBackgroundColor(clinic || null),
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr 1fr 1fr',
              lg: '1fr 1fr 1fr',
            },
            gap: { xs: 4, md: 4 },
            mb: 4,
          }}
        >
          {/* Left Column - Clinic Info */}
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}
            >
              {clinic?.name || 'Healthcare'}
            </Typography>
            <Typography
              variant="body2"
              color="grey.300"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              {clinic?.description || 'Providing quality healthcare services'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <IconButton
                  key={label}
                  component={href ? 'a' : 'button'}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'grey.400',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    '&:hover': {
                      color: 'white',
                      backgroundColor: theme?.primaryColor || 'primary.main',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={label}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                href="/"
                color="grey.300"
                underline="hover"
                sx={{ fontSize: '0.95rem' }}
              >
                Home
              </Link>
              <Link
                href="/about"
                color="grey.300"
                underline="hover"
                sx={{ fontSize: '0.95rem' }}
              >
                About
              </Link>
              <Link
                href="/services"
                color="grey.300"
                underline="hover"
                sx={{ fontSize: '0.95rem' }}
              >
                Services
              </Link>
              <Link
                href="/contact"
                color="grey.300"
                underline="hover"
                sx={{ fontSize: '0.95rem' }}
              >
                Contact
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {clinic?.contact?.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" sx={{ color: 'white' }} />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {clinic.contact.phone}
                  </Typography>
                </Box>
              )}
              {clinic?.contact?.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" sx={{ color: 'white' }} />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {clinic.contact.email}
                  </Typography>
                </Box>
              )}
              {clinic?.contact?.address && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOn
                    fontSize="small"
                    sx={{ color: 'white', mt: 0.5 }}
                  />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {clinic.contact.address}
                  </Typography>
                </Box>
              )}
              {clinic?.contact?.hours && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" sx={{ color: 'white' }} />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {clinic.contact.hours}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, backgroundColor: 'grey.700' }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <Typography
            variant="body2"
            color="grey.400"
            sx={{ textAlign: 'center' }}
          >
            © {new Date().getFullYear()} {clinic?.name || 'Healthcare'}. All
            rights reserved. | Designed with care for your health.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
