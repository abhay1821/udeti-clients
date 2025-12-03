import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sessionStore } from '@/lib/sessionStore';
import { getTokenExpiration } from '@/utils/tokenValidation';

export type AbdmSession = {
  accessToken: string;
  tokenType: string;
};

const ABDM_SESSION_COOKIE = 'abdm_session_id';

export async function POST() {
  try {
    const endPoint =
      process.env.ABDM_ENDPOINT || process.env.NEXT_PUBLIC_ABDM_ENDPOINT;
    const clientId =
      process.env.ABDM_CLIENT_ID || process.env.NEXT_PUBLIC_ABDM_CLIENT_ID;
    const clientSecret =
      process.env.ABDM_CLIENT_SECRET ||
      process.env.NEXT_PUBLIC_ABDM_CLIENT_SECRET;
    const grantType =
      process.env.ABDM_GRANT_TYPE ||
      process.env.NEXT_PUBLIC_ABDM_GRANT_TYPE ||
      'client_credentials';
    const cmId =
      process.env.ABDM_CM_ID || process.env.NEXT_PUBLIC_ABDM_CM_ID || 'sbx';

    if (!endPoint || !clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'ABDM authentication configuration is missing',
        },
        { status: 500 }
      );
    }

    const requestId = uuidv4();
    const timestamp = new Date().toISOString();

    const payload = {
      clientId,
      clientSecret,
      grantType,
    };

    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'REQUEST-ID': requestId,
        TIMESTAMP: timestamp,
        'X-CM-ID': cmId,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          success: false,
          error:
            text || `ABDM authentication failed with status ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data?.accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'ABDM response did not include an accessToken',
        },
        { status: 500 }
      );
    }
    const sessionId = uuidv4();

    const expiresAt = getTokenExpiration(data.accessToken);

    if (!expiresAt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to decode token expiration time',
        },
        { status: 500 }
      );
    }

    sessionStore.set(sessionId, {
      accessToken: data.accessToken,
      tokenType: data.tokenType ?? 'bearer',
      expiresAt,
      createdAt: Date.now(),
    });

    const response_data = NextResponse.json({
      success: true,
      token: data.accessToken,
      tokenType: data.tokenType ?? 'bearer',
      sessionId,
      data,
    });

    response_data.cookies.set({
      name: ABDM_SESSION_COOKIE,
      value: sessionId,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(expiresAt),
    });

    return response_data;
  } catch (error) {
    console.error('Error during ABDM authentication:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to authenticate with ABDM',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.cookies.get(ABDM_SESSION_COOKIE)?.value;

    if (sessionId) {
      sessionStore.delete(sessionId);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(ABDM_SESSION_COOKIE);
    return response;
  } catch (error) {
    console.error('Error during session deletion:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete session',
      },
      { status: 500 }
    );
  }
}
