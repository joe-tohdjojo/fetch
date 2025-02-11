import {
  queryOptions,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';

import {
  fetchDogIds,
  FetchDogIDsOptions,
  fetchDogs,
} from '@/lib/fetchDogStuff';

/**
 * Fetches dogs based on provided filters
 * @param {Object} options - The options for fetching dogs
 * @param {string|null} options.breed - The breed to filter by
 * @param {number} options.page - The page number to fetch
 * @param {'asc'|'desc'} options.sort - The sort direction
 * @param {'age'|'breed'|'name'} options.sortBy - The field to sort by
 * @returns {Promise<{dogs: any[], totalPages: number}>} The fetched dogs and total pages
 * @throws {Error} If the API request fails
 */
const getDogs = async ({ breed, page, sort, sortBy }: FetchDogIDsOptions) => {
  const { data: dogIdsData, error: dogIdsError } = await fetchDogIds({
    breed,
    page,
    sort,
    sortBy,
  });
  if (dogIdsError) {
    throw new Error(
      dogIdsError.status === 401
        ? '401 Unauthorized'
        : dogIdsError.status.toString(),
    );
  }

  const { data: dogsData, error: dogsError } = await fetchDogs(
    dogIdsData.resultIds,
  );

  if (dogsError) {
    throw new Error(
      dogsError.status === 401
        ? '401 Unauthorized'
        : dogsError.status.toString(),
    );
  }

  return { dogs: dogsData, totalPages: dogIdsData.totalPages };
};

const dogOptions = (filteroptions: FetchDogIDsOptions) =>
  queryOptions({
    queryKey: ['dogs', filteroptions],
    queryFn: () => getDogs(filteroptions),
    placeholderData: keepPreviousData,
  });

export const useDogs = (params: FetchDogIDsOptions) => {
  const {
    page = 1,
    breed = 'All breeds',
    sort = 'asc',
    sortBy = 'breed',
  } = params;

  return useQuery(dogOptions({ page, breed, sort, sortBy }));
};
