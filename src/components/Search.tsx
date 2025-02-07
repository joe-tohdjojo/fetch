'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryOptions } from '@tanstack/react-query';

import { SearchResults } from '@/components/SearchResults';
import { fetchDogIds, fetchDogs } from '@/lib/fetchDogStuff';
import { Pagination } from '@/components/Pagination';
import { SearchResultsSkeleton } from '@/components/SearchResultsSkeleton';
import { SearchFilters } from '@/components/SearchFilters';

const getDogs = async (page: number) => {
  const { data: dogIdsData, error: dogIdsError } = await fetchDogIds(page);
  if (dogIdsError) {
    return { data: null, error: dogIdsError };
  }

  const { data: dogsData, error: dogsError } = await fetchDogs(
    dogIdsData.resultIds,
  );

  if (dogsError) {
    console.log(`@JT ~ getDogs ~ dogsError:`, dogsError);
    return { data: null, error: dogsError };
  }
  return {
    data: { dogs: dogsData, totalPages: dogIdsData.totalPages },
    error: null,
  };
};

const dogOptions = (page: number) => {
  return queryOptions({
    queryKey: ['dogsDefault', page],
    queryFn: () => getDogs(page),
  });
};

export function Search({ page = 1 }: { page?: number }) {
  const router = useRouter();
  const { data, error, isError, isLoading } = useQuery(dogOptions(page));

  if (data?.error && data.error.status === 401) {
    router.push('/login');
  }

  return (
    <div className="relative my-10 flex flex-col gap-4">
      <SearchFilters />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <SearchResultsSkeleton />
        ) : isError ? (
          <div>Error: {error?.message}</div>
        ) : (
          <SearchResults data={data?.data?.dogs} />
        )}
      </div>
      <Pagination
        total={data?.data?.totalPages}
        currentPage={page}
        href="/search"
      />
    </div>
  );
}
