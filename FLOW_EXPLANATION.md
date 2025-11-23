# Function Flow Explanation - All 4 Cases

This document explains the exact flow of function calls for each case in the decision matrix.

---

## Entry Point: Template Page

**File:** `src/app/template/doc-website-14/page.tsx` (or any template)

```typescript
const { clinic, validation, isLoading } = useClinicData(clinicId);
```

---

## Step 1: useClinicData Hook

**File:** `src/hooks/useClinicData.ts`

### Flow:

1. `useClinicData(clinicId)` is called
2. Gets `getValidatedClinic` from `useClinic()` context
3. Calls `getValidatedClinic(clinicId)` inside `useEffect`
4. Waits for result and stores it in state
5. Returns `{ clinic, validation, isLoading, source }`

---

## Step 2: getValidatedClinic Function

**File:** `src/contexts/ClinicContext.tsx` (lines 93-139)

This is where the **decision matrix** is implemented. Let's trace each case:

---

# CASE 1: API Present? No → Use Dummy Data

## Scenario:

- `NEXT_PUBLIC_API_BASE_URL` is **NOT set** (empty string)
- OR API is not configured

## Function Call Flow:

```
1. Template calls: useClinicData('doc-website-14')
   ↓
2. useClinicData calls: getValidatedClinic('doc-website-14')
   ↓
3. getValidatedClinic checks: isApiModeEnabled()
   ↓
4. isApiModeEnabled() returns: false (API_BASE_URL is empty)
   ↓
5. getValidatedClinic skips API block (line 98: if (isApiAvailable) → false)
   ↓
6. getValidatedClinic goes to line 130: "Decision: API present? No → Use dummy data"
   ↓
7. Calls: dummyClinics.find((c) => c.id === id)
   ↓
8. Calls: validateMandatoryFields(clinic) (line 132)
   ↓
9. Returns: {
     clinic: <dummy clinic data>,
     validation: { isValid: true, errors: [] },
     source: 'dummy'
   }
   ↓
10. useClinicData receives result and sets state
   ↓
11. Template renders with dummy data
```

## Functions Called:

- ✅ `useClinicData()` - Entry point
- ✅ `getValidatedClinic()` - Main validation function
- ✅ `isApiModeEnabled()` - Checks if API_BASE_URL exists
- ✅ `dummyClinics.find()` - Finds clinic in dummy data
- ✅ `validateMandatoryFields()` - Validates dummy data
- ❌ `fetchClinicById()` - **NOT called** (API not available)
- ❌ `fetchClinicFromApi()` - **NOT called** (API not available)

---

# CASE 2: API Present? Yes, Valid? Yes → Use API Data

## Scenario:

- `NEXT_PUBLIC_API_BASE_URL` is **set**
- API returns valid clinic data with all required fields

## Function Call Flow:

```
1. Template calls: useClinicData('doc-website-14')
   ↓
2. useClinicData calls: getValidatedClinic('doc-website-14')
   ↓
3. getValidatedClinic checks: isApiModeEnabled()
   ↓
4. isApiModeEnabled() returns: true (API_BASE_URL is set)
   ↓
5. getValidatedClinic enters API block (line 98: if (isApiAvailable) → true)
   ↓
6. Calls: fetchClinicById(id) (line 100)
   ↓
7. fetchClinicById checks: isApiAvailable (line 54) → true
   ↓
8. Checks: loadingClinics.has(id) (line 59) → false (not loading)
   ↓
9. Sets loading state: setLoadingClinics, setIsLoading(true)
   ↓
10. Calls: fetchClinicFromApi(id) (line 67)
    ↓
11. fetchClinicFromApi checks: API_BASE_URL exists (line 34) → true
    ↓
12. Makes HTTP request: fetch(`${API_BASE_URL}/clinics/${id}`)
    ↓
13. API returns: { success: true, data: <clinic object> }
    ↓
14. fetchClinicFromApi returns: <clinic object> (line 60)
    ↓
15. fetchClinicById returns: <clinic object> (line 68)
    ↓
16. getValidatedClinic receives clinic (line 100)
    ↓
17. Checks: if (clinic) → true (line 103)
    ↓
18. Sets: source = 'api' (line 104)
    ↓
19. Calls: validateMandatoryFields(clinic) (line 105)
    ↓
20. validateMandatoryFields checks all required fields:
    - clinic.id ✅
    - clinic.name ✅
    - clinic.hero.title ✅
    - clinic.hero.subtitle ✅
    - clinic.contact.phone ✅
    - clinic.contact.email ✅
    - clinic.contact.address ✅
    ↓
21. Returns: { isValid: true, errors: [] }
    ↓
22. getValidatedClinic checks: if (validation.isValid) → true (line 108)
    ↓
23. Returns: {
      clinic: <API clinic data>,
      validation: { isValid: true, errors: [] },
      source: 'api'
    }
    ↓
24. useClinicData receives result and sets state
    ↓
25. Template renders with API data
```

## Functions Called:

