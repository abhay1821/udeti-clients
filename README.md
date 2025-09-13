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