# 📚 Complete Project Explanation - Udeti Clients

## 🏗️ Project Root & Structure

### **Root Entry Point: `src/app/layout.tsx`**

This is the **ROOT** of your Next.js application. Every page in your app is wrapped by this layout.

```tsx
// src/app/layout.tsx
<ThemeProvider>
  {' '}
  // Provides Material-UI theme
  <ClinicProvider>
    {' '}
    // Provides clinic data context (YOUR MAIN CONTEXT)
    {children} // All your pages go here
  </ClinicProvider>
</ThemeProvider>
```

**Flow:**

1. **`layout.tsx`** → Wraps entire app, provides context
2. **`page.tsx`** → Root page (`/`) - redirects based on hostname
3. **`template/[id]/page.tsx`** → Dynamic template routes
4. **`template/doc-website-14/page.tsx`** → Specific template pages

---

## 🗂️ Project Structure

```
src/
├── app/                          # Next.js App Router (file-based routing)
│   ├── layout.tsx                # ROOT LAYOUT - wraps entire app
│   ├── page.tsx                  # ROOT PAGE (/) - redirects to template
│   ├── api/                      # API routes
│   │   └── clinics/[id]/route.ts # API endpoint for clinic data
│   └── template/                 # Template pages
│       ├── doc-website-14/
│       │   └── page.tsx          # Template 14 page
│       └── [id]/
│           └── page.tsx         # Dynamic template route
│
├── contexts/
│   └── ClinicContext.tsx         # MAIN CONTEXT - clinic data management
│
├── hooks/
│   ├── useClinicData.ts          # Hook for fetching dummy data
│   └── useClinicDataFromContext.ts # Hook that combines API + dummy data
│
├── data/
│   └── clinics/                  # Dummy/mock clinic data
│       ├── doc-website-14.ts     # Template 14 dummy data
│       └── api-doc-website-1.ts  # API mock data
│
└── components/                   # Reusable UI components
    ├── headers/                  # Header components
    ├── services/                 # Service section components
    └── sections/                 # Other section components
```

---

## 🔄 How Next.js Routing Works

### **1. Root Route (`/`)**

- **File:** `src/app/page.tsx`
- **Purpose:** Entry point when user visits root domain
- **Behavior:**
  - Checks `context.theme` (from API fetch based on hostname)
  - Redirects to `/template/{theme}` if theme exists
  - Shows loading spinner while fetching

### **2. Template Routes**

- **Static:** `/template/doc-website-14` → `src/app/template/doc-website-14/page.tsx`
- **Dynamic:** `/template/[id]` → `src/app/template/[id]/page.tsx`

Each template page:

1. Uses `useClinicDataFromContext(templateName)` hook
2. Gets clinic data (API or dummy)
3. Renders components conditionally based on data

---

## 🎯 ClinicContext - Complete Explanation

### **What is ClinicContext?**

`ClinicContext` is a **React Context** that manages clinic data globally across your entire application. It's the **single source of truth** for clinic information.

### **Where is it Provided?**

```tsx
// src/app/layout.tsx
<ClinicProvider>
  {' '}
  {/* This wraps your entire app */}
  {children}
</ClinicProvider>
```

**This means:** Every page and component in your app can access clinic data through this context.

---

## 📊 Context Fields - Detailed Explanation

### **1. `getClinicById(id: string): Clinic | undefined`**

**Purpose:** Get dummy clinic data by ID

**How it works:**

```tsx
const clinic = getClinicById('doc-website-14');
// Returns: Clinic object from dummy data, or undefined if not found
```

**Used by:**

- Components that need dummy data directly
- `getValidatedClinic` internally
- Older template pages (doc-website-1, doc-website-2, etc.)

**Example:**

```tsx
// In a component
const { getClinicById } = useClinic();
const clinic = getClinicById('doc-website-14');
```

---

### **2. `getValidatedClinic(id: string): Promise<ValidatedClinic>`**

**Purpose:** Get dummy clinic data WITH validation

**Returns:**

```tsx
{
  clinic: Clinic | null,        // The clinic data
  validation: ValidationResult, // { isValid: boolean, errors: string[] }
  source: 'dummy'                // Always 'dummy' (API handled separately)
}
```

**How it works:**

1. Calls `getClinicById(id)` to get dummy data
2. Validates the data using `validateMandatoryFields()`
3. Returns clinic + validation result

**Used by:**

- `useClinicData` hook (for templates 6-15)
- Ensures data is valid before rendering

**Example:**

```tsx
const validated = await getValidatedClinic('doc-website-14');
if (validated.validation.isValid) {
  // Use validated.clinic
} else {
  // Show errors: validated.validation.errors
}
```

---

### **3. `isLoading: boolean`**

**Purpose:** Indicates if the initial API fetch is in progress

**When is it `true`?**

- During the initial `useEffect` in `ClinicContext` (lines 49-129)
- While fetching clinic data from API based on `window.location.host`

**When is it `false`?**

