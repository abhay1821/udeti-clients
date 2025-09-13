import { NextResponse } from 'next/server';
import { env } from '@/config/env';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API is healthy',
    data: {
      appName: env.appName,
      version: env.appVersion,
      timestamp: new Date().toISOString(),
    },
  });
}
