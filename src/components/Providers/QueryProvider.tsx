'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * Provider component for the Query context. The component wraps the app and provides the QueryClient to the app.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Query context provider component
 */
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // I would work with product to determine a practical staleTime
            retry: (failureCount, error) => {
              // If user is unauthorized, no need to retry. Allow app to redirect to /login
              if (error.message === '401 Unauthorized') return false;

              // Retry 3 times on failed queries
              if (failureCount < 3) return true;
              return false;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="right" />
    </QueryClientProvider>
  );
};
