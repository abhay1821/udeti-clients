'use client';

import React from 'react';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Phone,
  Email,
  Place,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite9FooterProps {
  clinic: Clinic;
}

const socials = [
  { icon: Facebook, key: 'facebook' },
  { icon: Twitter, key: 'twitter' },
  { icon: Instagram, key: 'instagram' },
  { icon: LinkedIn, key: 'linkedin' },
];

const DocWebsite9FooterComponent: React.FC<DocWebsite9FooterProps> = ({
  clinic,
}) => {
  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        backgroundColor: '#082B23',
        color: '#FFFFFF',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          justifyContent="space-between"
        >
          <Box sx={{ maxWidth: 420 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Dr. Tanvi&apos;s Clinic
            </Typography>
            <Typography color="rgba(255,255,255,0.75)" sx={{ mb: 3 }}>
              {clinic.contact.address}
            </Typography>
            <Stack direction="row" spacing={1}>
              {socials.map(({ icon: Icon, key }) => {
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
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      color: '#FFFFFF',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.2} color="rgba(255,255,255,0.85)">
              <Typography sx={{ cursor: 'pointer' }}>Home</Typography>
              <Typography sx={{ cursor: 'pointer' }}>About</Typography>
              <Typography sx={{ cursor: 'pointer' }}>Contact</Typography>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 1 }}>
              Contact Details
            </Typography>
            <Stack spacing={1.5} color="rgba(255,255,255,0.85)">
              <Stack direction="row" spacing={1} alignItems="center">
                <Email fontSize="small" />
                <Typography>{clinic.contact.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone fontSize="small" />
                <Typography>{clinic.contact.phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Place fontSize="small" />
                <Typography>{clinic.contact.hours}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Typography align="center" color="rgba(255,255,255,0.7)">
          Copyright {new Date().getFullYear()} © Dr Tanvi&apos;s Clinic. All
          Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export const DocWebsite9Footer = React.memo(
  DocWebsite9FooterComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite9Footer;