- After API fetch completes (success or failure)
- If no hostname is found

**Used by:**

- `page.tsx` - Shows loading spinner while redirecting
- Components that need to know if initial load is complete

**Example:**

```tsx
const { isLoading } = useClinic();
if (isLoading) {
  return <CircularProgress />;
}
```

---

### **4. `theme: string | null`**

**Purpose:** Template name from API data (for redirect)

**How it's set:**

1. API returns clinic data with `theme` field (e.g., `"doc-website-13"`)
2. Context stores it: `setTheme(clinicTheme)`
3. Also stored in `sessionStorage` as backup

**Used by:**

- `page.tsx` - Redirects to `/template/{theme}` when user visits root
- `useClinicDataFromContext` - Checks if API theme matches current template

**Example:**

```tsx
// If API returns theme: "doc-website-13"
// page.tsx redirects to: /template/doc-website-13
```

**Flow:**

```
User visits: localhost:3001
  ↓
API fetch: /api/clinics/localhost:3001
  ↓
API returns: { theme: "doc-website-13", ... }
  ↓
setTheme("doc-website-13")
  ↓
page.tsx redirects to: /template/doc-website-13
```

---

### **5. `clinicData: Clinic | null`**

**Purpose:** Stores clinic data fetched from API (based on hostname)

**When is it set?**

- When API returns valid clinic data for the hostname
- Only set if validation passes

**When is it `null`?**

- Initial state (before API fetch)
- API returns 404 (clinic not found)
- API data fails validation
- No hostname found

**Used by:**

- `useClinicDataFromContext` - Checks if API data exists and is valid
- Components that need API data directly

**Example:**

```tsx
const { clinicData } = useClinic();
// clinicData contains the clinic object from API, or null
```

**Important:** This is **ONLY** for API data. For dummy data, use `getClinicById()`.

---

### **6. `clinicValidation: ValidationResult | null`**

**Purpose:** Validation result for API clinic data

**Structure:**

```tsx
{
  isValid: boolean,    // true if all mandatory fields present
  errors: string[]     // Array of error messages if invalid
}
```

**When is it set?**

- After API returns clinic data
- Validated using `validateMandatoryFields(clinic)`

**When is it `null`?**

- Before API fetch completes
- If API returns 404 (no data to validate)

**Used by:**

- `useClinicDataFromContext` - Checks if API data is valid
- Error handling - Shows error screen if invalid

**Example:**

```tsx
const { clinicValidation } = useClinic();
if (clinicValidation && !clinicValidation.isValid) {
  // Show error: clinicValidation.errors
}
```

---

### **7. `apiDataFetched: boolean`**

**Purpose:** Tracks if the initial API fetch has completed (regardless of success/failure)

**When is it `true`?**

- After API fetch completes (success, 404, or error)
- Immediately set in all code paths of the `useEffect`

**When is it `false`?**

- Initial state (before any API call)
- During the API fetch

**Used by:**

- `useClinicDataFromContext` - Knows when to fetch dummy data
- Prevents flicker - waits for API before showing dummy data

**Example:**

```tsx
// In useClinicDataFromContext
const shouldFetchDummy = !hasValidApiData && !shouldShowError && apiDataFetched;
// Only fetch dummy data AFTER API fetch is complete
```

**Why it's important:**

- Prevents showing dummy data while API is still loading
- Ensures proper fallback behavior

---

### **8. `apiDataInvalid: boolean`**

**Purpose:** Indicates if API data failed validation

**When is it `true`?**

- API returned data, but validation failed (missing mandatory fields)
- `clinicData` is set to `null` when this is `true`

**When is it `false`?**

- Initial state
- API data is valid
- API returned 404 (no data to validate)
- API fetch failed

**Used by:**

- `useClinicDataFromContext` - Decides whether to show error or use dummy data
- Error handling - Shows error screen instead of falling back to dummy

**Example:**

```tsx
// In useClinicDataFromContext
const shouldShowError = apiDataFetched && apiDataInvalid;
if (shouldShowError) {
  // Show error screen, DON'T use dummy data
  return { clinic: null, validation: clinicValidation, ... };
}
```

**Critical Rule:** If `apiDataInvalid === true`, the app should **NOT** fall back to dummy data. It should show an error screen.

---

## 🔄 Complete Data Flow

### **Scenario 1: User visits with hostname that has API data**

```
1. User visits: localhost:3001
   ↓
2. layout.tsx renders → ClinicProvider initializes
   ↓
3. ClinicContext useEffect runs:
   - Gets hostname: "localhost:3001"
   - Fetches: /api/clinics/localhost:3001
   - API returns: { theme: "doc-website-13", name: "...", ... }
   ↓
4. Context state updates:
   - setTheme("doc-website-13")
   - setClinicData(apiData)
   - setClinicValidation({ isValid: true, errors: [] })
   - setApiDataFetched(true)
   - setApiDataInvalid(false)
   ↓
5. page.tsx sees context.theme === "doc-website-13"
   ↓
6. Redirects to: /template/doc-website-13
   ↓
7. doc-website-13/page.tsx renders:
   - Calls: useClinicDataFromContext('doc-website-13')
   - Checks: apiThemeMatchesTemplate? YES
   - Returns: clinicData (from API)
   ↓
8. Page renders with API data
```

