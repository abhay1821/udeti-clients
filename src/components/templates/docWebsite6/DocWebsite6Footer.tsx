'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import { Clinic } from '@/types/Clinic';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

interface DocWebsite6FooterProps {
  clinic: Clinic;
}

const socialMap = [
  { icon: FacebookIcon, key: 'facebook' },
  { icon: TwitterIcon, key: 'twitter' },
  { icon: LinkedInIcon, key: 'linkedin' },
  { icon: InstagramIcon, key: 'instagram' },
];

export const DocWebsite6Footer: React.FC<DocWebsite6FooterProps> = ({
  clinic,
}) => {
  const handleAnchorNavigation = (selector: string) => {
    if (typeof window === 'undefined') return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = selector;
    }
  };

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        background:
          'linear-gradient(135deg, #11152C 0%, #1B2040 60%, #2F2F54 100%)',
        color: '#F8FAFC',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 3, md: 4 }, maxWidth: { xl: '1200px' } }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          justifyContent="space-between"
          mb={4}
        >
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              {clinic.name}
            </Typography>
            <Typography
              color="rgba(248,250,252,0.7)"
              sx={{ lineHeight: 1.7, mb: 3 }}
            >
              {clinic.description}
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {socialMap.map(({ icon: Icon, key }) => {
                const url = clinic.social?.[key as keyof typeof clinic.social];
                if (!url) return null;
                return (
                  <IconButton
                    key={key}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: '#F8FAFC',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.3} color="rgba(248,250,252,0.8)">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Contact', href: '#contact' },
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
                    color: 'inherit',
                    fontSize: '0.95rem',
                    '&:hover': { color: '#fff' },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Stack spacing={1.5} color="rgba(248,250,252,0.85)">
              {clinic.contact?.phone && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Phone fontSize="small" />
                  <Typography>{clinic.contact.phone}</Typography>
                </Stack>
              )}
              {clinic.contact?.email && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Email fontSize="small" />
                  <Typography>{clinic.contact.email}</Typography>
                </Stack>
              )}
              {clinic.contact?.address && (
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <LocationOn fontSize="small" sx={{ mt: 0.3 }} />
                  <Typography>{clinic.contact.address}</Typography>
                </Stack>
              )}
              {clinic.contact?.hours && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTime fontSize="small" />
                  <Typography>{clinic.contact.hours}</Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
        <Typography align="center" color="rgba(248,250,252,0.6)">
          © {new Date().getFullYear()} {clinic.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default DocWebsite6Footer;
