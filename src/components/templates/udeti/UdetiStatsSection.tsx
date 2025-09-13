'use client';

import React from 'react';
import {
  Box,
  Container,
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

interface UdetiStatsSectionProps {
  title?: string;
  stats?: Array<{
    id: string;
    number: string;
    label: string;
    icon: 'trending' | 'business' | 'description' | 'star';
  }>;
}

const UdetiStatsSection: React.FC<UdetiStatsSectionProps> = ({
  title = 'Transforming Healthcare by the Numbers',
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
      sx={{
        backgroundColor: '#2E7D32', // Dark green background
        py: { xs: 6, md: 8 },
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
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
          {title}
        </Typography>

        {/* Stats Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
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
      </Container>
    </Box>
  );
};

export default UdetiStatsSection;
