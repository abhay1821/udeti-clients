import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { NotificationProvider } from '@/components/ui/NotificationProvider';
import { ClinicProvider } from '@/contexts/ClinicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Healthcare Templates - Udeti',
  description: 'Professional healthcare website templates built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClinicProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </ClinicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}