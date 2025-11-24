'use client';
import { useClinic } from '@/contexts/ClinicContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { theme, isLoading } = useClinic();
  const router = useRouter();

  useEffect(() => {
    console.log(theme);
    if (theme) {
      router.push(`/template/${theme}`);
    }
  }, [theme]);

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
      {isLoading && (
        <>
          <CircularProgress size={40} />
          <Typography variant="body1" color="text.secondary">
            Redirecting to Udeti...
          </Typography>
        </>
      )}
    </Box>
  );
}
