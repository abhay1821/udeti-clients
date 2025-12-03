import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/sessionStore';

const ABDM_SESSION_COOKIE = 'abdm_session_id';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(ABDM_SESSION_COOKIE)?.value;

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          token: null,
          error: 'No session found',
        },
        { status: 401 }
      );
    }

    const session = sessionStore.get(sessionId);

    if (!session) {
      console.log('session not found', sessionId, '---------');
      return NextResponse.json(
        {
          success: false,
          token: null,
          expired: true,
          error: 'Session expired or not found',
        },
        { status: 401 }
      );
    }
    console.log('session', session, '---------');
    return NextResponse.json({
      success: true,
      token: session.accessToken,
      tokenType: session.tokenType,
    });
  } catch (error) {
    console.error('Error getting token:', error);
    return NextResponse.json(
      {
        success: false,
        token: null,
        error: error instanceof Error ? error.message : 'Failed to get token',
      },
      { status: 500 }
    );
  }
}
