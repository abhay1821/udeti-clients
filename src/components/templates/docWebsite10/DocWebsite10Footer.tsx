'use client';

import React from 'react';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Email,
  Phone,
  Place,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite10FooterProps {
  clinic: Clinic;
}

const socials = [
  { icon: Facebook, key: 'facebook' },
  { icon: Twitter, key: 'twitter' },
  { icon: Instagram, key: 'instagram' },
  { icon: LinkedIn, key: 'linkedin' },
];

const DocWebsite10FooterComponent: React.FC<DocWebsite10FooterProps> = ({
  clinic,
}) => {
  return (
    <Box
      id="contact"
      sx={{
        background: 'linear-gradient(180deg, #FFF6F0 0%, #EBE5FF 100%)',
        color: '#3B2A27',
        pt: { xs: 8, md: 10 },
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
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Bangalore Dental Specialists
            </Typography>
            <Typography color="rgba(59,42,39,0.75)" sx={{ mb: 2 }}>
              {clinic.description}
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
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      color: '#3B2A27',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.85)' },
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
            <Stack spacing={1.2} color="rgba(59,42,39,0.8)">
              <Typography sx={{ cursor: 'pointer' }}>About</Typography>
              <Typography sx={{ cursor: 'pointer' }}>Treatments</Typography>
              <Typography sx={{ cursor: 'pointer' }}>
                Book Appointment
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={700} sx={{ mb: 1 }}>
              Contact
            </Typography>
            <Stack spacing={1.2} color="rgba(59,42,39,0.85)">
              <Stack direction="row" spacing={1} alignItems="center">
                <Email fontSize="small" />
                <Typography>{clinic.contact.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone fontSize="small" />
                <Typography>{clinic.contact.phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Place fontSize="small" sx={{ mt: 0.4 }} />
                <Typography>{clinic.contact.address}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'rgba(59,42,39,0.15)' }} />
        <Typography align="center" color="rgba(59,42,39,0.6)">
          Copyright {new Date().getFullYear()} © Bangalore Dental Specialists.
          All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export const DocWebsite10Footer = React.memo(
  DocWebsite10FooterComponent,
  (prevProps, nextProps) => {
    return prevProps.clinic.id === nextProps.clinic.id;
  }
);

export default DocWebsite10Footer;
