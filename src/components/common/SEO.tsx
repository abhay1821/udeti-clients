'use client';

import Head from 'next/head';
import { Clinic } from '@/lib/theme';

interface SEOProps {
  clinic?: Clinic | null;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  clinic,
  title,
  description,
  keywords,
  image,
  url,
}) => {
  const siteTitle = title || clinic?.name || 'Healthcare Clinic';
  const siteDescription = description || `Professional healthcare services at ${clinic?.name || 'our clinic'}`;
  const siteKeywords = keywords || `${clinic?.name}, healthcare, medical, clinic, doctor`;
  const siteImage = image || '/api/placeholder/1200/630';
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={clinic?.name || 'Healthcare Clinic'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content={clinic?.name || 'Healthcare Clinic'} />
      <meta name="theme-color" content={clinic?.primaryColor || '#1976d2'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
};

export default SEO;
