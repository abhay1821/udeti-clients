import { NextRequest, NextResponse } from 'next/server';
import { ClinicApiResponse } from '@/services/clinicApi';
import { apiDocWebsite15Data } from '@/data/clinics/api-doc-website-15';
import { Clinic } from '@/types/Clinic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clinicId = params.id;

    if (clinicId === 'doc-website-15') {
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
