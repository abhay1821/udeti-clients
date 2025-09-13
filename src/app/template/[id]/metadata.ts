import { Metadata } from 'next';
import clinicsData from '@/data/clinics';

interface Clinic {
  id: string;
  name: string;
  tagline: string;
  description: string;
  services: Array<{ title: string }>;
  contact: {
    phone: string;
    email: string;
  };
}

interface GenerateMetadataProps {
  params: { id: string };
}

export function generateMetadata({ params }: GenerateMetadataProps): Metadata {
  const clinic = clinicsData.find((c: Clinic) => c.id === params.id);
  
  if (!clinic) {
    return {
      title: 'Template Not Found',
      description: 'The requested template does not exist.',
    };
  }

  const servicesList = clinic.services.map((s: { title: string }) => s.title).join(', ');
  
  return {
    title: `${clinic.name} - ${clinic.tagline}`,
    description: `${clinic.description} Services include: ${servicesList}. Contact us at ${clinic.contact.phone} or ${clinic.contact.email}.`,
    keywords: [
      clinic.name,
      clinic.tagline,
      ...clinic.services.map((s: { title: string }) => s.title),
      'healthcare',
      'medical services',
      'clinic',
      'doctor',
      'appointment',
    ].join(', '),
    authors: [{ name: clinic.name }],
    openGraph: {
      title: `${clinic.name} - ${clinic.tagline}`,
      description: clinic.description,
      type: 'website',
      locale: 'en_US',
      siteName: clinic.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${clinic.name} - ${clinic.tagline}`,
      description: clinic.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
