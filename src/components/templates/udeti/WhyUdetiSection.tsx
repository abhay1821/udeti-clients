import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';

const WhyUdetiSection: React.FC = () => {
  const challenges = [
    {
      id: 1,
      text: "My clinic lacks visibility on the internet, my Google Business profile is incomplete.",
      color: '#3B82F6', // Blue
    },
    {
      id: 2,
      text: "I can't miss any calls as I may lose patients",
      color: '#10B981', // Green
    },
    {
      id: 3,
      text: "Many patients miss appointments without reminders",
      color: '#F59E0B', // Orange
    },
    {
      id: 4,
      text: "Patient follow-up compliance is poor",
      color: '#8B5CF6', // Purple
    },
    {
      id: 5,
      text: "Unable to get a simple solution to engage with all my patients (e.g. camps, offers etc.)",
      color: '#EF4444', // Red
    },
    {
      id: 6,
      text: "Hard to set up a new clinic with digital capabilities as it adds significantly to costs",
      color: '#06B6D4', // Teal
    },
  ];

  return (
    <Box
      id="why-udeti"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#F9FAFB', // Light gray background
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
              color: '#1F2937',
            }}
          >
            Why Udeti
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#6B7280',
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Growing a practice in today&apos;s digital world comes with unique challenges
          </Typography>
        </Box>

        {/* Doctor Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Avatar
            sx={{
              width: { xs: 120, sm: 150, md: 180 },
              height: { xs: 120, sm: 150, md: 180 },
              backgroundColor: '#E5E7EB',
              border: '4px solid #F3F4F6',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
              }}
            >
              👨‍⚕️
            </Box>
          </Avatar>
        </Box>

        {/* Challenge Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: 1.5,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              sx={{
                backgroundColor: challenge.color,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                aspectRatio: '1',
                minHeight: { xs: '100px', sm: '120px', md: '140px' },
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <CardContent 
                sx={{ 
                  p: 1.5,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                    lineHeight: 1.5,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  {challenge.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyUdetiSection;
