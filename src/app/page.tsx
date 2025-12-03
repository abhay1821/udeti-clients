'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useClinic } from '@/contexts/ClinicContext';

import DocWebsite6TemplatePage from './template/doc-website-6/page';
import DocWebsite7TemplatePage from './template/doc-website-7/page';
import DocWebsite8TemplatePage from './template/doc-website-8/page';
import DocWebsite9TemplatePage from './template/doc-website-9/page';
import DocWebsite10TemplatePage from './template/doc-website-10/page';
import DocWebsite11TemplatePage from './template/doc-website-11/page';
import DocWebsite12TemplatePage from './template/doc-website-12/page';
import DocWebsite13TemplatePage from './template/doc-website-13/page';
import DocWebsite14TemplatePage from './template/doc-website-14/page';
import DocWebsite15TemplatePage from './template/doc-website-15/page';
import NotFound from './not-found';

export default function HomePage() {
  const {
    clinicData,
    theme,
    isLoading: contextLoading,
    apiDataFetched,
    apiDataInvalid,
    clinicValidation,
  } = useClinic();

  if (contextLoading || !apiDataFetched) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (apiDataInvalid && clinicValidation) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F4F6',
          p: 4,
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Invalid Clinic Data
        </Typography>
        <Typography
          variant="body1"
          color="error"
          sx={{ mt: 2, textAlign: 'center', maxWidth: 600 }}
        >
          {clinicValidation.errors && clinicValidation.errors.length > 0
            ? clinicValidation.errors.join(', ')
            : 'The clinic data received from the API is invalid. Please check the data structure and required fields.'}
        </Typography>
      </Box>
    );
  }

  if (clinicData && theme) {
    const templateMap: Record<string, React.ComponentType> = {
      'doc-website-6': DocWebsite6TemplatePage,
      'doc-website-7': DocWebsite7TemplatePage,
      'doc-website-8': DocWebsite8TemplatePage,
      'doc-website-9': DocWebsite9TemplatePage,
      'doc-website-10': DocWebsite10TemplatePage,
      'doc-website-11': DocWebsite11TemplatePage,
      'doc-website-12': DocWebsite12TemplatePage,
      'doc-website-13': DocWebsite13TemplatePage,
      'doc-website-14': DocWebsite14TemplatePage,
      'doc-website-15': DocWebsite15TemplatePage,
    };

    const TemplateComponent = templateMap[theme];

    if (TemplateComponent) {
      return <TemplateComponent />;
    }
  }

  return <NotFound />;
}
