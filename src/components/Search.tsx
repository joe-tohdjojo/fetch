'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SearchResults } from '@/components/SearchResults';
import { SearchResultsSkeleton } from '@/components/SearchResultsSkeleton';
import { SearchFilters } from '@/components/SearchFilters/SearchFilters';
import { useDogs } from '@/hooks/useDogs';
import { useFilters } from '@/hooks/useFilters';

/**
 * Component for rendering the search page
 * @returns {JSX.Element} Search page component
 */
export function Search() {
  const router = useRouter();
  const { page, breed, sort, sortBy } = useFilters();
  const { isLoading, isError, data, error } = useDogs({
    page,
    breed,
    sort,
    sortBy,
  });

  useEffect(() => {
    if (error && error.message === '401 Unauthorized') {
      router.push('/login');
    }
  }, [error, router]);

  return (
    <div className="relative mb-10 flex flex-col items-center gap-4">
      <SearchFilters />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <SearchResultsSkeleton />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <SearchResults data={data?.dogs} />
        )}
      </div>
    </div>
  );
}
