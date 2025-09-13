'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import AppointmentSection from '@/components/sections/AppointmentSection';

function AppointmentContent() {
  const searchParams = useSearchParams();
  const clinicId = searchParams?.get('clinic') || undefined;

  return (
    <Layout>
      <AppointmentSection clinicId={clinicId} />
    </Layout>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentContent />
    </Suspense>
  );
}
