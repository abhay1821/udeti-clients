'use client';

import React from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  LinkedIn,
  Instagram,
  Star,
} from '@mui/icons-material';

const UdetiFooter: React.FC = () => {
  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: '#07503F',
        color: 'white',
        py: { xs: 4, sm: 5, md: 6 },
        width: '100%',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1200px', xl: '1600px' },
          mx: 'auto',
        }}
      >
        {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr', md: '2fr 1fr 2fr' },
              gap: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
            }}
          >
          {/* Company Information */}
          <Box>
            <Box>
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.4rem', sm: '1.6rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box component="span" sx={{ color: '#4caf50' }}>
                    Lets
                  </Box>
                  <Box component="span" sx={{ color: '#e0e0e0', position: 'relative' }}>
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
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: '#e0e0e0',
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Digitizing Healthcare in India since 2015. Empowering healthcare providers with cutting-edge digital solutions.
              </Typography>

              {/* Social Media Support Text */}
              <Typography
                variant="body2"
                sx={{
                  color: '#e0e0e0',
                  mb: 2,
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                Please support us in this journey by following us on social media
              </Typography>

              {/* Social Media Icons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  sx={{
                    color: '#e0e0e0',
                    '&:hover': {
                      color: '#4caf50',
                    },
                  }}
                >
                  <LinkedIn sx={{ fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#e0e0e0',
                    '&:hover': {
                      color: '#4caf50',
                    },
                  }}
                >
                  <Instagram sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Navigation */}
          <Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#e0e0e0',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  'About Udeti',
                  'Features',
                  'Pricing',
                  'Request Demo',
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    sx={{
                      color: '#e0e0e0',
                      textDecoration: 'none',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '&:hover': {
                        color: '#4caf50',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Contact Information */}
          <Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#e0e0e0',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Address */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <LocationOn
                    sx={{
                      color: '#4caf50',
                      fontSize: '1.2rem',
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#e0e0e0',
                        lineHeight: 1.5,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      }}
                    >
                      LetsDoc Healthcare Technologies Pvt. Ltd
                      <br />
                      WeWork IWF Campus, Survey No. 192, Whitefield Main Road,
                      <br />
                      B-Narayanpura, Mahadevapura, Bengaluru, India
                      <br />
                      Pin: 560016
                    </Typography>
                  </Box>
                </Box>

                {/* Phone */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone
                    sx={{
                      color: '#4caf50',
                      fontSize: '1.2rem',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#e0e0e0',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    }}
                  >
                    +91 88844 81055
                  </Typography>
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Email
                    sx={{
                      color: '#4caf50',
                      fontSize: '1.2rem',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#e0e0e0',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    }}
                  >
                    bd@letsdoc.in
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            my: 3,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: '#e0e0e0',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
            }}
          >
            © 2024 LetsDoc Healthcare Technologies Pvt. Ltd. All rights reserved.
          </Typography>

          {/* Legal Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="#"
              sx={{
                color: '#e0e0e0',
                textDecoration: 'none',
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
                '&:hover': {
                  color: '#4caf50',
                  textDecoration: 'underline',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              sx={{
                color: '#e0e0e0',
                textDecoration: 'none',
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
                '&:hover': {
                  color: '#4caf50',
                  textDecoration: 'underline',
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UdetiFooter;
