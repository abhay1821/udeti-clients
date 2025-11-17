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
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  Place,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite8FooterProps {
  clinic: Clinic;
}

const socialIcons = [
  { icon: Facebook, key: 'facebook' },
  { icon: Twitter, key: 'twitter' },
  { icon: LinkedIn, key: 'linkedin' },
  { icon: Instagram, key: 'instagram' },
];

export const DocWebsite8Footer: React.FC<DocWebsite8FooterProps> = ({
  clinic,
}) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0C2D48',
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
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              {clinic.name}
            </Typography>
            <Typography color="rgba(255,255,255,0.75)" sx={{ mb: 2 }}>
              {clinic.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialIcons.map(({ icon: Icon, key }) => {
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
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
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
              Contact
            </Typography>
            <Stack spacing={1.5} color="rgba(255,255,255,0.8)">
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone fontSize="small" />
                <Typography>{clinic.contact.phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Email fontSize="small" />
                <Typography>{clinic.contact.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Place fontSize="small" sx={{ mt: 0.4 }} />
                <Typography>{clinic.contact.address}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Typography align="center" color="rgba(255,255,255,0.7)">
          © {new Date().getFullYear()} {clinic.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default DocWebsite8Footer;
