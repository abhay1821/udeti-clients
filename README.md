# Udeti Clients

A production-level Next.js application built with TypeScript and Material-UI, featuring a well-structured folder architecture for scalability and maintainability.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Material-UI (MUI)** for beautiful, responsive UI components
- **Production-ready folder structure** for scalability
- **ESLint & Prettier** for code quality
- **Husky & lint-staged** for pre-commit hooks
- **Responsive design** with mobile-first approach
- **Theme customization** with MUI theming
- **Reusable components** and utilities
- **Custom hooks** for common patterns
- **Notification system** with context API
- **Data table** with sorting and pagination
- **ABDM Integration** with client credentials authentication

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── common/           # Common components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # App header
│   │   ├── Footer.tsx    # App footer
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   └── Layout.tsx    # Main layout wrapper
│   └── ui/               # UI components
│       ├── DataTable.tsx # Data table component
│       ├── LoadingSpinner.tsx
│       └── NotificationProvider.tsx
├── hooks/                # Custom React hooks
│   ├── useApi.ts         # API hook
│   ├── useDebounce.ts    # Debounce hook
│   └── useLocalStorage.ts # Local storage hook
├── lib/                  # Library configurations
│   └── theme.ts          # MUI theme configuration
├── services/             # API services
├── types/                # TypeScript type definitions
│   └── index.ts          # Common types
├── utils/                # Utility functions
│   └── index.ts          # Common utilities
├── constants/            # Application constants
│   └── index.ts          # App constants
├── contexts/             # React contexts
├── styles/               # Global styles
│   └── globals.css       # Global CSS
└── assets/               # Static assets
    ├── images/           # Image assets
    └── icons/            # Icon assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd udeti-clients
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run prepare` - Set up Husky git hooks

## 🎨 Theming

The application uses Material-UI theming system with a custom theme configuration located in `src/lib/theme.ts`. You can customize:

- Color palette
- Typography
- Component styles
- Spacing and breakpoints

## 🧩 Components

### Layout Components

- **Layout**: Main layout wrapper with header, sidebar, and footer
- **Header**: Top navigation bar with user menu
- **Sidebar**: Collapsible navigation menu
- **Footer**: Application footer with links

### UI Components

- **DataTable**: Sortable, paginated data table
- **LoadingSpinner**: Loading indicator component
- **NotificationProvider**: Toast notification system

### Custom Hooks

- **useApi**: API call management with loading states
- **useDebounce**: Debounced value hook
- **useLocalStorage**: Local storage state management
- **useAbdmAuth**: ABDM authentication hook for client credentials grant type

## 🔧 Configuration

### ESLint

ESLint is configured with TypeScript support and Prettier integration. Configuration is in `.eslintrc.json`.

### Prettier

Code formatting is handled by Prettier with configuration in `.prettierrc`.

### TypeScript

TypeScript configuration includes path aliases for clean imports. See `tsconfig.json`.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Environment Variables

Make sure to set up the following environment variables for production:

**ABDM API Configuration** (Required for all templates):

**⚠️ IMPORTANT: For security, sensitive credentials are stored server-side only (NOT `NEXT_PUBLIC_*`)**

**Server-Side Only (Secure - Recommended):**

- `ABDM_ENDPOINT` - ABDM API endpoint URL (default: https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions)
- `ABDM_CLIENT_ID` - Your ABDM client ID
- `ABDM_CLIENT_SECRET` - Your ABDM client secret (⚠️ NEVER use NEXT*PUBLIC* prefix for secrets!)
- `ABDM_GRANT_TYPE` - Grant type (default: client_credentials)
- `ABDM_CM_ID` - CM ID (default: sbx for sandbox, prod for production)

**Legacy Support (Fallback - Less Secure):**

- `NEXT_PUBLIC_ABDM_ENDPOINT` - Fallback if `ABDM_ENDPOINT` not set
- `NEXT_PUBLIC_ABDM_CLIENT_ID` - Fallback if `ABDM_CLIENT_ID` not set
- `NEXT_PUBLIC_ABDM_CLIENT_SECRET` - Fallback if `ABDM_CLIENT_SECRET` not set (⚠️ Not recommended)
- `NEXT_PUBLIC_ABDM_GRANT_TYPE` - Grant type (default: client_credentials)
- `NEXT_PUBLIC_ABDM_CM_ID` - CM ID (default: sbx)

**Doctor/Clinic Configuration (Client-Side):**

- `NEXT_PUBLIC_DOCTOR_ID` - Doctor ID to fetch clinic data from API (e.g., `9043890123`)
  - If not set, the app will use dummy data for all templates
  - This determines which doctor's data to fetch from `/api/clinics/[id]`

**Example .env.local file (Secure):**

```env
# ✅ Recommended: Server-side only (secure)
ABDM_ENDPOINT=https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions
ABDM_CLIENT_ID=SBXID_009206
ABDM_CLIENT_SECRET=your-client-secret-here
ABDM_GRANT_TYPE=client_credentials
ABDM_CM_ID=sbx

# Doctor/Clinic Configuration
NEXT_PUBLIC_DOCTOR_ID=9043890123
```

**Security Note:** See `SECURITY.md` for details on how authentication is secured using httpOnly cookies and server-side API routes. Tokens and credentials are never exposed to the browser.

**Other Environment Variables:**

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_VERSION`
- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 📱 Responsive Design

The application is fully responsive and follows mobile-first design principles:

- **xs**: 0px and up
- **sm**: 600px and up
- **md**: 900px and up
- **lg**: 1200px and up
- **xl**: 1536px and up

## 🎯 Best Practices

This project follows several best practices:

- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Reusable, composable components
- **Custom Hooks**: Logic separation and reusability
- **Error Handling**: Comprehensive error handling patterns
- **Code Quality**: ESLint, Prettier, and pre-commit hooks
- **Performance**: Optimized bundle size and loading
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO**: Proper meta tags and semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Material-UI
