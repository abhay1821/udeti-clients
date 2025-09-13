export interface HeroFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroSlide {
  id: number;
  mainFeature: {
    title: string;
    description: string;
    image: string;
    doctorName: string;
    doctorTitle: string;
    doctorImage: string;
    ctaButtons: {
      primary: string;
      secondary: string;
    };
  };
  features: HeroFeature[];
  sectionTitle: string;
  sectionIcon: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  slides: HeroSlide[];
  navigation: {
    currentSlide: number;
    totalSlides: number;
  };
}

export const heroData: HeroData = {
  title: "The Udeti Solution",
  subtitle: "Comprehensive digital transformation for your healthcare practice",
  slides: [
    {
      id: 1,
      mainFeature: {
        title: "Book Your Doctor Appointment Online",
        description: "A simple, intuitive, and secure platform for managing your healthcare appointments",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fHww",
        doctorName: "Dr. John Smith",
        doctorTitle: "General Practitioner",
        doctorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        ctaButtons: {
          primary: "Book an appointment now",
          secondary: "Learn more"
        }
      },
      features: [
        {
          id: "1",
          title: "Free clinic website",
          description: "Get a professional website for your clinic at no cost",
          icon: "check"
        },
        {
          id: "2", 
          title: "Integrated appointment system",
          description: "Seamlessly manage appointments and patient bookings",
          icon: "check"
        },
        {
          id: "3",
          title: "Integrate Google Business with website",
          description: "Boost your online presence and local visibility",
          icon: "check"
        }
      ],
      sectionTitle: "Improving Clinic Reach",
      sectionIcon: "language"
    },
    {
      id: 2,
      mainFeature: {
        title: "Digital Patient Records Management",
        description: "Streamline your practice with comprehensive digital patient record management system",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        doctorName: "Dr. Sarah Johnson",
        doctorTitle: "Family Medicine",
        doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        ctaButtons: {
          primary: "Start managing records",
          secondary: "View demo"
        }
      },
      features: [
        {
          id: "1",
          title: "Secure cloud storage",
          description: "Your patient data is safely stored in encrypted cloud servers",
          icon: "check"
        },
        {
          id: "2", 
          title: "Easy access anywhere",
          description: "Access patient records from any device, anywhere",
          icon: "check"
        },
        {
          id: "3",
          title: "HIPAA compliant",
          description: "Fully compliant with healthcare data protection standards",
          icon: "check"
        }
      ],
      sectionTitle: "Digital Transformation",
      sectionIcon: "storage"
    },
    {
      id: 3,
      mainFeature: {
        title: "Telemedicine & Remote Consultations",
        description: "Connect with your patients through secure video consultations and remote monitoring",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba0ef8d?w=800&h=600&fit=crop",
        doctorName: "Dr. Michael Chen",
        doctorTitle: "Internal Medicine",
        doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        ctaButtons: {
          primary: "Start telemedicine",
          secondary: "Schedule demo"
        }
      },
      features: [
        {
          id: "1",
          title: "HD video consultations",
          description: "Crystal clear video calls with your patients",
          icon: "check"
        },
        {
          id: "2", 
          title: "Remote monitoring",
          description: "Monitor patient vitals and health data remotely",
          icon: "check"
        },
        {
          id: "3",
          title: "Prescription management",
          description: "Send prescriptions directly to pharmacies",
          icon: "check"
        }
      ],
      sectionTitle: "Modern Healthcare",
      sectionIcon: "videocam"
    }
  ],
  navigation: {
    currentSlide: 1,
    totalSlides: 3
  }
};