- ✅ `useClinicData()` - Entry point
- ✅ `getValidatedClinic()` - Main validation function
- ✅ `isApiModeEnabled()` - Checks if API_BASE_URL exists
- ✅ `fetchClinicById()` - Fetches from API
- ✅ `fetchClinicFromApi()` - Makes HTTP request
- ✅ `validateMandatoryFields()` - Validates API data
- ❌ `dummyClinics.find()` - **NOT called** (API data is valid)

---

# CASE 3: API Present? Yes, Valid? No → Show Error (No Dummy Fallback)

## Scenario:

- `NEXT_PUBLIC_API_BASE_URL` is **set**
- API returns clinic data but **missing required fields** (e.g., no `name`, no `contact.phone`)

## Function Call Flow:

```
1. Template calls: useClinicData('doc-website-14')
   ↓
2. useClinicData calls: getValidatedClinic('doc-website-14')
   ↓
3. getValidatedClinic checks: isApiModeEnabled()
   ↓
4. isApiModeEnabled() returns: true (API_BASE_URL is set)
   ↓
5. getValidatedClinic enters API block (line 98: if (isApiAvailable) → true)
   ↓
6. Calls: fetchClinicById(id) (line 100)
   ↓
7. fetchClinicById checks: isApiAvailable (line 54) → true
   ↓
8. Checks: loadingClinics.has(id) (line 59) → false
   ↓
9. Sets loading state: setLoadingClinics, setIsLoading(true)
   ↓
10. Calls: fetchClinicFromApi(id) (line 67)
    ↓
11. fetchClinicFromApi checks: API_BASE_URL exists (line 34) → true
    ↓
12. Makes HTTP request: fetch(`${API_BASE_URL}/clinics/${id}`)
    ↓
13. API returns: { success: true, data: <clinic object with missing fields> }
    ↓
14. fetchClinicFromApi returns: <clinic object> (line 60)
    ↓
15. fetchClinicById returns: <clinic object> (line 68)
    ↓
16. getValidatedClinic receives clinic (line 100)
    ↓
17. Checks: if (clinic) → true (line 103)
    ↓
18. Sets: source = 'api' (line 104)
    ↓
19. Calls: validateMandatoryFields(clinic) (line 105)
    ↓
20. validateMandatoryFields checks all required fields:
    - clinic.id ✅
    - clinic.name ❌ MISSING
    - clinic.hero.title ✅
    - clinic.hero.subtitle ✅
    - clinic.contact.phone ❌ MISSING
    - clinic.contact.email ✅
    - clinic.contact.address ✅
    ↓
21. Returns: {
      isValid: false,
      errors: ['Clinic name is required', 'Contact phone is required']
    }
    ↓
22. getValidatedClinic checks: if (validation.isValid) → false (line 108)
    ↓
23. Enters error block (line 116-124)
    ↓
24. Logs error: console.error(`API data for clinic ${id} is invalid:`, errors)
    ↓
25. Logs warning: console.warn('⚠️ API data invalid - showing error UI...')
    ↓
26. Returns: {
      clinic: null,  ← IMPORTANT: clinic is null (not dummy data)
      validation: { isValid: false, errors: [...] },
      source: 'api'  ← IMPORTANT: source is 'api' (not 'dummy')
    }
    ↓
27. useClinicData receives result and sets state
    ↓
28. Template checks: if (!validation.isValid) → true
    ↓
29. Template renders ERROR SCREEN (shows validation.errors)
    ↓
30. ❌ Dummy data is NOT used (no fallback)
```

## Functions Called:

- ✅ `useClinicData()` - Entry point
- ✅ `getValidatedClinic()` - Main validation function
- ✅ `isApiModeEnabled()` - Checks if API_BASE_URL exists
- ✅ `fetchClinicById()` - Fetches from API
- ✅ `fetchClinicFromApi()` - Makes HTTP request
- ✅ `validateMandatoryFields()` - Validates API data (finds errors)
- ❌ `dummyClinics.find()` - **NOT called** (no fallback to dummy)

## Key Point:

Even though API returned data, it's invalid. The system:

- ❌ Does NOT use dummy data as fallback
- ✅ Shows error screen with validation errors
- ✅ Sets `clinic: null` and `source: 'api'`

---

# CASE 4: API Present? Yes, Valid? Partial → Use API Data, Hide Missing Sections

## Scenario:

- `NEXT_PUBLIC_API_BASE_URL` is **set**
- API returns valid clinic data with **all required fields**
- But **optional fields are missing** (e.g., no `services`, no `testimonials`)

## Function Call Flow:

