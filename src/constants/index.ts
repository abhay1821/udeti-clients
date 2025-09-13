// Application constants

export const APP_CONFIG = {
  name: 'Udeti Clients',
  version: '1.0.0',
  description: 'Production-level Next.js application with MUI',
  author: 'Udeti Team',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
  },
  users: {
    list: '/api/users',
    create: '/api/users',
    update: '/api/users/:id',
    delete: '/api/users/:id',
  },
} as const;

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  admin: '/admin',
  profile: '/profile',
  settings: '/settings',
  login: '/login',
  register: '/register',
} as const;

export const STORAGE_KEYS = {
  token: 'udeti_token',
  user: 'udeti_user',
  theme: 'udeti_theme',
  language: 'udeti_language',
} as const;

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
} as const;

export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export const Z_INDEX = {
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;
