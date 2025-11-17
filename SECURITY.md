# Security Implementation Guide

## Overview

This implementation uses **server-side API routes** to secure ABDM authentication. All sensitive data (client secrets, tokens) is kept on the server and never exposed to the client browser.

## Key Security Features

### 1. **Server-Side Authentication** ✅

- All ABDM authentication happens in Next.js API routes (`/api/abdm/auth`)
- Client secrets are **NEVER** sent to the browser
- Tokens are stored in **httpOnly cookies** (inaccessible via JavaScript)

### 2. **Secure Token Storage** ✅

- Tokens stored in httpOnly cookies (not localStorage)
- Cookies are:
  - `httpOnly`: Cannot be accessed via JavaScript (XSS protection)
  - `secure`: Only sent over HTTPS in production
  - `sameSite: lax`: CSRF protection
  - Automatically expires when session expires

### 3. **API Request Proxying** (Future Use)

- When you need to make ABDM API calls (e.g., patient data, health records), you can create a proxy route
- Tokens will be added server-side, never visible in client Network tab
- Client will never see the actual ABDM API URLs or tokens

### 4. **Environment Variables** ✅

#### Server-Side Only (Secure)

Set these in your `.env.local` file (NOT `NEXT_PUBLIC_*`):

```env
ABDM_ENDPOINT=https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions
ABDM_CLIENT_ID=your-client-id
ABDM_CLIENT_SECRET=your-client-secret
ABDM_GRANT_TYPE=client_credentials
ABDM_CM_ID=sbx
```

These are **ONLY** accessible server-side and **NEVER** exposed to the browser.

#### Client-Side (Optional)

Only use `NEXT_PUBLIC_*` for non-sensitive data:

```env
NEXT_PUBLIC_ABDM_GRANT_TYPE=client_credentials
NEXT_PUBLIC_ABDM_CM_ID=sbx
```

## Migration Guide

### Before (Insecure ❌)

```typescript
// ❌ Client secret exposed in browser bundle
const config = {
  clientId: process.env.NEXT_PUBLIC_ABDM_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_ABDM_CLIENT_SECRET,
};

// ❌ Token stored in localStorage (accessible via JS)
localStorage.setItem('token', token);

// ❌ Direct API calls visible in Network tab
fetch('https://abdm.api/endpoint', {
  headers: { Authorization: `Bearer ${token}` },
});
```

### After (Secure ✅)

```typescript
// ✅ Client secret only in server-side API route
// ✅ Token in httpOnly cookie (inaccessible to JS)
// ✅ Authentication handled securely
const session = await handleAuth();

// When you need to make ABDM API calls, create a proxy route:
// POST /api/abdm/[endpoint]/route.ts
```

## What's Protected?

### ✅ Hidden from Browser:

- Client ID and Client Secret
- Access tokens (stored in httpOnly cookies)
- Authentication payloads

### ✅ Still Visible (but safe):

- API route calls (`/api/abdm/auth`) - This is your own route
- Session metadata (expiresIn, tokenType) - No sensitive data

## Network Tab Behavior

### Before:

- ❌ Could see: `POST https://dev.abdm.gov.in/api/...`
- ❌ Could see: Request body with `clientId` and `clientSecret`
- ❌ Could see: Response with `accessToken`
- ❌ Could see: All subsequent ABDM API calls with tokens in headers

### After:

- ✅ Only sees: `POST /api/abdm/auth` (your own route)
- ✅ Cannot see: ABDM API URLs, tokens, or credentials
- ✅ Cannot access: Tokens from localStorage (they're in httpOnly cookies)

## Testing Security

1. **Check Browser Console:**

   ```javascript
   // This should return undefined (httpOnly cookie)
   document.cookie; // abdm_session won't appear
   ```

2. **Check Network Tab:**
   - You should only see calls to `/api/abdm/*`
   - No direct calls to `dev.abdm.gov.in`
   - No tokens in request headers visible to client

3. **Check Application/Storage:**
   - No `abdmSession` in localStorage
   - `abdm_session` cookie visible but not accessible via JS (httpOnly)

## Additional Security Recommendations

1. **Use HTTPS in Production:**
   - Set `secure: true` in cookie options (already done)
   - Ensure your deployment uses HTTPS

2. **Rate Limiting:**
   - Consider adding rate limiting to `/api/abdm/auth` to prevent abuse

3. **CORS:**
   - Configure CORS properly if making cross-origin requests

4. **Token Refresh:**
   - Tokens automatically expire and refresh is handled by the API route

5. **Logging:**
   - Remove console.log statements in production
   - Use proper logging service for errors

## Files Changed

- ✅ `src/app/api/abdm/auth/route.ts` - Server-side authentication
- ✅ `src/services/abdmAuth.ts` - Client-side service (now calls API routes)
- ✅ `src/hooks/useAbdmAuth.ts` - Updated hook
- ✅ `src/data/apiEndPoints.ts` - Removed client secrets

## Future: Making ABDM API Calls

When you need to make actual ABDM API calls (e.g., patient data, health records), create specific API routes:

```typescript
// Example: src/app/api/abdm/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('abdm_session');
  // ... validate session ...

  const response = await fetch('https://abdm.api/patients', {
    headers: {
      Authorization: `${session.tokenType} ${session.accessToken}`,
    },
  });

  return NextResponse.json(await response.json());
}
```

This keeps all ABDM API calls server-side and secure.
