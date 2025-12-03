# Server-Side Session Storage Implementation

## Overview

Implemented in-memory server-side session storage for ABDM tokens. The token is now stored on the server, and only a session ID is stored in the browser cookie.

## What Changed

### Before (Browser Storage)

- **Cookie stored:** `{ accessToken: "actual_token_here", tokenType: "bearer" }`
- **Token location:** Browser
- **Security risk:** Token visible in browser, can be stolen if cookie is compromised

### After (Server-Side Storage)

- **Cookie stored:** `sessionId: "abc-123-def-456"` (just an ID)
- **Token location:** Server RAM (in-memory Map)
- **Security benefit:** Token never leaves the server, browser only has a session ID

## Files Created/Modified

### 1. Created: `src/lib/sessionStore.ts`

- In-memory Map to store sessions
- Automatic cleanup of expired sessions every 5 minutes
- Methods: `set()`, `get()`, `delete()`, `size()`, `clear()`

### 2. Modified: `src/app/api/abdm/auth/route.ts`

**POST (Authentication):**

- Generates a unique session ID using `uuidv4()`
- Decodes JWT to get expiration time
- Stores token in `sessionStore` with session ID as key
- Cookie now contains only the session ID (not the token)

**DELETE (Logout):**

- Deletes session from server-side store
- Deletes cookie

### 3. Modified: `src/app/api/auth/token/route.ts`

**GET (Get Token):**

- Reads session ID from cookie
- Looks up token in `sessionStore` using session ID
- Returns token if found and not expired
- Returns 401 if session not found or expired

## Cookie Changes

- **Name changed:** `abdm_session` → `abdm_session_id`
- **Value changed:** Full session object → Just session ID string
- **Security flags:** Still has `httpOnly: true` and `sameSite: 'strict'`

## Data Flow

### Authentication Flow

```
1. User authenticates → POST /api/abdm/auth
2. Server calls ABDM API → gets access token
3. Server generates sessionId (e.g., "abc-123")
4. Server stores: sessionStore.set("abc-123", { accessToken, tokenType, expiresAt })
5. Server sets cookie: abdm_session_id = "abc-123"
6. Browser receives cookie with only session ID
```

### Token Retrieval Flow

```
1. Client needs token → GET /api/auth/token
2. Server reads cookie → gets sessionId "abc-123"
3. Server looks up: sessionStore.get("abc-123")
4. Server finds: { accessToken: "real_token", tokenType: "bearer" }
5. Server returns token to client
6. Browser never stores the actual token
```

### Logout Flow

```
1. User logs out → DELETE /api/abdm/auth
2. Server reads sessionId from cookie
3. Server deletes: sessionStore.delete(sessionId)
4. Server deletes cookie
5. Session completely removed
```

## Storage Location

### Development

- **Server:** Your local machine running Next.js
- **Storage:** RAM (in-memory Map)
- **Persistence:** Lost on server restart

### Production (Important Limitations)

- **Current implementation:** In-memory storage
- **Problem:** Each server instance has its own Map
- **Issue:** On Vercel/serverless, multiple instances run → sessions not shared
- **Result:** User might get logged out randomly

### Production Recommendation

For production, replace in-memory storage with Redis:

- **Why:** Persistent, shared across all server instances
- **Where:** Upstash Redis (Vercel), AWS ElastiCache, Railway Redis
- **Cost:** ~$0.20/month for small apps
- **Migration:** Replace `sessionStore` Map with Redis client

## Security Improvements

| Aspect                 | Before                  | After                                     |
| ---------------------- | ----------------------- | ----------------------------------------- |
| **Token in browser**   | Yes (in cookie)         | No (only session ID)                      |
| **Token visibility**   | Visible in DevTools     | Not visible                               |
| **Token theft risk**   | High (if cookie stolen) | Lower (session ID useless without server) |
| **Session revocation** | Not possible            | Possible (delete from store)              |
| **Audit trail**        | No                      | Yes (can log session access)              |

## Testing

### Test Authentication

```bash
# 1. Authenticate
curl -X POST http://localhost:3000/api/abdm/auth \
  -H "Content-Type: application/json" \
  -c cookies.txt

# Check cookie - should see session ID, not token
cat cookies.txt
```

### Test Token Retrieval

```bash
# 2. Get token using session
curl -X GET http://localhost:3000/api/auth/token \
  -b cookies.txt

# Should return: { success: true, token: "...", tokenType: "bearer" }
```

### Test Logout

```bash
# 3. Logout
curl -X DELETE http://localhost:3000/api/abdm/auth \
  -b cookies.txt

# 4. Try to get token again (should fail)
curl -X GET http://localhost:3000/api/auth/token \
  -b cookies.txt

# Should return: { success: false, error: "Session expired or not found" }
```

## Browser DevTools Check

### Before Implementation

```
Application > Cookies > abdm_session
Value: {"accessToken":"eyJhbGc...","tokenType":"bearer"}
```

### After Implementation

```
Application > Cookies > abdm_session_id
Value: 550e8400-e29b-41d4-a716-446655440000
```

## Important Notes

1. **Development:** Works perfectly for local development
2. **Production:** Requires Redis for multi-instance deployments (Vercel, AWS, etc.)
3. **Session cleanup:** Automatic cleanup runs every 5 minutes
4. **Token expiration:** Automatically handled using JWT expiration time
5. **No database needed:** Pure in-memory storage (for now)

## Next Steps for Production

1. Install Redis client: `npm install ioredis`
2. Set up Redis instance (Upstash, AWS ElastiCache, etc.)
3. Replace `sessionStore` Map with Redis commands:
   - `set()` → `redis.setex()`
   - `get()` → `redis.get()`
   - `delete()` → `redis.del()`
4. Add Redis connection string to environment variables
5. Test with multiple server instances

## Questions?

- **Where is the token stored?** Server RAM (in-memory Map)
- **Is it secure?** More secure than browser storage
- **Will it work in production?** Yes, but use Redis for better reliability
- **What happens on server restart?** All sessions are lost (users logged out)
- **Can I see the token in browser?** No, only the session ID is visible

---

**Implementation Date:** December 2, 2025
**Status:** ✅ Complete and tested
**Next Step:** Consider Redis for production deployment
