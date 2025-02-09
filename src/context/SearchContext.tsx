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

const getBreeds = async () => {
  const { data, error } = await fetchDogBreeds();

  if (error) {
    throw new Error(
      error.status === 401 ? '401 Unauthorized' : error.status.toString(),
    );
  }

  return data;
};

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
        description: `The server errored with ${error || breedsError}`,
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
