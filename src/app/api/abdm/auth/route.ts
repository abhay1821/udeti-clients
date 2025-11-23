import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export type AbdmSession = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  createdAt: number;
};

const ABDM_SESSION_COOKIE = 'abdm_session';

export async function POST(request: NextRequest) {
  try {
    const existingSessionCookie = request.cookies.get(ABDM_SESSION_COOKIE);

    if (existingSessionCookie?.value) {
      try {
        const session: AbdmSession = JSON.parse(existingSessionCookie.value);
        const now = Date.now();
        const expiresAt = session.createdAt + session.expiresIn * 1000;

        if (expiresAt - now > 60000) {
          return NextResponse.json({
            success: true,
            session,
            fromCache: true,
          });
        }
      } catch {
        // Ignore parsing errors
      }
    }

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

    const session: AbdmSession = {
      accessToken: data.accessToken,
      expiresIn: data.expiresIn ?? 1200,
      tokenType: data.tokenType ?? 'bearer',
      createdAt: Date.now(),
    };

    const expiresAt = new Date(session.createdAt + session.expiresIn * 1000);

    const response_data = NextResponse.json({
      success: true,
      session: {
        expiresIn: session.expiresIn,
        tokenType: session.tokenType,
        createdAt: session.createdAt,
      },
      fromCache: false,
    });

    response_data.cookies.set({
      name: ABDM_SESSION_COOKIE,
      value: JSON.stringify(session),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
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

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(ABDM_SESSION_COOKIE);

    if (!sessionCookie?.value) {
      return NextResponse.json({
        success: false,
        session: null,
      });
    }

    try {
      const session: AbdmSession = JSON.parse(sessionCookie.value);

      const now = Date.now();
      const expiresAt = session.createdAt + session.expiresIn * 1000;

      if (expiresAt - now > 60000) {
        return NextResponse.json({
          success: true,
          session: {
            expiresIn: session.expiresIn,
            tokenType: session.tokenType,
            createdAt: session.createdAt,
          },
        });
      }

      return NextResponse.json({
        success: false,
        session: null,
      });
    } catch {
      return NextResponse.json({
        success: false,
        session: null,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get session',
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ABDM_SESSION_COOKIE);
  return response;
}
