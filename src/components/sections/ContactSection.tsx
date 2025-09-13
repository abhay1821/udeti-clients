'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface ContactSectionProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
  showForm?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  clinicId,
  title = 'Contact Us',
  subtitle = 'Get in touch with us today',
  showForm = true,
}) => {
  const theme = useTheme();
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const contact = clinic?.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: contact?.phone || '+1 (555) 123-4567',
      color: '#4caf50',
    },
    {
      icon: Email,
      title: 'Email',
      value: contact?.email || 'info@clinic.com',
      color: '#2196f3',
    },
    {
      icon: LocationOn,
      title: 'Address',
      value: contact?.address || '123 Healthcare St, Medical City',
      color: '#ff9800',
    },
    {
      icon: AccessTime,
      title: 'Hours',
      value: contact?.hours || 'Mon-Fri: 9AM-6PM',
      color: '#9c27b0',
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || theme.palette.primary.main,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Contact Information */}
          <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {contactInfo.map((info, index) => (
                <Box key={index} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: `${info.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: info.color,
                          }}
                        >
                          <info.icon sx={{ fontSize: 28 }} />
                        </Box>
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {info.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {info.value}
                      </Typography>
                    </CardContent>
                </Card>
              </Box>
            ))}
            </Box>
          </Box>

          {/* Contact Form */}
          {showForm && (
            <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
              <Card
                sx={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  p: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    Send us a Message
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 100%' }}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 100%' }}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 100%' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          sx={{
                            backgroundColor: clinic?.primaryColor || theme.palette.primary.main,
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: clinic?.secondaryColor || theme.palette.secondary.main,
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ContactSection;
