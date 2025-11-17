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
  Instagram,
  LinkedIn,
  Twitter,
  Phone,
  Email,
  Place,
} from '@mui/icons-material';
import { Clinic } from '@/types/Clinic';

interface DocWebsite7FooterProps {
  clinic: Clinic;
}

const socialIcons = [
  { icon: Facebook, key: 'facebook' },
  { icon: Twitter, key: 'twitter' },
  { icon: LinkedIn, key: 'linkedin' },
  { icon: Instagram, key: 'instagram' },
];

export const DocWebsite7Footer: React.FC<DocWebsite7FooterProps> = ({
  clinic,
}) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#F1F6F3',
        color: '#0D2B21',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        mt: 8,
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
            <Typography color="rgba(13,43,33,0.7)" sx={{ mb: 2 }}>
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
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(15,23,42,0.08)',
                      color: '#0D2B21',
                      '&:hover': { backgroundColor: '#0B8E63', color: '#fff' },
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
            <Stack spacing={1.5} color="rgba(13,43,33,0.8)">
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

        <Divider sx={{ my: 4, borderColor: 'rgba(15,23,42,0.08)' }} />
        <Typography align="center" color="rgba(13,43,33,0.6)">
          © {new Date().getFullYear()} {clinic.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default DocWebsite7Footer;
