'use client';

import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { dogReducer, LOCAL_STORAGE_KEY, SET_DOGS } from '@/context/reducers';
import {
  fetchDogBreeds,
  fetchDogIds,
  FetchDogIDsOptions,
  fetchDogs,
} from '@/lib/fetchDogStuff';
import { useToast } from '@/hooks/use-toast';

/**
 * Retrieves favorites from local storage
 * @returns {Object} Object containing favorite dogs, empty object if no favorites or not in browser context
 */
const getFavoritesFromStorage = () => {
  if (typeof window === 'undefined') return {};
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
};

const initialState = {
  dogs: [],
  breeds: [],
  favorites: getFavoritesFromStorage(),
  filters: {
    sort: 'asc' as 'asc' | 'desc',
    sortBy: 'breed' as 'age' | 'breed' | 'name',
    breed: null,
  },
  query: {
    currentPage: 1,
    isLoading: false,
    isError: false,
    totalPages: 500,
    error: { message: '' },
  },
};

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

/**
 * Fetches all available dog breeds
 * @returns {Promise<string[]>} Array of dog breeds
 * @throws {Error} If the API request fails
 */
const getBreeds = async () => {
  const { data, error } = await fetchDogBreeds();

  if (error) {
    throw new Error(
      error.status === 401 ? '401 Unauthorized' : error.status.toString(),
    );
  }

  return data;
};

/**
 * Creates query options for fetching dogs
 * @param {Object} options - The options for the query
 * @param {number} options.page - The page number
 * @param {string|null} options.breed - The breed to filter by
 * @param {'asc'|'desc'} options.sort - The sort direction
 * @param {'age'|'breed'|'name'} options.sortBy - The field to sort by
 * @returns {QueryOptions} Query options for React Query
 */
const dogOptions = ({ page, breed, sort, sortBy }: FetchDogIDsOptions) => {
  return queryOptions({
    queryKey: ['dogs', page, breed, sort, sortBy],
    queryFn: () => getDogs({ page, breed, sort, sortBy }),
  });
};

export const SearchContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

/**
 * Provider component for the Search context. The component reacts to changes to the url query parameters and re-fetches the dog data
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {number} [props.page=1] - Current page number
 * @param {string} [props.breed='All+breeds'] - Selected breed filter
 * @param {'asc'|'desc'} [props.sort='asc'] - Sort direction
 * @param {'age'|'breed'|'name'} [props.sortBy='breed'] - Field to sort by
 * @returns {JSX.Element} Search context provider component
 */
export function SearchContextProvider({
  children,
  page = 1,
  breed = 'All+breeds',
  sort = 'asc',
  sortBy = 'breed',
}: {
  children: Readonly<React.ReactNode>;
  page?: number;
  breed?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'age' | 'breed' | 'name';
}) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(dogReducer, initialState);
  const router = useRouter();
  const { data, error, isError, isLoading } = useQuery(
    dogOptions({
      page,
      breed: decodeURIComponent(breed) !== 'All breeds' ? breed : null,
      sort,
      sortBy,
    }),
  );
  const {
    data: breedsData,
    error: breedsError,
    isLoading: isBreedsLoading,
    isError: isBreedsError,
  } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: getBreeds,
  });

  useEffect(() => {
    if (!data || !breedsData) return;
    dispatch({
      type: SET_DOGS,
      payload: {
        breeds: breedsData || [],
        dogs: data.dogs,
        filters: { breed, sort, sortBy },
        query: {
          currentPage: page,
          isLoading: isLoading || isBreedsLoading,
          isError: isError || isBreedsError,
          totalPages: data?.totalPages,
          error: error || breedsError,
        },
      },
    });
  }, [
    breed,
    breedsData,
    breedsError,
    data,
    error,
    isError,
    isBreedsError,
    isBreedsLoading,
    isLoading,
    page,
    sort,
    sortBy,
  ]);

  useEffect(() => {
    if (isError || isBreedsError) {
      toast({
        title: 'Something went wrong!',
        description: `The server responded with ${error || breedsError}`,
        variant: 'destructive',
      });
      router.replace('/login');
    }
  }, [isError, isBreedsError, breedsError, error, toast, router]);

  return (
    <SearchContext.Provider
      value={{
        state: {
          ...state,
          filters: {
            ...state.filters,
            breed,
          },
          query: { ...state.query, currentPage: page, isLoading, isError },
          favorites: { ...state.favorites },
        },
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
