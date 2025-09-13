import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PricingSection: React.FC = () => {
  const monthlyFeatures = [
    { text: 'No clinic website', included: false },
    { text: 'Full-featured clinic software', included: true },
    { text: '500 SMS included monthly', included: true },
    { text: 'Business Hours Support', included: true },
    { text: 'ABDM Compliance included', included: true },
  ];

  const annualFeatures = [
    { text: 'Free Premium clinic website', included: true },
    { text: 'Full-featured clinic software', included: true },
    { text: '500 SMS included monthly', included: true },
    { text: 'Business Hours Support', included: true },
    { text: 'ABDM Compliance included', included: true },
  ];

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#0E594C', // Dark teal green background
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: 'white',
            }}
          >
            Choose Your Plan
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Flexible pricing options to suit your clinic&apos;s needs
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 4,
            maxWidth: '1000px',
            mx: 'auto',
            pt: 2, 
          }}
        >
          {/* Monthly Plan Card */}
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: '2px solid #F97316', // Orange border
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1F2937',
                    mb: 1,
                  }}
                >
                  Udeti Monthly
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#6B7280',
                  }}
                >
                  Perfect for getting started
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1F2937',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  ₹300<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/month</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                    mt: 1,
                  }}
                >
                  Billed monthly
                </Typography>
              </Box>

              {/* Features */}
              <List sx={{ mb: 4 }}>
                {monthlyFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {feature.included ? (
                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      ) : (
                        <CancelIcon sx={{ color: '#EF4444', fontSize: 20 }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={feature.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#374151',
                          fontSize: '0.95rem',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* CTA Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#F97316',
                  '&:hover': {
                    backgroundColor: '#EA580C',
                  },
                }}
              >
                Start Monthly Plan
              </Button>
            </CardContent>
          </Card>

          {/* Annual Plan Card */}
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: '2px solid #10B981', // Green border
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              overflow: 'visible', // Allow badge to extend outside card
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* Most Popular Badge */}
            <Chip
              label="★ Most Popular"
              sx={{
                position: 'absolute',
                top: -12,
                right: 16,
                backgroundColor: '#10B981',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                zIndex: 2,
                height: 28,
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1F2937',
                    mb: 1,
                  }}
                >
                  Udeti Annual
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#6B7280',
                  }}
                >
                  All set for the year
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1F2937',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  ₹2,400<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/year</span>
                </Typography>
                
                {/* Discount */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#9CA3AF',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹3,600/year
                  </Typography>
                  <Chip
                    label="Save ₹1,200"
                    size="small"
                    sx={{
                      backgroundColor: '#DCFCE7',
                      color: '#166534',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>

              {/* Features */}
              <List sx={{ mb: 4 }}>
                {annualFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#374151',
                          fontSize: '0.95rem',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* CTA Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#10B981',
                  '&:hover': {
                    backgroundColor: '#059669',
                  },
                }}
              >
                Start Annual Plan
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Disclaimer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
            }}
          >
            * Website Domain name charges apply separately and to be paid to third party
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;