---

### **Scenario 2: User visits template directly (no API data)**

```
1. User visits: /template/doc-website-14
   ↓
2. layout.tsx renders → ClinicProvider initializes
   ↓
3. ClinicContext useEffect runs:
   - Gets hostname: "localhost:3000"
   - Fetches: /api/clinics/localhost:3000
   - API returns: 404 (no data)
   ↓
4. Context state updates:
   - setApiDataFetched(true)
   - setApiDataInvalid(false)
   - clinicData stays null
   ↓
5. doc-website-14/page.tsx renders:
   - Calls: useClinicDataFromContext('doc-website-14')
   - Checks: apiThemeMatchesTemplate? NO (no API data)
   - Checks: shouldFetchDummy? YES (apiDataFetched && !hasValidApiData)
   - Calls: useClinicData('doc-website-14')
   - useClinicData calls: getValidatedClinic('doc-website-14')
   - getValidatedClinic calls: getClinicById('doc-website-14')
   - Returns: dummy clinic data
   ↓
6. Page renders with dummy data
```

---

### **Scenario 3: API data is invalid**

```
1. User visits: localhost:3001
   ↓
2. API returns: { theme: "doc-website-13", ... } (but missing "name" field)
   ↓
3. Validation fails:
   - validateMandatoryFields() returns: { isValid: false, errors: ["name is required"] }
   ↓
4. Context state updates:
   - setClinicData(null)  // Don't store invalid data
   - setClinicValidation({ isValid: false, errors: [...] })
   - setApiDataFetched(true)
   - setApiDataInvalid(true)  // CRITICAL FLAG
   ↓
5. doc-website-13/page.tsx renders:
   - Calls: useClinicDataFromContext('doc-website-13')
   - Checks: shouldShowError? YES (apiDataFetched && apiDataInvalid)
   - Returns: { clinic: null, validation: clinicValidation, ... }
   ↓
6. Page shows error screen (NOT dummy data)
```

---

## 🎨 How Components Use Context

### **Example: doc-website-14/page.tsx**

```tsx
const DocWebsite14TemplatePage = () => {
  // 1. Get clinic data (API or dummy)
  const { clinic, validation, isLoading } =
    useClinicDataFromContext('doc-website-14');

  // 2. Show loading
  if (isLoading) return <CircularProgress />;

  // 3. Show error if invalid
  if (!validation.isValid) return <ErrorScreen />;

  // 4. Render components conditionally
  const components = [
    hasLogo(clinic) ? <HeaderWithLogo /> : <HeaderWithoutLogo />,
    <HeroSection />,
    hasServices(clinic) && <ServicesSection />,
    // ...
  ];

  return <Box>{components}</Box>;
};
```

---

## 🔑 Key Concepts

### **1. Two Data Sources**

- **API Data:** Fetched based on `window.location.host`, stored in `clinicData`
- **Dummy Data:** Static files in `src/data/clinics/`, accessed via `getClinicById()`

### **2. Priority System**

1. **API data** (if available and valid) → Use it
2. **Dummy data** (if API unavailable or doesn't match) → Use it
3. **Error** (if API data invalid) → Show error, DON'T use dummy

### **3. Theme Matching**

- API data has a `theme` field (e.g., `"doc-website-13"`)
- Only use API data if `theme` matches the current template route
- This prevents API data from one template showing in another

### **4. Validation**

- **Mandatory fields:** `id`, `name`, `hero`, `contact` (must exist)
- **Optional fields:** `services`, `testimonials`, `galleryImages` (can be empty/undefined)
- If mandatory fields missing → Show error
- If optional fields missing → Hide those sections (don't show error)

---

## 📝 Summary

**Root:** `src/app/layout.tsx` wraps everything with `ClinicProvider`

**Context Purpose:**

- Manages API data (fetched on mount based on hostname)
- Provides access to dummy data
- Handles validation and error states

**Data Flow:**

1. App loads → Context fetches API data based on hostname
2. Template page loads → Uses `useClinicDataFromContext` hook
3. Hook decides: API data (if valid & matches) OR dummy data
4. Page renders with appropriate data

**Context Fields:**

- `getClinicById` - Get dummy data
- `getValidatedClinic` - Get dummy data with validation
- `isLoading` - API fetch in progress
- `theme` - Template name from API (for redirect)
- `clinicData` - API clinic data
- `clinicValidation` - API data validation result
- `apiDataFetched` - API fetch completed flag
- `apiDataInvalid` - API data validation failed flag

This architecture allows:

- ✅ Multi-tenant support (different hostnames → different clinics)
- ✅ Fallback to dummy data when API unavailable
- ✅ Proper error handling for invalid API data
- ✅ Template-specific data isolation
