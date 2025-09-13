'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  clinicId?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, clinicId }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header clinicId={clinicId} />
      <Box component="main" sx={{ flexGrow: 1, pt: '70px' }}>
        {children}
      </Box>
      <Footer clinicId={clinicId} />
    </Box>
  );
};

export default Layout;
