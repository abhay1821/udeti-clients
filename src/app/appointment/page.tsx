'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import AppointmentSection from '@/components/sections/AppointmentSection';

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const clinicId = searchParams?.get('clinic') || undefined;

  return (
    <Layout>
      <AppointmentSection clinicId={clinicId} />
    </Layout>
  );
}
