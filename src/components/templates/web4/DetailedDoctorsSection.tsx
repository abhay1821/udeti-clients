'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  School,
  LocalHospital,
  Person,
  MedicalServices,
} from '@mui/icons-material';
import { useClinic } from '@/contexts/ClinicContext';
import {
  getAccentColor,
  getComponentBackgroundColor,
  getPrimaryColor,
} from '@/lib/theme';

interface DetailedDoctorsSectionProps {
  clinicId?: string;
  title?: string;
  subtitle?: string;
}

const DetailedDoctorsSection: React.FC<DetailedDoctorsSectionProps> = ({
  clinicId,
  title = 'Meet Your Doctors',
  subtitle = 'Our experienced team of medical professionals is committed to providing you with the highest quality care.',
}) => {
  const { getClinicById } = useClinic();
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  const clinic = clinicId ? getClinicById(clinicId) : null;

  // Enhanced doctor data with more details
  const doctors = clinic?.doctors || [
    {
      id: 'ankit',
      name: 'Dr. Ankit',
      specialization: 'Internal Medicine',
      experience: '22+ Years Experience',
      education: 'MBBS, MD (Internal Medicine)',
      institution: 'All Institute of Medical Sciences, New Delhi',
      areasOfInterest: [
        'Preventive Cardiology',
        'Diabetes Management',
        'Hypertension Care',
        'Executive Health Check-ups',
      ],
      about:
        'Dr. Ankit is a distinguished internal medicine specialist and the founder of our clinic. With over two decades of experience, he has dedicated his career to providing comprehensive healthcare with a focus on preventive medicine and patient education.',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      id: 'rajesh',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Periodontics',
      experience: '18+ Years Experience',
      education: 'BDS, MDS (Periodontics)',
      institution: 'Government Dental College, Mumbai',
      areasOfInterest: [
        'Gum Disease Treatment',
        'Dental Implants',
        'Bone Regeneration',
        'Laser Periodontal Therapy',
      ],
      about:
        'Dr. Rajesh Kumar is our periodontics specialist with extensive experience in treating complex gum diseases. He is passionate about preventive care and uses the latest techniques in periodontal therapy and dental implantology.',
      image:
        'https://images.unsplash.com/photo-1594824388855-888a0b4a0b4a?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      id: 'priya',
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatrics',
      experience: '16+ Years Experience',
      education: 'MBBS, MD (Pediatrics)',
      institution: 'Manipal Institute of Medical Sciences, Manipal',
      areasOfInterest: [
        'Child Development',
        'Vaccination Programs',
        'Pediatric Nutrition',
        'Preventive Healthcare',
      ],
      about:
        'Dr. Priya Sharma is a dedicated pediatrician known for her expertise in child healthcare. She specializes in preventive care, growth monitoring, and creating comprehensive healthcare plans for children of all ages.',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
  ];

  const currentDoctor = doctors[currentDoctorIndex];

  const handlePrevious = () => {
    setCurrentDoctorIndex(prev => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentDoctorIndex(prev => (prev === doctors.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentDoctorIndex(index);
  };

  return (
    <Box
      id="doctors"
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: getPrimaryColor(clinic || null),
        color: 'white',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Doctor Card */}
        <Card
          sx={{
            borderRadius: 3,
            backgroundColor: getComponentBackgroundColor(clinic || null),
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            color: 'white',
            overflow: 'hidden',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 3 },
                alignItems: 'stretch',
                minHeight: { md: '420px' },
              }}
            >
              {/* Doctor Image - Full Height */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: { xs: '100%', md: '280px' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Box
                  component="img"
                  src={
                    (currentDoctor as { image?: string }).image ||
                    `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop&crop=face`
                  }
                  alt={currentDoctor.name}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1594824388855-888a0b4a0b4a?w=400&h=600&fit=crop&crop=face`;
                  }}
                  sx={{
                    width: { xs: '100%', md: '260px' },
                    height: { xs: '300px', md: '400px' },
                    borderRadius: 3,
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    maxWidth: { xs: '100%', md: '260px' },
                  }}
                />
              </Box>

              {/* Doctor Details */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Header Info */}
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 0.5,
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    {currentDoctor.name}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      opacity: 0.9,
                      mb: 0.5,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                    }}
                  >
                    Chief Medical Officer & Founder
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.8,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    }}
                  >
                    {currentDoctor.experience}
                  </Typography>
                </Box>

                {/* Specialty and Education Row */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 1.5,
                  }}
                >
                  {/* Specialty Chip */}
                  <Box
                    sx={{
                      backgroundColor: getComponentBackgroundColor(
                        clinic || null
                      ),
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                    >
                      <MedicalServices sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                      >
                        Specialty
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.95,
                        mb: 0.3,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      {currentDoctor.specialization}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.75, fontSize: '0.75rem' }}
                    >
                      Cardiology & Preventive Care
                    </Typography>
                  </Box>

                  {/* Education Chip */}
                  <Box
                    sx={{
                      backgroundColor: getComponentBackgroundColor(
                        clinic || null
                      ),
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                    >
                      <School sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                      >
                        Education
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.95,
                        mb: 0.3,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      {(currentDoctor as { education?: string }).education ||
                        'Medical Degree'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.75, fontSize: '0.75rem' }}
                    >
                      {(currentDoctor as { institution?: string })
                        .institution || 'Medical Institute'}
                    </Typography>
                  </Box>
                </Box>

                {/* Areas of Interest Chip */}
                <Box
                  sx={{
                    backgroundColor: getComponentBackgroundColor(
                      clinic || null
                    ),
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalHospital sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      Areas of Interest
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {(
                      (currentDoctor as { areasOfInterest?: string[] })
                        .areasOfInterest || ['General Practice', 'Patient Care']
                    ).map((area: string, index: number) => (
                      <Chip
                        key={index}
                        label={area}
                        size="small"
                        sx={{
                          backgroundColor: getAccentColor(clinic || null),
                          color: '#333333',
                          fontSize: '0.8rem',
                          height: '28px',
                          '&:hover': {
                            backgroundColor: getAccentColor(clinic || null),
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* About Chip */}
                <Box
                  sx={{
                    backgroundColor: getComponentBackgroundColor(
                      clinic || null
                    ),
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    flex: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Person sx={{ mr: 1, fontSize: '1rem' }} />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      About
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                      lineHeight: 1.4,
                      fontSize: '0.8rem',
                    }}
                  >
                    {(currentDoctor as { about?: string; description?: string })
                      .about ||
                      (
                        currentDoctor as {
                          about?: string;
                          description?: string;
                        }
                      ).description ||
                      'Experienced medical professional dedicated to providing quality healthcare.'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
            gap: 2,
          }}
        >
          <IconButton
            onClick={handlePrevious}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          {/* Dots */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {doctors.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentDoctorIndex
                      ? 'white'
                      : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  },
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default DetailedDoctorsSection;
