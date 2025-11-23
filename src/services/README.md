# Clinic Data API Integration

## Overview

This system automatically follows the decision matrix:

1. **API present?** → Always tries API first (if configured)
2. **API not present?** → Falls back to dummy data
3. **API invalid?** → Shows error (no dummy fallback)

## Configuration

Set this environment variable:

```bash
# API endpoint (if not set, uses dummy data)
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

## Decision Matrix

| API Present? | Valid (Required Fields)?               | Action                                         |
| ------------ | -------------------------------------- | ---------------------------------------------- |
| No           | N/A                                    | Use dummy data                                 |
| Yes          | Yes                                    | Use API data (render)                          |
| Yes          | No (required fields missing)           | Do NOT use dummy — show error UI, log + alert  |
| Yes          | Partial (only optional arrays missing) | Render present sections; hide missing sections |

## Data Priority Rules

1. **API data ALWAYS takes priority** (if API is configured)
   - If API returns valid clinic data → Use API data
   - If API doesn't return data → Fall back to dummy data
   - If API returns invalid data (missing required fields) → Show error (NO dummy fallback)

2. **Dummy data fallback**
   - Only used if API is not configured or API fetch fails
   - Never used if API returns invalid data

## Validation Rules

**Same validation applies to both API and dummy data:**

### Mandatory Fields (Error if missing)

- `id` - Clinic ID
- `name` - Clinic name
- `hero.title` - Hero section title
- `hero.subtitle` - Hero section subtitle
- `contact.phone` - Contact phone
- `contact.email` - Contact email
- `contact.address` - Contact address

**If mandatory fields are missing → Template shows error screen**

### Optional Fields (Hide section if missing)

- `services` - Services section (hide if empty/undefined)
- `testimonials` - Testimonials section (hide if empty/undefined)
- `galleryImages` - Gallery section (hide if empty/undefined)
- `about` - About section (hide if empty/undefined)
- `doctors` - Doctors section (hide if empty/undefined)
- `logo` - Logo (use header without logo if missing)
- `social` - Social links (hide if empty/undefined)

**If optional fields are missing → Simply hide that UI section**

## API Response Format

The API should return data in this format:

```typescript
{
  success: boolean;
  data?: Clinic; // Clinic object matching Clinic interface
  error?: string;
}
```

For fetching all clinics:

```typescript
{
  success: boolean;
  data?: Clinic[]; // Array of Clinic objects
  error?: string;
}
```

## Usage

### In Templates (Automatic API/Dummy Detection)

```typescript
import { useClinicData } from '@/hooks/useClinicData';

const MyTemplate = () => {
  const { clinic, validation, isLoading } = useClinicData('clinic-id');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!validation.isValid) {
    return <ErrorScreen errors={validation.errors} />;
  }

  if (!clinic) {
    return <NotFoundScreen />;
  }

  // Render template - automatically uses API if available, dummy if not
  return <TemplateContent clinic={clinic} />;
};
```

### How It Works

1. **System automatically checks API first** (if `NEXT_PUBLIC_API_BASE_URL` is set)
2. **If API returns data** → Uses API data
3. **If API not configured or fails** → Falls back to dummy data
4. **If API returns invalid data** → Shows error (no dummy fallback)

## Important Notes

1. **API is checked automatically** - No need to opt-in per template
2. **API invalid data never falls back to dummy** - Shows error instead
3. **API unavailable/failed** - Falls back to dummy data automatically
4. **Same validation rules** apply to both API and dummy data
5. **Missing optional fields** - Simply hide sections (no errors)
6. **Missing mandatory fields** - Show error screens
