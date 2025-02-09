'use client';

import { useContext } from 'react';

import { SearchResults } from '@/components/SearchResults';
import { SearchResultsSkeleton } from '@/components/SearchResultsSkeleton';
import { SearchFilters } from '@/components/SearchFilters/SearchFilters';
import { SearchContext } from '@/context/SearchContext';

/**
 * Component for rendering the search page
 * @returns {JSX.Element} Search page component
 */
export function Search() {
  const { state } = useContext(SearchContext);

  return (
    <div className="relative mb-10 flex flex-col items-center gap-4">
      <SearchFilters />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.query.isLoading ? (
          <SearchResultsSkeleton />
        ) : state.query.isError ? (
          <div>Error: {state.query.error?.message}</div>
        ) : (
          <SearchResults data={state.dogs} />
        )}
      </div>
    </div>
  );
}
