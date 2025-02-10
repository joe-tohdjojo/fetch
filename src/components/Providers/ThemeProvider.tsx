'use client';

import * as React from 'react';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
const NextThemesProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  {
    ssr: true,
  },
);

/**
 * Provider component for the Theme context. The component wraps the app and provides the ThemeProvider to the app.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme context provider component
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
