'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Business,
  Description,
  Star,
} from '@mui/icons-material';

interface UdetiMainSectionProps {
  title?: string;
  description?: string;
  endorsement?: string;
  statsTitle?: string;
  stats?: Array<{
    id: string;
    number: string;
    label: string;
    icon: 'trending' | 'business' | 'description' | 'star';
  }>;
}

const UdetiMainSection: React.FC<UdetiMainSectionProps> = ({
  title = 'Transform Your Clinic with Udeti',
  description = 'Udeti is a comprehensive clinic management solution designed to digitize standalone and small-scale clinics with ease. It seamlessly integrates with the Udeti developed clinic website, ensuring improved patient visibility and engagement. With low or no infrastructure requirements, Udeti delivers the lowest-cost digital solution while providing the optionality of integrating with the ABDM ecosystem.',
  endorsement = 'The solution has also been selected by the National Health Authority (NHA) and the Governments of Tamil Nadu and Rajasthan, reaffirming its reliability, scalability, and alignment with India\'s digital health mission.',
  statsTitle = 'Transforming Healthcare by the Numbers',
  stats = [
    {
      id: 'revenue-growth',
      number: '20%-40%',
      label: 'Revenue Growth for Clinics',
      icon: 'trending',
    },
    {
      id: 'installations',
      number: '500+',
      label: 'Udeti Installations',
      icon: 'business',
    },
    {
      id: 'patient-records',
      number: '1M+',
      label: 'Patient Records Digitized',
      icon: 'description',
    },
    {
      id: 'user-ratings',
      number: '4.7',
      label: 'User Ratings',
      icon: 'star',
    },
  ],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getIcon = (iconType: string) => {
    const iconProps = {
      sx: {
        fontSize: { xs: 24, md: 28 },
        color: iconType === 'trending' ? '#FFA726' : 
               iconType === 'star' ? '#FFD700' : '#333333',
      },
    };

    switch (iconType) {
      case 'trending':
        return <TrendingUp {...iconProps} />;
      case 'business':
        return <Business {...iconProps} />;
      case 'description':
        return <Description {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      default:
        return <Business {...iconProps} />;
    }
  };

  return (
    <Box
      id="stats"
      sx={{
        backgroundColor: '#07503F', // Darker teal green background for hero section
        color: 'white',
      }}
    >
      {/* Main Hero Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          minHeight: { xs: 'auto', md: '50vh' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
            maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1200px', xl: '1600px' },
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 3, sm: 4 },
              alignItems: 'center',
            }}
          >
          {/* Text Content - Always First */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                color: 'white',
              }}
            >
              {title}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {description}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {endorsement}
              </Typography>
            </Box>
          </Box>

          {/* Device Mockups - Always Second */}
          <Box 
            sx={{ 
              flex: 1,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 },
            }}
          >
              {/* Tablet Mockup */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '320px', sm: '350px', md: '400px', lg: '500px' },
                  height: { xs: '220px', sm: '240px', md: '280px', lg: '320px' },
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fHww"
                  alt="Udeti Clinic Management Dashboard"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          backgroundColor: '#095549', // Lighter teal green background for stats section
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
            maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1200px', xl: '1600px' },
            mx: 'auto',
          }}
        >
          {/* Stats Title */}
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              color: 'white',
            }}
          >
            {statsTitle}
          </Typography>

          {/* Stats Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(4, 1fr)',
              },
              gap: { xs: 3, sm: 2, md: 4, lg: 6, xl: 8 },
              maxWidth: { xs: '400px', sm: 'none' },
              mx: { xs: 'auto', sm: 0 },
            }}
          >
            {stats.map((stat) => (
              <Card
                key={stat.id}
                sx={{
                  backgroundColor: '#F0FDF4', // Light green background
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    py: { xs: 3, md: 4 },
                    px: { xs: 2, md: 3 },
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {getIcon(stat.icon)}
                  </Box>

                  {/* Number */}
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333333',
                      mb: 1,
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    {stat.number}
                  </Typography>

                  {/* Label */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#333333',
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UdetiMainSection;
