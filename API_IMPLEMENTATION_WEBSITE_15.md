# API Implementation for Website 15

## Overview

This document explains the API implementation for `doc-website-15`. Only website 15 uses the API endpoint; all other websites (6-14) continue to use dummy data.

## Implementation Details

### 1. API Route Created

**File:** `src/app/api/clinics/[id]/route.ts`

- Created a Next.js API route that handles GET requests for clinic data
- Currently only supports `doc-website-15`
- Returns the same data structure as the dummy data
- Other clinic IDs return 404

**Endpoint:** `/api/clinics/doc-website-15`

**Response Format:**

```json
{
  "success": true,
  "data": {
    "id": "doc-website-15",
    "name": "Dr. Rajesh Kumar"
    // ... rest of clinic data
  }
}
```

### 2. API Service Updated

**File:** `src/services/clinicApi.ts`

**Changes:**

- `fetchClinicFromApi()` now checks if `clinicId === 'doc-website-15'`
- If not doc-website-15, returns `null` immediately (will use dummy data)
- Uses local API endpoint: `/api/clinics/${clinicId}`
- Handles both client-side and server-side fetching

**Key Logic:**

```typescript
// Only doc-website-15 uses API for now
if (clinicId !== 'doc-website-15') {
  return null; // Will use dummy data
}
```

### 3. Context Updated

**File:** `src/contexts/ClinicContext.tsx`

**Changes:**

- `isApiModeEnabled()` now accepts optional `clinicId` parameter
- Only returns `true` for `doc-website-15`
- `getValidatedClinic()` checks API availability per-clinic
- Other clinics automatically use dummy data

**Key Logic:**

```typescript
// Check if API is enabled for this specific clinic
if (isApiModeEnabled(id)) {
  // Only doc-website-15 will enter here
  clinic = await fetchClinicById(id);
}
```

## Flow for Different Websites

### Website 15 (doc-website-15)

1. Template calls `useClinicData('doc-website-15')`
2. `getValidatedClinic()` checks `isApiModeEnabled('doc-website-15')` → returns `true`
3. Calls `fetchClinicById('doc-website-15')`
4. `fetchClinicFromApi()` makes request to `/api/clinics/doc-website-15`
5. API route returns clinic data
6. Data is validated and returned
7. Template renders with API data

### Other Websites (6-14)

1. Template calls `useClinicData('doc-website-14')` (or any other)
2. `getValidatedClinic()` checks `isApiModeEnabled('doc-website-14')` → returns `false`
3. Skips API call
4. Uses `dummyClinics.find()` to get dummy data
5. Template renders with dummy data

## Testing

### Test Website 15 (API)

1. Navigate to `/template/doc-website-15`
2. Check browser console for API call: `GET /api/clinics/doc-website-15`
3. Verify data comes from API (check Network tab)
4. Verify all sections render correctly

### Test Other Websites (Dummy Data)

1. Navigate to `/template/doc-website-14` (or any other)
2. Check browser console - no API call should be made
3. Verify data comes from dummy data
4. Verify all sections render correctly

## API Endpoint Details

### Request

```
GET /api/clinics/doc-website-15
```

### Response (Success)

```json
{
  "success": true,
  "data": {
    "id": "doc-website-15",
    "name": "Dr. Rajesh Kumar",
    "tagline": "Expert Medical Specialist",
    "description": "...",
    "logo": "...",
    "hero": { ... },
    "services": [ ... ],
    "testimonials": [ ... ],
    "contact": { ... },
    "galleryImages": [ ... ],
    "social": { ... },
    "about": { ... }
  }
}
```

### Response (404 - Other Clinic IDs)

```json
{
  "success": false,
  "error": "Clinic doc-website-14 not found. Only doc-website-15 is available via API."
}
```

## Adding More Websites to API

To add more websites to use API in the future:

1. **Update API Route** (`src/app/api/clinics/[id]/route.ts`):

   ```typescript
   if (clinicId === 'doc-website-15' || clinicId === 'doc-website-16') {
     // Return data for both
   }
   ```

2. **Update API Service** (`src/services/clinicApi.ts`):

   ```typescript
   if (clinicId !== 'doc-website-15' && clinicId !== 'doc-website-16') {
     return null;
   }
   ```

3. **Update Context** (`src/contexts/ClinicContext.tsx`):
   ```typescript
   export const isApiModeEnabled = (clinicId?: string): boolean => {
     if (clinicId) {
       return clinicId === 'doc-website-15' || clinicId === 'doc-website-16';
     }
     return true;
   };
   ```

## Notes

- The API uses the same data structure as dummy data
- All validation rules apply to API data
- If API returns invalid data (missing required fields), error is shown (no dummy fallback)
- If API fails or returns null, falls back to dummy data
- Only doc-website-15 is configured to use API currently
