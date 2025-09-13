import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';

const RequestCallbackForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: '#F0FDF4', // Light green background
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: { xs: '100%', sm: '700px', md: '800px' },
            mx: 'auto',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Form Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#1F2937',
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                }}
              >
                Ready to Transform Your Clinic?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Get a personalized demo and see how Udeti can revolutionize your practice
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}
              >
                {/* Full Name */}
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Dr. Your Name"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />

                {/* Contact Number */}
                <TextField
                  fullWidth
                  label="Contact Number"
                  placeholder="+91"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />

                {/* Email Address */}
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="doctor@clinic.com"
                  type="email"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />

                {/* City */}
                <TextField
                  fullWidth
                  label="City"
                  placeholder="Mumbai"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 'bold',
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #095549 0%, #07503F 50%, #064e3b 100%)',
                    boxShadow: '0 6px 20px rgba(7, 80, 63, 0.4)',
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, #07503F 0%, #064e3b 50%, #052e27 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #07503F 0%, #064e3b 50%, #052e27 100%)',
                      boxShadow: '0 8px 25px rgba(7, 80, 63, 0.5)',
                      transform: 'translateY(-2px)',
                      '&:before': {
                        opacity: 1,
                      },
                    },
                    '&:active': {
                      transform: 'translateY(0px)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    Request Callback
                  </Box>
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RequestCallbackForm;
