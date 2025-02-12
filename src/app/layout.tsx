import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { QueryProvider } from '@/components/Providers/QueryProvider';
import { Navigation } from '@/components/Navigation';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fetch',
  description: 'Find the perfect dog for you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <div className="grid min-h-svh grid-rows-[auto,1fr,auto] gap-0">
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navigation />
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
