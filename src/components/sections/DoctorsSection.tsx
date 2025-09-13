'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  quote: string;
  description: string;
  image: string;
}

interface DoctorsSectionProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
}

const DoctorsSection: React.FC<DoctorsSectionProps> = ({ 
  clinicId, 
  title = "Meet Your Dentists",
  subtitle = "Our experienced team of dental professionals is committed to providing you with the highest quality care."
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getClinicById } = useClinic();
  
  const clinic = clinicId ? getClinicById(clinicId) : null;
  const [currentDoctor, setCurrentDoctor] = useState(0);

  // Get doctors data from clinic or use default
  const doctors: Doctor[] = clinic?.doctors || [
    {
      id: '1',
      name: 'Dr. Rajesh Patel',
      specialization: 'Periodontics & Preventive Care',
      experience: '18+ Years',
      quote: 'Prevention is the best medicine. My focus is on maintaining optimal oral health through preventive care and treating gum diseases with the latest periodontal techniques.',
      description: 'Dr. Rajesh Patel is our periodontics specialist, focusing on gum health and preventive care. He has extensive experience in treating gum diseases and maintaining oral hygiene.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face&auto=format&q=80'
    },
    {
      id: '2',
      name: 'Dr. Anish Kumar',
      specialization: 'Chief Dentist & Oral Surgeon',
      experience: '20+ Years',
      quote: 'Every smile deserves the finest care. My approach combines cutting-edge technology with compassionate treatment to ensure every patient leaves with confidence.',
      description: 'Dr. Anish Kumar is the founder and chief dentist with over two decades of experience in comprehensive dental care. He specializes in oral surgery, dental implants, and complex restorative procedures.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face&auto=format&q=80'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialization: 'Cosmetic Dentistry & Orthodontics',
      experience: '15+ Years',
      quote: 'A beautiful smile is not just about aesthetics—it\'s about boosting your confidence and improving your quality of life through expert cosmetic and orthodontic care.',
      description: 'Dr. Priya Sharma specializes in cosmetic dentistry and orthodontics, helping patients achieve their dream smiles through advanced techniques like invisible braces and porcelain veneers.',
      image: 'https://images.unsplash.com/photo-1594824388855-888a0b4a0b4a?w=400&h=400&fit=crop&crop=face&auto=format&q=80'
    }
  ];

  const handlePrevious = () => {
    setCurrentDoctor((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentDoctor((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentDoctor(index);
  };

  const currentDoctorData = doctors[currentDoctor];

  return (
    <Box id="doctors" sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: clinic?.primaryColor || '#1976d2',
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Doctor Profile Card */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Card
            sx={{
              maxWidth: { xs: '100%', md: '900px' },
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  minHeight: { xs: 'auto', md: '400px' },
                }}
              >
                {/* Doctor Information */}
                <Box
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    order: { xs: 2, md: 1 },
                  }}
                >
                  {/* Doctor Name */}
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: clinic?.primaryColor || '#1976d2',
                      mb: 1,
                    }}
                  >
                    {currentDoctorData.name}
                  </Typography>

                  {/* Specialization */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#666',
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    {currentDoctorData.specialization}
                  </Typography>

                  {/* Experience */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: clinic?.primaryColor || '#1976d2',
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    {currentDoctorData.experience}
                  </Typography>

                  {/* Quote */}
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        borderLeft: `4px solid ${clinic?.primaryColor || '#1976d2'}`,
                        pl: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: 'italic',
                          color: '#333',
                          lineHeight: 1.6,
                        }}
                      >
                        &ldquo;{currentDoctorData.quote}&rdquo;
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {currentDoctorData.description}
                  </Typography>
                </Box>

                {/* Doctor Image */}
                <Box
                  sx={{
                    flex: { xs: 'none', md: '0 0 40%' },
                    height: { xs: '300px', md: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    order: { xs: 1, md: 2 },
                    p: { xs: 0, md: 2 },
                  }}
                >
                  <Box
                    component="img"
                    src={currentDoctorData.image}
                    alt={currentDoctorData.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      position: 'relative',
                      zIndex: 3,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      // Show fallback image when main image fails to load
                      const fallback = e.currentTarget.parentElement?.querySelector('.fallback-image') as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'block';
                      }
                    }}
                  />
                  {/* Fallback if image doesn't load - only shows when image fails */}
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                    alt="Professional Doctor"
                    className="fallback-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      display: 'none', // Hidden by default
                      zIndex: 2,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Previous Button */}
          <IconButton
            onClick={handlePrevious}
            sx={{
              backgroundColor: '#f0f0f0',
              color: '#666',
              '&:hover': {
                backgroundColor: clinic?.primaryColor || '#1976d2',
                color: 'white',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronLeft />
          </IconButton>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {doctors.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: index === currentDoctor 
                    ? (clinic?.primaryColor || '#1976d2') 
                    : '#ddd',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: clinic?.primaryColor || '#1976d2',
                    opacity: 0.7,
                  },
                }}
              />
            ))}
          </Box>

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: '#f0f0f0',
              color: '#666',
              '&:hover': {
                backgroundColor: clinic?.primaryColor || '#1976d2',
                color: 'white',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorsSection;