```
1. Template calls: useClinicData('doc-website-14')
   ↓
2. useClinicData calls: getValidatedClinic('doc-website-14')
   ↓
3. getValidatedClinic checks: isApiModeEnabled()
   ↓
4. isApiModeEnabled() returns: true (API_BASE_URL is set)
   ↓
5. getValidatedClinic enters API block (line 98: if (isApiAvailable) → true)
   ↓
6. Calls: fetchClinicById(id) (line 100)
   ↓
7. fetchClinicById checks: isApiAvailable (line 54) → true
   ↓
8. Checks: loadingClinics.has(id) (line 59) → false
   ↓
9. Sets loading state: setLoadingClinics, setIsLoading(true)
   ↓
10. Calls: fetchClinicFromApi(id) (line 67)
    ↓
11. fetchClinicFromApi checks: API_BASE_URL exists (line 34) → true
    ↓
12. Makes HTTP request: fetch(`${API_BASE_URL}/clinics/${id}`)
    ↓
13. API returns: {
      success: true,
      data: {
        id: 'doc-website-14',
        name: 'Dr. Clinic',
        hero: { title: '...', subtitle: '...' },
        contact: { phone: '...', email: '...', address: '...' },
        services: [],  ← Empty array (optional)
        testimonials: undefined,  ← Missing (optional)
        galleryImages: []  ← Empty array (optional)
      }
    }
    ↓
14. fetchClinicFromApi returns: <clinic object> (line 60)
    ↓
15. fetchClinicById returns: <clinic object> (line 68)
    ↓
16. getValidatedClinic receives clinic (line 100)
    ↓
17. Checks: if (clinic) → true (line 103)
    ↓
18. Sets: source = 'api' (line 104)
    ↓
19. Calls: validateMandatoryFields(clinic) (line 105)
    ↓
20. validateMandatoryFields checks ONLY required fields:
    - clinic.id ✅
    - clinic.name ✅
    - clinic.hero.title ✅
    - clinic.hero.subtitle ✅
    - clinic.contact.phone ✅
    - clinic.contact.email ✅
    - clinic.contact.address ✅
    ↓
21. Returns: { isValid: true, errors: [] }  ← Valid because required fields exist
    ↓
22. getValidatedClinic checks: if (validation.isValid) → true (line 108)
    ↓
23. Returns: {
      clinic: <API clinic data with missing optional fields>,
      validation: { isValid: true, errors: [] },
      source: 'api'
    }
    ↓
24. useClinicData receives result and sets state
    ↓
25. Template renders with API data
    ↓
26. Template checks optional fields using helper functions:
    - hasServices(clinic) → false (services is empty array)
    - hasTestimonials(clinic) → false (testimonials is undefined)
    - hasGalleryImages(clinic) → false (galleryImages is empty array)
    ↓
27. Template conditionally renders:
    ✅ Header (always shown)
    ✅ Hero (always shown)
    ❌ Services section (hidden - hasServices returns false)
    ✅ Appointment section (always shown)
    ❌ Gallery section (hidden - hasGalleryImages returns false)
    ❌ Testimonials section (hidden - hasTestimonials returns false)
    ✅ Footer (always shown)
```

## Functions Called:

- ✅ `useClinicData()` - Entry point
- ✅ `getValidatedClinic()` - Main validation function
- ✅ `isApiModeEnabled()` - Checks if API_BASE_URL exists
- ✅ `fetchClinicById()` - Fetches from API
- ✅ `fetchClinicFromApi()` - Makes HTTP request
- ✅ `validateMandatoryFields()` - Validates API data (only required fields)
- ✅ `hasServices()` - Checks if services exist (returns false)
- ✅ `hasTestimonials()` - Checks if testimonials exist (returns false)
- ✅ `hasGalleryImages()` - Checks if gallery exists (returns false)
- ❌ `dummyClinics.find()` - **NOT called** (API data is valid)

## Key Point:

- ✅ API data is valid (all required fields present)
- ✅ Template renders with API data
- ✅ Missing optional sections are simply hidden (no errors)
- ❌ Dummy data is NOT used to fill missing optional fields

---

## Summary Table

| Case  | API Config | API Response    | Required Fields | Optional Fields | Result                                 |
| ----- | ---------- | --------------- | --------------- | --------------- | -------------------------------------- |
| **1** | ❌ Not set | N/A             | N/A             | N/A             | ✅ Use dummy data                      |
| **2** | ✅ Set     | ✅ Valid        | ✅ All present  | ✅ All present  | ✅ Use API data                        |
| **3** | ✅ Set     | ✅ Returns data | ❌ Missing      | Any             | ❌ Show error (no dummy)               |
| **4** | ✅ Set     | ✅ Valid        | ✅ All present  | ❌ Missing      | ✅ Use API data, hide missing sections |

---

## Important Notes

1. **Case 1**: API not configured → Always uses dummy data
2. **Case 2**: API configured + valid data → Uses API data
3. **Case 3**: API configured + invalid data → Shows error, **NO dummy fallback**
4. **Case 4**: API configured + valid data (partial) → Uses API data, hides missing sections

### Key Functions:

- **`isApiModeEnabled()`**: Checks if `NEXT_PUBLIC_API_BASE_URL` is set
- **`fetchClinicFromApi()`**: Makes HTTP request to API
- **`validateMandatoryFields()`**: Validates only required fields (id, name, hero, contact)
- **`hasServices()`, `hasTestimonials()`, etc.**: Check if optional fields exist (used in templates)

### Validation Rules:

- **Required fields** (error if missing): `id`, `name`, `hero.title`, `hero.subtitle`, `contact.phone`, `contact.email`, `contact.address`
- **Optional fields** (hide if missing): `services`, `testimonials`, `galleryImages`, `about`, `doctors`, `logo`, `social`
