import { NextRequest, NextResponse } from 'next/server';
import { apiDocWebsite15Data } from '@/data/clinics/api-doc-website-15';
import { apiDocWebsite1Data } from '@/data/clinics/api-doc-website-1';
import { apiDocWebsite2Data } from '@/data/clinics/api-doc-website-2';
import { apiDocWebsite3Data } from '@/data/clinics/api-doc-website-3';
import { Clinic } from '@/types/Clinic';

interface ClinicApiResponse {
  success: boolean;
  data?: Clinic;
  error?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clinicId = id;

    if (clinicId === 'localhost:3000') {
      const response: ClinicApiResponse = {
        success: true,
        data: apiDocWebsite1Data as Clinic,
      };

      return NextResponse.json(response, { status: 200 });
    } else if (clinicId === 'localhost:3001') {
      const response: ClinicApiResponse = {
        success: true,
        data: apiDocWebsite2Data as Clinic,
      };

      return NextResponse.json(response, { status: 200 });
    } else if (clinicId === '9043890431') {
      const response: ClinicApiResponse = {
        success: true,
        data: apiDocWebsite3Data as Clinic,
      };

      return NextResponse.json(response, { status: 200 });
    } else if (clinicId === 'doc-website-15') {
      const response: ClinicApiResponse = {
        success: true,
        data: apiDocWebsite15Data as Clinic,
      };

      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(
      {
        success: false,
        error: `Clinic ${clinicId} not found in API.`,
      } as ClinicApiResponse,
      { status: 404 }
    );
  } catch (error) {
    console.error('Error in clinics API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      } as ClinicApiResponse,
      { status: 500 }
    );
  }
}
