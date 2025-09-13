'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  EmojiEvents,
  People,
  Favorite,
  Star,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface StatsSectionProps {
  clinicId?: string;
  stats?: Stat[];
  title?: string;
  subtitle?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ 
  clinicId, 
  stats,
  title,
  subtitle 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;

  // Default stats if none provided
  const defaultStats: Stat[] = [
    {
      number: '20+',
      label: 'Years of Experience',
      icon: 'award'
    },
    {
      number: '10,000+',
      label: 'Patients Treated',
      icon: 'people'
    },
    {
      number: '100+',
      label: 'Health Camps Conducted',
      icon: 'heart'
    },
    {
      number: '4.9/5',
      label: 'Patient Rating',
      icon: 'star'
    }
  ];

  const statsToShow = stats || defaultStats;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <EmojiEvents sx={{ fontSize: '2.5rem' }} />;
      case 'people':
        return <People sx={{ fontSize: '2.5rem' }} />;
      case 'heart':
        return <Favorite sx={{ fontSize: '2.5rem' }} />;
      case 'star':
        return <Star sx={{ fontSize: '2.5rem' }} />;
      default:
        return <EmojiEvents sx={{ fontSize: '2.5rem' }} />;
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${clinic?.primaryColor || '#1976d2'} 0%, ${clinic?.secondaryColor || '#42a5f5'} 100%)`,
        color: 'white',
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Optional Title and Subtitle */}
      {(title || subtitle) && (
        <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
          {title && (
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: 'white',
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Stats Grid - Full Width */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: 'repeat(2, 1fr)', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: { xs: 2, md: 3 },
          textAlign: 'center',
          px: { xs: 2, md: 4 },
        }}
      >
        {statsToShow.map((stat, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: { xs: 2, md: 3 },
              borderRadius: 2,
            //   backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            //   border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '60px', md: '80px' },
                height: { xs: '60px', md: '80px' },
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {getIcon(stat.icon)}
            </Box>

            {/* Number */}
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1,
              }}
            >
              {stat.number}
            </Typography>

            {/* Label */}
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StatsSection;